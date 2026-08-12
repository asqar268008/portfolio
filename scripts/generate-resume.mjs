// Generates a minimal, valid public/Resume.pdf placeholder from profile data,
// so the "Download Resume" button works before a real resume exists.
// Run:  npm run resume
//
// Safety: this REFUSES to overwrite an existing Resume.pdf. The site links to
// that exact file, so a silent overwrite would replace a real resume with this
// bare-bones placeholder. Pass --force if that is genuinely what you want.
import { writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'public', 'Resume.pdf')

if (existsSync(out) && !process.argv.includes('--force')) {
  console.log('public/Resume.pdf already exists — leaving it untouched.')
  console.log('Run "npm run resume -- --force" to replace it with the placeholder.')
  process.exit(0)
}

// ---- Resume content (plain ASCII so the PDF stays simple) ----
// Each line: [x, y, font-size, 'B'|'G' (bold|regular), text]
const L = (x, y, size, weight, text) => ({ x, y, size, weight, text })
const layout = [
  L(48, 740, 22, 'B', 'Asqar Ali SMS'),
  L(48, 720, 12, 'B', 'AI/ML Engineer'),
  L(48, 706, 9, 'G', 'mdasqar007@gmail.com  |  Tamil Nadu, India  |  github.com/asqar268008  |  linkedin.com/in/asqar268008'),

  L(48, 674, 12, 'B', 'SUMMARY'),
  L(48, 656, 10, 'G', 'AI/ML Engineer building intelligent systems with Machine Learning, Deep'),
  L(48, 644, 10, 'G', 'Learning, NLP, Generative AI, and practical software engineering.'),

  L(48, 614, 12, 'B', 'TECHNICAL SKILLS'),
  L(48, 596, 10, 'G', 'Programming:  Python, Java, JavaScript, SQL'),
  L(48, 582, 10, 'G', 'Machine Learning:  Scikit-learn, feature engineering, model evaluation'),
  L(48, 568, 10, 'G', 'Deep Learning:  PyTorch, TensorFlow, CNN, RNN, LSTM, Transformers'),
  L(48, 554, 10, 'G', 'NLP / GenAI:  NLP, embeddings, Transformers, LLMs, RAG, prompt engineering'),
  L(48, 540, 10, 'G', 'Vision:  Image processing, object detection, depth estimation'),
  L(48, 526, 10, 'G', 'Engineering:  Git, GitHub, REST APIs, Django, Docker, Streamlit, Power BI'),

  L(48, 496, 12, 'B', 'EXPERIENCE'),
  L(48, 478, 10, 'B', 'Data Analytics Intern - VDart   (Jul 2025 - Aug 2025)'),
  L(56, 464, 10, 'G', '- Analyzed business datasets in Excel/Power BI to surface actionable KPIs'),
  L(56, 452, 10, 'G', '- Designed interactive dashboards improving data visibility for stakeholders'),
  L(56, 440, 10, 'G', '- Performed data cleaning, transformation and trend analysis'),

  L(48, 410, 12, 'B', 'PROJECTS'),
  L(48, 392, 10, 'B', 'MedForecast - disease predictive healthcare platform (Published, CRC Press 2026)'),
  L(48, 378, 10, 'G', 'Brain Tumor Prediction - CNN for 4-class MRI classification (PyTorch)'),
  L(48, 366, 10, 'G', 'FloatChat AI - RAG-powered LLM system over oceanographic data (LangChain)'),
  L(48, 354, 10, 'G', 'HealthAgent - LLM agent delivering real-time personalized health guidance'),

  L(48, 324, 12, 'B', 'EDUCATION'),
  L(48, 306, 10, 'B', 'B.Tech - Artificial Intelligence & Data Science'),
  L(48, 294, 10, 'G', 'Saranathan College of Engineering, Tamil Nadu   (2023 - 2027)'),

  L(48, 264, 12, 'B', 'ACHIEVEMENTS & RESEARCH'),
  L(56, 246, 10, 'G', '- NMMS Scholarship holder (Govt. of India)'),
  L(56, 234, 10, 'G', '- 2nd Prize - National Level Research Conclave 2025, PSG College of Technology'),
  L(56, 222, 10, 'G', '- Published AI/ML research chapter, CRC Press (Taylor & Francis), 2026'),
  L(56, 210, 10, 'G', '- Smart India Hackathon participant'),
  L(56, 198, 10, 'G', '- 6+ professional certifications (Azure AI, NPTEL, Power BI, Java)'),
]

// ---- PDF builders ----
const escapeT = (t) => t.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

let content = ''
for (const { x, y, size, weight, text } of layout) {
  const font = weight === 'B' ? '/F2' : '/F1'
  content += `BT ${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapeT(text)}) Tj ET\n`
}

const contentStream = `stream\n${content}endstream`

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>',
  `<< /Length ${Buffer.byteLength(contentStream)} >>\n${contentStream}`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
]

let pdf = '%PDF-1.4\n'
const offsets = [0]
objects.forEach((obj, i) => {
  offsets.push(Buffer.byteLength(pdf))
  pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`
})
const xrefStart = Buffer.byteLength(pdf)
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

writeFileSync(out, pdf, 'binary')
console.log(`Generated ${out} (${Buffer.byteLength(pdf)} bytes)`)
