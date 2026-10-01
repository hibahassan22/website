import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Shield, RefreshCw, Star } from 'lucide-react'
import pillarsImg from '../../assets/imgi_45_WhatsApp-Image-2026-08-18-at-4.06.53-PM-924x1536.jpg'
import { SectionHeading } from '../components/ui/SectionHeading'
import { RevealGroup, RevealItem, Reveal } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'
import { Counter } from '../components/ui/Counter'
import { EASE_OUT, VIEWPORT } from '../lib/motion'

const pillars = [
  {
    icon: Shield,
    to: 24, suffix: '', numSub: 'ساعة دعم',
    title: 'دعم أقوى',
    desc: 'فريق متخصص من مديري الحسابات والمسوّقين — دائماً متاح لمتابعة طلباتك وتقديم التعديلات والاستشارات.',
    accent: 'from-blue-500/20 to-gold-500/10',
    glow: 'rgba(99,150,255,0.15)',
  },
  {
    icon: RefreshCw,
    to: 100, suffix: '%', numSub: 'استمرارية',
    title: 'استمرار أطول',
    desc: 'نُدير دوماتك وتجديداتها بشكل كامل لضمان بقاء موقعك فعّالاً وحياً على الإنترنت بلا انقطاع.',
    accent: 'from-gold-500/20 to-gold-300/10',
    glow: 'rgba(212,169,79,0.18)',
  },
  {
    icon: Star,
    to: 3, suffix: '+', numSub: 'سنوات خبرة',
    title: 'خبرة أعلى',
    desc: 'استراتيجيات مخصصة لكل مشروع، بفريق متكامل من البرمجة والتصميم — لأعلى جودة في التنفيذ.',
    accent: 'from-emerald-500/15 to-gold-500/10',
    glow: 'rgba(52,211,153,0.12)',
  },
]

export default function AgencyPromise() {
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="promise" className="relative isolate bg-ink-900 text-fg-inv section-y overflow-hidden grain">
      {/* Background glows */}
      <div className="absolute -z-10 top-0 right-0 w-[700px] h-[500px] rounded-full bg-gold-500/[0.06] blur-[140px]" aria-hidden />
      <div className="absolute -z-10 bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[120px]" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-grid-dark mask-radial opacity-40" aria-hidden />

      <div className="container-x">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20 items-end">
          <SectionHeading
            className="lg:col-span-6"
            tone="dark"
            index="06"
            eyebrow="وعدنا لك"
            title={<>وعد <span className="text-gold">أدلكس</span></>}
          />
          <Reveal className="lg:col-span-6 lg:ps-10" delay={0.1}>
            <p className="t-lead text-fg-inv-muted">
              في أدلكس، نلتزم بتقديم قيمة حقيقية لكل مشروع من خلال أساس قوي مبني على الجودة والاحترافية.
            </p>
          </Reveal>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">

          {/* 3 pillar cards */}
          <RevealGroup className="lg:col-span-7 grid sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-4" gap={0.08}>
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <RevealItem key={p.title}>
                  <motion.div
                    className="group/card relative rounded-[22px] border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-7 flex flex-col sm:flex-row lg:flex-row gap-5 overflow-hidden cursor-default"
                    whileHover={{
                      y: -5,
                      borderColor: 'rgba(212,169,79,0.3)',
                      boxShadow: `0 24px 60px -20px ${p.glow}, 0 1px 0 rgba(255,255,255,0.06) inset`,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    }}
                    initial={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset' }}
                  >
                    {/* gradient bg on hover */}
                    <div className={`absolute inset-0 rounded-[inherit] bg-gradient-to-br ${p.accent} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    {/* shimmer top */}
                    <div className="absolute top-0 inset-x-8 h-px bg-linear-to-r from-transparent via-gold-400/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                    {/* Number */}
                    <div className="shrink-0 flex flex-col items-center justify-center w-24 lg:w-28 text-center relative z-10">
                      <p className="t-num text-[clamp(2.4rem,4vw,3rem)] font-semibold leading-none text-fg-inv group-hover/card:text-gold-400 transition-colors duration-400">
                        <Counter to={p.to} suffix={p.suffix} />
                      </p>
                      <p className="text-[0.75rem] text-fg-inv-subtle mt-1.5">{p.numSub}</p>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block lg:block w-px self-stretch bg-white/[0.08] group-hover/card:bg-gold-500/20 transition-colors duration-500" />

                    {/* Text */}
                    <div className="flex flex-col gap-2 relative z-10 flex-1 justify-center">
                      <div className="flex items-center gap-2.5">
                        <span className="icon-tile !w-8 !h-8 !rounded-[9px] bg-white/[0.06] text-gold-400 border border-white/10 shrink-0 group-hover/card:bg-gold-500 group-hover/card:text-ink-950 group-hover/card:border-transparent transition-all duration-300">
                          <Icon className="w-3.5 h-3.5" aria-hidden />
                        </span>
                        <h3 className="font-display text-[1.05rem] font-semibold text-fg-inv">{p.title}</h3>
                        <span className="t-num text-xs text-fg-inv-subtle ms-auto">0{i + 1}</span>
                      </div>
                      <p className="text-[0.88rem] leading-relaxed text-fg-inv-muted">{p.desc}</p>
                    </div>
                  </motion.div>
                </RevealItem>
              )
            })}
          </RevealGroup>

          {/* Image */}
          <Reveal className="lg:col-span-5" delay={0.15}>
            <motion.div
              ref={imgRef}
              className="group relative rounded-[28px] overflow-hidden border border-white/[0.08] aspect-[4/5] lg:aspect-[3/4.2] max-h-[75vh] mx-auto w-full max-w-sm lg:max-w-none"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, ease: EASE_OUT }}
              whileHover={{ borderColor: 'rgba(212,169,79,0.25)', transition: { duration: 0.4 } }}
            >
              {/* Ken Burns */}
              <motion.img
                src={pillarsImg}
                alt="ركائز وعد أدلكس"
                loading="lazy"
                decoding="async"
                style={{ y: imgY }}
                initial={{ scale: 1.14 }}
                whileInView={{ scale: 1.04 }}
                viewport={VIEWPORT}
                transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-ink-950/85 via-ink-950/20 to-transparent" />

              {/* Top shimmer on hover */}
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Badge */}
              <motion.div
                className="absolute bottom-5 inset-x-5 glass-dark rounded-2xl p-4 flex items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ delay: 0.5, duration: 0.7, ease: EASE_OUT }}
              >
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-gold-500 text-ink-950 shrink-0">
                  <Shield className="w-5 h-5" aria-hidden />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-fg-inv">ضمان أدلكس</span>
                  <span className="text-[0.78rem] text-fg-inv-subtle">ثلاث ركائز في كل مشروع</span>
                </span>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal className="flex flex-col sm:flex-row gap-3 mt-14">
          <ButtonLink href="#contact">تواصل معنا</ButtonLink>
          <ButtonLink href="tel:+201070899672" variant="ghost-dark" icon={null} leadingIcon={Phone}>اتصل بنا الآن</ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
