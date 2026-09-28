import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import img30 from '../../assets/imgi_30_WhatsApp_Image_2026-08-29_at_12.43.29_PM-removebg-preview.png'
import img31 from '../../assets/imgi_31_WhatsApp_Image_2026-08-29_at_12.43.18_PM-removebg-preview.png'
import img32 from '../../assets/imgi_32_WhatsApp_Image_2026-08-29_at_12.43.25_PM-removebg-preview.png'
import img33 from '../../assets/imgi_33_WhatsApp_Image_2026-08-24_at_1.38.15_PM-removebg-preview.png'
import img34 from '../../assets/imgi_34_WhatsApp_Image_2026-08-29_at_12.43.22_PM-removebg-preview.png'

const reasons = [
  {
    img:   img33,
    title: 'تجربة برمجية متقدمة',
    desc:  'نقدّم لك تجربة تقنية احترافية باستخدام أحدث لغات البرمجة المعتمدة عالمياً، مما يضمن أعلى مستويات الجودة والكفاءة.',
    stat: '5+',  statLabel: 'لغات برمجة',
    color: '#c9a84c',
  },
  {
    img:   img31,
    title: 'دعم مستمر وصيانة متكاملة',
    desc:  'نوفر دعماً فنياً مستمراً وصيانة دورية على مدار العام من خلال فريق متخصص يضمن استقرار وأمان موقعك.',
    stat: '24/7', statLabel: 'دعم متواصل',
    color: '#e8c97a',
  },
  {
    img:   img32,
    title: 'مواكبة التطورات المستقبلية',
    desc:  'نبني مواقع بتقنيات مرنة وقابلة للتطوير بحيث تقدر تطور مشروعك بسهولة مع نمو أعمالك.',
    stat: '100%', statLabel: 'قابلية توسع',
    color: '#c9a84c',
  },
  {
    img:   img34,
    title: 'تصميم مخصص لكل مشروع',
    desc:  'نصمم كل مشروع من الصفر بناءً على دراسة دقيقة لاحتياجاتك ونشاطك التجاري لنطلع بنتيجة تعكس هويتك.',
    stat: '0',   statLabel: 'قوالب جاهزة',
    color: '#e8c97a',
  },
  {
    img:   img30,
    title: 'تحسين محركات البحث SEO',
    desc:  'نراعي في جميع خدماتنا أساسيات تصميم المواقع المتوافقة مع محركات البحث لرفع ترتيب موقعك.',
    stat: '#1',  statLabel: 'ترتيب جوجل',
    color: '#c9a84c',
  },
]

