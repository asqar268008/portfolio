import Reveal from './Reveal.jsx'

const SectionHeader = ({ eyebrow, title, sub, center = false }) => (
  <Reveal className={`section-header${center ? ' center' : ''}`}>
    <div className="section-eyebrow">{eyebrow}</div>
    <h2 className="section-title">{title}</h2>
    {sub && <p className="section-sub">{sub}</p>}
  </Reveal>
)

export default SectionHeader
