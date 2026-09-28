import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import officeImg from '../../assets/imgi_2_adlex_office_sign.webp'

const pillars = [
  { title: 'دعم أقوى',     desc: 'فريق متخصص يشمل مديري حسابات ومسوّقين ومطورين — دائماً في الخدمة بلا تأخير.' },
  { title: 'استمرار أطول', desc: 'ندير الدومينات والتجديدات لضمان بقاء موقعك فعّالاً ومرئياً على الدوام.' },
  { title: 'خبرة أعلى',   desc: 'استراتيجيات متقدمة مخصصة لكل مشروع، مبنية على خبرة حقيقية وبيانات دقيقة.' },
]

const PARTICLES = [
  { x: '8%',  y: '15%', size: 5, dur: 6.2, delay: 0   },
  { x: '22%', y: '72%', size: 4, dur: 7.8, delay: 1.1 },
  { x: '55%', y: '10%', size: 6, dur: 5.5, delay: 0.6 },
  { x: '75%', y: '60%', size: 4, dur: 8.1, delay: 2.0 },
  { x: '88%', y: '25%', size: 5, dur: 6.9, delay: 0.3 },
  { x: '42%', y: '85%', size: 3, dur: 7.4, delay: 1.7 },
  { x: '65%', y: '40%', size: 4, dur: 9.0, delay: 0.9 },
]

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return count
}

