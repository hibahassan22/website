import { useEffect, useRef, useState } from 'react'
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import heroBg from '../../assets/imgi_90_WhatsApp-Image-2026-08-18-at-4.33.07-PM.jpg'

/* ── Word cycler ── */
const words = ['نطوّر', 'ننفّذ', 'نسوّق', 'نبدع', 'نبتكر']

function WordCycler() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-block overflow-hidden" style={{ verticalAlign: 'bottom', minWidth: 120 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0,   opacity: 1, filter: 'blur(0px)' }}
          exit={{   y: -60,  opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
          style={{
            background: 'linear-gradient(135deg,#c9a84c 0%,#e8c97a 45%,#fff7e0 65%,#c9a84c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ── Animated counter ── */
function AnimCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let cur = 0
    const step = () => {
      cur += Math.ceil(to / 45)
      if (cur >= to) { setVal(to); return }
      setVal(cur); requestAnimationFrame(step)
    }
    const t = setTimeout(() => requestAnimationFrame(step), 900)
    return () => clearTimeout(t)
  }, [to])
  return <>{val}{suffix}</>
}

/* ── Custom cursor ── */
function CursorOrbit({ mx, my }: {
  mx: import('framer-motion').MotionValue<number>
  my: import('framer-motion').MotionValue<number>
}) {
  const ox = useSpring(mx, { stiffness: 110, damping: 18 })
  const oy = useSpring(my, { stiffness: 110, damping: 18 })
  const ix = useSpring(mx, { stiffness: 220, damping: 16 })
  const iy = useSpring(my, { stiffness: 220, damping: 16 })
  return (
    <>
      <motion.div className="fixed pointer-events-none z-[9999] top-0 left-0 rounded-full"
        style={{
          x: ox, y: oy, translateX: '-50%', translateY: '-50%',
          width: 44, height: 44,
          border: '1.5px solid rgba(201,168,76,0.8)',
          boxShadow: '0 0 18px rgba(201,168,76,0.35)',
        }}
      >
        <motion.div className="absolute inset-0 rounded-full"
          style={{ border: '1px dashed rgba(201,168,76,0.4)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      <motion.div className="fixed pointer-events-none z-[9999] top-0 left-0 rounded-full"
        style={{
          x: ix, y: iy, translateX: '-50%', translateY: '-50%',
          width: 7, height: 7,
          background: '#e8c97a',
          boxShadow: '0 0 14px rgba(232,201,122,1)',
        }}
      />
    </>
  )
}

/* ── Particle ── */
function Particle({ x, y, size, dur, delay, color }: {
  x: number; y: number; size: number; dur: number; delay: number; color: string
}) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [0, -35, 0], opacity: [0, 1, 0], scale: [0.3, 1, 0.3] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ── Energy line ── */
function EnergyLine({ y, delay, dur }: { y: number; delay: number; dur: number }) {
  return (
    <motion.div className="absolute pointer-events-none h-px inset-x-0"
      style={{
        top: `${y}%`,
        background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.55),rgba(232,201,122,0.9),rgba(201,168,76,0.55),transparent)',
        boxShadow: '0 0 10px rgba(201,168,76,0.4)',
      }}
      initial={{ scaleX: 0, opacity: 0, originX: 0 }}
      animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 0.7, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 2, ease: 'easeInOut' }}
    />
  )
}

/* ── Scan line ── */
function ScanLine() {
  return (
    <motion.div className="absolute inset-x-0 h-px pointer-events-none"
      style={{
        background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)',
        boxShadow: '0 0 12px rgba(201,168,76,0.3)',
      }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
    />
  )
}