/* ── 3D tilt card ── */
function WhyCard({ r, i, inView }: { r: typeof reasons[0]; i: number; inView: boolean }) {
  const [hov, setHov] = useState(false)
  const cx = useMotionValue(0); const cy = useMotionValue(0)
  const rx = useSpring(useTransform(cy, [-70, 70], [8, -8]), { stiffness: 300, damping: 20 })
  const ry = useSpring(useTransform(cx, [-70, 70], [-8, 8]), { stiffness: 300, damping: 20 })
  const imgX = useTransform(cx, [-70, 70], [-8, 8])
  const imgY2 = useTransform(cy, [-70, 70], [-8, 8])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    cx.set(e.clientX - rect.left - rect.width / 2)
    cy.set(e.clientY - rect.top - rect.height / 2)
  }
  const onLeave = () => { cx.set(0); cy.set(0); setHov(false) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={() => setHov(true)}
      className="relative flex flex-col overflow-hidden rounded-3xl cursor-default"
    >
      {/* Card background */}
      <motion.div className="absolute inset-0 rounded-3xl"
        animate={{
          background: hov
            ? 'linear-gradient(145deg,rgba(255,255,255,0.98),rgba(250,246,238,0.95))'
            : 'linear-gradient(145deg,rgba(255,255,255,0.88),rgba(248,244,236,0.82))',
          boxShadow: hov
            ? `0 40px 100px rgba(0,0,0,0.12), 0 0 60px ${r.color}22, 0 0 0 1.5px ${r.color}60, inset 0 1px 0 rgba(255,255,255,1)`
            : `0 8px 40px rgba(0,0,0,0.07), 0 0 0 1px rgba(201,168,76,0.14), inset 0 1px 0 rgba(255,255,255,0.8)`,
          backdropFilter: 'blur(20px)',
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Dynamic mouse glow */}
      <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: useTransform([
            useTransform(cx, [-70, 70], ['30%', '70%']),
            useTransform(cy, [-70, 70], ['20%', '80%']),
          ], ([gx, gy]) => `radial-gradient(ellipse 65% 55% at ${gx} ${gy}, ${r.color}18, transparent 70%)`),
          opacity: hov ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* Gold top border slide */}
      <motion.div className="absolute top-0 inset-x-0 h-[3px] rounded-t-3xl overflow-hidden"
        style={{ background: `linear-gradient(90deg,transparent,${r.color},#e8c97a,${r.color},transparent)` }}
        animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Image area */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(145deg,${r.color}08,${r.color}04)` }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(${r.color} 1px,transparent 1px)`, backgroundSize: '20px 20px' }} />

        {/* Glow behind image */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 60% at 50% 60%, ${r.color}20, transparent 70%)` }}
          animate={{ opacity: hov ? 1 : 0.5, scale: hov ? 1.2 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Floating image with parallax */}
        <motion.img
          src={r.img} alt={r.title}
          style={{ x: imgX, y: imgY2 }}
          className="relative z-10 h-36 w-auto object-contain"
          animate={{
            filter: hov
              ? `drop-shadow(0 8px 30px ${r.color}60)`
              : `drop-shadow(0 4px 16px ${r.color}30)`,
            scale: hov ? 1.12 : 1,
            y: hov ? -6 : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        />

        {/* Stat badge */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-xl"
          style={{ background: `${r.color}18`, border: `1px solid ${r.color}40` }}
          animate={{ scale: hov ? 1.08 : 1, y: hov ? -2 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
        >
          <span className="text-base font-black block leading-none" style={{
            background: `linear-gradient(135deg,${r.color},#e8c97a)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{r.stat}</span>
          <span className="text-[9px] font-bold" style={{ color: r.color }}>{r.statLabel}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 p-6">
        <motion.h3 className="text-lg font-black"
          animate={{ color: hov ? r.color : '#1a1408' }}
          transition={{ duration: 0.25 }}
        >{r.title}</motion.h3>

        <p className="text-sm leading-relaxed" style={{ color: '#6b6457' }}>{r.desc}</p>

        {/* Bottom bar */}
        <div className="h-0.5 rounded-full overflow-hidden mt-2" style={{ background: `${r.color}15` }}>
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg,${r.color},${r.color}70)` }}
            animate={{ width: hov ? '100%' : '25%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {hov && (
            <motion.div className="absolute inset-y-0 w-8 rounded-full"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)' }}
              animate={{ x: ['-20px', '300px'] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 0.3 }}
            />
          )}
        </div>

        {/* Learn more */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1.5 text-xs font-bold"
          style={{ color: r.color }}
        >
          اعرف أكثر
          <ArrowLeft className="w-3 h-3" />
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─── Main ─── */
export default function AgencyWhyUs() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const blurUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 32, filter: 'blur(8px)' },
    animate:    inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="why-us" ref={ref}
      className="ag-section relative overflow-hidden"
      style={{ background: 'var(--color-surface-2)' }}
    >
      {/* ── BG ── */}
      <motion.div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle at 80% 20%,rgba(201,168,76,0.18) 0%,transparent 65%)', filter: 'blur(60px)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(232,201,122,0.12) 0%,transparent 70%)', filter: 'blur(50px)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, delay: 2, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Orbiting rings */}
      <motion.div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.06]"
        style={{ border: '1.5px solid rgba(201,168,76,0.7)' }}
        animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-[0.05]"
        style={{ border: '1px dashed rgba(201,168,76,0.6)' }}
        animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />

      {/* Energy lines */}
      {[22, 55, 82].map((y, i) => (
        <motion.div key={i} className="pointer-events-none absolute inset-x-0 h-px"
          style={{ top: `${y}%`, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.35),rgba(232,201,122,0.5),rgba(201,168,76,0.35),transparent)' }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, delay: i * 2.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }} />
      ))}

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(rgba(201,168,76,0.8) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Particles */}
      {Array.from({ length: 14 }, (_, i) => ({ x: `${6 + (i * 21) % 88}%`, y: `${8 + (i * 27) % 84}%`, s: 2 + (i % 2), dur: 4 + (i % 4), del: (i * 0.5) % 5 }))
        .map((p, i) => (
          <motion.div key={i} className="pointer-events-none absolute rounded-full"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: i % 2 === 0 ? 'rgba(201,168,76,0.7)' : 'rgba(232,201,122,0.5)', boxShadow: '0 0 5px rgba(201,168,76,0.5)' }}
            animate={{ y: [0, -22, 0], opacity: [0, 0.8, 0], scale: [0.4, 1, 0.4] }}
            transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: 'easeInOut' }} />
        ))}

      {/* ── Content ── */}
      <div className="ag-inner relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div {...blurUp(0)} className="flex justify-center mb-4">
            <motion.span className="ag-badge cursor-default"
              whileHover={{ scale: 1.07, boxShadow: '0 0 20px rgba(201,168,76,0.2)' }}>
              <motion.span className="w-2 h-2 rounded-full shrink-0 mr-1" style={{ background: '#c9a84c' }}
                animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              ليش تختار أدلكس؟
            </motion.span>
          </motion.div>

          <motion.h2 {...blurUp(0.1)} className="text-4xl md:text-6xl font-black leading-tight mb-4"
            style={{ color: 'var(--color-text)' }}>
            لأننا نبني{' '}
            <motion.span
              style={{ background: 'linear-gradient(135deg,#c9a84c 0%,#e8c97a 45%,#c9a84c 100%)', backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              مستقبلك الرقمي
            </motion.span>
          </motion.h2>

          <motion.p {...blurUp(0.18)} className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            نقدم حلولاً تقنية متكاملة تضمن نجاح مشروعك على المدى الطويل — مرّر على أي بطاقة لتعرف أكثر.
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

        {/* First row — 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {reasons.slice(0, 3).map((r, i) => (
            <WhyCard key={r.title} r={r} i={i} inView={inView} />
          ))}
        </div>

        {/* Second row — 2 cards centered */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {reasons.slice(3).map((r, i) => (
            <WhyCard key={r.title} r={r} i={i + 3} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div {...blurUp(0.6)} className="flex justify-center">
          <motion.a href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-white overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c97a,#a07830)', boxShadow: '0 0 40px rgba(201,168,76,0.4)' }}
            whileHover={{ scale: 1.07, boxShadow: '0 0 75px rgba(201,168,76,0.65)' }}
            whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}
          >
            <motion.span className="absolute inset-0"
              style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.3) 50%,transparent 70%)' }}
              animate={{ x: ['-130%', '240%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }} />
            <motion.span className="absolute inset-0 rounded-xl"
              animate={{ boxShadow: ['inset 0 0 0px rgba(255,255,255,0)', 'inset 0 0 22px rgba(255,255,255,0.15)', 'inset 0 0 0px rgba(255,255,255,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }} />
            <span className="relative">ابدأ مشروعك معنا</span>
            <ArrowLeft className="w-4 h-4 relative transition-transform group-hover:-translate-x-1.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
