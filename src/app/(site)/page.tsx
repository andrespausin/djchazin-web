import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { Reveal, SplitTitle } from '@/components/Motion';
import { Arrow, Marquee, SocialIcon } from '@/components/Music';
import Vinyl from '@/components/Vinyl';
import { clubs, emails, links, releases } from '@/data/site';

const explore = [
  { href: '/about', n: '01', title: 'About', sub: 'The story, the sound, the world tour', img: '/images/photos/profile.webp' },
  { href: '/music', n: '02', title: 'Music', sub: 'Releases & Magna Beat Records', img: '/images/photos/booth.webp' },
  { href: '/shows', n: '03', title: 'Shows', sub: 'Clubs, festivals & flyers', img: '/images/photos/crowd.webp' },
  { href: '/press', n: '04', title: 'Press', sub: 'Photos, logos & EPK download', img: '/images/photos/shades.webp' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Chazin',
  genre: 'Latin Tech House',
  url: 'https://djchazin.com',
  email: emails.booking,
  sameAs: [links.spotify, links.beatport, links.instagram, links.youtube, links.tiktok, links.soundcloud],
};

export default function Home() {
  const latest = releases[0];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />

      {/* Latest release */}
      <section className="section now">
        <Reveal className="now__grid">
          <div data-reveal><Vinyl release={latest} cover={latest.cover} size={380} /></div>
          <div className="now__info" data-reveal>
            <p className="eyebrow">Latest release</p>
            <SplitTitle as="h2" text={latest.title} className="display now__title" onScroll />
            <p className="muted">{latest.label}{latest.year ? ` · ${latest.year}` : ''}</p>
            <div className="btn-row">
              <a className="btn btn--gold" href={latest.spotify} target="_blank" rel="noreferrer"><SocialIcon name="spotify" size={18} /> Play on Spotify</a>
              <Link className="btn" href="/music">All releases <Arrow /></Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Clubs marquee */}
      <section className="section section--tight clubs-strip" aria-label="Clubs and festivals">
        <p className="eyebrow center">Played at</p>
        <Marquee items={clubs} speed={45} />
      </section>

      {/* Live video — placeholder until footage is supplied */}
      <section className="section">
        <Reveal className="live">
          <div className="live__frame" data-reveal>
            <Image src="/images/photos/booth.webp" alt="" fill sizes="(max-width: 900px) 100vw, 80vw" style={{ objectFit: 'cover' }} />
            <div className="live__shade" />
            <div className="live__content">
              <p className="eyebrow">Live set</p>
              <h2 className="display live__title">Video coming soon</h2>
              <a className="btn" href={links.youtube} target="_blank" rel="noreferrer"><SocialIcon name="youtube" size={18} /> Watch on YouTube</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Explore sub-pages */}
      <section className="section">
        <Reveal className="explore">
          {explore.map((e) => (
            <Link key={e.href} href={e.href} className="explore__card" data-reveal>
              <span className="explore__img"><Image src={e.img} alt="" fill sizes="(max-width: 900px) 100vw, 25vw" style={{ objectFit: 'cover' }} /></span>
              <span className="explore__n">{e.n}</span>
              <span className="explore__title">{e.title}</span>
              <span className="explore__sub">{e.sub} <Arrow /></span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* Booking CTA */}
      <section className="section cta">
        <SplitTitle as="h2" text={"Let's make\nthe floor move"} className="display cta__title" onScroll />
        <a className="cta__mail" href={`mailto:${emails.booking}`}>{emails.booking} <Arrow size={22} /></a>
      </section>
    </>
  );
}
