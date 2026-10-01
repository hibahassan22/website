import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectCoverflow, Keyboard, A11y } from 'swiper/modules'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import img30 from '../../assets/imgi_30_WhatsApp_Image_2026-08-29_at_12.43.29_PM-removebg-preview.png'
import img31 from '../../assets/imgi_31_WhatsApp_Image_2026-08-29_at_12.43.18_PM-removebg-preview.png'
import img32 from '../../assets/imgi_32_WhatsApp_Image_2026-08-29_at_12.43.25_PM-removebg-preview.png'
import img33 from '../../assets/imgi_33_WhatsApp_Image_2026-08-24_at_1.38.15_PM-removebg-preview.png'
import img34 from '../../assets/imgi_34_WhatsApp_Image_2026-08-29_at_12.43.22_PM-removebg-preview.png'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'
import { EASE_OUT, VIEWPORT } from '../lib/motion'

const reasons = [
  {
    img: img33, title: 'تجربة برمجية متقدمة',
    desc: 'نقدّم لك تجربة تقنية احترافية باستخدام أحدث لغات البرمجة المعتمدة عالمياً، مما يضمن أعلى مستويات الجودة والكفاءة.',
    stat: '5+', statLabel: 'لغات برمجة',
  },
  {
    img: img31, title: 'دعم مستمر وصيانة متكاملة',
    desc: 'نوفر دعماً فنياً مستمراً وصيانة دورية على مدار العام من خلال فريق متخصص يضمن استقرار وأمان موقعك.',
    stat: '24/7', statLabel: 'دعم متواصل',
  },
  {
    img: img32, title: 'مواكبة التطورات المستقبلية',
    desc: 'نبني مواقع بتقنيات مرنة وقابلة للتطوير بحيث تقدر تطور مشروعك بسهولة مع نمو أعمالك.',
    stat: '100%', statLabel: 'قابلية توسع',
  },
  {
    img: img34, title: 'تصميم مخصص لكل مشروع',
    desc: 'نصمم كل مشروع من الصفر بناءً على دراسة دقيقة لاحتياجاتك ونشاطك التجاري لنطلع بنتيجة تعكس هويتك.',
    stat: '0', statLabel: 'قوالب جاهزة',
  },
  {
    img: img30, title: 'تحسين محركات البحث SEO',
    desc: 'نراعي في جميع خدماتنا أساسيات تصميم المواقع المتوافقة مع محركات البحث لرفع ترتيب موقعك.',
    stat: '#1', statLabel: 'ترتيب جوجل',
  },
]

// Loop + centered coverflow needs more slides than are visible, so the set is rendered twice
const slides = [...reasons, ...reasons]
const AUTOPLAY_MS = 4500

function ReasonCard({ r, index }: { r: typeof reasons[0]; index: number }) {
  return (
    <article
      className="group h-full flex flex-col rounded-[28px] p-3 bg-white border border-ink-900/[0.07]
        shadow-[0_1px_2px_rgba(11,16,32,0.04),0_8px_24px_-16px_rgba(11,16,32,0.12)]
        opacity-45 saturate-50 transition-[opacity,filter,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        in-[.swiper-slide-active]:opacity-100 in-[.swiper-slide-active]:saturate-100
        in-[.swiper-slide-active]:border-gold-500/30
        in-[.swiper-slide-active]:shadow-[0_1px_2px_rgba(11,16,32,0.04),0_40px_80px_-30px_rgba(11,16,32,0.35),0_0_0_6px_rgba(212,169,79,0.06)]"
    >
      <div className="relative h-52 sm:h-60 rounded-[20px] bg-paper overflow-hidden grid place-items-center">
        <div className="absolute inset-0 bg-grid-light opacity-70 mask-radial" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(212,169,79,0.2),transparent_70%)] opacity-40 transition-opacity duration-700 in-[.swiper-slide-active]:opacity-100" aria-hidden />
        <span className="absolute top-4 start-4 t-num text-xs font-medium text-fg-subtle bg-white/80 backdrop-blur px-2.5 py-1 rounded-full border border-ink-900/[0.06]">
          {String(index + 1).padStart(2, '0')} / {String(reasons.length).padStart(2, '0')}
        </span>
        <img
          src={r.img}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="relative h-[78%] w-auto object-contain scale-90 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] in-[.swiper-slide-active]:scale-100 in-[.swiper-slide-active]:group-hover:-translate-y-2"
        />
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-baseline gap-2.5">
          <span className="t-num text-[2.25rem] font-semibold leading-none text-fg" dir="ltr">{r.stat}</span>
          <span className="text-[0.8rem] text-fg-subtle">{r.statLabel}</span>
        </div>
        <div>
          <h3 className="font-display text-[1.3rem] sm:text-[1.45rem] font-semibold text-fg mb-2 leading-snug">{r.title}</h3>
          <p className="text-[0.95rem] leading-relaxed text-fg-muted">{r.desc}</p>
        </div>
      </div>
    </article>
  )
}

