import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';
import Visualizer from '@/components/Visualizer';
import { Arrow, SocialIcon, Vinyl } from '@/components/Music';
import { links, releases } from '@/data/site';

export const metadata: Metadata = {
  title: 'Music',
  description: 'Selected releases by Chazin on Magna Beat Records — listen on Spotify and Beatport.',
};

export default function Music() {
  return (
    <>
      <PageHeader index="02" eyebrow="Music" title={'Selected\nreleases.'} intro="Peak-time Tech House with Latin groove, percussion and hypnotic vocal hooks." />

      <section className="section releases">
        {releases.map((r, i) => (
          <Reveal key={r.slug} className={`release${i % 2 ? ' release--flip' : ''}`}>
            <div data-reveal><Vinyl cover={r.cover} title={r.title} size={360} priority={i === 0} /></div>
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
          <Visualizer className="spotify-cta__viz" bars={64} mode="mirror" />
          <span className="spotify-cta__icon"><SocialIcon name="spotify" size={72} /></span>
          <span className="spotify-cta__text"><span className="eyebrow">Listen on</span><span className="display">Spotify</span><span className="muted">Chazin · artist profile <Arrow /></span></span>
        </a>
      </section>

      <section className="section label">
        <Reveal className="label__grid">
          <a href={links.label} target="_blank" rel="noreferrer" className="label__logo" data-reveal>
            <Image src="/brand/magna-beat-white.png" alt="Magna Beat Records" width={220} height={229} />
          </a>
          <div data-reveal>
            <p className="eyebrow">Founder</p>
            <h2 className="display h2">Magna Beat Records</h2>
            <p className="muted">The label pushing Latin-inspired Tech House to clubs and festivals worldwide.</p>
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
