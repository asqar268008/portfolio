import certifications from '../data/certifications.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { Certificate, ArrowUpRight } from './icons.jsx'

const Certifications = () => (
  <section className="section" id="certifications">
    <div className="container">
      <SectionHeader
        eyebrow="Certifications"
        title={<>Continuous <span className="grad-text">learning</span></>}
        sub="Professional certifications across AI, cloud, data, and development."
      />

      <div className="certs-grid">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.08}>
            <article className="cert-card">
              <div className="cert-head">
                <div className="cert-icon"><Certificate size={22} /></div>
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-org">{c.org}</div>
                </div>
              </div>
              {(c.date || c.credentialId) && (
                <div className="cert-meta">
                  {c.date && <span className="m">{c.date}</span>}
                  {c.credentialId && <span className="m">ID: {c.credentialId}</span>}
                </div>
              )}
              {c.verifyUrl && (
                <div className="cert-action">
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    View Credential <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default Certifications
