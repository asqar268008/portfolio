import education from '../data/education.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { MapPin, Check } from './icons.jsx'

const Education = () => (
  <section className="section section-alt" id="education">
    <div className="container">
      <SectionHeader
        eyebrow="Education"
        title={<>The <span className="grad-text">foundation</span> behind the work</>}
        sub="Academic training in AI & Data Science, applied through research and real projects."
      />

      <Reveal>
        <div className="card" style={{ padding: '2rem' }}>
          {education.map((e) => (
            <div key={e.degree}>
              <div className="section-eyebrow" style={{ marginBottom: '0.6rem' }}>
                {e.duration}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' }}>{e.degree}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', color: 'var(--text-3)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>{e.institution}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} /> {e.location}
                </span>
              </div>
              <p style={{ color: 'var(--text-2)', lineHeight: '1.8', marginBottom: '1.2rem' }}>{e.specialization}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
                {e.achievements.map((a) => (
                  <span className="impact-chip" key={a}>
                    <Check size={12} style={{ position: 'relative', top: '1px' }} /> {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
)

export default Education
