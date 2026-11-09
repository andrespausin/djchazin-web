import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import LiveVideo from '@/components/LiveVideo';
import { Reveal, SplitTitle } from '@/components/Motion';
import { Arrow, Marquee, SocialIcon } from '@/components/Music';
import Vinyl from '@/components/Vinyl';
import { clubs, emails, links, releases } from '@/data/site';

const explore = [
  { href: '/about', n: '01', title: 'About', sub: 'The story, the sound, the world tour', img: '/images/epk-v4/p3_portrait.webp' },
  { href: '/music', n: '02', title: 'Music', sub: 'Releases & Magna Beat Records', img: '/images/epk-v4/p8_illuzion.webp' },
  { href: '/shows', n: '03', title: 'Shows', sub: 'Clubs, festivals & flyers', img: '/images/epk-v4/p2_crowd.webp' },
  { href: '/press', n: '04', title: 'Press', sub: 'Photos, logos & EPK download', img: '/images/epk-v4/p9_profile.webp', pos: 'center 12%' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'Chazin',
  genre: ['Latin House', 'Tech House'],
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

      {/* Live video */}
      <section className="section">
        <Reveal className="live"><LiveVideo /></Reveal>
      </section>

      {/* Explore sub-pages */}
      <section className="section">
        <Reveal className="explore">
          {explore.map((e) => (
            <Link key={e.href} href={e.href} className="explore__card" data-reveal>
              <span className="explore__img"><Image src={e.img} alt="" fill sizes="(max-width: 900px) 100vw, 25vw" style={{ objectFit: 'cover', objectPosition: e.pos }} /></span>
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
