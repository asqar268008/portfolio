import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import profile from '../data/profile.js'
import ParticleCanvas from './ParticleCanvas.jsx'
import Magnetic from './Magnetic.jsx'
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Book, Trophy } from './icons.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const Typewriter = () => {
  const [text, setText] = useState('')
  useEffect(() => {
    let i = 0
    let word = 0
    let deleting = false
    let timer
    const tick = () => {
      const current = profile.roles[word]
      if (!deleting) {
        i++
        setText(current.slice(0, i))
        if (i === current.length) {
          deleting = true
          timer = setTimeout(tick, 1900)
          return
        }
        timer = setTimeout(tick, 60)
      } else {
        i--
        setText(current.slice(0, i))
        if (i === 0) {
          deleting = false
          word = (word + 1) % profile.roles.length
        }
        timer = setTimeout(tick, 30)
      }
    }
    timer = setTimeout(tick, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <p className="hero-role-line" aria-label={profile.role}>
      <span>{text}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  )
}

const socialIcon = (label) => {
  if (label === 'GitHub') return <Github size={18} />
  if (label === 'LinkedIn') return <Linkedin size={18} />
  if (label === 'Email') return <Mail size={18} />
  return <Sparkles size={18} />
}

const Hero = () => {
  const socials = profile.socials

  return (
    <section className="hero" id="home">
      <div className="hero-grid-line" aria-hidden="true" />
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />
      <ParticleCanvas />

      <div className="container hero-inner">
        {/* Left — text */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="hero-eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            Available for opportunities
          </motion.div>

          <motion.h1 variants={item} className="hero-title">
            {profile.name.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="grad-text">{profile.name.split(' ').slice(2).join(' ')}</span>
          </motion.h1>

          <motion.div variants={item}><Typewriter /></motion.div>

          <motion.p variants={item} className="hero-headline">
            {profile.headline}
          </motion.p>

          <motion.p variants={item} className="hero-intro">
            {profile.intro.join(' ')}
          </motion.p>

          <motion.div variants={item} className="hero-ctas">
            <Magnetic><a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={16} />
            </a></Magnetic>
            <Magnetic><a href={profile.resume.pdf} className="btn btn-outline" download>
              <Download size={16} /> Download Resume
            </a></Magnetic>
            <Magnetic><a href={`mailto:${profile.email}`} className="btn btn-ghost">
              Contact Me
            </a></Magnetic>
          </motion.div>

          <motion.div variants={item} className="hero-socials">
            {socials.map((s, i) => (
              <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                {i > 0 && <span className="sep" aria-hidden="true" />}
                <a href={s.url} target="_blank" rel="noreferrer" className="icon-btn" aria-label={s.label}>
                  {socialIcon(s.label)}
                </a>
              </span>
            ))}
          </motion.div>

          {/* Credibility line — verifiable facts, not padded counters */}
          <motion.div variants={item} className="hero-credibility">
            <span><Book size={15} /> Published — CRC Press (Taylor &amp; Francis), 2026</span>
            <span className="cred-sep" aria-hidden="true" />
            <span><Trophy size={15} /> 2nd Prize — National Research Conclave, 2025</span>
          </motion.div>
        </motion.div>

        {/* Right — avatar */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          <div className="avatar-wrap">
            <div className="avatar-ring" aria-hidden="true" />
            <div className="avatar-inner">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.photoAlt} loading="eager" />
              ) : (
                <span className="avatar-mono" aria-hidden="true">AA</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        Scroll
        <span className="line" />
      </div>
    </section>
  )
}

export default Hero
