import type { Metadata } from 'next';
import Image from 'next/image';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Counter, Reveal, SplitTitle } from '@/components/Motion';
import CountryExplorer from '@/components/CountryExplorer';
import { bio, stats } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Spanish-born DJ and producer of Venezuelan descent, based in Bangkok. 300+ shows at Illuzion Phuket and founder of Magna Beat Records.',
};

const mapSvg = readFileSync(path.join(process.cwd(), 'src/assets/world-map.svg'), 'utf8');

export default function About() {
  return (
    <>
      <section className="about">
        <div className="about__head">
          <SplitTitle text={'Spanish-born\nVenezuelan roots\nBangkok-based'} className="display about__title" />
          <blockquote className="quote">“Latin grooves move the world.”</blockquote>
        </div>
        <div className="about__photo">
          <Image src="/images/photos/profile.webp" alt="Chazin portrait" fill priority sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 30vw" style={{ objectFit: 'cover', objectPosition: '60% 20%' }} />
        </div>
        <Reveal className="about__text">
          {bio.map((p, i) => <p key={i} data-reveal className={i === 0 ? 'lead' : undefined}>{p}</p>)}
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat" data-reveal>
              <span className="stat__value"><Counter value={s.value} suffix={s.suffix} /></span>
              <span className="stat__label">{s.label}</span>
              <span className="stat__sub">{s.sub}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <p className="eyebrow">World tour</p>
        <SplitTitle as="h2" text={'Three continents\nOne dancefloor'} className="display h2" onScroll />
        <CountryExplorer svg={mapSvg} />
      </section>
    </>
  );
}
