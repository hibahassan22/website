import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Phone, ArrowLeft } from 'lucide-react'

export default function AgencyCTA() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const mx = useMotionValue(0); const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 22 })
  const sy = useSpring(my, { stiffness: 40, damping: 22 })

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    mx.set(e.clientX - r.left - r.width / 2)
    my.set(e.clientY - r.top - r.height / 2)
  }

  return (
    <section id="contact" ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'linear-gradient(135deg,#0e0c08 0%,#1c1608 50%,#0e0c08 100%)' }}
      onMouseMove={handleMove}
    >
      {/* Mouse glow */}
      <motion.div className="pointer-events-none absolute inset-0"
        style={{ background: useTransform([
          useTransform(sx, [-600, 600], ['35%', '65%']),
          useTransform(sy, [-400, 400], ['35%', '65%']),
        ], ([gx, gy]) => `radial-gradient(ellipse 55% 55% at ${gx} ${gy}, rgba(201,168,76,0.18) 0%, transparent 65%)`) }}
      />

      {/* Orbiting rings */}
      {[300, 450, 600].map((sz, i) => (
        <motion.div key={i} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: sz, height: sz, border: `1px ${i === 1 ? 'dashed' : 'solid'} rgba(201,168,76,${0.08 - i * 0.02})` }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }} />
      ))}

      {/* Corner glows */}
      <motion.div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(201,168,76,0.2) 0%,transparent 70%)', filter: 'blur(50px)' }}
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(232,201,122,0.15) 0%,transparent 70%)', filter: 'blur(40px)' }}
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.25, 1] }}
        transition={{ duration: 6, delay: 2, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.4) 1px,transparent 1px)', backgroundSize: '55px 55px' }} />

      {/* Particles */}
      {Array.from({ length: 20 }, (_, i) => ({ x: `${5+(i*19)%90}%`, y: `${5+(i*23)%90}%`, s: 1.5+(i%3), dur: 4+(i%5), del: (i*0.38)%6 }))
        .map((p, i) => (
          <motion.div key={i} className="pointer-events-none absolute rounded-full"
            style={{ left:p.x, top:p.y, width:p.s, height:p.s, background:i%2===0?'rgba(201,168,76,0.9)':'rgba(232,201,122,0.6)', boxShadow:'0 0 6px rgba(201,168,76,0.6)' }}
            animate={{ y:[0,-28,0], opacity:[0,1,0], scale:[0.3,1,0.3] }}
            transition={{ duration:p.dur, delay:p.del, repeat:Infinity, ease:'easeInOut' }} />
        ))}

      <div className="ag-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden p-10 md:p-16"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(201,168,76,0.2)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 100px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%,rgba(201,168,76,0.1),transparent 60%)' }} />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left */}
            <div className="flex flex-col gap-4 md:max-w-lg text-center md:text-right">
              {/* Phone icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mr-0 md:ml-auto"
                style={{ background: 'linear-gradient(135deg,#c9a84c,#a07830)', boxShadow: '0 0 30px rgba(201,168,76,0.5)' }}
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Phone className="w-7 h-7 text-white" />
              </motion.div>

              <motion.h2 className="text-3xl md:text-5xl font-black leading-tight" style={{ color: '#f5f0e8' }}>
                تسعير مرن يناسب{' '}
                <motion.span
                  style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c97a,#c9a84c)', backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                  أهدافك وميزانيتك
                </motion.span>
              </motion.h2>

              <p className="text-base leading-relaxed" style={{ color: 'rgba(245,240,232,0.55)' }}>
                مهما كانت أهداف نشاطك التجاري، نضمن لك استخداماً أمثل لميزانيتك التسويقية وعائداً ينعكس مباشرة على نمو أعمالك.
              </p>
            </div>

            {/* Right — CTA buttons */}
            <div className="flex flex-col gap-4 shrink-0">
              <motion.a href="https://wa.me/966536282377" target="_blank" rel="noreferrer"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c97a,#a07830)', boxShadow: '0 0 40px rgba(201,168,76,0.45)' }}
                whileHover={{ scale: 1.07, boxShadow: '0 0 75px rgba(201,168,76,0.7)' }}
                whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}
              >
                <motion.span className="absolute inset-0"
                  style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.32) 50%,transparent 70%)' }}
                  animate={{ x: ['-130%', '240%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }} />
                <span className="relative">اطلب عرض سعر</span>
                <ArrowLeft className="w-4 h-4 relative transition-transform group-hover:-translate-x-1.5" />
              </motion.a>

              <motion.a href="tel:+201070899672"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold"
                style={{ border: '1px solid rgba(201,168,76,0.3)', color: 'rgba(245,240,232,0.7)', background: 'rgba(255,255,255,0.04)' }}
                whileHover={{ borderColor: 'rgba(201,168,76,0.6)', color: '#f5f0e8', scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}
              >
                <Phone className="w-4 h-4" />
                اتصل بنا الآن
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
