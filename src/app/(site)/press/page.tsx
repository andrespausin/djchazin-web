import type { Metadata } from 'next';
import Image from 'next/image';
import { statSync } from 'node:fs';
import path from 'node:path';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';
import { Arrow } from '@/components/Music';
import { bio, links, pressLogos, pressPhotos } from '@/data/site';

export const metadata: Metadata = {
  title: 'Press',
  description: 'Official press photos, logos and the electronic press kit of Chazin, ready to download for promoters.',
};

const packSize = `${Math.round(statSync(path.join(process.cwd(), 'public/press/CHAZIN_Press_Pack.zip')).size / 1048576)} MB`;

export default function Press() {
  return (
    <>
      <PageHeader index="04" eyebrow="Press" title={'Press\nassets'} intro="Official photos, logos and the electronic press kit — free to use for promotion." image={{ src: '/images/epk-v4/p9_profile.webp', alt: 'Chazin, profile portrait', position: 'center 12%' }} />

      <section className="section press-top">
        <div className="press-kit">
          <a className="epk" href={links.pack} download>
            <span>
              <span className="display">Download the full press kit</span>
              <span className="press-kit__sub">EPK, riders (local + international), photos and every logo version (AI, EPS, PDF, PSD, PNG) · ZIP · {packSize}</span>
            </span>
            <Arrow size={28} />
          </a>
          <div className="press-files">
            <a className="btn" href={links.epk} download>EPK · PDF <Arrow /></a>
          </div>
        </div>
        <div>
          <p className="eyebrow">Short bio · copy & paste</p>
          <div className="short-bio"><p>{bio[0]} {bio[1]}</p></div>
          <div className="press-riders">
            <a className="btn" href={links.ridersInternational} download>Riders · International <Arrow /></a>
            <a className="btn" href={links.ridersLocal} download>Riders · Local <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Photos</p>
        <Reveal className="press-grid">
          {pressPhotos.map((p) => (
            <a key={p.file} href={p.file} download className="press-photo" data-reveal>
              <span className="press-photo__img"><Image src={p.thumb} alt={`Chazin press ${p.label.toLowerCase()}`} fill quality={90} sizes="(max-width: 800px) 50vw, 25vw" style={{ objectFit: 'cover', objectPosition: 'center 20%' }} /></span>
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
    </>
  );
}
