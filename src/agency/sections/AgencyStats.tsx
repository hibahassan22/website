import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 50,  suffix: '+',  label: 'Projects Delivered',   color: '#00d4ff' },
  { value: 40,  suffix: '+',  label: 'Happy Clients',        color: '#7c3aed' },
  { value: 3,   suffix: '+',  label: 'Years Experience',     color: '#06ffa5' },
  { value: 8,   suffix: '',   label: 'Core Services',        color: '#f472b6' },
  { value: 98,  suffix: '%',  label: 'Client Satisfaction',  color: '#f59e0b' },
  { value: 24,  suffix: '/7', label: 'Support Available',    color: '#34d399' },
]

function Counter({ value, suffix, color, inView }: { value: number; suffix: string; color: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, value)
      setCount(Math.floor(current))
      if (current >= value) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span style={{ color }}>
      {count}{suffix}
    </span>
  )
}

export default function AgencyStats() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative overflow-hidden py-24 px-6"
      ref={ref}
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)
          `,
        }}
      />

      <div className="ag-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="ag-badge mx-auto" style={{ width: 'fit-content' }}>By The Numbers</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
            Numbers that{' '}
            <span className="ag-grad">tell the story.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="ag-card p-6 flex flex-col items-center text-center gap-2"
            >
              <div className="text-4xl md:text-5xl font-black tabular-nums">
                <Counter value={s.value} suffix={s.suffix} color={s.color} inView={inView} />
              </div>
              <p className="text-xs leading-tight" style={{ color: 'var(--color-muted)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
