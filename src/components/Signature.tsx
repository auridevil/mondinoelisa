import { Monogram } from './Monogram'
import './logo.css'

/**
 * The monogram used as a signature: stamped bottom-right on project
 * heroes, the way a canvas is signed, and again in the footer.
 */
export function Signature({ className = '' }: { className?: string }) {
  return (
    <span className={`sig ${className}`} aria-label="Elisa Mondino — Interior Design">
      <Monogram className="sig__mark" />
      <span className="sig__text" aria-hidden="true">
        Interior Design
      </span>
    </span>
  )
}
