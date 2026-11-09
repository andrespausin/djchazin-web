import Link from 'next/link';
import { emails, socials, nav } from '@/data/site';
import { SocialIcon, Waveform } from './Music';

export default function Footer() {
  return (
    <footer className="footer">
      <Waveform bars={160} className="footer__wave" />
      <div className="footer__grid">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/chazin-logo-white.svg" alt="CHAZIN" width={240} height={69} loading="lazy" />
          <p>Latin Tech House · Spain × Venezuela · Based in Bangkok</p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="footer__list">
            {nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
            <li><Link href="/links">All links</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="footer__list">
            <li><a href={`mailto:${emails.booking}`}>{emails.booking}</a></li>
            <li><a href={`mailto:${emails.info}`}>{emails.info}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <ul className="footer__social">
          {socials.map((s) => (
            <li key={s.key}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><SocialIcon name={s.key} size={18} /></a>
            </li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} Chazin · Magna Beat Records</p>
      </div>
    </footer>
  );
}
