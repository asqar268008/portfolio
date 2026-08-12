import { motion } from 'framer-motion'

// Lightweight scroll-reveal wrapper using framer-motion.
// whileInView fires once when the element enters the viewport.
const Reveal = ({
  children,
  delay = 0,
  y = 28,
  x = 0,
  once = true,
  duration = 0.6,
  className = '',
  as = 'div',
}) => {
  const Comp = motion[as]
  return (
    <Comp
      className={`reveal-up ${className}`}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  )
}

export default Reveal
