# Asqar Ali SMS — AI/ML Engineer Portfolio

A premium, professional, interactive portfolio built with **React + Vite** and **Framer Motion**.
Optimized for recruiters, interviewers, and clients.

## ✨ Features

- Neural-network particle background + animated hero with typewriter roles
- Interactive project grid with **category filtering** and a full **project modal** (problem, approach, architecture, tech, contribution, results)
- Playable **demo video player** (play/pause, progress, fullscreen, poster)
- **Featured Project** storytelling section — MedForecast (published healthcare AI)
- Animated vertical **timeline** (experience + education), achievements, research, certifications
- Comprehensive recruiter-friendly **skills** section with category filtering
- Validated **contact form**, resume CTA, sticky nav with active-section highlighting
- Scroll-reveal animations, magnetic buttons, cursor glow, counters
- SEO meta + JSON-LD structured data
- Accessibility: skip link, focus states, semantic HTML, `prefers-reduced-motion` support
- Fully responsive (desktop / tablet / mobile)

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev
# → open http://localhost:5173

# 3. Production build
npm run build

# 4. Preview the production build locally
npm run preview
```

## 🖼️ Set your profile photo

1. Drop your photo in the `public/` folder, e.g. `public/photos/profile.jpg`
2. Open `src/data/profile.js`
3. Change the `photo` field:

```js
photo: 'photos/profile.jpg',   // path relative to /public
photoAlt: 'Asqar Ali SMS',
```

Until you add a photo, the site shows an elegant **"AA" monogram avatar**.

## 🎥 Add project demo videos

1. Create short H.264 `.mp4` files (keep < 60s, ~720p) in `public/videos/`
2. The data already expects: `medforecast.mp4`, `brain-tumor.mp4`, `floatchat-ai.mp4`, `healthagent.mp4`
3. Until a video exists, the player shows a poster with an "add your demo" note.

## 📄 Resume

- `public/resume.pdf` is a generated placeholder. **Replace it with your real resume PDF** (keep the filename) and the "View / Download Resume" buttons work.
- Regenerate the placeholder with `npm run resume`.

## ✏️ Edit content

All content lives in `src/data/` — no need to touch components:

| File | What it controls |
| --- | --- |
| `profile.js` | Name, role, headline, intro, photo, socials, stats, resume links |
| `projects.js` | Project cards + modal details + filters |
| `skills.js` | Skill categories |
| `experience.js` | Experience timeline |
| `education.js` | Education card |
| `achievements.js` | Achievement cards |
| `publications.js` | Research / publications |
| `certifications.js` | Certification grid |

Styling: `src/styles/global.css` (design tokens: colors, fonts, radii, spacing).
Components: `src/components/`.

## 📦 Deploy

Any static host works — upload the `dist/` folder after `npm run build`:

- **GitHub Pages / Netlify / Vercel:** connect the repo; build command `npm run build`, output `dist`.

## 🔧 Project structure

```
public/            static assets (favicon, resume, videos, photos)
scripts/           generate-resume.mjs → public/resume.pdf
src/
  App.jsx          section wiring
  main.jsx         React entry
  data/            all site content
  components/      Navbar, Hero, About, Projects, ProjectModal,
                   FeaturedProject, Experience, Education, Achievements,
                   Research, Certifications, Skills, ResumeCTA, Contact,
                   Footer, VideoPlayer, ParticleCanvas, Reveal, Magnetic, ...
  styles/global.css
```

© 2026 Asqar Ali SMS. All rights reserved.
