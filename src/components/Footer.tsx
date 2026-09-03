import { CONTACT, INSTAGRAM_URL } from '../lib/site'
import { Signature } from './Signature'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <span>{CONTACT.officeAddress}</span>
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <span>{CONTACT.vat}</span>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <Signature className="sig--footer" />
      </div>
    </footer>
  )
}
