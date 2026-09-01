import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { pressItems } from '../lib/content'

export default function Press() {
  return (
    <>
      <Head>
        <title>Press — Elisa Mondino</title>
      </Head>

      <Reveal>
        <h1 className="page__title">Press</h1>
      </Reveal>

      <ul className="press">
        {pressItems.map((item, i) => {
          const year = item.date.slice(0, 4)
          const row = (
            <>
              <time className="press__date" dateTime={item.date}>
                {year}
              </time>
              <span className="press__outlet">{item.outlet}</span>
              <h2 className="press__title">{item.title}</h2>
              {item.url && <span className="press__arrow">↗</span>}
            </>
          )
          return (
            <Reveal key={item.title} delay={i * 60}>
              <li>
                {item.url ? (
                  <a className="press__row" href={item.url} target="_blank" rel="noreferrer">
                    {row}
                  </a>
                ) : (
                  <div className="press__row">{row}</div>
                )}
              </li>
            </Reveal>
          )
        })}
      </ul>
    </>
  )
}
