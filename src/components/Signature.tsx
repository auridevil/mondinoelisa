import './logo.css'

/**
 * "EM INTERIOR DESIGN" — the signature/watermark variant of the E—M
 * logo, the same mark Elisa uses to sign canvases. Stamped on project
 * heroes (like a signed work) and in the footer.
 */
export function Signature({ className = '' }: { className?: string }) {
  return (
    <span className={`sig ${className}`} aria-label="EM Interior Design">
      <span className="sig__mark" aria-hidden="true">
        E<span className="sig__dash" />M
      </span>
      <span className="sig__text" aria-hidden="true">
        Interior Design
      </span>
    </span>
  )
}
