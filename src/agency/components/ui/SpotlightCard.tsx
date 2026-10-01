import type { ReactNode, PointerEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
}

function trackPointer(e: PointerEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** Card with a cursor-following border highlight. Pointer position is written to CSS vars, so no re-renders. */
export function SpotlightCard({ children, className = '', tone = 'light' }: Props) {
  return (
    <div
      onPointerMove={trackPointer}
      className={`spot group ${tone === 'dark' ? 'card-dark' : 'card-light'} ${className}`}
    >
      {children}
    </div>
  )
}
