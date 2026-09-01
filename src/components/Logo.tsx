import { Link } from 'react-router-dom'
import { Monogram } from './Monogram'
import './logo.css'

/**
 * The brand lockup: Elisa's E/M monogram, a hairline rule, then the
 * wordmark — the horizontal arrangement from her brand board.
 */
export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Elisa Mondino — home">
      <Monogram className="brand__mark" />
      <span className="brand__id">
        <span className="brand__name">Elisa Mondino</span>
        <span className="brand__role">Interior Design</span>
      </span>
    </Link>
  )
}
