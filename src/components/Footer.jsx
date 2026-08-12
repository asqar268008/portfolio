import profile from '../data/profile.js'
import { brandIcons } from './icons.jsx'

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-name">
        {profile.name} <span className="grad-text">— AI/ML Engineer</span>
      </div>
      <p className="footer-tag">
        Building intelligent systems with Machine Learning, Deep Learning, NLP, and Generative AI.
      </p>
      <nav className="footer-links" aria-label="Footer">
        <a href={profile.socials.find((s) => s.label === 'GitHub')?.url} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.socials.find((s) => s.label === 'LinkedIn')?.url} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.socials.find((s) => s.label === 'ORCID')?.url} target="_blank" rel="noreferrer">ORCID</a>
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.resume.pdf} download>Resume</a>
      </nav>
      <div className="footer-copy">
        © 2026 {profile.name}. All rights reserved. Crafted with <span className="heart" aria-hidden="true">♥</span>
      </div>
    </div>
  </footer>
)

export default Footer
