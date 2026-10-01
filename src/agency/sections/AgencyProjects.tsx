import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpLeft } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'
import { EASE_OUT, VIEWPORT, scrollToId } from '../lib/motion'

type Kind = 'web' | 'mobile' | 'brand'

interface Project {
  title:     string
  category:  string
  desc:      string
  tags:      string[]
  stat:      string
  statLabel: string
  kind:      Kind
  tint:      string
}

const projects: Project[] = [
  {
    title: 'NexaStore', category: 'متاجر إلكترونية · تطوير ويب',
    desc: 'متجر إلكتروني متكامل بمخزون لحظي ودفع متعدد العملات ومحرك توصيات ذكي يرفع قيمة كل طلب.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'], stat: '+340%', statLabel: 'نمو الإيرادات', kind: 'web', tint: '212 169 79',
  },
  {
    title: 'MediTrack', category: 'تطبيق موبايل',
    desc: 'تطبيق لإدارة الرعاية الصحية يربط المرضى بالأطباء، مع محادثات لحظية وحجز مواعيد ومساعد تشخيص ذكي.',
    tags: ['Flutter', 'Firebase', 'REST APIs', 'AI'], stat: '50K+', statLabel: 'مستخدم نشط', kind: 'mobile', tint: '120 150 210',
  },
  {
    title: 'VisionBrand', category: 'هوية تجارية · UI/UX',
    desc: 'إعادة بناء كاملة لعلامة شركة عقارات فاخرة — نظام شعار ولغة تصميم وموقع ومطبوعات.',
    tags: ['Figma', 'Brand Identity', 'Motion', 'Web'], stat: '8', statLabel: 'أسابيع للتسليم الكامل', kind: 'brand', tint: '200 150 140',
  },
  {
    title: 'GrowthDesk', category: 'SaaS · تطوير ويب',
    desc: 'لوحة CRM وتسويق للشركات الصغيرة والمتوسطة: تقييم تلقائي للعملاء المحتملين وتحليلات للحملات وتكامل مع واتساب.',
    tags: ['Next.js', 'PostgreSQL', 'tRPC', 'WhatsApp API'], stat: '99.9%', statLabel: 'وقت التشغيل', kind: 'web', tint: '110 180 160',
  },
  {
    title: 'Layla Bakery', category: 'تصميم مواقع · واجهات',
    desc: 'موقع مخبز فاخر مع طلب أونلاين ونظام ولاء وعرض تفاعلي للمنتجات.',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Sanity CMS'], stat: '+220%', statLabel: 'الطلبات الأونلاين', kind: 'web', tint: '228 180 110',
  },
  {
    title: 'SwiftRide', category: 'تطبيق موبايل · UI/UX',
    desc: 'تطبيق توصيل ركاب بمطابقة السائقين وتتبع مباشر ودفع داخل التطبيق.',
    tags: ['React Native', 'Maps API', 'Payments', 'Firebase'], stat: '3', statLabel: 'مدن عند الإطلاق', kind: 'mobile', tint: '130 190 150',
  },
]

