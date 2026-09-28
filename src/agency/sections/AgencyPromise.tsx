import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Phone, Shield, RefreshCw, Star } from 'lucide-react'

const pillars = [
  {
    icon: Shield, num: '24', numSub: 'ساعة دعم', title: 'دعم أقوى',
    desc: 'نوفر دعماً فنياً وتسويقياً متكاملاً من خلال فريق متخصص يشمل مديري حسابات ومسوّقين، لمتابعة طلباتك وتقديم التعديلات والاستشارات بشكل مستمر.',
    color: '#c9a84c', glow: 'rgba(201,168,76,0.22)', from: '#c9a84c', to: '#e8c97a',
  },
  {
    icon: RefreshCw, num: '100', numSub: '٪ استمرارية', title: 'استمرار أطول',
    desc: 'نحرص على استمرارية مشاريع عملائنا من خلال إدارة الدومينات وتجديدها بشكل يضمن بقاء موقعك الإلكتروني فعّالاً لفترة طويلة.',
    color: '#a07830', glow: 'rgba(160,120,48,0.22)', from: '#a07830', to: '#c9a84c',
  },
  {
    icon: Star, num: '3+', numSub: 'سنوات خبرة', title: 'خبرة أعلى',
    desc: 'نقدم خبرات متقدمة في تنفيذ استراتيجيات مخصصة لكل مشروع، مع فريق متخصص في البرمجة والتصميم، لنضمن لك أعلى جودة في التنفيذ.',
    color: '#e8c97a', glow: 'rgba(232,201,122,0.22)', from: '#e8c97a', to: '#c9a84c',
  },
]

/* ── Animated counter ── */
function Counter({ target, inView }: { target: string; inView: boolean }) {
  const num = parseInt(target)
  const hasSuffix = target.includes('+') || target.includes('٪')
  const suffix = target.replace(String(num), '')
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let cur = 0
    const step = () => {
      cur += Math.ceil(num / 50)
      if (cur >= num) { setVal(num); return }
      setVal(cur); requestAnimationFrame(step)
    }
    const t = setTimeout(() => requestAnimationFrame(step), 600)
    return () => clearTimeout(t)
  }, [inView, num])
  return <>{val}{hasSuffix ? suffix : ''}</>
}

