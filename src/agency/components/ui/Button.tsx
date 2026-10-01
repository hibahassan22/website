import type { ReactNode, MouseEvent, ComponentType, SVGProps } from 'react'
import { ArrowLeft } from 'lucide-react'
import { scrollToId } from '../../lib/motion'

type Variant = 'primary' | 'ghost-dark' | 'ghost-light' | 'ink'
type Size = 'sm' | 'md' | 'lg'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: ComponentType<SVGProps<SVGSVGElement>> | null
  leadingIcon?: ComponentType<SVGProps<SVGSVGElement>>
  className?: string
  external?: boolean
}

export function ButtonLink({
  href, children, variant = 'primary', size = 'md',
  icon: Icon = ArrowLeft, leadingIcon: Leading, className = '', external,
}: ButtonLinkProps) {
  const isHash = href.startsWith('#')
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isHash) return
    e.preventDefault()
    scrollToId(href)
  }
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`btn btn-${variant} ${sizeClass} ${className}`}
    >
      {Leading && <Leading className="w-[1.1em] h-[1.1em]" aria-hidden />}
      <span>{children}</span>
      {Icon && <Icon className="btn-icon w-[1.1em] h-[1.1em]" aria-hidden />}
    </a>
  )
}
