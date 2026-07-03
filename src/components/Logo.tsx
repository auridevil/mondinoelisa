import { Link } from 'react-router-dom'
import './logo.css'

/**
 * Logo "E—M", set in Satoshi.
 *
 * Concept: Elisa Mondino's initials are EM — in typography, the *em*
 * is the unit of measure (em dash, em square). Interior design is
 * measure and proportion, so the mark is her initials joined by an
 * em dash inside a thin architectural stamp. On hover the dash
 * stretches, like a measuring line.
 */
export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Elisa Mondino — home">
      <span className="brand__mark" aria-hidden="true">
        E<span className="brand__dash" />M
      </span>
      <span className="brand__id">
        <span className="brand__name">Elisa Mondino</span>
        <span className="brand__role">Interior Designer</span>
      </span>
    </Link>
  )
}
