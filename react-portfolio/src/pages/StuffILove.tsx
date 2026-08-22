import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { loveStuff, cookingImages, wikiTitleOverrides, wikiMovieTitleOverrides } from '../data/love'

type Category = 'books' | 'movies' | 'music' | 'cooking'

// Inline 70x100 grey placeholder. Replaces via.placeholder.com, which was shut down
// and left every un-fetched thumbnail as a broken image request.
const PLACEHOLDER_THUMB =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="100">' +
      '<rect width="70" height="100" fill="#d4d0c8"/>' +
      '<rect x="0.5" y="0.5" width="69" height="99" fill="none" stroke="#808080"/>' +
    '</svg>'
  )

function slugify(str: string): string {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function fetchWikiThumb(title: string): Promise<string | null> {
  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
  try {
    const res = await fetch(endpoint, { headers: { 'Accept': 'application/json' } })
    if (!res.ok) return null
    const data = await res.json()
    if (data?.thumbnail?.source) return data.thumbnail.source
    return null
  } catch (e) {
    return null
  }
}

// Thumbnails survive navigation within a tab, so re-opening a category costs no
// network calls. Storage can throw (private mode, blocked site data) — never fatal.
const THUMB_CACHE_KEY = 'love-thumbs-v1'

function readThumbCache(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(THUMB_CACHE_KEY) || '{}')
  } catch {
    return {}
  }
}

function cacheThumbs(found: Record<string, string>) {
  try {
    sessionStorage.setItem(THUMB_CACHE_KEY, JSON.stringify({ ...readThumbCache(), ...found }))
  } catch {
    /* cache is a nicety, not a requirement */
  }
}

function StuffILove() {
  const { category: urlCategory } = useParams()
  const navigate = useNavigate()
  const [openCategory, setOpenCategory] = useState<Category | null>(null)
  const [thumbnails, setThumbnails] = useState<Record<string, string>>(readThumbCache)

  useEffect(() => {
    if (urlCategory && ['books', 'movies', 'music', 'cooking'].includes(urlCategory)) {
      setOpenCategory(urlCategory as Category)
    }
  }, [urlCategory])

  const toggleCategory = (cat: Category) => {
    if (openCategory === cat) {
      setOpenCategory(null)
      navigate('/stuff-i-love')
    } else {
      setOpenCategory(cat)
      navigate(`/stuff-i-love/${cat}`)
    }
  }

  // Ids already requested this session, so re-renders never refetch the same title.
  const requestedRef = useRef<Set<string>>(new Set(Object.keys(thumbnails)))

  // Fetch thumbnails for books, movies, music
  const fetchThumbnails = useCallback(async (category: Category) => {
    if (category === 'cooking') return

    const items = loveStuff[category]
    const titles = items.map((item: string) => {
      if (category === 'movies') {
        const match = item.match(/^(.*?)(?:\t|\s{2,})([0-9.]+)?$/)
        return match ? match[1].trim() : item.trim()
      }
      return item.trim()
    })

    const pending = titles.filter((title) => !requestedRef.current.has(`${category}-${slugify(title)}`))
    if (pending.length === 0) return
    pending.forEach((title) => requestedRef.current.add(`${category}-${slugify(title)}`))

    // Wikipedia lookups run concurrently; the old serial loop made one round trip
    // per title and restarted itself on every state update.
    const results = await Promise.all(pending.map(async (title) => {
      const id = `${category}-${slugify(title)}`

      let query = title
      if (category === 'movies' && wikiMovieTitleOverrides[title]) {
        query = wikiMovieTitleOverrides[title]
      } else if (category === 'music' && wikiTitleOverrides[title]) {
        query = wikiTitleOverrides[title]
      }

      let url = await fetchWikiThumb(query)

      // Try fallbacks
      if (!url && category === 'books') {
        url = await fetchWikiThumb(`${title} (novel)`)
        if (!url) url = await fetchWikiThumb(`${title} (book)`)
      } else if (!url && category === 'movies') {
        url = await fetchWikiThumb(`${title} (film)`)
      } else if (!url && category === 'music') {
        if (!/(band\)|band$)/i.test(query)) {
          url = await fetchWikiThumb(`${query} (musician)`)
        }
        if (!url) url = await fetchWikiThumb(`${query} (band)`)
      }

      // Let a later visit retry anything that came back empty.
      if (!url) requestedRef.current.delete(id)
      return [id, url] as const
    }))

    const found: Record<string, string> = {}
    for (const [id, url] of results) {
      if (url) found[id] = url
    }
    if (Object.keys(found).length > 0) {
      setThumbnails(prev => ({ ...prev, ...found }))
      cacheThumbs(found)
    }
  }, [])

  useEffect(() => {
    if (openCategory && openCategory !== 'cooking') {
      fetchThumbnails(openCategory)
    }
  }, [openCategory, fetchThumbnails])

  const renderContent = () => {
    if (!openCategory) return null

    if (openCategory === 'cooking') {
      return (
        <div id="love-images" style={{ display: 'block' }}>
          <p className="cooking-quote">
            &ldquo;Cooking is a craft, I like to think, and a good cook is a craftsman - not an artist.&rdquo;<br />
            &ndash; Anthony Bourdain
          </p>
          <div className="cooking-grid">
            {cookingImages.map((src, i) => (
              <div key={i} className="cooking-tile">
                <img src={src} loading="lazy" decoding="async" alt="" />
              </div>
            ))}
          </div>
        </div>
      )
    }

    const items = loveStuff[openCategory]
    const titles = items.map((item: string) => {
      if (openCategory === 'movies') {
        const match = item.match(/^(.*?)(?:\t|\s{2,})([0-9.]+)?$/)
        return match ? match[1].trim() : item.trim()
      }
      return item.trim()
    })

    return (
      <div id="love-images" style={{ display: 'block' }}>
        {openCategory === 'movies' && (
          <p className="love-desc">
            More movies on my letterboxd{' '}
            <a href="https://letterboxd.com/thomasallwin/" target="_blank" rel="noopener">thomasallwin</a>
          </p>
        )}
        <div style={{ display: 'flex', gap: '0.96rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.6rem' }}>
          {titles.map((title: string) => {
            const id = `${openCategory}-${slugify(title)}`
            const thumb = thumbnails[id] || PLACEHOLDER_THUMB
            return (
              <div key={id} className="love-item love-item--portrait">
                <img
                  id={id}
                  src={thumb}
                  loading="lazy"
                  decoding="async"
                  alt={title}
                  style={thumb !== PLACEHOLDER_THUMB ? { background: '#fff' } : {}}
                />
                <div className="love-caption" title={title}>{title}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <section id="stuff-i-love">
      <div className="container">
        <h2>Stuff I Love</h2>
        <p>There is more and I will update it soon.</p>
        <div className="love-categories project-blocks">
          {(['books', 'movies', 'music', 'cooking'] as Category[]).map((cat) => (
            <div
              key={cat}
              className={`project-block ${openCategory === cat ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              data-category={cat}
              onClick={() => toggleCategory(cat)}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleCategory(cat) }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))}
        </div>
        {renderContent()}
      </div>
    </section>
  )
}

export default StuffILove
