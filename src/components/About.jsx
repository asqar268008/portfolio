import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import profile from '../data/profile.js'
import skills from '../data/skills.js'
import Reveal from './Reveal.jsx'

// Pick three categories for the interactive tabs
const TAB_MAP = ['deep-learning', 'programming', 'development']

const About = () => {
  const [tab, setTab] = useState(TAB_MAP[0])
  const activeSkill = skills.find((s) => s.id === tab)

  return (
    <section className="section" id="about">
      <div className="container about-grid">
        {/* Left — professional introduction */}
        <div>
          <Reveal>
            <div className="section-header" style={{ marginBottom: '1.6rem' }}>
              <div className="section-eyebrow">About Me</div>
              <h2 className="section-title">
                Engineering <span className="grad-text">Intelligence</span>, delivering real impact
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="about-text">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <div className="about-focus">
              <div className="label">Current focus</div>
              <div className="focus-chips">
                {profile.focus.map((f) => (
                  <span className="tag" key={f}>{f}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="about-philosophy">{profile.philosophy}</div>
          </Reveal>
        </div>

        {/* Right — interactive skill tabs */}
        <Reveal delay={0.15} x={30}>
          <div className="card skill-tabs-card" style={{ padding: '1.8rem' }}>
            <div className="skill-tabs" role="tablist" aria-label="Skill categories">
              {TAB_MAP.map((id) => {
                const s = skills.find((x) => x.id === id)
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={tab === id}
                    className={`skill-tab${tab === id ? ' active' : ''}`}
                    onClick={() => setTab(id)}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                className="skill-tab-panel"
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4>{activeSkill.label}</h4>
                <p className="desc">{activeSkill.description}</p>
                <div className="skill-tab-chips">
                  {activeSkill.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      className="skill-chip"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
