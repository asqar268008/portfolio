import { useState } from 'react'
import profile from '../data/profile.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { Github, Linkedin, Mail, Sparkles, MapPin, Check } from './icons.jsx'

const contactIcon = (label) => {
  if (label === 'GitHub') return <Github size={19} />
  if (label === 'LinkedIn') return <Linkedin size={19} />
  if (label === 'Email') return <Mail size={19} />
  return <Sparkles size={19} />
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'handoff' | 'error' | null
  const [copied, setCopied] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim()) e.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.message.trim()) e.message = 'Please enter a message.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) {
      setStatus('error')
      return
    }
    // No backend/API keys exposed — compose a mailto link so the message
    // opens in the visitor's email client pre-filled. Replace with your
    // own form service (Formspree etc.) when you have one.
    const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    // Not "sent" — the visitor still has to press send in their mail client,
    // and plenty of machines have no mail client wired up at all.
    setStatus('handoff')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left — info */}
          <div>
            <SectionHeader
              eyebrow="Contact"
              title={<>Let's build something <span className="grad-text">intelligent</span> together</>}
              sub="Open to internships, full-time roles, research collaborations, and interesting AI/ML projects. Let's talk."
            />

            <Reveal delay={0.1}>
              <div className="contact-list">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="contact-item"
                  >
                    <span className="c-icon">{contactIcon(s.label)}</span>
                    <span>
                      <span className="c-label">{s.label}</span>
                      <br />
                      <span className="c-value">{s.handle}</span>
                    </span>
                  </a>
                ))}
                <div className="contact-item" style={{ cursor: 'default' }}>
                  <span className="c-icon"><MapPin size={19} /></span>
                  <span>
                    <span className="c-label">Location</span>
                    <br />
                    <span className="c-value">{profile.location}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.15} x={30}>
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <h3>Send a message</h3>

              <div className={`form-group${errors.name ? ' error' : ''}`}>
                <label htmlFor="c-name">Name <span className="req" aria-hidden="true">*</span></label>
                <input
                  id="c-name"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange('name')}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className={`form-group${errors.email ? ' error' : ''}`}>
                <label htmlFor="c-email">Email <span className="req" aria-hidden="true">*</span></label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="c-subject">Subject</label>
                <input
                  id="c-subject"
                  type="text"
                  placeholder="Internship / Collaboration / Question"
                  value={form.subject}
                  onChange={handleChange('subject')}
                />
              </div>

              <div className={`form-group${errors.message ? ' error' : ''}`}>
                <label htmlFor="c-message">Message <span className="req" aria-hidden="true">*</span></label>
                <textarea
                  id="c-message"
                  placeholder="Tell me about the opportunity or project..."
                  value={form.message}
                  onChange={handleChange('message')}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Send Message
              </button>

              <div
                className={`form-status ${status || ''}`}
                role="status"
                aria-live="polite"
              >
                {status === 'handoff'
                  ? 'Your email app should now be open with the message ready — press send there to deliver it.'
                  : status === 'error'
                    ? 'Please fix the highlighted fields and try again.'
                    : ''}
              </div>

              <div className="form-alt">
                <span>Email app didn't open? Write to me directly:</span>
                <div className="form-alt-actions">
                  <a href={`mailto:${profile.email}`} className="form-alt-mail">
                    {profile.email}
                  </a>
                  <button type="button" className="copy-btn" onClick={copyEmail}>
                    {copied ? <><Check size={14} /> Copied</> : 'Copy'}
                  </button>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
