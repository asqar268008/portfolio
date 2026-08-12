import profile from '../data/profile.js'
import Reveal from './Reveal.jsx'
import { Download, ExternalLink } from './icons.jsx'

const ResumeCTA = () => (
  <section className="resume-cta" id="resume">
    <div className="container">
      <Reveal>
        <h2>
          Interested in my <span className="grad-text">background</span>?
        </h2>
        <p>
          Everything on this site in one clean document — skills, projects, experience, and education.
        </p>
        <div className="cta-actions">
          <a href={profile.resume.pdf} target="_blank" rel="noreferrer" className="btn btn-outline">
            <ExternalLink size={16} /> View Resume
          </a>
          <a href={profile.resume.pdf} download className="btn btn-primary">
            <Download size={16} /> Download Resume
          </a>
        </div>
      </Reveal>
    </div>
  </section>
)

export default ResumeCTA
