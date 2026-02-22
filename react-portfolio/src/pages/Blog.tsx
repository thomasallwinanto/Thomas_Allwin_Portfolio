import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { blogs, blogSlugs } from '../data/blogs'

type BlogKey = keyof typeof blogs

function Blog() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [openBlog, setOpenBlog] = useState<BlogKey | null>(null)

  useEffect(() => {
    if (slug) {
      // Check if it's a slug or a blog key
      const blogKey = (blogSlugs[slug] || slug) as BlogKey
      if (blogs[blogKey]) {
        setOpenBlog(blogKey)
      }
    }
  }, [slug])

  const toggleBlog = (key: BlogKey) => {
    if (openBlog === key) {
      setOpenBlog(null)
      navigate('/blog')
    } else {
      setOpenBlog(key)
      const blogSlug = blogs[key].slug
      navigate(`/blog/${blogSlug}`)
    }
  }

  const blogEntries = Object.entries(blogs) as [BlogKey, typeof blogs[BlogKey]][]

  return (
    <section id="blog">
      <div className="container">
        <h2>Blogs/Reviews</h2>
        <div className="project-blocks">
          {blogEntries.map(([key, blog]) => (
            <div
              key={key}
              className={`project-block ${openBlog === key ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => toggleBlog(key)}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleBlog(key) }}
            >
              {blog.title}
            </div>
          ))}
        </div>
        {openBlog && blogs[openBlog] && (
          <div id="blog-content" style={{ display: 'block' }}>
            <h3>{blogs[openBlog].title}</h3>
            <div dangerouslySetInnerHTML={{ __html: blogs[openBlog].body }} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Blog
