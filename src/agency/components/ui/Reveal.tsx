import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT, VIEWPORT, fadeUp, stagger } from '../../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'span' | 'p'
}

export function Reveal({ children, className, delay = 0, y = 24, as = 'div' }: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  )
}

export function RevealGroup({
  children, className, gap = 0.08, delay = 0,
}: { children: ReactNode; className?: string; gap?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={fadeUp}>{children}</motion.div>
}

/** Word-by-word masked reveal. Keeps words intact so Arabic letter joining is preserved. */
export function SplitWords({
  text, className, wordClassName, delay = 0, inView = true,
}: { text: string; className?: string; wordClassName?: string; delay?: number; inView?: boolean }) {
  const words = text.split(' ')
  const animateProps = inView
    ? { whileInView: 'show' as const, viewport: VIEWPORT }
    : { animate: 'show' as const }
  return (
    <motion.span
      className={className}
      variants={stagger(0.07, delay)}
      initial="hidden"
      {...animateProps}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pt-[0.08em] -mt-[0.08em] pb-[0.32em] -mb-[0.32em]">
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            variants={{
              hidden: { y: '110%' },
              show:   { y: '0%', transition: { duration: 0.9, ease: EASE_OUT } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.span>
  )
}
