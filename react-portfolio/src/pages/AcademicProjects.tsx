import { useState } from 'react'
import { academicProjects } from '../data/projects'

function AcademicProjects() {
  const [openProject, setOpenProject] = useState<string | null>(null)

  const toggleProject = (key: string) => {
    setOpenProject(openProject === key ? null : key)
  }

  return (
    <section id="academic-projects">
      <div className="container">
        <h2>Academic Projects</h2>
        <div className="academic-intro" style={{ textAlign: 'justify', lineHeight: 1.6 }}>
          Here are some of my academic projects, each focused on solving real-world problems and applying modern technology and research methods. Click a project to see details.
        </div>
        <div className="project-blocks">
          {Object.entries(academicProjects).map(([key, project]) => (
            <div
              key={key}
              className={`project-block ${openProject === key ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => toggleProject(key)}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleProject(key) }}
            >
              {project.title}
            </div>
          ))}
        </div>
        {openProject && academicProjects[openProject as keyof typeof academicProjects] && (
          <div id="academic-project-details" style={{ display: 'block' }}>
            <h3 style={{ margin: '0 0 0.4rem 0' }}>{academicProjects[openProject as keyof typeof academicProjects].title}</h3>
            <ul className="project-detail-desc" style={{ margin: '0 0 0.6rem 1.1rem', padding: 0, listStyle: 'disc', lineHeight: 1.45 }}>
              {academicProjects[openProject as keyof typeof academicProjects].points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default AcademicProjects