/* ── Pillar card ── */
function PillarCard({ p, index, inView }: { p: typeof pillars[0]; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false)
  const Icon = p.icon
  const cx = useMotionValue(0); const cy = useMotionValue(0)
  const rx = useSpring(useTransform(cy, [-90,90], [8,-8]), { stiffness:300, damping:20 })
  const ry = useSpring(useTransform(cx, [-90,90], [-8,8]), { stiffness:300, damping:20 })
  const glowLx = useTransform(cx, [-90,90], ['30%','70%'])
  const glowLy = useTransform(cy, [-90,90], ['30%','70%'])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    cx.set(e.clientX - r.left - r.width/2)
    cy.set(e.clientY - r.top  - r.height/2)
  }
  const onLeave = () => { cx.set(0); cy.set(0); setHov(false) }

  return (
    <motion.div
      initial={{ opacity:0, y:70, filter:'blur(12px)', scale:0.95 }}
      animate={inView ? { opacity:1, y:0, filter:'blur(0px)', scale:1 } : {}}
      transition={{ duration:0.9, delay:index*0.16, ease:[0.16,1,0.3,1] }}
      style={{ rotateX:rx, rotateY:ry, transformPerspective:900, transformStyle:'preserve-3d' }}
      onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={()=>setHov(true)}
      className="relative flex flex-col gap-5 p-8 rounded-3xl cursor-default overflow-hidden group"
    >
      {/* Glass bg */}
      <motion.div className="absolute inset-0 rounded-3xl transition-all"
        animate={{
          background: hov
            ? 'linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,255,255,0.88))'
            : 'linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.52))',
          boxShadow: hov
            ? `0 40px 100px rgba(0,0,0,0.12), 0 0 80px ${p.glow}, 0 0 0 1.5px ${p.color}55, inset 0 1px 0 rgba(255,255,255,0.9)`
            : `0 8px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(201,168,76,0.14), inset 0 1px 0 rgba(255,255,255,0.6)`,
          backdropFilter: 'blur(24px)',
        }}
        transition={{ duration:0.4 }}
      />

      {/* Dynamic inner glow following mouse */}
      <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: useTransform([glowLx, glowLy],
            ([gx,gy]) => `radial-gradient(ellipse 60% 60% at ${gx} ${gy}, ${p.glow}, transparent 70%)`
          ),
          opacity: hov ? 1 : 0,
        }}
        transition={{ opacity:{ duration:0.3 } }}
      />

      {/* Top glow blob */}
      <motion.div className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
        style={{ background:`radial-gradient(circle,${p.glow},transparent 70%)`, filter:'blur(20px)' }}
        animate={{ scale: hov ? 2.2 : 1, opacity: hov ? 1 : 0.35, x: hov ? -10 : 0, y: hov ? 10 : 0 }}
        transition={{ duration:0.5 }}
      />

      {/* Number */}
      <motion.div className="relative z-10"
        animate={{ y: hov ? -6 : 0, scale: hov ? 1.05 : 1 }}
        transition={{ type:'spring', stiffness:300, damping:16 }}
      >
        <span className="text-6xl font-black leading-none"
          style={{
            background:`linear-gradient(135deg,${p.from} 0%,${p.to} 100%)`,
            backgroundSize:'200% 200%',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            filter: hov ? `drop-shadow(0 0 20px ${p.color}60)` : 'none',
            transition:'filter 0.3s',
          }}
        ><Counter target={p.num} inView={inView} /></span>
        <span className="block text-sm font-bold mt-1" style={{ color:p.color }}>{p.numSub}</span>
      </motion.div>

      {/* Icon */}
      <motion.div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ background:`linear-gradient(135deg,${p.from}18,${p.to}30)`, border:`1.5px solid ${p.color}35` }}
        animate={{
          rotate: hov ? 12 : 0, scale: hov ? 1.18 : 1,
          boxShadow: hov ? `0 8px 30px ${p.glow}, 0 0 0 2px ${p.color}30` : '0 2px 8px rgba(0,0,0,0.06)',
        }}
        transition={{ type:'spring', stiffness:300, damping:16 }}
      >
        <Icon className="w-6 h-6" style={{ color:p.color }} />
        <AnimatePresence>
          {hov && (
            <motion.div className="absolute inset-0 rounded-2xl"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ border:`1px dashed ${p.color}50` }}
            >
              <motion.div className="w-full h-full rounded-2xl"
                animate={{ rotate:360 }} transition={{ duration:3, repeat:Infinity, ease:'linear' }}
                style={{ border:`1px dashed ${p.color}50`, borderRadius:'inherit' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Text */}
      <div className="relative z-10">
        <motion.h3 className="text-xl font-black mb-2 transition-colors"
          animate={{ color: hov ? p.color : 'var(--color-text)' }}
          transition={{ duration:0.25 }}
        >{p.title}</motion.h3>
        <motion.p className="text-sm leading-relaxed"
          animate={{ color: hov ? 'var(--color-text)' : 'var(--color-muted)' }}
          transition={{ duration:0.25 }}
        >{p.desc}</motion.p>
      </div>

      {/* Bottom progress bar */}
      <div className="relative z-10 h-1 rounded-full overflow-hidden" style={{ background:'rgba(201,168,76,0.1)' }}>
        <motion.div className="absolute inset-y-0 left-0 rounded-full"
          style={{ background:`linear-gradient(90deg,${p.from},${p.to})`, boxShadow: hov ? `0 0 10px ${p.color}` : 'none' }}
          animate={{ width: hov ? '100%' : '25%' }}
          transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
        />
        {/* Shimmer on bar */}
        {hov && (
          <motion.div className="absolute inset-y-0 w-12 rounded-full"
            style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)' }}
            animate={{ x:['-50px','200%'] }}
            transition={{ duration:0.8, repeat:Infinity, repeatDelay:0.3, ease:'easeInOut' }}
          />
        )}
      </div>

      {/* Hover reveal tag */}
      <AnimatePresence>
        {hov && (
          <motion.div
            initial={{ opacity:0, y:8, scale:0.8 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:8, scale:0.8 }}
            transition={{ type:'spring', stiffness:400, damping:20 }}
            className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background:`${p.color}20`, border:`1px solid ${p.color}40`, color:p.color }}
          >
            ✦ ضمان أدلكس
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export default function AgencyPromise() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  const mx = useMotionValue(0); const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness:40, damping:22 })
  const sy = useSpring(my, { stiffness:40, damping:22 })

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    mx.set(e.clientX - r.left - r.width/2)
    my.set(e.clientY - r.top  - r.height/2)
  }

  const blurUp = (delay=0) => ({
    initial:    { opacity:0, y:32, filter:'blur(8px)' },
    animate:    inView ? { opacity:1, y:0, filter:'blur(0px)' } : {},
    transition: { duration:0.85, delay, ease:[0.16,1,0.3,1] as const },
  })

  return (
    <section id="promise" ref={ref}
      className="ag-section relative overflow-hidden"
      style={{ background:'var(--color-surface-2)' }}
      onMouseMove={handleMove}
    >
      {/* Mouse glow */}
      <motion.div className="pointer-events-none absolute inset-0"
        style={{ background: useTransform([
          useTransform(sx,[-600,600],['35%','65%']),
          useTransform(sy,[-400,400],['38%','62%']),
        ], ([gx,gy]) => `radial-gradient(ellipse 50% 50% at ${gx} ${gy}, rgba(201,168,76,0.1) 0%, transparent 70%)`) }}
      />

      {/* Orbiting rings */}
      {[
        { size:420, op:0.06, dur:22, dir:1,  top:'-top-24 -right-24' },
        { size:300, op:0.05, dur:15, dir:-1, top:'-top-14 -right-14' },
        { size:380, op:0.05, dur:28, dir:1,  top:'-bottom-20 -left-20' },
      ].map((r,i) => (
        <motion.div key={i}
          className={`pointer-events-none absolute rounded-full`}
          style={{
            width:r.size, height:r.size, opacity:r.op,
            border:`1.5px ${i===1?'dashed':'solid'} rgba(201,168,76,0.7)`,
            top: i<2 ? -96 : undefined, bottom: i===2 ? -80 : undefined,
            right: i<2 ? -96 : undefined, left: i===2 ? -80 : undefined,
          }}
          animate={{ rotate: r.dir===1 ? 360 : -360, scale:[1,1.06,1] }}
          transition={{ rotate:{ duration:r.dur, repeat:Infinity, ease:'linear' }, scale:{ duration:7, repeat:Infinity } }}
        />
      ))}

      {/* Pulsing rings center */}
      {[0,1.5,3].map((delay,i) => (
        <motion.div key={i} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width:300+i*220, height:300+i*220, border:'1px solid rgba(201,168,76,0.07)' }}
          animate={{ scale:[1,1.3,1], opacity:[0.5,0,0.5] }}
          transition={{ duration:5, delay, repeat:Infinity, ease:'easeInOut' }} />
      ))}

      {/* Pulsing corner glows */}
      <motion.div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full"
        style={{ background:'radial-gradient(circle,rgba(201,168,76,0.12) 0%,transparent 70%)', filter:'blur(50px)' }}
        animate={{ opacity:[0.3,0.8,0.3], scale:[1,1.25,1] }}
        transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }} />
      <motion.div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full"
        style={{ background:'radial-gradient(circle,rgba(232,201,122,0.1) 0%,transparent 70%)', filter:'blur(40px)' }}
        animate={{ opacity:[0.2,0.7,0.2], scale:[1,1.3,1] }}
        transition={{ duration:6, delay:2.5, repeat:Infinity, ease:'easeInOut' }} />

      {/* Energy lines */}
      {[18,48,78].map((y,i) => (
        <motion.div key={i} className="pointer-events-none absolute inset-x-0 h-px"
          style={{ top:`${y}%`, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.45),rgba(232,201,122,0.7),rgba(201,168,76,0.45),transparent)' }}
          animate={{ scaleX:[0,1,0], opacity:[0,0.55,0] }}
          transition={{ duration:3, delay:i*2.5, repeat:Infinity, repeatDelay:5, ease:'easeInOut' }} />
      ))}

      {/* Scan line */}
      <motion.div className="pointer-events-none absolute inset-x-0 h-px opacity-15"
        style={{ background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.6),transparent)', boxShadow:'0 0 10px rgba(201,168,76,0.3)' }}
        animate={{ top:['0%','100%'] }} transition={{ duration:8, repeat:Infinity, ease:'linear' }} />

      {/* Particles */}
      {Array.from({length:22},(_,i)=>({
        x:`${5+(i*19)%90}%`, y:`${8+(i*27)%84}%`,
        s:1.5+(i%3), dur:4+(i%5), del:(i*0.35)%5,
      })).map((p,i)=>(
        <motion.div key={i} className="pointer-events-none absolute rounded-full"
          style={{ left:p.x, top:p.y, width:p.s, height:p.s,
            background:i%2===0?'rgba(201,168,76,0.85)':'rgba(232,201,122,0.6)',
            boxShadow:'0 0 5px rgba(201,168,76,0.5)' }}
          animate={{ y:[0,-28,0], opacity:[0,1,0], scale:[0.3,1,0.3] }}
          transition={{ duration:p.dur, delay:p.del, repeat:Infinity, ease:'easeInOut' }} />
      ))}

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage:'radial-gradient(rgba(201,168,76,0.8) 1px,transparent 1px)', backgroundSize:'30px 30px' }} />

      {/* ══ CONTENT ══ */}
      <div className="ag-inner relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div {...blurUp(0)} className="flex justify-center mb-4">
            <motion.span className="ag-badge cursor-default"
              whileHover={{ scale:1.08, boxShadow:'0 0 20px rgba(201,168,76,0.2)' }}
              transition={{ type:'spring', stiffness:400 }}
            >
              <motion.span className="w-2 h-2 rounded-full shrink-0 mr-1" style={{ background:'#c9a84c' }}
                animate={{ scale:[1,1.7,1], opacity:[1,0.3,1] }} transition={{ duration:2, repeat:Infinity }} />
              وعدنا لك
            </motion.span>
          </motion.div>

          <motion.h2 {...blurUp(0.1)}
            className="text-4xl md:text-6xl font-black leading-tight mb-4"
            style={{ color:'var(--color-text)' }}
          >
            وعد{' '}
            <motion.span
              style={{ background:'linear-gradient(135deg,#c9a84c 0%,#e8c97a 45%,#c9a84c 100%)',
                backgroundSize:'200% 200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}
              animate={{ backgroundPosition:['0% 50%','100% 50%','0% 50%'] }}
              transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
            >أدلكس</motion.span>
          </motion.h2>

          <motion.p {...blurUp(0.18)}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color:'var(--color-muted)' }}
          >
            في أدلكس، نلتزم بتقديم قيمة حقيقية لكل مشروع من خلال أساس قوي مبني على الجودة
            والاحترافية. وعدنا يتمثل في ثلاث ركائز أساسية: دعم أقوى، استمرار أطول، وخبرة أعلى.
          </motion.p>

          <motion.div {...blurUp(0.22)} className="flex justify-center mt-7">
            <div className="relative h-px w-48 overflow-hidden rounded-full" style={{ background:'rgba(201,168,76,0.18)' }}>
              <motion.div className="absolute inset-y-0 w-1/2 rounded-full"
                style={{ background:'linear-gradient(90deg,transparent,#c9a84c,#e8c97a,#c9a84c,transparent)' }}
                animate={{ x:['-100%','250%'] }}
                transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut', repeatDelay:0.5 }} />
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7 mb-16">
          {pillars.map((p,i) => <PillarCard key={p.title} p={p} index={i} inView={inView} />)}
        </div>

        {/* CTAs */}
        <motion.div {...blurUp(0.55)} className="flex flex-wrap gap-4 justify-center">
          <motion.a href="#contact"
            onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}
            className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-white overflow-hidden"
            style={{ background:'linear-gradient(135deg,#c9a84c,#e8c97a,#a07830)', boxShadow:'0 0 40px rgba(201,168,76,0.4), 0 4px 20px rgba(0,0,0,0.1)' }}
            whileHover={{ scale:1.07, boxShadow:'0 0 75px rgba(201,168,76,0.65), 0 8px 30px rgba(0,0,0,0.12)' }}
            whileTap={{ scale:0.95 }} transition={{ type:'spring', stiffness:300, damping:16 }}
          >
            <motion.span className="absolute inset-0"
              style={{ background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.3) 50%,transparent 70%)' }}
              animate={{ x:['-130%','240%'] }}
              transition={{ duration:2, repeat:Infinity, repeatDelay:1.8, ease:'easeInOut' }} />
            <motion.span className="absolute inset-0 rounded-xl"
              animate={{ boxShadow:['inset 0 0 0px rgba(255,255,255,0)','inset 0 0 22px rgba(255,255,255,0.15)','inset 0 0 0px rgba(255,255,255,0)'] }}
              transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }} />
            <span className="relative">تواصل معنا</span>
            <ArrowLeft className="w-4 h-4 relative transition-transform group-hover:-translate-x-1.5" />
          </motion.a>

          <motion.a href="tel:+201070899672"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-semibold"
            style={{ border:'1px solid var(--color-border)', color:'var(--color-muted)', background:'var(--color-surface)' }}
            whileHover={{ borderColor:'rgba(201,168,76,0.45)', color:'var(--color-text)', scale:1.05,
              boxShadow:'0 4px 28px rgba(201,168,76,0.12), 0 0 0 1px rgba(201,168,76,0.2)' }}
            whileTap={{ scale:0.95 }} transition={{ type:'spring', stiffness:300, damping:16 }}
          >
            <motion.div whileHover={{ rotate:15, scale:1.2 }} transition={{ type:'spring', stiffness:400 }}>
              <Phone className="w-4 h-4" />
            </motion.div>
            اتصل بنا الآن
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
