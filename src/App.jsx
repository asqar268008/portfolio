import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import FeaturedProject from './components/FeaturedProject.jsx'
import Experience from './components/Experience.jsx'
import Education from './components/Education.jsx'
import Achievements from './components/Achievements.jsx'
import Research from './components/Research.jsx'
import Certifications from './components/Certifications.jsx'
import Skills from './components/Skills.jsx'
import ResumeCTA from './components/ResumeCTA.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import CursorGlow from './components/CursorGlow.jsx'

const App = () => (
  <MotionConfig reducedMotion="user">
    <a href="#home" className="skip-link">Skip to content</a>
    <CursorGlow />
    <Navbar />

    <main id="main">
      <Hero />
      <About />
      <Projects />
      <FeaturedProject />
      <Experience />
      <Education />
      <Achievements />
      <Research />
      <Certifications />
      <Skills />
      <ResumeCTA />
      <Contact />
    </main>

    <Footer />
    <BackToTop />
  </MotionConfig>
)

export default App
