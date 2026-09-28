import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Code2, Globe, ShoppingCart, Palette, Megaphone, MessageSquare, Layers, Smartphone, ArrowLeft } from 'lucide-react'
import servicesImg from '../../assets/imgi_7_ChatGPT-Image-Aug-18-2026-11_10_54-PM.png'

const ORBIT_R = 400

const services = [
  { icon: Globe,         title: 'تصميم المواقع',       desc: 'مواقع تعريفية ومتاجر وصفحات هبوط احترافية متوافقة مع محركات البحث وسريعة التحميل.', color: '#c9a84c', angle: 0   },
  { icon: Code2,         title: 'تطوير الويب',          desc: 'تطبيقات ويب سريعة وقابلة للتوسع باستخدام React وNext.js وأحدث التقنيات.', color: '#e8c97a', angle: 45  },
  { icon: Smartphone,    title: 'تطبيقات الموبايل',    desc: 'تطبيقات iOS وAndroid بأداء native وتجربة مستخدم استثنائية مع Flutter.', color: '#c9a84c', angle: 90  },
  { icon: Palette,       title: 'هوية تجارية',          desc: 'هوية بصرية مميزة تعكس علامتك التجارية وتترك انطباعاً لا يُنسى لدى عملائك.', color: '#e8c97a', angle: 135 },
  { icon: ShoppingCart,  title: 'المتاجر الإلكترونية', desc: 'متاجر متكاملة مع بوابات دفع وشحن وإدارة منتجات لا نهائية بتجربة شراء سلسة.', color: '#c9a84c', angle: 180 },
  { icon: MessageSquare, title: 'واتساب API',           desc: 'ربط WhatsApp Business API للتسويق الفوري والتواصل المباشر مع عملائك لزيادة المبيعات.', color: '#e8c97a', angle: 225 },
  { icon: Megaphone,     title: 'التسويق الرقمي',       desc: 'استراتيجيات SEO وسوشيال ميديا ومحتوى رقمي يحقق نتائج حقيقية وقابلة للقياس.', color: '#c9a84c', angle: 270 },
  { icon: Layers,        title: 'جرافيك ديزاين',        desc: 'تصميمات بصرية مبتكرة وجذابة لتعزيز هوية علامتك التجارية عبر جميع المنصات.', color: '#e8c97a', angle: 315 },
]

function deg2rad(deg: number) { return (deg * Math.PI) / 180 }

