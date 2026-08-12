import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import profile from '../data/profile.js'

// Primary nav — kept short so a recruiter can scan it in one pass.
// Education, Achievements and Certifications remain on the page and are
// reachable by scrolling; they're listed in the mobile menu below.
const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

// Full list for the mobile drawer and scroll-spy, so every section is covered.
const ALL_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'featured', label: 'Case Study' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'research', label: 'Research' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

// Sections that have no nav entry of their own highlight a related one.
const SECTION_PARENT = {
  featured: 'projects',
  education: 'experience',
  achievements: 'research',
  certifications: 'skills',
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      // Active section detection across every section on the page
      const pos = window.scrollY + 160
      let current = 'home'
      ALL_SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) current = id
      })
      // Handle end of page (contact)
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 40) {
        current = 'contact'
      }
      // Sections without their own nav entry highlight their closest parent
      setActive(SECTION_PARENT[current] || current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <nav aria-label="Primary">
            <ul className="nav-links">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`nav-link${active === l.id ? ' active' : ''}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <a href={profile.resume.pdf} className="nav-cta" download>
              Resume
            </a>
            <button
              className={`hamburger${open ? ' open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {ALL_SECTIONS.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={close}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={profile.resume.pdf}
              className="btn btn-primary"
              download
              onClick={close}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              Download Resume
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
