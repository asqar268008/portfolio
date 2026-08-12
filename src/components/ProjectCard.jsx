import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Play } from './icons.jsx'

// Thumbnail: the project screenshot from /public/photos/ when available,
// otherwise a clean gradient panel. No emoji glyphs.
const ProjectThumb = ({ project }) => {
  const [broken, setBroken] = useState(false)
  const [c1, c2] = project.gradient
  const showImage = Boolean(project.image) && !broken

  return (
    <div className="project-thumb" aria-hidden="true">
      {showImage ? (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
        />
      ) : (
        <div
          className="thumb-fallback"
          style={{ backgroundImage: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <svg viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
            <g stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1">
              {[0, 40, 80, 120, 160].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} />)}
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="180" />)}
            </g>
          </svg>
        </div>
      )}
      <div className="thumb-overlay" />
      <span className="project-type">{project.type}</span>
    </div>
  )
}

const ProjectCard = ({ project, onOpen }) => (
  <motion.article
    className="project-card"
    layout
    initial={{ opacity: 0, scale: 0.94 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.94 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    layoutId={`card-${project.id}`}
  >
    <ProjectThumb project={project} />

    <div className="project-body">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-tagline">{project.tagline}</p>
      <div className="project-impact">
        {project.impact.map((i) => (
          <span className="impact-chip" key={i}>{i}</span>
        ))}
      </div>
      <p className="project-desc">{project.description}</p>

      <div className="project-tech">
        {project.technologies.slice(0, 5).map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>

      <div className="project-actions">
        <button className="btn btn-primary btn-sm" onClick={() => onOpen(project)}>
          View Details
        </button>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm btn-icon"
            aria-label={`${project.title} on GitHub`}
          >
            <Github size={15} />
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
            aria-label={`Watch the ${project.title} demo`}
          >
            <Play size={13} /> Watch Demo
          </a>
        )}
      </div>
    </div>
  </motion.article>
)

export default ProjectCard