/* ─── Flip Card Orbit Item ─── */
function OrbitItem({ s, index, inView }: { s: typeof services[0]; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false)
  const Icon = s.icon
  const rad = deg2rad(s.angle)
  const x   = Math.cos(rad) * ORBIT_R
  const y   = Math.sin(rad) * ORBIT_R

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x, y }}
      animate={inView ? { opacity: 1, scale: 1, x, y } : { opacity: 0, scale: 0, x, y }}
      transition={{ duration: 0.85, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="absolute cursor-default"
      style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
    >
      {/* Flip container */}
      <div style={{ perspective: 900, width: 136, height: 136 }}>
        <motion.div
          style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
          animate={{ rotateY: hov ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── FRONT ── */}
          <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
            className="flex flex-col items-center gap-2">
            {/* Pulse rings */}
            <motion.div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: `1.5px solid ${s.color}35` }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.5, delay: index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: `1px solid ${s.color}20` }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, delay: index * 0.3 + 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Circle */}
            <motion.div
              className="w-34 h-34 rounded-full flex items-center justify-center"
              style={{
                width: 136, height: 136,
                background: `linear-gradient(135deg, ${s.color}22, ${s.color}0a)`,
                border: `2px solid ${s.color}55`,
                boxShadow: `0 0 28px ${s.color}35, inset 0 0 18px ${s.color}12`,
              }}
            >
              <Icon className="w-12 h-12" style={{ color: `${s.color}dd` }} />
            </motion.div>

            {/* Label */}
            <span className="text-xs font-bold text-center leading-tight mt-1"
              style={{ color: 'rgba(245,240,232,0.85)', maxWidth: 110 }}>{s.title}</span>
          </div>

          {/* ── BACK — white bg ── */}
          <motion.div
            style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0, rotateY: 180 }}
            className="flex flex-col items-center justify-center"
          >
            {/* White glowing circle */}
            <motion.div
              style={{
                width: 136, height: 136,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#ffffff,#f5f0e8)',
                border: `2.5px solid ${s.color}`,
                boxShadow: `0 0 50px ${s.color}80, 0 0 100px ${s.color}35, inset 0 0 20px rgba(201,168,76,0.1)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4, padding: '14px',
              }}
            >
              <Icon className="w-8 h-8 shrink-0" style={{ color: s.color }} />
              <span className="text-[10px] font-black text-center leading-tight" style={{ color: '#1a1408' }}>
                {s.title}
              </span>
            </motion.div>

            {/* Info card below */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 8 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              style={{
                position: 'absolute',
                top: '108%',
                width: 200,
                zIndex: 50,
                background: '#ffffff',
                border: `1.5px solid ${s.color}60`,
                borderRadius: 16,
                padding: '12px 14px',
                boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 0 30px ${s.color}20`,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px rounded-full"
                style={{ background: `linear-gradient(90deg,transparent,${s.color},transparent)` }} />
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}40` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                </div>
                <span className="text-xs font-black" style={{ color: '#1a1408' }}>{s.title}</span>
              </div>
              <p className="text-[10px] leading-relaxed" style={{ color: '#6b6457' }}>{s.desc}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Connector line */}
      <motion.div className="absolute pointer-events-none -z-10"
        style={{
          width: ORBIT_R - 78, height: 1,
          background: `linear-gradient(90deg, transparent, ${s.color}25)`,
          left: '50%', top: '50%',
          translateY: '-50%',
          rotate: `${s.angle}deg`,
          transformOrigin: 'left center',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5 + index * 0.08, duration: 0.7 }}
      />
    </motion.div>
  )
}

/* ─── Main ─── */
export default function AgencyServices() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section id="services" ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'linear-gradient(160deg,#0e0c08 0%,#1a1408 40%,#0e0c08 100%)' }}
    >
      {/* ── BG ── */}
      <motion.div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 900, height: 900, background: 'radial-gradient(circle,rgba(201,168,76,0.18) 0%,transparent 65%)', filter: 'blur(70px)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />

      {[500, 680, 840].map((sz, i) => (
        <motion.div key={i} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: sz, height: sz, border: `1px ${i === 1 ? 'dashed' : 'solid'} rgba(201,168,76,${0.07 - i * 0.015})` }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 25 + i * 8, repeat: Infinity, ease: 'linear' }} />
      ))}

      <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.4) 1px,transparent 1px)', backgroundSize: '55px 55px' }} />

      {[18, 48, 78].map((y, i) => (
        <motion.div key={i} className="pointer-events-none absolute inset-x-0 h-px"
          style={{ top: `${y}%`, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),rgba(232,201,122,0.8),rgba(201,168,76,0.5),transparent)' }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, delay: i * 2.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }} />
      ))}

      <motion.div className="pointer-events-none absolute inset-x-0 h-px opacity-10"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.7),transparent)' }}
        animate={{ top: ['0%', '100%'] }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }} />

      {Array.from({ length: 28 }, (_, i) => ({ x: `${4 + (i * 17) % 92}%`, y: `${5 + (i * 23) % 90}%`, s: 1.5 + (i % 3), dur: 4 + (i % 5), del: (i * 0.38) % 6 }))
        .map((p, i) => (
          <motion.div key={i} className="pointer-events-none absolute rounded-full"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: i % 2 === 0 ? 'rgba(201,168,76,0.9)' : 'rgba(232,201,122,0.6)', boxShadow: '0 0 6px rgba(201,168,76,0.6)' }}
            animate={{ y: [0, -28, 0], opacity: [0, 1, 0], scale: [0.3, 1, 0.3] }}
            transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: 'easeInOut' }} />
        ))}

      {/* ── Content ── */}
      <div className="ag-inner relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            className="flex justify-center mb-4">
            <motion.span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.35)', color: '#e8c97a' }}
              whileHover={{ scale: 1.07 }}>
              <motion.span className="w-2 h-2 rounded-full" style={{ background: '#c9a84c' }}
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              خدماتنا
            </motion.span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-6xl font-black leading-tight mb-4"
            style={{ color: '#f5f0e8' }}>
            مساعدة الشركات{' '}
            <motion.span
              style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)', backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              في جميع المجالات
            </motion.span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.18 }}
            className="text-base max-w-xl mx-auto" style={{ color: 'rgba(245,240,232,0.45)' }}>
            مرّر على أي خدمة لتعرف أكثر — عملاؤنا شركاؤنا في كل خطوة نجاح.
          </motion.p>
        </div>

        {/* Orbit */}
        <div className="relative flex items-center justify-center mx-auto"
          style={{ height: 980, width: '100%', maxWidth: 980 }}>

          {/* Orbit rings */}
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ width: ORBIT_R * 2 + 80, height: ORBIT_R * 2 + 80, border: '1px dashed rgba(201,168,76,0.15)', left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
            animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ width: ORBIT_R * 2 + 20, height: ORBIT_R * 2 + 20, border: '1px solid rgba(201,168,76,0.07)', left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
            animate={{ rotate: -360 }} transition={{ duration: 100, repeat: Infinity, ease: 'linear' }} />

          {/* Center image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
            animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 flex items-center justify-center"
            style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
          >
            {/* Inner rings */}
            {[170, 230].map((sz, i) => (
              <motion.div key={i} className="absolute rounded-full pointer-events-none"
                style={{ width: sz, height: sz, border: `1.5px ${i === 0 ? 'solid' : 'dashed'} rgba(201,168,76,${0.25 - i * 0.08})` }}
                animate={{ rotate: i === 0 ? 360 : -360 }}
                transition={{ duration: 8 + i * 5, repeat: Infinity, ease: 'linear' }} />
            ))}

            <motion.div style={{ y: imgY }}
              whileHover={{ scale: 1.12, filter: 'drop-shadow(0 0 70px rgba(201,168,76,0.9))' }}
              transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            >
              <img src={servicesImg} alt="خدمات أدلكس"
                className="w-64 h-64 object-contain relative z-10"
                style={{ filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.6))' }} />
            </motion.div>

            <motion.div className="absolute inset-0 rounded-full -z-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(201,168,76,0.4),transparent 60%)', filter: 'blur(32px)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
          </motion.div>

          {/* Orbit items */}
          {services.map((s, i) => (
            <OrbitItem key={s.title} s={s} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1, duration: 0.7 }}
          className="flex justify-center mt-4">
          <motion.a href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-white overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c97a,#a07830)', boxShadow: '0 0 50px rgba(201,168,76,0.45)' }}
            whileHover={{ scale: 1.07, boxShadow: '0 0 80px rgba(201,168,76,0.7)' }}
            whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}
          >
            <motion.span className="absolute inset-0"
              style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.32) 50%,transparent 70%)' }}
              animate={{ x: ['-130%', '240%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }} />
            <span className="relative">ابدأ مشروعك معنا</span>
            <ArrowLeft className="w-4 h-4 relative transition-transform group-hover:-translate-x-1.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