/* ── Abstract product visuals (no screenshots available) ── */
function ProjectVisual({ p, large = false }: { p: Project; large?: boolean }) {
  const glow = `radial-gradient(ellipse 70% 60% at 50% 100%, rgb(${p.tint} / 0.32), transparent 70%)`
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-850" aria-hidden>
      <div className="absolute inset-0" style={{ background: glow }} />
      <div className="absolute inset-0 bg-grid-dark opacity-40 mask-radial" />

      <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
        {p.kind === 'web' && (
          <div className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-[82%] rounded-t-xl border border-b-0 border-white/10 bg-ink-900 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)] ${large ? 'h-[78%]' : 'h-[72%]'}`} dir="ltr">
            <div className="flex items-center gap-1.5 px-3 h-7 border-b border-white/[0.07]">
              <span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="ms-3 h-3 w-1/3 rounded bg-white/[0.06]" />
            </div>
            <div className="p-[6%] flex flex-col gap-[6%] h-[calc(100%-1.75rem)]">
              <div className="flex items-center justify-between">
                <span className="h-2.5 w-14 rounded-full" style={{ background: `rgb(${p.tint} / 0.9)` }} />
                <span className="flex gap-2"><span className="h-2 w-8 rounded-full bg-white/10" /><span className="h-2 w-8 rounded-full bg-white/10" /><span className="h-2 w-8 rounded-full bg-white/10" /></span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="h-3.5 w-3/4 rounded-full bg-white/[0.18]" />
                <span className="h-3.5 w-1/2 rounded-full bg-white/[0.18]" />
                <span className="mt-1 h-6 w-24 rounded-full" style={{ background: `rgb(${p.tint} / 0.85)` }} />
              </div>
              <div className="grid grid-cols-3 gap-2 flex-1">
                {[0, 1, 2].map(i => (
                  <span key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.04]" style={i === 1 ? { background: `rgb(${p.tint} / 0.14)` } : undefined} />
                ))}
              </div>
            </div>
          </div>
        )}

        {p.kind === 'mobile' && (
          <div className="absolute inset-0 flex items-end justify-center gap-[6%]">
            {[0, 1].map(i => (
              <div
                key={i}
                className={`relative w-[30%] max-w-[160px] aspect-[9/19] rounded-[22px] border border-white/12 bg-ink-900 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ${i === 0 ? 'translate-y-[18%]' : 'translate-y-[30%]'}`}
              >
                <div className="h-full rounded-[16px] bg-ink-850 overflow-hidden p-3 flex flex-col gap-2">
                  <span className="mx-auto h-1.5 w-10 rounded-full bg-white/10 mb-1" />
                  <span className="h-16 rounded-xl" style={{ background: `linear-gradient(160deg, rgb(${p.tint} / 0.8), rgb(${p.tint} / 0.25))` }} />
                  <span className="h-2 w-3/4 rounded-full bg-white/15" />
                  <span className="h-2 w-1/2 rounded-full bg-white/10" />
                  <span className="mt-1 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06]" />
                  <span className="h-9 rounded-lg bg-white/[0.05] border border-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {p.kind === 'brand' && (
          <div className="absolute inset-0 flex items-center justify-center gap-[8%]">
            <div className="grid place-items-center w-[34%] max-w-[180px] aspect-square rounded-full border border-white/10" style={{ background: `radial-gradient(circle at 30% 30%, rgb(${p.tint} / 0.5), rgb(${p.tint} / 0.08))` }}>
              <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-fg-inv leading-none">V</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {[0.95, 0.6, 0.3].map(o => (
                <span key={o} className="block h-8 w-16 sm:w-20 rounded-lg border border-white/10" style={{ background: `rgb(${p.tint} / ${o})` }} />
              ))}
              <span className="block h-8 w-16 sm:w-20 rounded-lg bg-fg-inv" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map(t => (
        <li key={t} className="text-[0.75rem] font-medium text-fg-inv-muted px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.07]">{t}</li>
      ))}
    </ul>
  )
}

function FeaturedProject({ p }: { p: Project }) {
  return (
    <motion.article
      className="group relative grid lg:grid-cols-12 rounded-[32px] overflow-hidden border border-white/[0.08] bg-ink-900"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE_OUT }}
    >
      <div className="relative lg:col-span-7 min-h-[300px] sm:min-h-[400px] lg:min-h-[520px] lg:order-2">
        <ProjectVisual p={p} large />
        <span className="absolute top-5 end-5 pill pill-dark !bg-ink-950/60 backdrop-blur">مشروع مميز</span>
      </div>
      <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col gap-6 lg:order-1">
        <div className="flex items-center gap-3">
          <span className="t-num text-sm text-gold-400">01</span>
          <span className="h-px w-6 bg-white/20" />
          <span className="text-[0.85rem] text-fg-inv-subtle">{p.category}</span>
        </div>
        <h3 className="font-display text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-tight text-fg-inv">{p.title}</h3>
        <p className="t-lead text-fg-inv-muted">{p.desc}</p>
        <div className="flex items-end gap-4 py-6 border-y border-white/[0.08]">
          <span className="t-num text-5xl font-semibold text-gold leading-none" dir="ltr">{p.stat}</span>
          <span className="text-fg-inv-muted pb-1">{p.statLabel}</span>
        </div>
        <Tags tags={p.tags} />
        <div className="mt-auto pt-2">
          <ButtonLink href="#contact" variant="ghost-dark">اطلب مشروعاً مشابهاً</ButtonLink>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <article className="snap-start shrink-0 w-[86%] sm:w-[58%] lg:w-[calc((100%-2.5rem)/2.6)]">
      <a
        href="#contact"
        onClick={e => { e.preventDefault(); scrollToId('#contact') }}
        className="group h-full flex flex-col rounded-[26px] overflow-hidden border border-white/[0.08] bg-ink-900 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/20 hover:-translate-y-1"
      >
        <div className="relative aspect-[16/11]">
          <ProjectVisual p={p} />
          <span className="absolute top-4 start-4 t-num text-sm text-fg-inv/80 bg-ink-950/60 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
            {String(index).padStart(2, '0')}
          </span>
          <span className="absolute top-4 end-4 grid place-items-center w-10 h-10 rounded-full bg-fg-inv text-ink-950 opacity-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100">
            <ArrowUpLeft className="w-4 h-4" aria-hidden />
          </span>
        </div>
        <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.8rem] text-fg-inv-subtle mb-1">{p.category}</p>
              <h3 className="font-display text-2xl font-semibold text-fg-inv">{p.title}</h3>
            </div>
            <div className="text-end shrink-0">
              <p className="t-num text-xl font-semibold text-gold leading-none mb-1" dir="ltr">{p.stat}</p>
              <p className="text-[0.72rem] text-fg-inv-subtle">{p.statLabel}</p>
            </div>
          </div>
          <p className="text-[0.925rem] leading-relaxed text-fg-inv-muted flex-1">{p.desc}</p>
          <Tags tags={p.tags} />
          <span className="mt-2 pt-4 border-t border-white/[0.07] flex items-center justify-between text-[0.875rem] font-medium text-fg-inv-muted group-hover:text-gold-400 transition-colors">
            اطلب مشروعاً مشابهاً
            <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden />
          </span>
        </div>
      </a>
    </article>
  )
}

export default function AgencyProjects() {
  const railRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [featured, ...rest] = projects

  const update = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const pos = Math.abs(el.scrollLeft)
    setAtStart(pos < 8)
    setAtEnd(pos > max - 8)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [update])

  const scroll = (dir: 1 | -1) => {
    const el = railRef.current
    if (!el) return
    const card = el.querySelector('article')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    const rtl = getComputedStyle(el).direction === 'rtl'
    el.scrollBy({ left: dir * step * (rtl ? -1 : 1), behavior: 'smooth' })
  }

  return (
    <section id="projects" className="relative isolate bg-ink-950 text-fg-inv section-y overflow-hidden">
      <div className="absolute -z-10 bottom-0 left-0 w-[700px] h-[500px] rounded-full bg-gold-500/[0.06] blur-[120px]" aria-hidden />

      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-16">
          <SectionHeading
            tone="dark"
            index="04"
            eyebrow="أعمالنا"
            title={<>أعمال <span className="text-gold">تتحدث عن نفسها.</span></>}
            description="نتائج حقيقية لأعمال حقيقية — كل مشروع حلّ تحدياً مختلفاً."
          />
        </div>

        <FeaturedProject p={featured} />

        <div className="flex items-center justify-between gap-6 mt-16 mb-8">
          <Reveal><p className="font-display text-xl text-fg-inv">مشاريع أخرى</p></Reveal>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={atStart}
              className="grid place-items-center w-11 h-11 rounded-full border border-white/12 text-fg-inv transition-all hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer bg-transparent"
              aria-label="المشروع السابق"
            >
              <ArrowRight className="w-4 h-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={atEnd}
              className="grid place-items-center w-11 h-11 rounded-full border border-white/12 text-fg-inv transition-all hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer bg-transparent"
              aria-label="المشروع التالي"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div className="container-x !pe-0 lg:!pe-[clamp(1.25rem,4vw,2.5rem)]">
        <motion.div
          ref={railRef}
          className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pe-5 lg:pe-0"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: EASE_OUT }}
        >
          {rest.map((p, i) => <ProjectCard key={p.title} p={p} index={i + 2} />)}
        </motion.div>
      </div>
    </section>
  )
}
