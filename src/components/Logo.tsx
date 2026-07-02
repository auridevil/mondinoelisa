import { Link } from 'react-router-dom'

/**
 * Text wordmark in Satoshi — stands in for the logo until a real one exists.
 */
export function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo__name">Elisa Mondino</span>
      <span className="logo__role">Interior Designer</span>
    </Link>
  )
}
