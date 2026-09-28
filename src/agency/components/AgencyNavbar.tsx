import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import adlexLogo from '../../assets/imgi_49_ADLEX-V1PNG-1024x552.png'

const links = [
  { label: 'الرئيسية',   href: '#hero' },
  { label: 'من نحن',     href: '#about' },
  { label: 'خدماتنا',   href: '#services' },
  { label: 'كيف نعمل',  href: '#process' },
  { label: 'أعمالنا',   href: '#projects' },
  { label: 'تواصل معنا',href: '#contact' },
]

export default function AgencyNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('#hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`) }),
      { threshold: 0.3 },
    )
    links.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background:     scrolled ? 'rgba(248,247,244,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom:   scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
      }}
    >
      <nav className="ag-inner px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <button
          type="button"
          onClick={() => go('#hero')}
          className="cursor-pointer bg-transparent border-0 p-0"
        >
          <img
            src={adlexLogo}
            alt="أدلكس"
            className="h-10 w-auto object-contain transition-all duration-300"
            style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
          />
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ label, href }) => (
            <li key={href}>
              <button
                type="button"
                onClick={() => go(href)}
                className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-transparent border-0"
                style={{ color: active === href
                  ? (scrolled ? 'var(--color-text)' : '#fff')
                  : (scrolled ? 'var(--color-muted)' : 'rgba(245,240,232,0.65)') }}
              >
                {active === href && (
                  <motion.span
                    layoutId="ag-nav-active"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: scrolled ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(201,168,76,0.25)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); go('#contact') }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg,#c9a84c,#a07830)',
            boxShadow:  '0 4px 20px rgba(201,168,76,0.35)',
          }}
        >
          تواصل معنا
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: scrolled ? 'var(--color-muted)' : 'rgba(245,240,232,0.8)' }}
          aria-label="القائمة"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(248,247,244,0.97)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map(({ label, href }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => go(href)}
                  className="w-full text-right px-4 py-3 rounded-lg text-sm font-semibold bg-transparent border-0 transition-colors"
                  style={{
                    color:      active === href ? 'var(--color-text)' : 'var(--color-muted)',
                    background: active === href ? 'rgba(201,168,76,0.08)' : 'transparent',
                  }}
                >
                  {label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); go('#contact') }}
                className="mt-2 text-center py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#c9a84c,#a07830)' }}
              >
                تواصل معنا
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
