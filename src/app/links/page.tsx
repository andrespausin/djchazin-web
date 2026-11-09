import type { Metadata } from 'next';
import Link from 'next/link';
import { SocialIcon, Arrow } from '@/components/Music';
import { emails, line, links, socials } from '@/data/site';

export const metadata: Metadata = {
  title: 'Links',
  description: 'All of Chazin’s links: Spotify, Beatport, Instagram, YouTube, TikTok, SoundCloud and booking.',
};

/** Link hub — the destination of the "All links" QR code in the EPK. Light, fast, mobile-first. */
export default function Links() {
  return (
    <main className="hub">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hub__logo" src="/brand/chazin-logo-white.svg" alt="CHAZIN" width={280} height={81} />
      <p className="eyebrow hub__tag">Latin House & Tech House</p>
      <ul className="hub__list">
        {socials.map((s, i) => (
          <li key={s.key} style={{ animationDelay: `${0.08 * i}s` }}>
            <a href={s.href} target="_blank" rel="noreferrer"><SocialIcon name={s.key} size={20} /> <span>{s.label}</span> <Arrow /></a>
          </li>
        ))}
        <li style={{ animationDelay: '0.5s' }}><a href={`mailto:${emails.booking}`}><span className="hub__dot" /> <span>Booking</span> <Arrow /></a></li>
        <li style={{ animationDelay: '0.58s' }}><a href={links.epk} download><span className="hub__dot" /> <span>Press kit (PDF)</span> <Arrow /></a></li>
        <li style={{ animationDelay: '0.66s' }}><div className="hub__plain"><span className="hub__dot" /> <span>LINE</span> <span className="hub__id">{line}</span></div></li>
      </ul>
      <Link className="hub__site" href="/">djchazin.com</Link>
    </main>
  );
}
