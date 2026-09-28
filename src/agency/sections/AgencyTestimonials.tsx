import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name:    'Ahmed Al-Rashidi',
    role:    'CEO, NexaRetail',
    country: 'Saudi Arabia',
    text:    "Adlex completely transformed our online presence. Revenue from e-commerce grew 3x within 6 months of launch. The team's attention to detail is unmatched.",
    rating:  5,
    initials:'AR',
    color:   '#00d4ff',
  },
  {
    name:    'Sara Mostafa',
    role:    'Founder, VisionBrand',
    country: 'Egypt',
    text:    "From branding to web development, they handled everything with professionalism and creativity. The result was beyond what I imagined possible.",
    rating:  5,
    initials:'SM',
    color:   '#f472b6',
  },
  {
    name:    'Khalid Al-Hamdan',
    role:    'CTO, GrowthDesk',
    country: 'Saudi Arabia',
    text:    "Their technical capabilities are elite. They built our SaaS platform in 8 weeks, hitting every milestone. The code quality is pristine.",
    rating:  5,
    initials:'KH',
    color:   '#7c3aed',
  },
  {
    name:    'Nour Ibrahim',
    role:    'Director, MediTrack',
    country: 'UAE',
    text:    "The mobile app they built serves 50,000 users with zero crashes. The ongoing support is exceptional — they respond within hours, not days.",
    rating:  5,
    initials:'NI',
    color:   '#06ffa5',
  },
]

export default function AgencyTestimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [idx, setIdx]   = useState(0)
  const [dir, setDir]   = useState(1)

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }
  const prev = () => go((idx - 1 + testimonials.length) % testimonials.length)
  const next = () => go((idx + 1) % testimonials.length)

  const t = testimonials[idx]

  return (
    <section id="testimonials" className="ag-section" ref={ref} style={{ background: 'var(--color-surface)' }}>
      <div className="ag-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="ag-badge mx-auto" style={{ width: 'fit-content' }}>Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Trusted by clients{' '}
            <span className="ag-grad">across the region.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Card */}
          <div
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
          >
            {/* Quote icon */}
            <div
              className="absolute top-8 right-8 w-12 h-12 rounded-2xl flex items-center justify-center opacity-20"
              style={{ background: t.color }}
            >
              <Quote className="w-5 h-5 text-white" />
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: t.color }} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl font-medium leading-relaxed text-white mb-8">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0"
                    style={{ background: `linear-gradient(135deg,${t.color},#7c3aed)` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{t.role} · {t.country}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === idx ? '24px' : '8px',
                    height: '8px',
                    background: i === idx ? '#00d4ff' : 'var(--color-surface-3)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:text-white"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:text-white"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
