import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Phone, ArrowLeft, Mail, MessageCircle } from 'lucide-react'
import heroBg from '../../assets/imgi_90_WhatsApp-Image-2026-08-18-at-4.33.07-PM.jpg'
import { SplitWords, Reveal } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/Button'

function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.div style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset} className="w-full sm:w-auto">
      {children}
    </motion.div>
  )
}

function trackGlow(e: PointerEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--gx', `${e.clientX - r.left}px`)
  el.style.setProperty('--gy', `${e.clientY - r.top}px`)
}

const contacts = [
  { icon: MessageCircle, label: 'واتساب',          value: '+966 53 628 2377', href: 'https://wa.me/966536282377' },
  { icon: Phone,         label: 'اتصل بنا',        value: '+20 107 089 9672', href: 'tel:+201070899672' },
  { icon: Mail,          label: 'البريد الإلكتروني', value: 'adlexagency@gmail.com', href: 'mailto:adlexagency@gmail.com' },
]

export default function AgencyCTA() {
  return (
    <section id="contact" className="relative bg-paper py-[clamp(4rem,8vw,7rem)]">
      <div className="container-x">
        <motion.div
          onPointerMove={trackGlow}
          className="relative isolate overflow-hidden rounded-[32px] sm:rounded-[40px] bg-ink-950 text-fg-inv grain [--gx:70%] [--gy:20%]"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={heroBg} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-[0.18]" aria-hidden />
          <div className="absolute inset-0 -z-10 bg-grid-dark mask-radial opacity-70" aria-hidden />
          <div
            className="absolute inset-0 -z-10 transition-opacity duration-500"
            style={{ background: 'radial-gradient(600px circle at var(--gx) var(--gy), rgba(212,169,79,0.18), transparent 60%)' }}
            aria-hidden
          />
          <div className="absolute -z-10 -bottom-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gold-500/[0.12] blur-[120px]" aria-hidden />

          <div className="px-6 sm:px-12 lg:px-20 pt-16 sm:pt-24 pb-10 sm:pb-12">
            <Reveal>
              <span className="pill pill-dark mb-8">
                <span className="live-dot" />
                تسعير مرن يناسب أهدافك وميزانيتك
              </span>
            </Reveal>

            <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.12] text-[clamp(2.6rem,7.5vw,6.25rem)] mb-8">
              <SplitWords text="لديك فكرة؟" className="block text-fg-inv" />
              <SplitWords text="لنصنع منها شيئاً استثنائياً." className="block" wordClassName="text-gold" delay={0.2} />
            </h2>

            <div className="grid lg:grid-cols-12 gap-10 items-end">
              <Reveal className="lg:col-span-6" delay={0.1}>
                <p className="t-lead text-fg-inv-muted max-w-xl">
                  مهما كانت أهداف نشاطك التجاري، نضمن لك استخداماً أمثل لميزانيتك التسويقية وعائداً
                  ينعكس مباشرة على نمو أعمالك.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end" delay={0.15}>
                <Magnetic>
                  <a href="https://wa.me/966536282377" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg w-full sm:w-auto">
                    <span>اطلب عرض سعر</span>
                    <ArrowLeft className="btn-icon w-5 h-5" aria-hidden />
                  </a>
                </Magnetic>
                <ButtonLink href="tel:+201070899672" size="lg" variant="ghost-dark" icon={null} leadingIcon={Phone} className="w-full sm:w-auto">
                  اتصل بنا الآن
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 border-t border-white/[0.08] mx-6 sm:mx-12 lg:mx-20 mb-6 sm:mb-8">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex items-center gap-4 py-6 sm:px-6 first:sm:ps-0 border-b sm:border-b-0 sm:border-e last:border-0 border-white/[0.08]"
              >
                <span className="grid place-items-center w-10 h-10 rounded-full border border-white/10 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-ink-950 group-hover:border-transparent shrink-0">
                  <Icon className="w-4 h-4" aria-hidden />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="text-[0.78rem] text-fg-inv-subtle">{label}</span>
                  <span className="text-[0.95rem] text-fg-inv truncate group-hover:text-gold-300 transition-colors"><bdi dir="ltr">{value}</bdi></span>
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
