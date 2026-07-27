import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { asset } from '../lib/asset'

/**
 * "Studio" — profilo di Elisa Mondino. Testo e ritratto ricavati dal
 * servizio di Wine & Luxury ("La firma di Elisa Mondino nel mondo degli
 * interni", a cura di Viviana Pignelli).
 */
export default function About() {
  return (
    <>
      <Head>
        <title>Studio — Elisa Mondino</title>
      </Head>

      <Reveal>
        <h1 className="page__title">Studio</h1>
      </Reveal>

      <div className="about">
        <Reveal delay={80}>
          <figure className="about__portrait">
            <img
              src={asset('/about/elisa-mondino.jpg')}
              alt="Ritratto di Elisa Mondino"
              loading="lazy"
            />
          </figure>
        </Reveal>

        <div className="about__text">
          <Reveal delay={120}>
            <p className="about__lead">
              Elisa Mondino è una interior designer che fonde funzionalità ed
              estetica, unendo sensibilità creativa e rigore tecnico in progetti
              che raccontano storie uniche.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p>
              Dopo la laurea in Interior Design, ha mosso i primi passi nello
              studio di Michela Curetti a Mondovì, dove per sei anni si è
              dedicata al disegno di mobili su misura, alla scelta di materiali
              pregiati e alla definizione di palette cromatiche sofisticate,
              lavorando anche a progetti di grande prestigio come Palazzo Righini.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p>
              L'esperienza successiva, come prima dipendente della divisione di
              interior design di un General Contractor cresciuto fino a oltre
              quaranta persone, l'ha immersa nella realtà del cantiere: dalla
              gestione delle maestranze alla preventivazione, seguendo ogni
              progetto dalla concezione alla realizzazione.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p>
              Dal 2022 esercita la libera professione. Collabora con studi di
              architettura — tra cui quello dell'architetto Chiara Armando a
              Torino — e con aziende di arredo su misura, occupandosi di
              ristrutturazioni complete, render 3D, illuminazione, styling e
              allestimenti di case vacanza.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <blockquote className="about__quote">
              Ogni ambiente racconta una storia, fatta di armonia, bellezza e
              funzionalità.
            </blockquote>
          </Reveal>

          <Reveal delay={320}>
            <p>
              Il suo approccio nasce da un'attenta ricerca di equilibrio: colori
              neutri, texture sofisticate e materiali di alta qualità si
              combinano in spazi armoniosi, dove la tradizione incontra la
              contemporaneità. Una particolare attenzione è dedicata alla
              sostenibilità, con il recupero di materiali originali e la scelta
              di prodotti certificati.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <p className="about__press">
              Il suo lavoro è stato raccontato da <em>Wine&nbsp;&amp;&nbsp;Luxury</em>{' '}
              nel servizio «La firma di Elisa Mondino nel mondo degli interni».{' '}
              <Link to="/stampa">Stampa →</Link>
            </p>
          </Reveal>
        </div>
      </div>
    </>
  )
}