export default function AgencyAbout() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const imageRef = useRef<HTMLDivElement>(null)
  const rawX     = useMotionValue(0)
  const rawY     = useMotionValue(0)
  const tiltX    = useSpring(rawX, { stiffness: 300, damping: 16 })
  const tiltY    = useSpring(rawY, { stiffness: 300, damping: 16 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageRef.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
    rawX.set(dy * -8); rawY.set(dx * 8)
  }
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); setImgHovered(false) }

  const [imgHovered,    setImgHovered]    = useState(false)
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)
  const count = useCounter(3, 1600, inView)

  const blurSlide = (delay = 0) => ({
    initial:    { opacity: 0, y: 40, filter: 'blur(8px)' },
    animate:    inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="about" ref={sectionRef} className="ag-section relative overflow-hidden"
      style={{ background: 'var(--color-surface)' }}>

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] opacity-20"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(201,168,76,0.45) 0%, transparent 65%)', filter: 'blur(40px)' }} />

      {/* ── Animated background elements ── */}

      {/* Orbiting ring top-left */}
      <motion.div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10"
        style={{ border: '1px solid rgba(201,168,76,0.6)' }}
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 18, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 rounded-full opacity-10"
        style={{ border: '1px dashed rgba(201,168,76,0.5)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting ring bottom-right */}
      <motion.div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
        style={{ border: '1px solid rgba(201,168,76,0.5)' }}
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 22, repeat: Infinity, ease: 'linear' }, scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
      />

      {/* Horizontal scan lines */}
      {[20, 50, 78].map((y, i) => (
        <motion.div key={i} className="pointer-events-none absolute inset-x-0 h-px opacity-0"
          style={{ top: `${y}%`, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),rgba(232,201,122,0.7),rgba(201,168,76,0.4),transparent)' }}
          animate={{ opacity: [0, 0.6, 0], scaleX: [0.2, 1, 0.2] }}
          transition={{ duration: 3, delay: i * 2.2, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
        />
      ))}

      {/* Diagonal lines */}
      <motion.div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.04]">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div key={i}
            className="absolute h-px origin-left"
            style={{
              width: '140%', top: `${15 + i * 18}%`, left: '-20%',
              background: 'linear-gradient(90deg,transparent,#c9a84c,transparent)',
              transform: 'rotate(-8deg)',
            }}
            animate={{ x: ['-10%', '10%', '-10%'], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 6 + i * 0.8, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* Pulsing corner glows */}
      <motion.div className="pointer-events-none absolute top-0 right-0 w-64 h-64 rounded-full opacity-0"
        style={{ background: 'radial-gradient(circle,rgba(201,168,76,0.2) 0%,transparent 70%)', filter: 'blur(30px)' }}
        animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-0"
        style={{ background: 'radial-gradient(circle,rgba(232,201,122,0.15) 0%,transparent 70%)', filter: 'blur(25px)' }}
        animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 5, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div key={i} className="pointer-events-none absolute rounded-full"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size,
            background: 'radial-gradient(circle,#e8c97a 0%,#c9a84c 100%)',
            boxShadow: '0 0 6px rgba(201,168,76,0.7)' }}
          animate={{ y: [0,-18,0,18,0], opacity: [0.4,0.9,0.5,0.9,0.4], scale: [1,1.3,1,0.8,1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(rgba(201,168,76,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="ag-inner relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── IMAGE ── */}
          <motion.div ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setImgHovered(true)}
          >
            {/* Ambient glow */}
            <motion.div className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none"
              animate={{ opacity: imgHovered ? 0.55 : 0.22, scale: imgHovered ? 1.06 : 1 }}
              transition={{ duration: 0.45 }}
              style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.4) 0%,rgba(232,201,122,0.2) 60%,transparent 100%)' }} />

            {/* Corner brackets */}
            {(['tl','tr','bl','br'] as const).map(c => {
              const isTop = c.startsWith('t'); const isLeft = c.endsWith('l')
              return (
                <motion.div key={c} className="absolute pointer-events-none"
                  style={{
                    top: isTop ? -10 : undefined, bottom: !isTop ? -10 : undefined,
                    left: isLeft ? -10 : undefined, right: !isLeft ? -10 : undefined,
                    width: 36, height: 36,
                    borderTop:    isTop  ? '2.5px solid' : undefined,
                    borderBottom: !isTop ? '2.5px solid' : undefined,
                    borderLeft:   isLeft ? '2.5px solid' : undefined,
                    borderRight:  !isLeft? '2.5px solid' : undefined,
                    borderColor: 'rgba(201,168,76,0.7)',
                    borderRadius: c==='tl'?'6px 0 0 0':c==='tr'?'0 6px 0 0':c==='bl'?'0 0 0 6px':'0 0 6px 0',
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: imgHovered ? 1 : 0.45, scale: imgHovered ? 1.12 : 1 } : {}}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 16 }} />
              )
            })}

            {/* Image frame */}
            <motion.div className="relative overflow-hidden rounded-2xl"
              animate={{ boxShadow: imgHovered
                ? '0 32px 100px rgba(0,0,0,0.22), 0 0 60px rgba(201,168,76,0.35), 0 0 0 1.5px rgba(201,168,76,0.6)'
                : '0 24px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(201,168,76,0.12)' }}
              transition={{ duration: 0.45 }}
            >
              <motion.img src={officeImg} alt="مكتب أدلكس" style={{ y: imgY }}
                className="w-full h-[420px] lg:h-[520px] object-cover scale-[1.12]" draggable={false} />

              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top,rgba(8,10,24,0.55) 0%,transparent 55%)' }} />

              {/* Shimmer sweep */}
              <AnimatePresence>
                {imgHovered && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-110%', opacity: 0 }}
                    animate={{ x: '130%',  opacity: 1 }}
                    exit={{    x: '130%',  opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.13) 50%,transparent 70%)', width: '60%' }} />
                )}
              </AnimatePresence>

              {/* Logo badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.16,1,0.3,1] }}
                whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(201,168,76,0.25), 0 0 24px rgba(201,168,76,0.2)', transition: { type:'spring',stiffness:300,damping:16 } }}
                className="absolute bottom-5 right-5 flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer"
                style={{ background:'rgba(255,255,255,0.12)', backdropFilter:'blur(18px)', border:'1px solid rgba(201,168,76,0.35)', boxShadow:'0 4px 20px rgba(201,168,76,0.12)' }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background:'linear-gradient(135deg,#c9a84c,#a07830)', boxShadow:'0 0 12px rgba(201,168,76,0.5)' }}>
                  <span className="text-white text-xs font-black">A</span>
                </div>
                <div>
                  <p className="text-xs font-bold leading-none mb-0.5" style={{ color: 'var(--color-text)' }}>أدلكس</p>
                  <p className="text-[10px]" style={{ color:'var(--color-muted)' }}>شريكك التقني الأول</p>
                </div>
              </motion.div>

              {/* Stat badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.16,1,0.3,1] }}
                whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(201,168,76,0.25), 0 0 24px rgba(201,168,76,0.2)', transition: { type:'spring',stiffness:300,damping:16 } }}
                className="absolute top-5 left-5 px-4 py-2.5 rounded-xl text-center cursor-pointer"
                style={{ background:'rgba(255,255,255,0.12)', backdropFilter:'blur(18px)', border:'1px solid rgba(201,168,76,0.35)', boxShadow:'0 4px 20px rgba(201,168,76,0.12)' }}
              >
                <p className="text-lg font-black"
                  style={{ background:'linear-gradient(135deg,#c9a84c,#e8c97a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  +{count} سنوات
                </p>
                <p className="text-[10px]" style={{ color:'var(--color-muted)' }}>من الخبرة</p>
              </motion.div>
            </motion.div>

            {/* Dots cluster */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 pointer-events-none opacity-40"
              style={{ backgroundImage:'radial-gradient(rgba(201,168,76,0.7) 1.5px, transparent 1.5px)', backgroundSize:'10px 10px' }} />
          </motion.div>

          {/* ── CONTENT ── */}
          <div className="flex flex-col gap-6">
            <motion.div {...blurSlide(0)}>
              <span className="ag-badge">من نحن؟</span>
            </motion.div>

            <motion.h2 {...blurSlide(0.1)} className="text-3xl md:text-5xl font-black leading-tight"
              style={{ color:'var(--color-text)' }}>
              عن{' '}
              <motion.span
                style={{ background:'linear-gradient(135deg,#c9a84c 0%,#e8c97a 40%,#c9a84c 60%,#a07830 100%)', backgroundSize:'250% 250%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'inline-block' }}
                animate={{ backgroundPosition:['0% 50%','100% 50%','0% 50%'] }}
                transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              >أدلكس</motion.span>
            </motion.h2>

            <motion.p {...blurSlide(0.18)} className="text-base md:text-lg leading-relaxed"
              style={{ color:'var(--color-muted)' }}>
              أدلكس هي شركة حلول برمجية رائدة، وتُعدّ من أبرز شركات تصميم المواقع الإلكترونية
              في السعودية وعلى مستوى دول الخليج. نؤمن بأن الويب أداة قوية وفعّالة لبناء حضور
              رقمي مميز، ومساعدة الأنشطة التجارية على الانطلاق وتحقيق أهدافها باحترافية.
            </motion.p>

            {/* Divider */}
            <motion.div {...blurSlide(0.24)} className="flex">
              <div className="relative h-px w-36 overflow-hidden rounded-full" style={{ background:'rgba(201,168,76,0.18)' }}>
                <motion.div className="absolute inset-y-0 w-1/2 rounded-full"
                  style={{ background:'linear-gradient(90deg,transparent,#c9a84c,#e8c97a,#c9a84c,transparent)' }}
                  animate={{ x:['-100%','250%'] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut', repeatDelay:0.6 }} />
              </div>
            </motion.div>

            {/* Pillars */}
            <motion.div {...blurSlide(0.3)} className="flex flex-col gap-4">
              {pillars.map((p, i) => {
                const isHov = hoveredPillar === i
                return (
                  <motion.div key={p.title}
                    initial={{ opacity:0, x:40, filter:'blur(6px)' }}
                    animate={inView ? { opacity:1, x:0, filter:'blur(0px)' } : {}}
                    transition={{ delay:0.38+i*0.13, duration:0.75, ease:[0.16,1,0.3,1] }}
                    onHoverStart={() => setHoveredPillar(i)}
                    onHoverEnd={()   => setHoveredPillar(null)}
                    className="relative flex items-start gap-3 p-4 rounded-2xl overflow-hidden"
                    style={{ background:'var(--color-surface-2)', border:'1px solid var(--color-border)' }}
                    whileHover={{ borderColor:'rgba(201,168,76,0.35)', background:'rgba(201,168,76,0.04)', x:-4,
                      boxShadow:'0 8px 40px rgba(0,0,0,0.07), 0 0 20px rgba(201,168,76,0.1)',
                      transition:{ type:'spring', stiffness:300, damping:16 } }}
                  >
                    {/* Gold left border */}
                    <motion.div className="absolute top-0 right-0 bottom-0 w-[3px] rounded-l-full"
                      style={{ background:'linear-gradient(180deg,#c9a84c,#e8c97a,#a07830)' }}
                      initial={{ scaleY:0, originY:0 }}
                      animate={{ scaleY: isHov ? 1 : 0 }}
                      transition={{ type:'spring', stiffness:300, damping:16 }} />

                    {/* Icon */}
                    <motion.div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background:'rgba(201,168,76,0.10)', border:'1px solid rgba(201,168,76,0.28)' }}
                      animate={ isHov ? { rotate:12, scale:1.18, background:'rgba(201,168,76,0.18)' } : { rotate:0, scale:1, background:'rgba(201,168,76,0.10)' } }
                      transition={{ type:'spring', stiffness:300, damping:16 }}
                    >
                      <CheckCircle className="w-4 h-4" style={{ color: isHov ? '#e8c97a' : '#c9a84c', transition:'color 0.3s' }} />
                    </motion.div>

                    <div>
                      <motion.p className="text-sm font-bold mb-0.5"
                        animate={{ color: isHov ? '#1a1814' : 'var(--color-text)' }}
                        transition={{ duration:0.25 }}>{p.title}</motion.p>
                      <motion.p className="text-xs leading-relaxed"
                        animate={{ color: isHov ? 'rgba(26,24,20,0.75)' : 'var(--color-muted)' }}
                        transition={{ duration:0.25 }}>{p.desc}</motion.p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA */}
            <motion.div {...blurSlide(0.52)}>
              <motion.a href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }) }}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white overflow-hidden"
                style={{ background:'linear-gradient(135deg,#c9a84c 0%,#e8c97a 50%,#a07830 100%)', boxShadow:'0 0 36px rgba(201,168,76,0.35), 0 4px 18px rgba(0,0,0,0.18)' }}
                whileHover={{ scale:1.06, boxShadow:'0 0 70px rgba(201,168,76,0.6), 0 8px 28px rgba(0,0,0,0.22)' }}
                whileTap={{ scale:0.96 }}
                transition={{ type:'spring', stiffness:300, damping:16 }}
              >
                <motion.span className="absolute inset-0 pointer-events-none"
                  style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.32) 50%,transparent 70%)' }}
                  animate={{ x:['-130%','240%'] }}
                  transition={{ duration:2.0, repeat:Infinity, repeatDelay:1.8, ease:'easeInOut' }} />
                <motion.span className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{ boxShadow:['inset 0 0 0px rgba(255,255,255,0)','inset 0 0 20px rgba(255,255,255,0.12)','inset 0 0 0px rgba(255,255,255,0)'] }}
                  transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }} />
                <span className="relative">تواصل معنا الآن</span>
                <ArrowLeft className="w-4 h-4 relative transition-transform group-hover:-translate-x-1.5" />
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
