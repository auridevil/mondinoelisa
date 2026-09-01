import { Head } from 'vite-react-ssg'
import { Reveal } from '../components/Reveal'
import { CONTACT, INSTAGRAM_URL } from '../lib/site'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Elisa Mondino</title>
      </Head>

      <Reveal>
        <h1 className="page__title">Contact</h1>
      </Reveal>

      <div className="contact">
        <Reveal delay={80}>
          <p className="contact__lead">
            Per informazioni su progetti e collaborazioni:
          </p>
        </Reveal>
        <Reveal delay={160}>
          <ul className="contact__list">
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>{CONTACT.address}</li>
            <li>{CONTACT.vat}</li>
          </ul>
        </Reveal>
      </div>
    </>
  )
}
