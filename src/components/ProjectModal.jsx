import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import VideoPlayer from './VideoPlayer.jsx'
import { Github, Play, X, ArrowUpRight } from './icons.jsx'

const ProjectModal = ({ project, onClose }) => {
  const closeRef = useRef(null)

  // Lock scroll + ESC close + focus management
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="modal-head">
          <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close project details">
            <X size={18} />
          </button>
          <div className="section-eyebrow">{project.type}</div>
          <h3 className="section-title" id="modal-title" style={{ marginBottom: '0.5rem' }}>
            {project.title}
          </h3>
          <p className="section-sub" style={{ maxWidth: 'none' }}>{project.tagline}</p>
        </div>

        <div className="modal-body">
          {/* Demo video — omitted entirely when a project has no recording,
              rather than showing the visitor an authoring placeholder. */}
          {project.demoVideo && (
            <div className="modal-section">
              <VideoPlayer
                src={project.demoVideo}
                poster={project.poster}
                gradient={project.gradient}
                label={`${project.title} demo`}
              />
            </div>
          )}

          {/* Overview */}
          <div className="modal-section">
            <h4>Project Overview</h4>
            <p>{project.description}</p>
          </div>

          {/* Problem */}
          <div className="modal-section">
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>

          {/* Approach */}
          <div className="modal-section">
            <h4>Approach</h4>
            <p>{project.approach}</p>
          </div>

          {/* Architecture */}
          <div className="modal-section">
            <h4>Architecture</h4>
            <div className="pipeline">
              {project.architecture.map((a) => (
                <div className="pipeline-step" key={a.step}>
                  <span className="num">{a.step}</span>
                  <div className="txt">
                    <strong>{a.title}</strong>
                    <span>{a.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="modal-section">
            <h4>Technologies</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.technologies.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* Contribution */}
          <div className="modal-section">
            <h4>My Contribution</h4>
            <ul>
              {project.contribution.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>

          {/* Results */}
          <div className="modal-section">
            <h4>Results</h4>
            <div className="result-metrics">
              {project.results.map((r) => (
                <div className="metric" key={r.value}>
                  <span className="value">{r.value}</span>
                  <span className="label">{r.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="modal-section">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <Github size={16} /> GitHub <ArrowUpRight size={14} />
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <Play size={14} /> Watch Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal
