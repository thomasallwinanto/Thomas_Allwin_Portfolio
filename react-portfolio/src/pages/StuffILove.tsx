import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { loveStuff, cookingImages, wikiTitleOverrides, wikiMovieTitleOverrides } from '../data/love'

type Category = 'books' | 'movies' | 'music' | 'cooking'

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

function StuffILove() {
  const { category: urlCategory } = useParams()
  const navigate = useNavigate()
  const [openCategory, setOpenCategory] = useState<Category | null>(null)
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({})

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

    for (const title of titles) {
      const id = `${category}-${slugify(title)}`
      if (thumbnails[id]) continue

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

      if (url) {
        setThumbnails(prev => ({ ...prev, [id]: url! }))
      }
    }
  }, [thumbnails])

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
            const thumb = thumbnails[id] || 'https://via.placeholder.com/70x100.png?text=%20'
            return (
              <div key={id} className="love-item love-item--portrait">
                <img
                  id={id}
                  src={thumb}
                  loading="lazy"
                  decoding="async"
                  alt={title}
                  style={thumb !== 'https://via.placeholder.com/70x100.png?text=%20' ? { background: '#fff' } : {}}
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
