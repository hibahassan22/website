import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

type Props = { to: number; prefix?: string; suffix?: string; duration?: number; className?: string }

export function Counter({ to, prefix = '', suffix = '', duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) { el.textContent = `${prefix}${to}${suffix}`; return }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => { el.textContent = `${prefix}${Math.round(v)}${suffix}` },
    })
    return () => controls.stop()
  }, [inView, to, prefix, suffix, duration, reduce])

  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>
}
