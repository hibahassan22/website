import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Globe, ShoppingCart, Palette, Megaphone, MessageSquare, Layers, Smartphone } from 'lucide-react'
import servicesImg from '../../assets/imgi_7_ChatGPT-Image-Aug-18-2026-11_10_54-PM.png'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'

const featured = {
  icon: Globe,
  title: 'تصميم المواقع',
  desc: 'مواقع تعريفية ومتاجر وصفحات هبوط احترافية متوافقة مع محركات البحث وسريعة التحميل.',
  tags: ['مواقع تعريفية', 'صفحات هبوط', 'متوافقة مع SEO'],
}

const services = [
  { icon: Code2,         title: 'تطوير الويب',          desc: 'تطبيقات ويب سريعة وقابلة للتوسع باستخدام React وNext.js وأحدث التقنيات.' },
  { icon: Smartphone,    title: 'تطبيقات الموبايل',    desc: 'تطبيقات iOS وAndroid بأداء native وتجربة مستخدم استثنائية مع Flutter.' },
  { icon: Palette,       title: 'هوية تجارية',          desc: 'هوية بصرية مميزة تعكس علامتك التجارية وتترك انطباعاً لا يُنسى لدى عملائك.' },
  { icon: ShoppingCart,  title: 'المتاجر الإلكترونية', desc: 'متاجر متكاملة مع بوابات دفع وشحن وإدارة منتجات لا نهائية بتجربة شراء سلسة.' },
  { icon: MessageSquare, title: 'واتساب API',           desc: 'ربط WhatsApp Business API للتسويق الفوري والتواصل المباشر مع عملائك لزيادة المبيعات.' },
  { icon: Layers,        title: 'جرافيك ديزاين',        desc: 'تصميمات بصرية مبتكرة وجذابة لتعزيز هوية علامتك التجارية عبر جميع المنصات.' },
]

const marketing = {
  icon: Megaphone,
  title: 'التسويق الرقمي',
  desc: 'استراتيجيات SEO وسوشيال ميديا ومحتوى رقمي يحقق نتائج حقيقية وقابلة للقياس.',
  tags: ['SEO', 'سوشيال ميديا', 'صناعة المحتوى', 'حملات إعلانية'],
}

function Num({ n }: { n: number }) {
  return <span className="t-num text-[0.8rem] text-fg-inv-subtle">{String(n).padStart(2, '0')}</span>
}

export default function AgencyServices() {
  const imgWrap = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [28, 0])
  const FeaturedIcon = featured.icon
  const MarketingIcon = marketing.icon

  return (
    <section id="services" className="relative isolate bg-ink-900 text-fg-inv section-y overflow-hidden grain">
      <div className="absolute inset-0 -z-10 bg-grid-dark mask-radial opacity-60" aria-hidden />
      <div className="absolute -z-10 top-0 right-1/2 translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gold-500/[0.07] blur-[120px]" aria-hidden />

      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
          <SectionHeading
            className="lg:col-span-7"
            tone="dark"
            index="02"
            eyebrow="خدماتنا"
            title={<>مساعدة الشركات <span className="text-gold">في جميع المجالات</span></>}
          />
          <Reveal className="lg:col-span-5 flex flex-col items-start gap-6 lg:ps-10" delay={0.1}>
            <p className="t-lead text-fg-inv-muted">
              من الهوية البصرية إلى المنصة التقنية والتسويق — كل ما يحتاجه مشروعك تحت سقف واحد.
              عملاؤنا شركاؤنا في كل خطوة نجاح.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(250px,auto)]" gap={0.06}>
          {/* Featured */}
          <RevealItem className="sm:col-span-2 lg:row-span-2">
            <SpotlightCard tone="dark" className="h-full rounded-[28px] overflow-hidden flex flex-col">
              <div className="p-7 sm:p-9 flex flex-col gap-5 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="icon-tile bg-gold-500 text-ink-950"><FeaturedIcon className="w-5 h-5" aria-hidden /></span>
                  <Num n={1} />
                </div>
                <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-tight text-fg-inv">{featured.title}</h3>
                <p className="text-fg-inv-muted max-w-md">{featured.desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {featured.tags.map(t => (
                    <li key={t} className="text-[0.8rem] text-fg-inv-muted px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">{t}</li>
                  ))}
                </ul>
              </div>
              <div ref={imgWrap} className="relative flex-1 min-h-[240px] sm:min-h-[300px] mx-7 sm:mx-9 mb-0">
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(212,169,79,0.22),transparent_70%)]" aria-hidden />
                <motion.img
                  src={servicesImg}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ y: imgY }}
                  className="absolute inset-x-0 bottom-0 mx-auto h-[108%] w-auto max-w-full object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
            </SpotlightCard>
          </RevealItem>

          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <RevealItem key={s.title}>
                <SpotlightCard tone="dark" className="h-full rounded-[24px] p-7 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="icon-tile bg-white/[0.06] text-gold-400 border border-white/10 group-hover:bg-gold-500 group-hover:text-ink-950 group-hover:border-transparent">
                      <Icon className="w-5 h-5" aria-hidden />
                    </span>
                    <Num n={i + 2} />
                  </div>
                  <div className="mt-auto">
                    <h3 className="t-h3 text-fg-inv mb-2">{s.title}</h3>
                    <p className="text-[0.925rem] leading-relaxed text-fg-inv-muted">{s.desc}</p>
                  </div>
                </SpotlightCard>
              </RevealItem>
            )
          })}

          {/* Wide */}
          <RevealItem className="sm:col-span-2">
            <SpotlightCard tone="dark" className="h-full rounded-[24px] p-7 sm:p-8 grid sm:grid-cols-[1fr_auto] gap-6 items-end overflow-hidden">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="icon-tile bg-white/[0.06] text-gold-400 border border-white/10 group-hover:bg-gold-500 group-hover:text-ink-950 group-hover:border-transparent">
                    <MarketingIcon className="w-5 h-5" aria-hidden />
                  </span>
                  <Num n={8} />
                </div>
                <h3 className="t-h3 text-fg-inv">{marketing.title}</h3>
                <p className="text-[0.925rem] leading-relaxed text-fg-inv-muted max-w-sm">{marketing.desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {marketing.tags.map(t => (
                    <li key={t} className="text-[0.78rem] text-fg-inv-muted px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">{t}</li>
                  ))}
                </ul>
              </div>
              <svg viewBox="0 0 180 110" className="hidden sm:block w-44 h-28" aria-hidden>
                <defs>
                  <linearGradient id="mk-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#d4a94f" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#d4a94f" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 95 L30 82 L60 86 L90 60 L120 66 L150 34 L180 14 L180 110 L0 110 Z" fill="url(#mk-fill)" />
                <motion.path
                  d="M0 95 L30 82 L60 86 L90 60 L120 66 L150 34 L180 14"
                  fill="none"
                  stroke="#e4c27a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                />
                <circle cx="180" cy="14" r="4" fill="#e4c27a" />
              </svg>
            </SpotlightCard>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/[0.08] pt-10">
          <p className="font-display text-xl text-fg-inv">لديك مشروع في أحد هذه المجالات؟</p>
          <ButtonLink href="#contact">ابدأ مشروعك معنا</ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
