import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import projects from '../data/projects.js'
import VideoPlayer from './VideoPlayer.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { Github, ArrowUpRight, Sparkles, Alert, Gear, Layers, Trophy } from './icons.jsx'

// The featured highlight — MedForecast (published research)
const featured = projects.find((p) => p.id === 'medforecast') || projects[0]

const STEPS = [
  {
    num: '01',
    title: 'The Problem',
    body: 'Diseases like diabetes and cardiovascular conditions often go undetected until symptoms appear. Routine blood-test data carries early risk signals that go unread — patients and clinicians lack a tool that turns those numbers into preventive action.',
    icon: 'problem',
  },
  {
    num: '02',
    title: 'The Approach',
    body: 'I built supervised machine-learning models over structured patient blood-test datasets, trained and validated for predictive accuracy, then wrapped them in a scalable Django backend with a real-time prediction API and a clean web interface.',
    icon: 'approach',
  },
  {
    num: '03',
    title: 'The Architecture',
    body: 'A five-stage pipeline: data ingestion → clinical feature engineering → model training → real-time prediction API → responsive web dashboard for personalized recommendations.',
    icon: 'architecture',
  },
  {
    num: '04',
    title: 'The Innovation',
    body: 'Predictive healthcare made accessible — disease-risk forecasting and personalized recommendations delivered through a web platform, designed for preventive rather than reactive medicine.',
    icon: 'innovation',
  },
  {
    num: '05',
    title: 'The Results',
    body: 'Published as a research chapter with CRC Press (Taylor & Francis), 2026. Demonstrated early risk detection with a scalable, real-time backend — recognized with a 2nd-prize national research award.',
    icon: 'results',
  },
]

const stepIcons = {
  problem: Alert,
  approach: Gear,
  architecture: Layers,
  innovation: Sparkles,
  results: Trophy,
}

const FeaturedProject = () => (
  <section className="section featured" id="featured">
    <div className="container">
      <SectionHeader
        eyebrow="Featured Project"
        title={<>MedForecast — <span className="grad-text">published healthcare AI</span></>}
        sub="A 20-second story: how a web-based ML platform turns blood-test data into early, personalized disease-risk predictions."
      />

      <div className="featured-grid">
        {/* Left — sticky visuals */}
        <div className="featured-visual">
          <Reveal>
            <VideoPlayer
              src={featured.demoVideo}
              gradient={featured.gradient}
              label="MedForecast demo"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="section-eyebrow" style={{ marginBottom: '0.8rem' }}>
                AI Pipeline at a glance
              </div>
              <div className="pipeline">
                {featured.architecture.map((a) => (
                  <div className="pipeline-step" key={a.step}>
                    <span className="num">{a.step}</span>
                    <div className="txt">
                      <strong>{a.title}</strong>
                      <span>{a.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="featured-cta">
                <a href={featured.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <Github size={16} /> GitHub
                </a>
                <a href="https://doi.org/10.1201/9781003770435-2" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Read the Paper <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — storytelling steps */}
        <div className="featured-steps">
          {STEPS.map((s) => (
            <StepCard key={s.num} step={s} />
          ))}
        </div>
      </div>
    </div>
  </section>
)

const StepCard = ({ step }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.55 })
  const StepIcon = stepIcons[step.icon]

  return (
    <motion.div
      ref={ref}
      className={`featured-step${inView ? ' active' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="step-num">
        <StepIcon size={15} /> {step.num}
      </div>
      <h4>{step.title}</h4>
      <p>{step.body}</p>
    </motion.div>
  )
}

export default FeaturedProject
