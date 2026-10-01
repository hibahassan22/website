import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  index?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'start' | 'center'
  className?: string
  /** Override the default t-h2 size — e.g. 'clamp(1.4rem,2.8vw,2.2rem)' */
  titleSize?: string
}

export function Eyebrow({ index, label, tone = 'light' }: { index?: string; label: string; tone?: 'light' | 'dark' }) {
  return (
    <span className={`t-eyebrow inline-flex items-center gap-3 ${tone === 'dark' ? 'text-fg-inv-muted' : 'text-fg-muted'}`}>
      {index && <span className="t-num text-gold-500">{index}</span>}
      <span className={`h-px w-8 ${tone === 'dark' ? 'bg-white/20' : 'bg-ink-900/20'}`} aria-hidden />
      <span>{label}</span>
    </span>
  )
}

export function SectionHeading({
  index, eyebrow, title, description, tone = 'light', align = 'start', className = '', titleSize,
}: Props) {
  const centered = align === 'center'
  return (
    <div className={`flex flex-col gap-5 ${centered ? 'items-center text-center mx-auto' : ''} ${className}`}>
      <Reveal><Eyebrow index={index} label={eyebrow} tone={tone} /></Reveal>
      <Reveal delay={0.05}>
        <h2
          className={`t-h2 text-balance ${tone === 'dark' ? 'text-fg-inv' : 'text-fg'}`}
          style={titleSize ? { fontSize: titleSize } : undefined}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className={`t-lead max-w-xl text-pretty ${centered ? 'mx-auto' : ''} ${tone === 'dark' ? 'text-fg-inv-muted' : 'text-fg-muted'}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
