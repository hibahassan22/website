import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Phone } from 'lucide-react'
import adlexLogo from '../../assets/imgi_49_ADLEX-V1PNG-1024x552.png'
import { EASE_OUT, scrollToId } from '../lib/motion'

const links = [
  { label: 'الرئيسية',   href: '#hero' },
  { label: 'من نحن',     href: '#about' },
  { label: 'خدماتنا',   href: '#services' },
  { label: 'كيف نعمل',  href: '#process' },
  { label: 'تواصل معنا',href: '#contact' },
]

export default function AgencyNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('#hero')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`) }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    scrollToId(href)
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 inset-x-0 h-[2px] z-[60] origin-right bg-linear-to-l from-gold-400 to-gold-600"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50 pointer-events-none"
      >
        <div className={`container-x transition-[padding] duration-500 ${scrolled ? 'pt-3' : 'pt-5'}`}>
          <nav
            className={`pointer-events-auto flex items-center justify-between gap-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${scrolled
                ? 'h-16 ps-5 pe-2.5 bg-ink-950/75 border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl'
                : 'h-[4.5rem] ps-2 pe-0 bg-transparent border border-transparent'}`}
            aria-label="التنقل الرئيسي"
          >
            <button
              type="button"
              onClick={() => go('#hero')}
              className="shrink-0 cursor-pointer bg-transparent border-0 p-0"
              aria-label="أدلكس — العودة للأعلى"
            >
              <img
                src={adlexLogo}
                alt="أدلكس"
                className={`w-auto object-contain brightness-0 invert transition-all duration-500 ${scrolled ? 'h-8' : 'h-9'}`}
              />
            </button>

            <ul className="hidden lg:flex items-center gap-0.5 p-1 rounded-full border border-white/[0.07] bg-white/[0.03]">
              {links.slice(0, -1).map(({ label, href }) => {
                const isActive = active === href
                return (
                  <li key={href}>
                    <button
                      type="button"
                      onClick={() => go(href)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative px-4 py-2 rounded-full text-[0.9rem] font-medium cursor-pointer bg-transparent border-0 transition-colors duration-300
                        ${isActive ? 'text-ink-950' : 'text-fg-inv-muted hover:text-fg-inv'}`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-fg-inv"
                          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); go('#contact') }}
                className="btn btn-primary btn-sm hidden sm:inline-flex"
              >
                <span>ابدأ مشروعك</span>
                <ArrowLeft className="btn-icon w-4 h-4" aria-hidden />
              </a>

              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="lg:hidden relative grid place-items-center w-11 h-11 rounded-full border border-white/12 bg-white/5 text-fg-inv cursor-pointer"
                aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">القائمة</span>
                <span className={`absolute h-[1.5px] w-4.5 bg-current rounded-full transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
                <span className={`absolute h-[1.5px] w-4.5 bg-current rounded-full transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden bg-ink-950/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-grid-dark mask-radial opacity-60" aria-hidden />
            <div className="relative h-full container-x flex flex-col pt-28 pb-10">
              <motion.ul
                className="flex flex-col"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              >
                {links.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }}
                    className="border-b border-white/[0.07]"
                  >
                    <button
                      type="button"
                      onClick={() => go(href)}
                      className="w-full flex items-center justify-between py-4 bg-transparent border-0 cursor-pointer text-start"
                    >
                      <span className={`font-display text-[1.75rem] font-semibold ${active === href ? 'text-gold-400' : 'text-fg-inv'}`}>
                        {label}
                      </span>
                      <span className="t-num text-sm text-fg-inv-subtle">0{i + 1}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-auto flex flex-col gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: EASE_OUT }}
              >
                <a href="#contact" onClick={e => { e.preventDefault(); go('#contact') }} className="btn btn-primary btn-lg w-full">
                  <span>ابدأ مشروعك</span>
                  <ArrowLeft className="btn-icon w-5 h-5" aria-hidden />
                </a>
                <a href="tel:+201070899672" className="btn btn-ghost-dark btn-lg w-full">
                  <Phone className="w-4 h-4" aria-hidden />
                  <span dir="ltr">+20 107 089 9672</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
