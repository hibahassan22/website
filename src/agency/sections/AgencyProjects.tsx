import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Project {
  title:    string
  category: string
  desc:     string
  tags:     string[]
  color:    string
  accent:   string
  stat:     string
  statLabel:string
}

const projects: Project[] = [
  {
    title:    'NexaStore E-Commerce',
    category: 'E-Commerce · Web Development',
    desc:     'A full-featured online store with real-time inventory, multi-currency checkout, and an AI recommendation engine.',
    tags:     ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color:    '#00d4ff',
    accent:   'rgba(0,212,255,0.08)',
    stat:     '+340%',
    statLabel:'Revenue Growth',
  },
  {
    title:    'MediTrack Mobile App',
    category: 'Mobile Application',
    desc:     'Healthcare management app connecting patients with doctors. Real-time messaging, booking, and AI diagnosis assistance.',
    tags:     ['Flutter', 'Firebase', 'REST APIs', 'AI'],
    color:    '#7c3aed',
    accent:   'rgba(124,58,237,0.08)',
    stat:     '50K+',
    statLabel:'Active Users',
  },
  {
    title:    'VisionBrand Identity',
    category: 'Branding · UI/UX',
    desc:     'Complete brand overhaul for a luxury real estate firm — logo system, design language, website, and collateral.',
    tags:     ['Figma', 'Brand Identity', 'Motion', 'Web'],
    color:    '#f472b6',
    accent:   'rgba(244,114,182,0.08)',
    stat:     '8 Weeks',
    statLabel:'Full Delivery',
  },
  {
    title:    'GrowthDesk SaaS',
    category: 'SaaS · Web Development',
    desc:     'A CRM + marketing dashboard for SMBs. Automated lead scoring, campaign analytics, and WhatsApp integration.',
    tags:     ['Next.js', 'PostgreSQL', 'tRPC', 'WhatsApp API'],
    color:    '#06ffa5',
    accent:   'rgba(6,255,165,0.08)',
    stat:     '99.9%',
    statLabel:'Uptime SLA',
  },
  {
    title:    'Layla Bakery Website',
    category: 'Website Design · Frontend',
    desc:     'A premium bakery website with online ordering, loyalty system, and animated product showcase.',
    tags:     ['React', 'Tailwind', 'Framer Motion', 'Sanity CMS'],
    color:    '#f59e0b',
    accent:   'rgba(245,158,11,0.08)',
    stat:     '+220%',
    statLabel:'Online Orders',
  },
  {
    title:    'SwiftRide Transport App',
    category: 'Mobile Application · UI/UX',
    desc:     'Ride-hailing app with driver matching, live tracking, and in-app payments. Launched in 3 cities.',
    tags:     ['React Native', 'Maps API', 'Payments', 'Firebase'],
    color:    '#34d399',
    accent:   'rgba(52,211,153,0.08)',
    stat:     '3 Cities',
    statLabel:'At Launch',
  },
]

function ProjectCard({ p, index, inView }: { p: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="ag-card flex flex-col group cursor-default overflow-hidden"
      style={{
        borderColor: hovered ? `${p.color}40` : 'var(--color-border)',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 60px ${p.color}10` : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Visual header */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ background: p.accent }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          className="text-5xl font-black opacity-10 select-none"
          style={{ color: p.color }}
        >
          {p.title.split(' ')[0].toUpperCase()}
        </motion.div>

        {/* Stat badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}30` }}
        >
          {p.stat} <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>{p.statLabel}</span>
        </div>

        {/* Glow spot */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full blur-2xl opacity-30"
          style={{ background: p.color }}
        />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-xs font-medium" style={{ color: p.color }}>{p.category}</span>
        <h3 className="text-lg font-bold text-white leading-snug">{p.title}</h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-muted)' }}>{p.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {p.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md"
              style={{ background: 'var(--color-surface-2)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1 text-xs font-bold pt-1"
          style={{ color: p.color }}
        >
          View Case Study <ArrowRight className="w-3 h-3" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function AgencyProjects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="ag-section" ref={ref}>
      <div className="ag-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="ag-badge">Case Studies</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              Work that{' '}
              <span className="ag-grad">speaks for itself.</span>
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: 'var(--color-muted)' }}>
            Real results for real businesses. Each project solved a distinct challenge.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
