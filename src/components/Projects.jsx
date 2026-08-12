import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import projects, { PROJECT_FILTERS } from '../data/projects.js'
import SectionHeader from './SectionHeader.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category.includes(filter))

  // Only offer filters that actually match something — a category that returns
  // nothing reads as a broken site to anyone evaluating you.
  const available = PROJECT_FILTERS.map((f) => ({
    ...f,
    count: f.id === 'all' ? projects.length : projects.filter((p) => p.category.includes(f.id)).length,
  })).filter((f) => f.count > 0)

  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title={<>Problems solved, <span className="grad-text">systems built</span></>}
          sub="Each project tackles a real-world challenge with production-grade architecture and measurable outcomes. Open any project for the full story."
        />

        {/* Filters — empty categories are hidden rather than dead-ending */}
        <motion.div
          className="filters"
          role="group"
          aria-label="Filter projects by category"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {available.map((f) => (
            <button
              key={f.id}
              className={`filter-btn${filter === f.id ? ' active' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
