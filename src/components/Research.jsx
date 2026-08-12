import publications from '../data/publications.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { ExternalLink, ArrowUpRight } from './icons.jsx'

const Research = () => (
  <section className="section section-alt" id="research">
    <div className="container">
      <SectionHeader
        eyebrow="Research & Publications"
        title={<>Published <span className="grad-text">research</span></>}
        sub="Academic work in applied AI — peer-reviewed and published with CRC Press (Taylor & Francis)."
      />

      <div className="research-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
        {publications.map((pub, i) => (
          <Reveal key={pub.doi} delay={i * 0.1}>
            <article className="research-card">
              <div className="research-area">{pub.area}</div>
              <h3 className="research-title">{pub.title}</h3>
              <div className="research-meta">
                <span className="meta-item"><strong>Venue:</strong> {pub.venue}</span>
                <span className="meta-item"><strong>Year:</strong> {pub.year}</span>
                {pub.authors?.length > 0 && (
                  <span className="meta-item"><strong>Authors:</strong> {pub.authors.join(', ')}</span>
                )}
                <span className="meta-item"><strong>DOI:</strong> {pub.doi}</span>
              </div>
              <p className="research-abstract">{pub.abstract}</p>
              <div className="research-actions">
                <a href={pub.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <ExternalLink size={16} /> Read Publication <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default Research
