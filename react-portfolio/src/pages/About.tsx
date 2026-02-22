import { useState } from 'react'

interface CvItemProps {
  dates: string
  role: string
  entity: string
  link?: string
  location: string
  bullets?: string[]
  note?: string
}

function CvItem({ dates, role, entity, link, location, bullets, note }: CvItemProps) {
  const [expanded, setExpanded] = useState(false)
  const hasExpandable = bullets || note

  return (
    <li>
      <div className={`cv-item ${expanded ? 'expanded' : ''}`}>
        <div 
          className="cv-item-header"
          role={hasExpandable ? "button" : undefined}
          tabIndex={hasExpandable ? 0 : undefined}
          aria-expanded={hasExpandable ? expanded : undefined}
          onClick={() => hasExpandable && setExpanded(!expanded)}
          onKeyPress={(e) => { if ((e.key === 'Enter' || e.key === ' ') && hasExpandable) { e.preventDefault(); setExpanded(!expanded); }}}
        >
          <div className="cv-line cv-line-1">
            <span className="cv-dates">{dates}:</span> <span className="cv-role">{role}</span>
          </div>
          <div className="cv-line cv-line-2">
            <span className="cv-entity">{entity}</span>
            {link && <a className="cv-link-icon" href={link} target="_blank" rel="noopener" aria-label={`Open ${entity} in new tab`}>↗</a>}
            <span className="cv-location">| {location}</span>
          </div>
        </div>
        {bullets && expanded && (
          <ul className="cv-bullets">
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
        {note && expanded && (
          <div className="cv-note">{note}</div>
        )}
      </div>
    </li>
  )
}

function About() {
  return (
    <section id="about">
      <div className="container">
        <h2>About</h2>

        <div className="cv-section">
          <h3>Profile</h3>
          <p>Master's student and Embedded Systems Engineer with expertise in ECU development, CAN communication, and AUTOSAR integration. Skilled in SDLC, V-Model, and ASPICE/MISRA-compliant workflows, with hands-on experience in automotive tools and physical systems. Passionate about innovation, sustainability, and next-generation technologies.</p>
        </div>

        <div className="cv-section" id="cv-experience">
          <h3>Professional Experience</h3>
          <ul className="cv-list">
            <CvItem
              dates="Aug/2025 – Present"
              role="Research Assistant"
              entity="Institut für Geotechnik und Baubetrieb, TUHH"
              link="https://www.tuhh.de/fibau/team/institute-der-tuhh/institut-fuer-geotechnik-und-baubetrieb"
              location="Hamburg, Germany"
              bullets={[
                "Building navigation algorithms for a 4WD autonomous rover using proprioceptive sensing (encoders, torque, current).",
                "Developing slip detection, traction control, and adaptive heading for reliable off-road mobility.",
                "Designing path-planning strategies (switchback, serpentine) to improve slope climbing and navigation efficiency."
              ]}
            />
            <CvItem
              dates="Sep/2021 – Sep/2024"
              role="Embedded Software Engineer"
              entity="Bosch Global Software Technologies"
              link="https://www.bosch-softwaretechnologies.com/en/our-company/about-us/"
              location="Bangalore, India"
              bullets={[
                "Led AUTOSAR ComStack & BSW migration, enabling 15% faster integration and seamless ECU communication (UDS, CAN, LIN).",
                "Owned complete SDLC. From requirements (IBM DOORS/DNG) to development, testing (Vector/ETAS), reviews, and ASPICE/MISRA-compliant delivery.",
                "Validated 20+ ECU features, achieving 95%+ coverage, zero critical defects, and boosting team velocity by 20%."
              ]}
            />
            <CvItem
              dates="Jul/2021 – Aug/2021"
              role="Intern"
              entity="Bangalore Metro Rail Corporation Limited"
              link="https://english.bmrc.co.in/"
              location="Bangalore, India"
              bullets={[
                "Explored power distribution and BMS automation for station infrastructure, enhancing operational reliability.",
                "Gained experience in SCADA-driven metro rail subsystems, focusing on automation and protection analysis for traction & propulsion units."
              ]}
            />
          </ul>
        </div>

        <div className="cv-section" id="cv-organisations">
          <h3>Organisations</h3>
          <ul className="cv-list">
            <CvItem
              dates="Jul/2025 – Present"
              role="University Policy Representative"
              entity="AStA TUHH"
              link="https://www.asta.tuhh.de/"
              location="Hamburg, Germany"
              note="Representing the student body in the context of higher education policy issues, networking and support of all students who are active in higher education policy."
            />
            <CvItem
              dates="Jun/2020 – Jun/2024"
              role="Joint Secretary, Professional Director, Member"
              entity="Rotaract Club"
              link="https://www.rotaryindiranagar.org/"
              location="Bangalore, India"
              note="Have led 20+ projects pertaining to sustainable environment, education, cultural exchange, networking and fellowship."
            />
          </ul>
        </div>

        <div className="cv-section" id="cv-education">
          <h3>Education</h3>
          <ul className="cv-list">
            <li>
              <div className="cv-item">
                <div className="cv-item-header">
                  <div className="cv-line cv-line-1"><span className="cv-dates">2024–Present:</span> <span className="cv-role">Master of Science in Microelectronics and Microsystems,</span></div>
                  <div className="cv-line cv-line-1"><span className="cv-role">Specialization in Embedded Systems</span></div>
                  <div className="cv-line cv-line-2"><span className="cv-entity">Technische Universität Hamburg</span> <a className="cv-link-icon" href="https://www.tuhh.de/tuhh/startseite" target="_blank" rel="noopener" aria-label="Open Technische Universität Hamburg in new tab">↗</a> <span className="cv-location">| Hamburg, Germany</span></div>
                </div>
              </div>
            </li>
            <li>
              <div className="cv-item">
                <div className="cv-item-header">
                  <div className="cv-line cv-line-1"><span className="cv-dates">2017–2021:</span> <span className="cv-role">Bachelor of Engineering - Electrical and Electronics Engineering</span></div>
                  <div className="cv-line cv-line-2"><span className="cv-entity">New Horizon College of Engineering</span> <a className="cv-link-icon" href="https://newhorizoncollegeofengineering.in/" target="_blank" rel="noopener" aria-label="Open New Horizon College of Engineering in new tab">↗</a> <span className="cv-location">| Bangalore, India</span></div>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default About