/* ── Corner deco ── */
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const map = {
    tl: 'top-5 left-5 border-t-2 border-l-2',
    tr: 'top-5 right-5 border-t-2 border-r-2',
    bl: 'bottom-14 left-5 border-b-2 border-l-2',
    br: 'bottom-14 right-5 border-b-2 border-r-2',
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute w-8 h-8 pointer-events-none ${map[pos]}`}
      style={{ borderColor: 'rgba(201,168,76,0.5)' }}
    />
  )
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export default function AgencyHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gx = useMotionValue(0)
  const gy = useMotionValue(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 28, damping: 20 })
  const sy = useSpring(my, { stiffness: 28, damping: 20 })
  const imgX = useTransform(sx, [-600, 600], [-22, 22])
  const imgY = useTransform(sy, [-400, 400], [-12, 12])
  const glowX = useTransform(sx, [-600, 600], ['38%', '62%'])
  const glowY = useTransform(sy, [-400, 400], ['38%', '62%'])

  useEffect(() => {
    const move = (e: MouseEvent) => { gx.set(e.clientX); gy.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [gx, gy])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }

  const particles = Array.from({ length: 55 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 3,
    dur: 3 + Math.random() * 5,
    delay: Math.random() * 6,
    color: i % 4 === 0 ? 'rgba(201,168,76,0.9)'
         : i % 4 === 1 ? 'rgba(232,201,122,0.55)'
         : i % 4 === 2 ? 'rgba(255,247,200,0.35)'
         :                'rgba(255,255,255,0.18)',
  }))

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
  }
  const item = {
    hidden: { opacity: 0, y: 44, filter: 'blur(8px)' },
    show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <>
      <CursorOrbit mx={gx} my={gy} />

      <section
        id="hero"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* BG parallax */}
        <motion.div style={{ x: imgX, y: imgY }} className="absolute inset-[-6%] -z-30">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Main overlay */}
        <div className="absolute inset-0 -z-20"
          style={{ background: 'linear-gradient(to bottom, rgba(3,5,14,0.82) 0%, rgba(3,5,14,0.72) 50%, rgba(3,5,14,0.92) 100%)' }}
        />
        {/* Center spotlight */}
        <motion.div className="absolute inset-0 -z-20 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gxv, gyv]) => `radial-gradient(ellipse 55% 55% at ${gxv} ${gyv}, rgba(201,168,76,0.16) 0%, transparent 65%)`
            ),
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 -z-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 40%, rgba(2,4,12,0.75) 100%)' }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-52 -z-20"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
        />

        {/* Particles */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {particles.map((p, i) => <Particle key={i} {...p} />)}
        </div>

        {/* Energy lines */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {[15, 30, 48, 63, 78, 90].map((y, i) => (
            <EnergyLine key={i} y={y} delay={i * 1.1} dur={2.4 + i * 0.3} />
          ))}
        </div>

        {/* Scan line */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
          <ScanLine />
        </div>

        {/* Pulsing rings */}
        {[0, 0.9, 1.8].map((delay, i) => (
          <motion.div key={i} className="absolute pointer-events-none rounded-full -z-10"
            style={{
              left: '50%', top: '50%',
              width: 200 + i * 160, height: 200 + i * 160,
              border: '1px solid rgba(201,168,76,0.12)',
              translateX: '-50%', translateY: '-50%',
            }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Corners */}
        <Corner pos="tl" /><Corner pos="tr" />
        <Corner pos="bl" /><Corner pos="br" />

        {/* ══ CONTENT ══ */}
        <div className="ag-inner w-full px-6 pt-28 pb-24 relative z-10 flex justify-center">
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="w-full max-w-3xl text-center"
          >

            {/* Badge */}
            <motion.div variants={item} className="flex justify-center mb-8">
              <motion.span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.35)',
                  color: '#e8c97a',
                }}
                whileHover={{ scale: 1.06, background: 'rgba(201,168,76,0.18)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#c9a84c' }}
                  animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                وكالة رقمية متخصصة · منذ ٢٠٢٢
              </motion.span>
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={item}
              className="font-black leading-[1.2] mb-6"
              style={{ color: '#f5f0e8', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
            >
              حوّل أفكارك إلى{' '}
              <motion.span
                style={{
                  background: 'linear-gradient(135deg,#c9a84c 0%,#e8c97a 40%,#fff7e0 60%,#c9a84c 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                واقع رقمي
              </motion.span>
            </motion.h1>

            {/* Word cycler line */}
            <motion.div variants={item}
              className="flex items-center justify-center gap-3 mb-5"
              style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 700, color: '#f5f0e8' }}
            >
              <WordCycler />
              <span style={{ color: 'rgba(245,240,232,0.5)' }}>لدعم نمو أعمالك</span>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={item}
              className="mb-10 tracking-[0.22em] text-sm md:text-base"
              style={{ color: 'rgba(245,240,232,0.38)' }}
            >
              تطوير أعمال &nbsp;·&nbsp; برمجة &nbsp;·&nbsp; تسويق
            </motion.p>

            {/* Divider line */}
            <motion.div variants={item} className="flex justify-center mb-10">
              <motion.div
                className="h-px w-32"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)' }}
                animate={{ scaleX: [0.5, 1.3, 0.5], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Bullets */}
            <motion.div variants={item} className="flex flex-col items-center gap-3 mb-10">
              {[
                'تسليم المشاريع في الوقت المحدد دائماً',
                'دعم فني متكامل ٢٤ ساعة طوال العام',
                'فريق متخصص في البرمجة والتسويق الرقمي',
              ].map((t, i) => (
                <motion.div key={t}
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
                  className="flex items-center justify-center gap-2.5"
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.3 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#c9a84c' }} />
                  </motion.div>
                  <span className="text-sm md:text-base" style={{ color: 'rgba(245,240,232,0.62)' }}>{t}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mb-16">
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg,#c9a84c 0%,#e8c97a 50%,#a07830 100%)',
                  boxShadow: '0 0 48px rgba(201,168,76,0.45), 0 4px 24px rgba(0,0,0,0.4)',
                }}
                whileHover={{ scale: 1.07, boxShadow: '0 0 80px rgba(201,168,76,0.65), 0 8px 32px rgba(0,0,0,0.5)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              >
                {/* Shimmer */}
                <motion.span className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.3) 50%,transparent 65%)' }}
                  animate={{ x: ['-130%', '240%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                />
                <span className="relative">ابدأ مشروعك التقني</span>
                <ArrowLeft className="w-4 h-4 relative transition-transform group-hover:-translate-x-1.5" />
              </motion.a>

              <motion.a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-xl text-base font-semibold"
                style={{
                  border: '1px solid rgba(245,240,232,0.15)',
                  color: 'rgba(245,240,232,0.7)',
                  background: 'rgba(255,255,255,0.04)',
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.09)',
                  borderColor: 'rgba(201,168,76,0.5)',
                  color: '#f5f0e8',
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              >
                شاهد أعمالنا
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.9 }}
              className="flex flex-wrap justify-center gap-10 pt-8"
              style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}
            >
              {[
                { to: 50, suffix: '+', label: 'مشروع مُنجز' },
                { to: 40, suffix: '+', label: 'عميل سعيد' },
                { to: 3,  suffix: '+', label: 'سنوات خبرة' },
                { to: 98, suffix: '%', label: 'رضا العملاء' },
              ].map((s, i) => (
                <motion.div key={s.label}
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.08 }}
                >
                  <span className="text-3xl md:text-4xl font-black"
                    style={{
                      background: 'linear-gradient(135deg,#c9a84c,#e8c97a)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}
                  >
                    <AnimCounter to={s.to} suffix={s.suffix} />
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(245,240,232,0.38)' }}>{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-5 h-9 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: 'rgba(201,168,76,0.4)' }}
          >
            <motion.div className="w-1 h-2 rounded-full" style={{ background: '#c9a84c' }}
              animate={{ opacity: [1, 0.2, 1], scaleY: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

      </section>
    </>
  )
}
