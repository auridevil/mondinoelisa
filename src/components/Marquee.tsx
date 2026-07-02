import type { ReactNode } from 'react'

/** Endless horizontal ticker; content is duplicated for a seamless loop. */
export function Marquee({
  children,
  reverse = false,
  className = '',
}: {
  children: ReactNode
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee__track${reverse ? ' marquee__track--reverse' : ''}`}
      >
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </div>
    </div>
  )
}
