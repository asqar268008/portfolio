import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import skills from '../data/skills.js'
import SectionHeader from './SectionHeader.jsx'

const Skills = () => {
  const [cat, setCat] = useState('all')
  const visible = cat === 'all' ? skills : skills.filter((s) => s.id === cat)

  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <SectionHeader
          eyebrow="Technical Skills"
          title={<>A <span className="grad-text">recruiter-friendly</span> toolkit</>}
          sub="Grouped by specialty so you can quickly see where I work — from classical ML to generative AI and engineering."
        />

        {/* Category filter */}
        <motion.div
          className="filters"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            className={`filter-btn${cat === 'all' ? ' active' : ''}`}
            aria-pressed={cat === 'all'}
            onClick={() => setCat('all')}
          >
            All
          </button>
          {skills.map((s) => (
            <button
              key={s.id}
              className={`filter-btn${cat === s.id ? ' active' : ''}`}
              aria-pressed={cat === s.id}
              onClick={() => setCat(s.id)}
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            className="skills-groups"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {visible.map((group) => (
              <motion.div
                className="card skill-group"
                key={group.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                style={{ padding: '1.6rem' }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text-1)' }}>
                  {group.label}
                </h3>
                <p style={{ color: 'var(--text-3)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {group.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                  {group.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      className="skill-chip"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.3 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Skills
