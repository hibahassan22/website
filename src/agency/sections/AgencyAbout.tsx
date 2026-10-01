import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { Briefcase, Users, Award, HeartHandshake } from 'lucide-react'
import officeImg from '../../assets/imgi_2_adlex_office_sign.webp'
import { Eyebrow } from '../components/ui/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Counter } from '../components/ui/Counter'
import { ButtonLink } from '../components/ui/Button'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { EASE_OUT, VIEWPORT } from '../lib/motion'

const statement =
  'أدلكس شركة حلول برمجية رائدة في السعودية والخليج. نؤمن بأن الويب أداة قوية لبناء حضور رقمي مميز، ونساعد الأنشطة التجارية على الانطلاق وتحقيق أهدافها باحترافية.'
const highlight = new Set(['حضور', 'رقمي', 'مميز،'])

const stats = [
  { to: 50, suffix: '+', label: 'مشروع مُنجز', icon: Briefcase },
  { to: 40, suffix: '+', label: 'عميل سعيد',   icon: Users },
  { to: 3,  suffix: '+', label: 'سنوات خبرة',  icon: Award },
  { to: 98, suffix: '%', label: 'رضا العملاء', icon: HeartHandshake },
]

function Word({ children, progress, range, gold }: {
  children: string; progress: MotionValue<number>; range: [number, number]; gold: boolean
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className={gold ? 'text-gold-deep' : undefined}>
      {children}{' '}
    </motion.span>
  )
}

function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] })
  const words = statement.split(' ')
  return (
    <p ref={ref} className="font-display font-semibold text-[clamp(1.35rem,2.6vw,2.25rem)] leading-[1.6] tracking-[-0.01em] text-fg max-w-4xl">
      {words.map((w, i) => {
        const start = i / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} gold={highlight.has(w)}>
            {w}
          </Word>
        )
      })}
    </p>
  )
}

export default function AgencyAbout() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  // "Next page" entrance: the section rises as a rounded sheet over the dark hero, then settles full-width
  const { scrollYProgress: enter } = useScroll({ target: sectionRef, offset: ['start end', 'start 15%'] })
  const sheetScale  = useTransform(enter, [0, 1], reduce ? [1, 1] : [0.92, 1])
  const sheetRadius = useTransform(enter, [0, 1], reduce ? [0, 0] : [56, 0])

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div className="bg-ink-950">
      <motion.section
        id="about"
        ref={sectionRef}
        style={{ scale: sheetScale, borderTopLeftRadius: sheetRadius, borderTopRightRadius: sheetRadius }}
        className="relative bg-paper section-y overflow-hidden origin-top shadow-[0_-40px_80px_-30px_rgba(0,0,0,0.7)] will-change-transform"
      >
        <div className="absolute inset-x-0 top-0 h-[520px] bg-grid-light mask-fade-b opacity-60 pointer-events-none" aria-hidden />

        <div className="container-x relative">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-16 lg:mb-24">
            <div className="lg:col-span-3 pt-2">
              <Reveal><Eyebrow index="01" label="من نحن" /></Reveal>
            </div>
            <div className="lg:col-span-9">
              <ScrollStatement />
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Image */}
            <motion.div
              className="group lg:col-span-5 relative min-h-[380px] lg:min-h-[560px]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            >
              {/* Offset frame for depth */}
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-[30px] border border-gold-500/35 bg-gold-500/[0.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:translate-y-6"
                aria-hidden
              />

              <div className="relative h-full rounded-[28px] shadow-[0_40px_80px_-30px_rgba(11,16,32,0.55),0_12px_24px_-12px_rgba(11,16,32,0.25)] transition-[translate,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:shadow-[0_60px_100px_-30px_rgba(11,16,32,0.6),0_16px_32px_-12px_rgba(11,16,32,0.3)]">
                <motion.div
                  ref={imgRef}
                  className="absolute inset-0 rounded-[28px] overflow-hidden bg-ink-900"
                  initial={{ clipPath: 'inset(14% 0% 14% 0% round 28px)' }}
                  whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
                  viewport={VIEWPORT}
                  transition={{ duration: 1.3, ease: EASE_OUT }}
                >
                  <motion.img
                    src={officeImg}
                    alt="مكتب أدلكس"
                    loading="lazy"
                    decoding="async"
                    style={{ y: imgY }}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.18] transition-[scale] duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.26]"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_80%_10%,rgba(212,169,79,0.18),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="absolute bottom-5 inset-x-5 flex items-end justify-between gap-4">
                    <div className="animate-float glass-dark rounded-2xl px-5 py-4">
                      <p className="t-num text-3xl font-semibold text-fg-inv leading-none mb-1.5">
                        <Counter to={3} suffix="+" />
                      </p>
                      <p className="text-[0.8rem] text-fg-inv-muted">سنوات من الخبرة</p>
                    </div>
                    <div className="animate-float [animation-delay:-3.5s] glass-dark rounded-full px-4 py-2 text-[0.8rem] text-fg-inv-muted hidden sm:block">
                      شريكك التقني الأول
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-10">
              <div className="flex flex-col gap-5">
                <Reveal>
                  <h2 className="t-h2 text-fg">
                    فريق واحد، <span className="text-gold-deep">من الفكرة</span> حتى النمو.
                  </h2>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="t-lead text-fg-muted max-w-2xl">
                    أدلكس هي شركة حلول برمجية رائدة، وتُعدّ من أبرز شركات تصميم المواقع الإلكترونية
                    في السعودية وعلى مستوى دول الخليج. نؤمن بأن الويب أداة قوية وفعّالة لبناء حضور
                    رقمي مميز، ومساعدة الأنشطة التجارية على الانطلاق وتحقيق أهدافها باحترافية.
                  </p>
                </Reveal>
              </div>

              <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4" gap={0.08}>
                {stats.map(s => {
                  const Icon = s.icon
                  return (
                    <RevealItem key={s.label}>
                      <SpotlightCard className="h-full rounded-[22px] p-5 sm:p-7 overflow-hidden hover:border-gold-500/30">
                        <span
                          className="absolute top-0 inset-x-6 h-[2px] rounded-full bg-linear-to-l from-gold-300 via-gold-500 to-gold-600 scale-x-0 origin-right transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                          aria-hidden
                        />
                        <div className="flex items-start justify-between gap-3 mb-6 sm:mb-8">
                          <span className="icon-tile !w-10 !h-10 !rounded-xl bg-paper text-gold-600 border border-ink-900/[0.06] group-hover:bg-ink-900 group-hover:text-gold-400 group-hover:border-transparent">
                            <Icon className="w-[18px] h-[18px]" aria-hidden />
                          </span>
                        </div>
                        <p className="t-num text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-none text-fg mb-2 transition-colors duration-500 group-hover:text-gold-600">
                          <Counter to={s.to} suffix={s.suffix} />
                        </p>
                        <p className="text-[0.9rem] sm:text-[0.95rem] text-fg-muted">{s.label}</p>
                      </SpotlightCard>
                    </RevealItem>
                  )
                })}
              </RevealGroup>

              <Reveal>
                <ButtonLink href="#contact" variant="ink">تواصل معنا الآن</ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
