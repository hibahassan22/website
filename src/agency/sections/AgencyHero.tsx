import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import {
  motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { Check, Gauge, Rocket, Search } from 'lucide-react'
import heroBg from '../../assets/imgi_90_WhatsApp-Image-2026-08-18-at-4.33.07-PM.jpg'
import { ButtonLink } from '../components/ui/Button'
import { SplitWords } from '../components/ui/Reveal'
import { EASE_OUT } from '../lib/motion'

const words = ['نطوّر', 'ننفّذ', 'نسوّق', 'نبدع', 'نبتكر']

const bullets = [
  'تسليم المشاريع في الوقت المحدد دائماً',
  'دعم فني متكامل ٢٤ ساعة طوال العام',
  'فريق متخصص في البرمجة والتسويق الرقمي',
]

const bars = [38, 52, 44, 63, 58, 72, 66, 81, 77, 88, 84, 96]

function WordCycler() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-flex overflow-hidden align-bottom min-w-[4.5ch] h-[1.5em]" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={idx}
          className="text-gold inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function useDepth(sx: MotionValue<number>, sy: MotionValue<number>, depth: number) {
  return {
    x: useTransform(sx, v => v * depth),
    y: useTransform(sy, v => v * depth),
  }
}

function HeroVisual({ sx, sy }: { sx: MotionValue<number>; sy: MotionValue<number> }) {
  const plate = useDepth(sx, sy, -10)
  const panel = useDepth(sx, sy, 16)
  const chipA = useDepth(sx, sy, 30)
  const chipB = useDepth(sx, sy, 42)

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[540px] aspect-[5/4] lg:aspect-[4/5]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.5 }}
    >
      {/* Image plate */}
      <motion.div style={plate} className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        <img src={heroBg} alt="" className="w-full h-full object-cover object-[22%_center] scale-110" />
        <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-l from-ink-950/30 to-transparent" />
      </motion.div>

      {/* Dashboard panel */}
      <motion.div
        style={panel}
        className="absolute inset-x-[6%] bottom-[7%] rounded-2xl glass-dark p-4 sm:p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5" dir="ltr">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold-500/70" />
          </div>
          <span className="pill pill-dark !py-1 !text-[0.7rem]">
            <span className="live-dot !w-1.5 !h-1.5" />
            مباشر الآن
          </span>
        </div>

        <div className="flex items-end justify-between gap-4 mb-3">
          <div>
            <p className="text-[0.75rem] text-fg-inv-subtle">مؤشر الأداء</p>
            <p className="t-num text-2xl sm:text-3xl font-semibold text-fg-inv" dir="ltr">
              98<span className="text-base text-fg-inv-subtle font-normal">/100</span>
            </p>
          </div>
          <div className="text-[0.7rem] text-fg-inv-subtle t-num" dir="ltr">Q1 — Q4</div>
        </div>

        <div className="flex items-end gap-[5px] h-20 sm:h-24" dir="ltr" aria-hidden>
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 rounded-[4px] origin-bottom ${i === bars.length - 1 ? 'bg-linear-to-t from-gold-600 to-gold-300' : 'bg-white/[0.12]'}`}
              style={{ height: `${h}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 1 + i * 0.05 }}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/[0.08]">
          {[
            { icon: Gauge,  label: 'الأداء',  value: '98' },
            { icon: Search, label: 'SEO',     value: '100' },
            { icon: Rocket, label: 'الجاهزية', value: '100' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 min-w-0">
              <Icon className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden />
              <span className="text-[0.7rem] text-fg-inv-subtle truncate">{label}</span>
              <span className="t-num text-[0.8rem] font-semibold text-fg-inv ms-auto">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating chip — launch */}
      <motion.div style={chipA} className="hidden sm:block absolute top-[9%] -right-[7%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.3 }}
        >
          <div className="animate-float glass-dark rounded-2xl ps-3 pe-4 py-3 flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-linear-to-b from-gold-400 to-gold-600 text-ink-950">
              <Check className="w-4 h-4" strokeWidth={3} aria-hidden />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-fg-inv">تم الإطلاق بنجاح</span>
              <span className="text-[0.72rem] text-fg-inv-subtle">متجر إلكتروني · الآن</span>
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating chip — code */}
      <motion.div style={chipB} className="hidden sm:block absolute top-[38%] -left-[8%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.5 }}
        >
          <div className="animate-float [animation-delay:-3s] glass-dark rounded-xl px-4 py-2.5 font-mono text-[0.78rem] text-fg-inv-muted" dir="ltr">
            <span className="text-gold-400">&lt;</span>Build
            <span className="text-fg-inv"> fast</span>
            <span className="text-gold-400"> /&gt;</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function AgencyHero() {
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const bgX = useTransform(sx, v => v * -18)
  const bgY = useTransform(sy, v => v * -12)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden bg-ink-950 text-fg-inv grain min-h-[100svh] flex items-center"
    >
      {/* Background */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-[4%] -z-30" aria-hidden>
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.22]" fetchPriority="high" />
      </motion.div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(29,37,71,0.9),transparent_70%)]" aria-hidden />
      <div className="absolute -z-20 top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-gold-500/[0.13] blur-[120px] animate-aurora will-change-transform" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-grid-dark mask-radial opacity-70" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-40 -z-10 bg-linear-to-b from-transparent to-ink-950" aria-hidden />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-x w-full pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.span
              className="pill pill-dark mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
            >
              <span className="live-dot" />
              وكالة رقمية متخصصة · منذ ٢٠٢٢
            </motion.span>

            <h1 className="t-display text-fg-inv mb-6">
              <SplitWords text="حوّل أفكارك إلى" inView={false} delay={0.3} className="block" />
              <SplitWords text="واقع رقمي." inView={false} delay={0.5} className="block" wordClassName="text-gold" />
            </h1>

            <motion.p
              className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium text-fg-inv-muted mb-6 flex flex-wrap items-baseline gap-x-2.5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.8 }}
            >
              <WordCycler />
              <span>لدعم نمو أعمالك</span>
            </motion.p>

            <motion.p
              className="t-lead text-fg-inv-muted max-w-[34rem] mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.9 }}
            >
              نصمّم ونطوّر المواقع والتطبيقات والمتاجر الإلكترونية، ونقود تسويقها الرقمي — بفريق واحد
              يهتم بكل تفصيلة من الفكرة حتى الإطلاق وما بعده.
            </motion.p>

            <motion.div
              className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 1 }}
            >
              <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto">ابدأ مشروعك التقني</ButtonLink>
              <ButtonLink href="#projects" size="lg" variant="ghost-dark" icon={null} className="w-full sm:w-auto">شاهد أعمالنا</ButtonLink>
            </motion.div>

            <motion.ul
              className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.15 } } }}
            >
              {bullets.map(t => (
                <motion.li
                  key={t}
                  className="flex items-center gap-2.5 text-[0.9rem] text-fg-inv-subtle"
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }}
                >
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-gold-500/15 text-gold-400 shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} aria-hidden />
                  </span>
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <HeroVisual sx={sx} sy={sy} />
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-[0.75rem] text-fg-inv-subtle bg-transparent border-0 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-label="انتقل للقسم التالي"
      >
        <span className="relative block w-px h-10 bg-white/15 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gold-400 animate-[scrollcue_2.2s_ease-in-out_infinite]" />
        </span>
      </motion.button>
    </section>
  )
}
