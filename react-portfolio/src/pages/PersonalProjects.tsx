import { useState } from 'react'
import { Link } from 'react-router-dom'
import { personalProjects } from '../data/projects'

type ProjectKey = keyof typeof personalProjects

function PersonalProjects() {
  const [openProject, setOpenProject] = useState<ProjectKey | null>(null)

  const toggleProject = (key: ProjectKey) => {
    setOpenProject(openProject === key ? null : key)
  }

  const renderProjectContent = (key: ProjectKey) => {
    const project = personalProjects[key]
    const isLargeImages = key === 'guild' || key === 'architecture'
    
    return (
      <div id="project-details" style={{ display: 'block' }}>
        <h3 style={{ marginTop: 0 }}>{project.title}</h3>
        {project.desc && (
          key === 'imaginary' ? (
            <p className="project-detail-desc" style={{ fontSize: '1.05rem', lineHeight: 1.5, margin: '0.4rem 0 0.8rem' }}>
              My 3D art project created during lockdown using Paint 3D. See more in the{' '}
              <Link to="/art" style={{ color: '#00bcd4', textDecoration: 'underline' }}>Art Projects</Link> section.
            </p>
          ) : (
            <p 
              className="project-detail-desc" 
              style={{ fontSize: '1.05rem', lineHeight: 1.5, margin: '0.4rem 0 0.8rem' }}
              dangerouslySetInnerHTML={{ __html: project.desc }}
            />
          )
        )}
        {'images' in project && project.images && (
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {project.images.map((img, i) => (
              <img 
                key={i}
                src={img} 
                loading="lazy" 
                decoding="async" 
                alt="" 
                style={isLargeImages ? { maxWidth: '100%', height: 'auto', margin: '0.5rem' } : { width: '120px', height: 'auto', margin: '0.5rem' }}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section id="personal-projects">
      <div className="container">
        <h2>Personal Projects</h2>
        <div className="project-blocks">
          {(Object.keys(personalProjects) as ProjectKey[]).map((key) => (
            <div
              key={key}
              className={`project-block ${openProject === key ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => toggleProject(key)}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleProject(key) }}
            >
              {personalProjects[key].title}
            </div>
          ))}
        </div>
        {openProject && renderProjectContent(openProject)}
      </div>
    </section>
  )
}

export default PersonalProjects
