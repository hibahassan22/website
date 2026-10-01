const items = [
  'تصميم المواقع', 'React', 'تطبيقات الموبايل', 'Next.js', 'المتاجر الإلكترونية', 'Flutter',
  'هوية تجارية', 'Node.js', 'واتساب API', 'Figma', 'التسويق الرقمي', 'SEO',
]

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map(t => (
        <li key={t} className="flex items-center">
          <span className="px-7 font-display text-[1.05rem] sm:text-lg font-medium text-fg-inv-muted whitespace-nowrap" dir="auto">{t}</span>
          <span className="w-1.5 h-1.5 rotate-45 bg-gold-500/70" aria-hidden />
        </li>
      ))}
    </ul>
  )
}

export default function AgencyMarquee() {
  return (
    <div className="relative bg-ink-950 border-y border-white/[0.07] py-6 overflow-hidden" dir="ltr">
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-linear-to-r from-ink-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-linear-to-l from-ink-950 to-transparent pointer-events-none" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
