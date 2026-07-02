import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Pagina non trovata — Elisa Mondino</title>
      </Head>
      <h1 className="page__title">Pagina non trovata</h1>
      <p>
        <Link to="/" className="link-more">
          ← Torna alla home
        </Link>
      </p>
    </>
  )
}
