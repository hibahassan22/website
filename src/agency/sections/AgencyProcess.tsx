import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { Search, Paintbrush, Code2, Rocket, HeartHandshake, ChevronRight, ChevronLeft } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const steps = [
  {
    num: '01', icon: Search,
    title: 'فهم البيزنس',
    desc: 'بندرس فكرتك كويس، بنفهم جمهورك، ونحلل منافسينك علشان نحط خطة تضمن نجاح موقعك.',
    color: '#c9a84c',
    detail: ['تحليل السوق والمنافسين', 'تحديد الجمهور المستهدف', 'وضع خطة استراتيجية متكاملة'],
  },
  {
    num: '02', icon: Paintbrush,
    title: 'أول انطباع هو كل حاجة',
    desc: 'تصميم UI/UX عصري يعكس هوية البراند بتاعتك، ويوفر تجربة سهلة ومريحة تساعد العميل يشتري.',
    color: '#e8c97a',
    detail: ['واجهة مستخدم عصرية', 'تجربة مستخدم سهلة وبديهية', 'تصميم متوافق مع الهوية البصرية'],
  },
  {
    num: '03', icon: Code2,
    title: 'موقع سريع زي الطلقة',
    desc: 'مبني بأحدث التقنيات، تحميله خيالي، ومعاه حماية كاملة لبياناتك.',
    color: '#c9a84c',
    detail: ['كود نظيف وقابل للتوسع', 'سرعة تحميل فائقة', 'حماية وأمان متقدم'],
  },
  {
    num: '04', icon: Rocket,
    title: 'جاهز يبيع من أول يوم',
    desc: 'بنختبر كل تفصيلة ونتأكد إن كل زرار شغال تمام، مع ربط كامل للدفع والشحن.',
    color: '#e8c97a',
    detail: ['اختبار شامل لكل الوظائف', 'ربط بوابات الدفع والشحن', 'إطلاق احترافي مضمون'],
  },
  {
    num: '05', icon: HeartHandshake,
    title: 'من أول يوم وإحنا معاك',
    desc: 'موقعك اتطلق وجاهز يبيع، ودعمنا مستمر علشان تركز في البيزنس وإحنا نهتم بالباقي.',
    color: '#c9a84c',
    detail: ['دعم فني على مدار الساعة', 'تحديثات دورية مجانية', 'مراقبة الأداء والأمان'],
  },
]

