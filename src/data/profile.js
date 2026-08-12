// -------------------------------------------------------------
// Personal profile — edit this single file to update your details
// -------------------------------------------------------------

const profile = {
  name: 'Asqar Ali SMS',
  firstName: 'Asqar',
  role: 'AI/ML Engineer',

  // Professional headline shown under the name
  headline:
    'Building intelligent systems with Machine Learning, Deep Learning, NLP, Generative AI, and practical software engineering.',

  // Short 2–3 line professional introduction (hero)
  intro: [
    'AI/ML Engineer focused on turning complex data into intelligent, production-ready systems.',
    'Currently building predictive healthcare, RAG-powered LLM applications, and deep learning solutions.',
  ],

  // Longer summary for the About section
  about: [
    'I am an AI & Data Science undergraduate at Saranathan College of Engineering, passionate about building systems that bridge advanced machine learning research with practical, scalable applications.',
    'My work spans deep learning for medical imaging, RAG-powered LLM systems, and predictive healthcare platforms — all grounded in solving real-world problems with measurable outcomes.',
  ],

  // What I focus on right now (About section)
  focus: [
    'Machine Learning & Deep Learning',
    'LLMs & RAG systems',
    'Predictive healthcare AI',
    'Full-stack AI applications',
  ],

  philosophy:
    'I think deeply about system design, data pipelines, and user impact — bringing both analytical rigor and a product mindset to every project.',

  location: 'Tamil Nadu, India',
  email: 'mdasqar007@gmail.com',

  // Profile photo — drop your photo in /public/ and update this path.
  // Leave null to use the elegant monogram avatar instead.
  photo: 'photos/profile.jpeg', // e.g. 'photos/profile.jpg'
  photoAlt: 'Asqar Ali SMS',

  // Must match the filename in /public exactly — Linux hosts (Netlify, Vercel,
  // GitHub Pages) are case-sensitive even though Windows dev is not.
  resume: {
    pdf: '/Resume.pdf',
  },

  socials: [
    {
      label: 'GitHub',
      handle: 'github.com/asqar268008',
      url: 'https://github.com/asqar268008',
    },
    {
      label: 'LinkedIn',
      handle: 'linkedin.com/in/asqar268008',
      url: 'https://www.linkedin.com/in/asqar268008',
    },
    {
      label: 'Email',
      handle: 'mdasqar007@gmail.com',
      url: 'mailto:mdasqar007@gmail.com',
    },
    {
      label: 'ORCID',
      handle: 'orcid.org',
      url: 'https://orcid.org/0009-0005-8631-4522',
    },
  ],

  // Rotating titles for the hero typewriter
  roles: [
    'AI/ML Engineer',
    'Machine Learning Engineer',
    'Deep Learning Engineer',
    'LLM & RAG Developer',
  ],
}

export default profile
