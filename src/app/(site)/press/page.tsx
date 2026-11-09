import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';
import { Arrow } from '@/components/Music';
import { bio, links, pressLogos, pressPhotos } from '@/data/site';

export const metadata: Metadata = {
  title: 'Press',
  description: 'Official press photos, logos and the electronic press kit of Chazin, ready to download for promoters.',
};

export default function Press() {
  return (
    <>
      <PageHeader index="04" eyebrow="Press" title={'Press\nassets.'} intro="Official photos, logos and the electronic press kit — free to use for promotion." />

      <section className="section">
        <a className="epk" href={links.epk} download>
          <span><span className="eyebrow">Electronic press kit · PDF</span><span className="display">Download the EPK</span></span>
          <Arrow size={28} />
        </a>
      </section>

      <section className="section">
        <p className="eyebrow">Photos</p>
        <Reveal className="press-grid">
          {pressPhotos.map((p) => (
            <a key={p.file} href={p.file} download className="press-photo" data-reveal>
              <span className="press-photo__img"><Image src={p.thumb} alt={p.label} fill sizes="(max-width: 700px) 50vw, 25vw" style={{ objectFit: 'cover', objectPosition: 'center 20%' }} /></span>
              <span className="press-photo__label">{p.label} · JPG <Arrow /></span>
            </a>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <p className="eyebrow">Logos</p>
        <Reveal className="press-logos">
          {pressLogos.map((l) => (
            <a key={l.file} href={l.file} download className={`press-logo${l.light ? ' press-logo--light' : ''}`} data-reveal>
              <span className="press-logo__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.preview} alt={l.label} loading="lazy" />
              </span>
              <span className="press-photo__label">{l.label} <Arrow /></span>
            </a>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <p className="eyebrow">Short bio · copy & paste</p>
        <div className="short-bio"><p>{bio[0]} {bio[3]}</p></div>
      </section>
    </>
  );
}
