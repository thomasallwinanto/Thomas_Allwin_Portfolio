import CvItem from './CvItem'
import { projects } from '../data/projects'

type ProjectKey = keyof typeof projects

/**
 * Projects, rendered with the same collapsible CV entries as Professional
 * Experience, Organisations and Education so the About page stays consistent.
 */
function ProjectsSection() {
  return (
    <div className="cv-section" id="cv-projects">
      <h3>Projects</h3>
      <p>Here are some of my projects, each focused on solving real-world problems and applying modern technology and research methods. Click a project to see details.</p>
      <ul className="cv-list">
        {(Object.keys(projects) as ProjectKey[]).map((key) => (
          <CvItem
            key={key}
            dates={projects[key].period}
            role={projects[key].title}
            bullets={projects[key].points}
          />
        ))}
      </ul>
    </div>
  )
}

export default ProjectsSection
