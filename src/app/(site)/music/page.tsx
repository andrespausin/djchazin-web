import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';
import { Arrow, SocialIcon } from '@/components/Music';
import Vinyl from '@/components/Vinyl';
import { links, releases } from '@/data/site';

export const metadata: Metadata = {
  title: 'Music',
  description: 'Selected releases by Chazin on Magna Beat Records — listen on Spotify, SoundCloud and Beatport.',
};

export default function Music() {
  return (
    <>
      <PageHeader index="02" eyebrow="Music" title={'Selected\nreleases'} intro="Latin House & Tech House built on Latin groove, percussion and hypnotic vocal hooks." image={{ src: '/images/epk-v4/p8_illuzion.webp', alt: 'Chazin at the decks in front of the crowd at Illuzion Phuket', position: 'center 20%' }} />

      <section className="section releases">
        {releases.map((r, i) => (
          <Reveal key={r.slug} className="release">
            <div data-reveal><Vinyl release={r} cover={r.cover} size={360} priority={i === 0} /></div>
            <div className="release__info" data-reveal>
              <span className="release__n">0{i + 1}</span>
              <h2 className="display release__title">{r.title}</h2>
              <p className="muted">{r.label}{r.year ? ` · ${r.year}` : ''}</p>
              <a className="btn btn--gold" href={r.spotify} target="_blank" rel="noreferrer"><SocialIcon name="spotify" size={18} /> Play on Spotify</a>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="section">
        <a className="spotify-cta" href={links.spotify} target="_blank" rel="noreferrer">
          <span className="spotify-cta__covers" aria-hidden="true">
            {releases.map((r) => <Image key={r.slug} src={r.cover} alt="" width={200} height={200} />)}
          </span>
          <span className="spotify-cta__text"><span className="eyebrow">Listen on</span><span className="display">Spotify</span><span className="muted">Chazin · artist profile <Arrow /></span></span>
        </a>
      </section>

      <section className="section">
        <a className="spotify-cta sc-cta" href={links.djset} target="_blank" rel="noreferrer">
          <span className="sc-cta__cover" aria-hidden="true">
            <Image src="/images/epk-v4/p4_confetti.webp" alt="" width={640} height={354} sizes="(max-width: 620px) 90vw, 360px" />
            <span className="sc-cta__play"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg></span>
          </span>
          <span className="spotify-cta__text"><span className="eyebrow">Listen on</span><span className="display">SoundCloud</span><span className="muted">Play the DJ set <Arrow /></span></span>
        </a>
      </section>

      <section className="section label">
        <Reveal className="label__grid">
          <a href={links.label} target="_blank" rel="noreferrer" className="label__logo" data-reveal>
            <Image src="/brand/magna-beat-white.svg" alt="Magna Beat Records" width={220} height={229} unoptimized />
          </a>
          <div data-reveal>
            <p className="eyebrow">Founder</p>
            <h2 className="display h2">Magna Beat Records</h2>
            <p className="muted">An independent label focused on Tech House and Latin Groove, and a platform for a new generation of artists.</p>
            <div className="btn-row">
              <a className="btn" href={links.label} target="_blank" rel="noreferrer"><SocialIcon name="beatport" size={18} /> Label on Beatport <Arrow /></a>
              <a className="btn" href={links.beatport} target="_blank" rel="noreferrer"><SocialIcon name="beatport" size={18} /> Chazin on Beatport <Arrow /></a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
