import { useState } from 'react'
import { projects } from '../data/projects'

type ProjectKey = keyof typeof projects

function Projects() {
  const [openProject, setOpenProject] = useState<ProjectKey | null>(null)

  const toggleProject = (key: ProjectKey) => {
    setOpenProject(openProject === key ? null : key)
  }

  const open = openProject ? projects[openProject] : null

  return (
    <section id="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="academic-intro" style={{ textAlign: 'justify', lineHeight: 1.6 }}>
          Here are some of my projects, each focused on solving real-world problems and applying modern technology and research methods. Click a project to see details.
        </div>
        <div className="project-blocks">
          {(Object.keys(projects) as ProjectKey[]).map((key) => (
            <div
              key={key}
              className={`project-block ${openProject === key ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => toggleProject(key)}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleProject(key) }}
            >
              {projects[key].title}
            </div>
          ))}
        </div>
        {open && (
          <div id="academic-project-details" style={{ display: 'block' }}>
            <h3 style={{ margin: '0 0 0.2rem 0' }}>{open.title}</h3>
            {open.period && (
              <p className="project-period" style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', opacity: 0.75 }}>
                {open.period}
              </p>
            )}
            <ul className="project-detail-desc" style={{ margin: '0 0 0.6rem 1.1rem', padding: 0, listStyle: 'disc', lineHeight: 1.45 }}>
              {open.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
