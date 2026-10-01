import type { Variants } from 'framer-motion'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
})

export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const

export function scrollToId(href: string) {
  const id = href.startsWith('#') ? href.slice(1) : href
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
