import { Phone, Mail, Globe, GitBranch, ArrowUp, MessageCircle } from 'lucide-react'
import adlexLogo from '../../assets/imgi_49_ADLEX-V1PNG-1024x552.png'
import { scrollToId } from '../lib/motion'

const navLinks = [
  { label: 'الصفحة الرئيسية',    href: '#hero' },
  { label: 'من نحن',             href: '#about' },
  { label: 'خدماتنا',            href: '#services' },
  { label: 'كيف نعمل',           href: '#process' },
  { label: 'أعمالنا',            href: '#projects' },
  { label: 'التسويق الإلكتروني', href: '#why-us' },
  { label: 'اتصل بنا',           href: '#contact' },
]

const contacts = [
  { icon: Phone,         label: '+201070899672',         href: 'tel:+201070899672' },
  { icon: Phone,         label: '+201036418899',         href: 'tel:+201036418899' },
  { icon: Phone,         label: '+966574269580',         href: 'tel:+966574269580' },
  { icon: MessageCircle, label: '+966536282377',         href: 'https://wa.me/966536282377' },
  { icon: Mail,          label: 'adlexagency@gmail.com', href: 'mailto:adlexagency@gmail.com' },
]

const socials = [
  { icon: GitBranch,     href: '#',                            label: 'GitHub' },
  { icon: Globe,         href: '#',                            label: 'Website' },
  { icon: Mail,          href: 'mailto:adlexagency@gmail.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/966536282377',   label: 'WhatsApp' },
]

export default function AgencyFooter() {
  return (
    <footer className="relative bg-ink-950 text-fg-inv overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-l from-transparent via-gold-500/50 to-transparent" aria-hidden />

      <div className="container-x pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-14 pb-16 border-b border-white/[0.08]">
          {/* Brand */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <img src={adlexLogo} alt="أدلكس" className="h-11 w-auto object-contain brightness-0 invert opacity-95" loading="lazy" />
            <p className="text-fg-inv-muted max-w-sm">
              شريكك التقني الأول لتحويل الأفكار إلى واقع رقمي ملموس. نقدم حلولاً متكاملة في البرمجة، التسويق، وريادة الأعمال.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid place-items-center w-10 h-10 rounded-full border border-white/10 text-fg-inv-muted transition-all duration-300 hover:bg-gold-500 hover:text-ink-950 hover:border-transparent hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav className="lg:col-span-3" aria-label="روابط سريعة">
            <h4 className="t-eyebrow text-fg-inv-subtle mb-6">روابط سريعة</h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => scrollToId(href)}
                    className="text-[0.95rem] text-fg-inv-muted bg-transparent border-0 p-0 cursor-pointer transition-colors hover:text-gold-400"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="t-eyebrow text-fg-inv-subtle mb-6">طرق التواصل</h4>
            <ul className="flex flex-col gap-3">
              {contacts.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-[0.95rem] text-fg-inv-muted transition-colors hover:text-fg-inv"
                  >
                    <span className="grid place-items-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-ink-950">
                      <Icon className="w-3.5 h-3.5" aria-hidden />
                    </span>
                    <bdi dir="ltr">{label}</bdi>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="relative py-10 select-none pointer-events-none" aria-hidden>
          <p className="font-display font-bold leading-none text-center text-[clamp(4.5rem,19vw,16rem)] tracking-[-0.04em] text-transparent bg-clip-text bg-linear-to-b from-white/[0.09] to-white/0" dir="ltr">
            ADLEX
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.8rem] text-fg-inv-subtle text-center">
            أدلكس للحلول البرمجية والتسويق الرقمي — جميع الحقوق محفوظة © 2026
          </p>
          <button
            type="button"
            onClick={() => scrollToId('#hero')}
            className="group inline-flex items-center gap-2 text-[0.85rem] text-fg-inv-muted bg-transparent border-0 cursor-pointer hover:text-fg-inv transition-colors"
          >
            العودة للأعلى
            <span className="grid place-items-center w-9 h-9 rounded-full border border-white/10 transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp className="w-4 h-4" aria-hidden />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