export default function AgencyWhyUs() {
  const swiperRef = useRef<SwiperType | null>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  const togglePlay = () => {
    const s = swiperRef.current
    if (!s) return
    if (playing) s.autoplay.stop()
    else s.autoplay.start()
    setPlaying(p => !p)
  }

  return (
    <section id="why-us" className="relative bg-paper section-y overflow-hidden">
      <div className="absolute inset-x-0 top-1/3 h-[480px] bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(212,169,79,0.10),transparent_70%)] pointer-events-none" aria-hidden />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-10 lg:mb-12">
          <SectionHeading
            className="lg:col-span-7"
            index="05"
            eyebrow="ليش تختار أدلكس؟"
            title={<>لأننا نبني <span className="text-gold-deep">مستقبلك الرقمي</span></>}
          />
          <Reveal className="lg:col-span-5 lg:ps-10" delay={0.1}>
            <p className="t-lead text-fg-muted">
              نقدم حلولاً تقنية متكاملة تضمن نجاح مشروعك على المدى الطويل — من أول سطر كود حتى آخر تحديث.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal>
          <div className="no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto mb-10 lg:mb-14">
            <ul className="flex w-max sm:w-auto sm:flex-wrap gap-2 p-1.5 rounded-full sm:rounded-[22px] bg-white border border-ink-900/[0.07] shadow-[0_1px_2px_rgba(11,16,32,0.04)]">
              {reasons.map((r, i) => (
                <li key={r.title}>
                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    aria-current={active === i ? 'true' : undefined}
                    className={`relative px-4 py-2 rounded-full text-[0.875rem] font-medium whitespace-nowrap cursor-pointer bg-transparent border-0 transition-colors duration-300
                      ${active === i ? 'text-fg-inv' : 'text-fg-muted hover:text-fg'}`}
                  >
                    {active === i && (
                      <motion.span
                        layoutId="whyus-tab"
                        className="absolute inset-0 rounded-full bg-ink-900"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative">{r.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Carousel */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 1, ease: EASE_OUT }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[8vw] z-10 bg-linear-to-r from-paper to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[8vw] z-10 bg-linear-to-l from-paper to-transparent" aria-hidden />

        <Swiper
          modules={[Autoplay, EffectCoverflow, Keyboard, A11y]}
          effect="coverflow"
          coverflowEffect={{ rotate: 0, stretch: -24, depth: 140, modifier: 1, scale: 0.92, slideShadows: false }}
          slidesPerView="auto"
          centeredSlides
          loop
          speed={900}
          grabCursor
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: true }}
          a11y={{ prevSlideMessage: 'السابق', nextSlideMessage: 'التالي' }}
          onSwiper={s => { swiperRef.current = s }}
          onSlideChange={s => setActive(s.realIndex % reasons.length)}
          onAutoplayTimeLeft={(_s, _time, progress) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${1 - progress})`
          }}
          className="!overflow-visible !py-4"
        >
          {slides.map((r, i) => (
            <SwiperSlide key={`${r.title}-${i}`} className="!w-[84%] sm:!w-[420px] lg:!w-[460px] !h-auto">
              <ReasonCard r={r} index={i % reasons.length} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Controls */}
      <div className="container-x relative mt-10 lg:mt-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-end gap-2 shrink-0" aria-live="polite">
            <div className="relative h-9 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  className="t-num block text-[2.25rem] leading-none font-semibold text-fg"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                >
                  {String(active + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="t-num text-sm text-fg-subtle pb-1">/ {String(reasons.length).padStart(2, '0')}</span>
          </div>

          <div className="relative flex-1 h-[2px] rounded-full bg-ink-900/10 overflow-hidden">
            <span
              ref={progressRef}
              className="absolute inset-0 rounded-full bg-linear-to-l from-gold-400 to-gold-600 origin-right"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={togglePlay}
              className="hidden sm:grid place-items-center w-11 h-11 rounded-full border border-ink-900/10 bg-white text-fg-muted cursor-pointer transition-all hover:text-fg hover:border-ink-900/25"
              aria-label={playing ? 'إيقاف التشغيل التلقائي' : 'تشغيل تلقائي'}
            >
              {playing ? <Pause className="w-4 h-4" aria-hidden /> : <Play className="w-4 h-4" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="grid place-items-center w-12 h-12 rounded-full border border-ink-900/10 bg-white text-fg cursor-pointer transition-all duration-300 hover:bg-ink-900 hover:text-fg-inv hover:border-transparent hover:-translate-y-0.5"
              aria-label="السابق"
            >
              <ArrowRight className="w-4 h-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="grid place-items-center w-12 h-12 rounded-full bg-ink-900 text-fg-inv cursor-pointer transition-all duration-300 hover:bg-gold-500 hover:text-ink-950 hover:-translate-y-0.5 shadow-[0_10px_24px_-12px_rgba(11,16,32,0.6)]"
              aria-label="التالي"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
            </button>
          </div>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href="#contact" variant="ink">ابدأ مشروعك معنا</ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
