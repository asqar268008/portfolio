import achievements from '../data/achievements.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { Award, Trophy, Book, Bolt } from './icons.jsx'

const iconMap = {
  award: Award,
  trophy: Trophy,
  book: Book,
  bolt: Bolt,
}

const Achievements = () => (
  <section className="section" id="achievements">
    <div className="container">
      <SectionHeader
        eyebrow="Achievements"
        title={<>Milestones that <span className="grad-text">back the work</span></>}
        sub="Recognition and milestones across academics, research, and national competitions."
      />

      <div className="achievements-grid">
        {achievements.map((a, i) => {
          const Icon = iconMap[a.icon] || Award
          return (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="achievement-card">
                <div className="achievement-icon"><Icon size={22} /></div>
                <h4>{a.title}</h4>
                <div className="org">{a.org}</div>
                {a.year && <span className="year">{a.year}</span>}
                <p>{a.description}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  </section>
)

export default Achievements