function StepCard({ s }: { s: typeof steps[0] }) {
  const [hov, setHov] = useState(false)
  const Icon = s.icon

  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex flex-col gap-5 p-8 rounded-3xl overflow-hidden h-full cursor-default"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        minHeight: 380,
      }}
      whileHover={{
        y: -6,
        borderColor: `${s.color}50`,
        boxShadow: `0 32px 80px rgba(0,0,0,0.1), 0 0 60px ${s.color}18`,
        transition: { type: 'spring', stiffness: 280, damping: 18 },
      }}
    >
      {/* Glow bg */}
      <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${s.color}14, transparent 65%)` }}
      />

      {/* Top gold line */}
      <motion.div className="absolute top-0 inset-x-0 h-[3px] rounded-t-3xl overflow-hidden"
        style={{ background: `linear-gradient(90deg,transparent,${s.color},#e8c97a,${s.color},transparent)` }}
        animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between">
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black"
          style={{
            background: `linear-gradient(135deg,${s.color}22,${s.color}0a)`,
            border: `1.5px solid ${s.color}40`,
            fontFamily: 'Inter, sans-serif',
          }}
          animate={hov ? { scale: 1.1, rotate: -6, boxShadow: `0 8px 28px ${s.color}40` } : { scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
        >
          <span style={{
            background: `linear-gradient(135deg,${s.color},#e8c97a)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{s.num}</span>
        </motion.div>

        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
          animate={hov ? { scale: 1.18, rotate: 10, boxShadow: `0 0 24px ${s.color}50` } : { scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
        >
          <Icon className="w-6 h-6" style={{ color: s.color }} />
        </motion.div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <motion.h3 className="text-xl font-black mb-3"
          animate={{ color: hov ? s.color : 'var(--color-text)' }}
          transition={{ duration: 0.25 }}
        >{s.title}</motion.h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-muted)' }}>{s.desc}</p>

        {/* Detail bullets */}
        <div className="flex flex-col gap-2">
          {s.detail.map((d, i) => (
            <motion.div key={d}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: hov ? 1 : 0.5, x: hov ? 0 : 10 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: s.color }}
                animate={hov ? { scale: 1.5 } : { scale: 1 }}
                transition={{ delay: i * 0.06 }}
              />
              <span className="text-xs font-medium" style={{ color: hov ? 'var(--color-text)' : 'var(--color-muted)' }}>{d}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 rounded-full overflow-hidden" style={{ background: `${s.color}15` }}>
        <motion.div className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg,${s.color},${s.color}70)` }}
          animate={{ width: hov ? '100%' : '30%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function AgencyProcess() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const blurUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 32, filter: 'blur(8px)' },
    animate:    inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="process" ref={ref} className="ag-section relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}>

      {/* BG */}
      <motion.div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse,rgba(201,168,76,0.22) 0%,transparent 70%)', filter: 'blur(70px)' }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

      {[18, 52, 84].map((y, i) => (
        <motion.div key={i} className="pointer-events-none absolute inset-x-0 h-px"
          style={{ top: `${y}%`, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),rgba(232,201,122,0.5),rgba(201,168,76,0.3),transparent)' }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, delay: i * 2.5, repeat: Infinity, repeatDelay: 5 }} />
      ))}

      <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(rgba(201,168,76,0.8) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {Array.from({ length: 12 }, (_, i) => ({ x: `${6+(i*21)%88}%`, y: `${8+(i*27)%84}%`, s: 2+(i%2), dur: 4+(i%4), del: (i*0.5)%5 }))
        .map((p, i) => (
          <motion.div key={i} className="pointer-events-none absolute rounded-full"
            style={{ left:p.x, top:p.y, width:p.s, height:p.s, background: i%2===0?'rgba(201,168,76,0.7)':'rgba(232,201,122,0.5)', boxShadow:'0 0 5px rgba(201,168,76,0.5)' }}
            animate={{ y:[0,-20,0], opacity:[0,0.8,0], scale:[0.4,1,0.4] }}
            transition={{ duration:p.dur, delay:p.del, repeat:Infinity, ease:'easeInOut' }} />
        ))}

      <div className="ag-inner relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div {...blurUp(0)} className="flex justify-center mb-4">
            <motion.span className="ag-badge cursor-default" whileHover={{ scale: 1.07 }}>
              <motion.span className="w-2 h-2 rounded-full shrink-0 mr-1" style={{ background: '#c9a84c' }}
                animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              خطواتنا لنجاح مشروعك
            </motion.span>
          </motion.div>

          <motion.h2 {...blurUp(0.1)} className="text-4xl md:text-6xl font-black leading-tight mb-4"
            style={{ color: 'var(--color-text)' }}>
            إحنا مش بنعمل موقع{' '}
            <motion.span
              style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)', backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              وبالص
            </motion.span>
          </motion.h2>

          <motion.p {...blurUp(0.18)} className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-muted)' }}>
            إحنا بنبنيه على خطة مدروسة علشان نضمن إن موقعك يطلع بأعلى جودة ويحقق أرقام ومبيعات من أول يوم.
          </motion.p>

          <motion.div {...blurUp(0.22)} className="flex justify-center mt-6">
            <div className="relative h-px w-48 overflow-hidden rounded-full" style={{ background: 'rgba(201,168,76,0.18)' }}>
              <motion.div className="absolute inset-y-0 w-1/2 rounded-full"
                style={{ background: 'linear-gradient(90deg,transparent,#c9a84c,#e8c97a,#c9a84c,transparent)' }}
                animate={{ x: ['-100%', '250%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }} />
            </div>
          </motion.div>
        </div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Custom nav buttons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.button ref={prevRef} type="button"
              className="swiper-prev-btn w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
              whileHover={{ scale: 1.1, borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c', boxShadow: '0 0 20px rgba(201,168,76,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <motion.button ref={nextRef} type="button"
              className="swiper-next-btn w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
              whileHover={{ scale: 1.1, borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c', boxShadow: '0 0 20px rgba(201,168,76,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false }}
            slidesPerView={1}
            spaceBetween={24}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, bulletClass: 'swiper-process-bullet', bulletActiveClass: 'swiper-process-bullet-active' }}
            navigation={{ prevEl: '.swiper-prev-btn', nextEl: '.swiper-next-btn' }}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: '52px' }}
          >
            {steps.map(s => (
              <SwiperSlide key={s.num} style={{ height: 'auto' }}>
                <StepCard s={s} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Swiper pagination styles */}
      <style>{`
        .swiper-process-bullet {
          width: 8px; height: 8px;
          border-radius: 999px;
          background: rgba(201,168,76,0.25);
          display: inline-block;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-process-bullet-active {
          width: 28px;
          background: linear-gradient(90deg,#c9a84c,#e8c97a);
          box-shadow: 0 0 12px rgba(201,168,76,0.5);
        }
      `}</style>
    </section>
  )
}
