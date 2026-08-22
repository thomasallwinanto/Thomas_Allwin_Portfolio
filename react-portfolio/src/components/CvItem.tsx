import { useState } from 'react'

interface CvItemProps {
  dates: string
  role: string
  /** Employer, university or club. Omitted for entries that have none (e.g. projects). */
  entity?: string
  link?: string
  location?: string
  bullets?: string[]
  note?: string
}

/**
 * One collapsible CV entry, shared by Professional Experience, Organisations,
 * Education and Projects so every section reads the same way.
 */
function CvItem({ dates, role, entity, link, location, bullets, note }: CvItemProps) {
  const [expanded, setExpanded] = useState(false)
  const hasExpandable = bullets || note
  const hasSecondLine = entity || location

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
          {hasSecondLine && (
            <div className="cv-line cv-line-2">
              {entity && <span className="cv-entity">{entity}</span>}
              {link && <a className="cv-link-icon" href={link} target="_blank" rel="noopener" aria-label={`Open ${entity ?? role} in new tab`}>↗</a>}
              {location && <span className="cv-location">{entity ? '| ' : ''}{location}</span>}
            </div>
          )}
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

export default CvItem
