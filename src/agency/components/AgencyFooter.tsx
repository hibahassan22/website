import { motion } from 'framer-motion'
import { Phone, Mail, Globe, GitBranch } from 'lucide-react'
import adlexLogo from '../../assets/imgi_49_ADLEX-V1PNG-1024x552.png'

const navLinks = [
  { label: 'الصفحة الرئيسية', href: '#hero' },
  { label: 'من نحن',           href: '#about' },
  { label: 'خدماتنا',          href: '#services' },
  { label: 'التسويق الإلكتروني', href: '#why-us' },
  { label: 'اتصل بنا',         href: '#contact' },
]

const contacts = [
  { icon: Phone,     label: '+201070899672',        href: 'tel:+201070899672' },
  { icon: Phone,     label: '+201036418899',        href: 'tel:+201036418899' },
  { icon: Phone,     label: '+966574269580',        href: 'tel:+966574269580' },
  { icon: Phone,     label: '+966536282377',        href: 'https://wa.me/966536282377' },
  { icon: Mail,      label: 'adlexagency@gmail.com', href: 'mailto:adlexagency@gmail.com' },
]

const socials = [
  { icon: GitBranch, href: '#',  label: 'GitHub',    bg: '#c9a84c' },
  { icon: Globe,     href: '#',  label: 'Website',   bg: '#a07830' },
  { icon: Mail,      href: 'mailto:adlexagency@gmail.com', label: 'Email', bg: '#c9a84c' },
  { icon: Phone,     href: 'https://wa.me/966536282377',   label: 'WhatsApp', bg: '#a07830' },
]

export default function AgencyFooter() {
  const go = (href: string) => {
    if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#0a0806', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
      {/* Top wave */}
      <div className="relative overflow-hidden h-1"
        style={{ background: 'linear-gradient(90deg,transparent,#c9a84c,#e8c97a,#c9a84c,transparent)' }}>
        <motion.div className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }} />
      </div>

      <div className="ag-inner px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <img src={adlexLogo} alt="أدلكس" className="h-10 w-auto object-contain self-end"
              style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }} />
            <p className="text-sm leading-relaxed text-right" style={{ color: 'rgba(245,240,232,0.45)' }}>
              شريكك التقني الأول لتحويل الأفكار إلى واقع رقمي ملموس. نقدم حلولاً متكاملة في البرمجة، التسويق، وريادة الأعمال.
            </p>
            <div className="flex gap-3 justify-end">
              {socials.map(({ icon: Icon, href, label, bg }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${bg}20`, border: `1px solid ${bg}35` }}
                  whileHover={{ scale: 1.15, background: bg, boxShadow: `0 0 20px ${bg}60` }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Icon className="w-4 h-4" style={{ color: '#e8c97a' }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-black mb-5 text-right" style={{ color: '#c9a84c', letterSpacing: '0.1em' }}>
              روابط سريعة
            </h4>
            <div className="h-px mb-5"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
            <ul className="space-y-3 text-right">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <motion.button type="button" onClick={() => go(href)}
                    className="text-sm bg-transparent border-0 p-0 cursor-pointer block mr-auto"
                    style={{ color: 'rgba(245,240,232,0.45)' }}
                    whileHover={{ color: '#e8c97a', x: -4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >{label}</motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-black mb-5 text-right" style={{ color: '#c9a84c', letterSpacing: '0.1em' }}>
              طرق التواصل
            </h4>
            <div className="h-px mb-5"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)' }} />
            <ul className="space-y-3">
              {contacts.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <motion.a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    className="flex items-center justify-end gap-3 text-sm"
                    style={{ color: 'rgba(245,240,232,0.45)' }}
                    whileHover={{ color: '#e8c97a', x: -4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <span>{label}</span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: '#c9a84c' }} />
                    </div>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <p className="text-xs text-center" style={{ color: 'rgba(245,240,232,0.3)' }}>
            أدلكس للحلول البرمجية والتسويق الرقمي — جميع الحقوق محفوظة © 2026
          </p>
          <motion.div className="h-px w-20"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)' }}
            animate={{ scaleX: [0.5, 1.5, 0.5], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </div>
    </footer>
  )
}
