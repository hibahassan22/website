import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useSpring } from 'framer-motion'
import { Search, Paintbrush, Code2, Rocket, HeartHandshake, Check } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { EASE_OUT } from '../lib/motion'

const steps = [
  {
    num: '01', icon: Search,
    title: 'فهم البيزنس',
    desc: 'بندرس فكرتك كويس، بنفهم جمهورك، ونحلل منافسينك علشان نحط خطة تضمن نجاح موقعك.',
    detail: ['تحليل السوق والمنافسين', 'تحديد الجمهور المستهدف', 'وضع خطة استراتيجية متكاملة'],
  },
  {
    num: '02', icon: Paintbrush,
    title: 'أول انطباع هو كل حاجة',
    desc: 'تصميم UI/UX عصري يعكس هوية البراند بتاعتك، ويوفر تجربة سهلة ومريحة تساعد العميل يشتري.',
    detail: ['واجهة مستخدم عصرية', 'تجربة مستخدم سهلة وبديهية', 'تصميم متوافق مع الهوية البصرية'],
  },
  {
    num: '03', icon: Code2,
    title: 'موقع سريع زي الطلقة',
    desc: 'مبني بأحدث التقنيات، تحميله خيالي، ومعاه حماية كاملة لبياناتك.',
    detail: ['كود نظيف وقابل للتوسع', 'سرعة تحميل فائقة', 'حماية وأمان متقدم'],
  },
  {
    num: '04', icon: Rocket,
    title: 'جاهز يبيع من أول يوم',
    desc: 'بنختبر كل تفصيلة ونتأكد إن كل زرار شغال تمام، مع ربط كامل للدفع والشحن.',
    detail: ['اختبار شامل لكل الوظائف', 'ربط بوابات الدفع والشحن', 'إطلاق احترافي مضمون'],
  },
  {
    num: '05', icon: HeartHandshake,
    title: 'من أول يوم وإحنا معاك',
    desc: 'موقعك اتطلق وجاهز يبيع، ودعمنا مستمر علشان تركز في البيزنس وإحنا نهتم بالباقي.',
    detail: ['دعم فني على مدار الساعة', 'تحديثات دورية مجانية', 'مراقبة الأداء والأمان'],
  },
]

function Step({ s, index, active, onActive }: {
  s: typeof steps[0]; index: number; active: boolean; onActive: (i: number) => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inCenter = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const Icon = s.icon

  useEffect(() => { if (inCenter) onActive(index) }, [inCenter, index, onActive])

  return (
    <li ref={ref} className="relative ps-16 sm:ps-20 pb-14 last:pb-0">
      {/* Node */}
      <span
        className={`absolute start-0 top-0 grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border transition-all duration-500
          ${active ? 'bg-ink-900 border-ink-900 text-gold-400 shadow-[0_10px_30px_-10px_rgba(11,16,32,0.6)]' : 'bg-white border-ink-900/10 text-fg-subtle'}`}
      >
        <Icon className="w-5 h-5" aria-hidden />
      </span>

      <motion.div
        className={`group/card rounded-[24px] border p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden cursor-default
          ${active
            ? 'bg-white border-ink-900/12 shadow-[0_20px_50px_-15px_rgba(11,16,32,0.18),0_1px_0_rgba(11,16,32,0.04)_inset] lg:opacity-100'
            : 'bg-white/60 border-ink-900/[0.06] lg:opacity-50'}`}
        whileHover={{
          y: -6,
          boxShadow: '0 32px 64px -20px rgba(11,16,32,0.28), 0 8px 24px -8px rgba(212,169,79,0.15), 0 1px 0 rgba(11,16,32,0.04) inset',
          borderColor: 'rgba(11,16,32,0.18)',
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {/* gold glow on hover */}
        <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,169,79,0.09), transparent 70%)' }}
        />
        {/* shimmer line at top */}
        <div className="absolute top-0 inset-x-6 h-px bg-linear-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

        <div className="flex items-center gap-3 mb-3 relative z-10">
          <span className="t-num text-sm font-medium text-gold-600">{s.num}</span>
          <span className="h-px w-6 bg-ink-900/15" aria-hidden />
          <span className="text-[0.8rem] text-fg-subtle">الخطوة {index + 1} من {steps.length}</span>
        </div>
        <h3 className="font-display text-[clamp(1.3rem,2vw,1.6rem)] font-semibold text-fg mb-3 relative z-10 group-hover/card:text-ink-900 transition-colors duration-300">{s.title}</h3>
        <p className="text-fg-muted mb-6 relative z-10">{s.desc}</p>
        <ul className="flex flex-wrap gap-2 relative z-10">
          {s.detail.map((d, di) => (
            <motion.li
              key={d}
              className="inline-flex items-center gap-2 text-[0.85rem] text-fg px-3 py-1.5 rounded-full bg-paper border border-ink-900/[0.06] group-hover/card:border-gold-400/40 group-hover/card:bg-gold-300/10 transition-all duration-300"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: di * 0.07 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Check className="w-3.5 h-3.5 text-gold-600 group-hover/card:text-gold-500 transition-colors duration-300" strokeWidth={2.5} aria-hidden />
              {d}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </li>
  )
}

export default function AgencyProcess() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="process" className="relative bg-white section-y">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16">
          {/* Sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 flex flex-col gap-10">
              <SectionHeading
                index="03"
                eyebrow="خطواتنا لنجاح مشروعك"
                title={<>إحنا مش بنعمل موقع <span className="text-gold-deep">وبس</span></>}
                description="إحنا بنبنيه على خطة مدروسة علشان نضمن إن موقعك يطلع بأعلى جودة ويحقق أرقام ومبيعات من أول يوم."
                titleSize="clamp(1.5rem, 2.8vw, 2.25rem)"
              />

              <Reveal className="hidden lg:flex items-end gap-5">
                <div className="relative h-[5.5rem] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={active}
                      className="t-num block text-[5.5rem] leading-none font-semibold text-fg"
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE_OUT }}
                    >
                      {steps[active].num}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="pb-3 flex flex-col gap-1">
                  <span className="t-num text-sm text-fg-subtle">/ 0{steps.length}</span>
                  <span className="text-fg-muted text-[0.95rem]">{steps[active].title}</span>
                </div>
              </Reveal>

              <Reveal className="hidden lg:block">
                <ButtonLink href="#contact" variant="ink">ابدأ مشروعك الآن</ButtonLink>
              </Reveal>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7">
            <ol ref={listRef} className="relative">
              <span className="absolute start-6 sm:start-7 top-2 bottom-2 w-px bg-ink-900/10" aria-hidden />
              <motion.span
                className="absolute start-[23px] sm:start-[27px] top-2 bottom-2 w-[3px] rounded-full bg-linear-to-b from-gold-400 to-gold-600 origin-top"
                style={{ scaleY: fill }}
                aria-hidden
              />
              {steps.map((s, i) => (
                <Step key={s.num} s={s} index={i} active={active === i} onActive={setActive} />
              ))}
            </ol>
            <Reveal className="lg:hidden mt-12">
              <ButtonLink href="#contact" variant="ink">ابدأ مشروعك الآن</ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
