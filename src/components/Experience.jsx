import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import experience from '../data/experience.js'
import SectionHeader from './SectionHeader.jsx'
import { MapPin } from './icons.jsx'

const Experience = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.55'],
  })
  // Spring for a smooth line fill
  const lineScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeader
          eyebrow="Experience"
          title={<>Where I've <span className="grad-text">applied</span> data to real decisions</>}
          sub="Professional exposure building analytics dashboards and turning business data into actionable insights."
        />

        <div className="timeline" ref={ref}>
          {/* gradient fill line */}
          <motion.div
            className="timeline-fill"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />
          {experience.map((job) => (
            <div className="timeline-item" key={`${job.org}-${job.position}`}>
              <span className="timeline-dot" aria-hidden="true" />
              <motion.div
                className="timeline-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="timeline-org">{job.org}</div>
                <div className="timeline-position">{job.position}</div>
                <div className="timeline-meta">
                  <span>{job.duration}</span>
                  <span className="dot-sep" aria-hidden="true" />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} /> {job.location}
                  </span>
                </div>

                <div className="timeline-body">
                  <ul>
                    {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </div>

                <div className="timeline-tech">
                  {job.technologies.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>

                {job.achievements?.map((a) => (
                  <div className="timeline-note" key={a}>✓ {a}</div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
