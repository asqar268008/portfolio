// -------------------------------------------------------------
// Inline SVG icon set — stroke-based, inherits currentColor
// -------------------------------------------------------------

const Svg = ({ children, size = 18, viewBox = '0 0 24 24', ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

export const ArrowRight = (p) => (
  <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
)
export const ArrowUpRight = (p) => (
  <Svg {...p}><path d="M7 17L17 7M8 7h9v9" /></Svg>
)
export const ArrowUp = (p) => (
  <Svg {...p}><path d="M12 19V5M6 11l6-6 6 6" /></Svg>
)
export const Download = (p) => (
  <Svg {...p}><path d="M12 3v12M7 10l5 5 5-5M4 19h16" /></Svg>
)
export const Mail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Svg>
)
export const Github = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.12 10.12 0 0022 12.25C22 6.58 17.52 2 12 2z" />
  </svg>
)
export const Linkedin = (p) => (
  <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5A2.49 2.49 0 112.48 6a2.5 2.5 0 012.5-2.5zM3 8.25h4V21H3zM9.5 8.25h3.8v1.74h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21h-4z" />
  </svg>
)
export const ExternalLink = (p) => (
  <Svg {...p}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6M10 14L21 3" /></Svg>
)
export const Play = (p) => (
  <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
)
export const Pause = (p) => (
  <svg width={p.size || 24} height={p.size || 24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
)
export const Fullscreen = (p) => (
  <Svg {...p}><path d="M4 9V5a1 1 0 011-1h4M15 4h4a1 1 0 011 1v4M20 15v4a1 1 0 01-1 1h-4M9 20H5a1 1 0 01-1-1v-4" /></Svg>
)
export const X = (p) => (
  <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>
)
export const Award = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="5" />
    <path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5" />
  </Svg>
)
export const Trophy = (p) => (
  <Svg {...p}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0z" />
    <path d="M7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3" />
  </Svg>
)
export const Book = (p) => (
  <Svg {...p}>
    <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
    <path d="M8 3v18" />
  </Svg>
)
export const Bolt = (p) => (
  <Svg {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></Svg>
)
export const MapPin = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)
export const Sparkles = (p) => (
  <Svg {...p}>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
    <path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" />
  </Svg>
)
export const Check = (p) => (
  <Svg {...p}><path d="M5 13l4 4L19 7" /></Svg>
)
export const Certificate = (p) => (
  <Svg {...p}>
    <path d="M9 12l2 2 4-4" />
    <path d="M12 3l2 1.6 2.5-.4.9 2.4 2.6.1-.1 2.6 1.7 1.8-1.7 1.8.1 2.6-2.6.1-.9 2.4-2.5-.4L12 21l-2-1.6-2.5.4-.9-2.4-2.6-.1.1-2.6L2.4 13l1.7-1.8-.1-2.6 2.6-.1.9-2.4L10 4.6z" />
  </Svg>
)
export const Code = (p) => (
  <Svg {...p}><path d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" /></Svg>
)
export const Brain = (p) => (
  <Svg {...p}>
    <path d="M12 4a3 3 0 00-3 3v.5A3.5 3.5 0 006.5 11 3.5 3.5 0 009 14.5V15a3 3 0 006 0v-.5a3.5 3.5 0 002.5-3.5 3.5 3.5 0 00-2.5-3.5V7a3 3 0 00-3-3z" />
  </Svg>
)

export const VolumeOn = (p) => (
  <Svg {...p}>
    <path d="M11 5L6.5 9H3v6h3.5L11 19z" />
    <path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
  </Svg>
)
export const VolumeOff = (p) => (
  <Svg {...p}>
    <path d="M11 5L6.5 9H3v6h3.5L11 19z" />
    <path d="M16 9.5l5 5M21 9.5l-5 5" />
  </Svg>
)
export const Alert = (p) => (
  <Svg {...p}>
    <path d="M10.3 3.9L2.4 17.5A1.9 1.9 0 004 20.4h16a1.9 1.9 0 001.6-2.9L13.7 3.9a1.9 1.9 0 00-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </Svg>
)
export const Gear = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5v.2a2 2 0 11-4 0v-.1a1.6 1.6 0 00-1-1.5 1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H3a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z" />
  </Svg>
)
export const Layers = (p) => (
  <Svg {...p}>
    <path d="M12 2.7L2.6 7.5 12 12.3l9.4-4.8z" />
    <path d="M2.6 16.5L12 21.3l9.4-4.8M2.6 12L12 16.8 21.4 12" />
  </Svg>
)

export const brandIcons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
}
