import type { Metadata } from 'next';
import Image from 'next/image';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';
import ShowsExplorer from '@/components/ShowsExplorer';
import { alsoPlayed, flyers } from '@/data/site';

export const metadata: Metadata = {
  title: 'Shows',
  description: 'Clubs and festivals where Chazin has played — from Pacha Ibiza to Illuzion Phuket — and selected show flyers.',
};

const mapSvg = readFileSync(path.join(process.cwd(), 'src/assets/world-map.svg'), 'utf8');

export default function Shows() {
  return (
    <>
      <PageHeader index="03" eyebrow="Shows" title={'Played at'} intro="Clubs, festivals and pool parties across Europe, Asia and the Americas." image={{ src: '/images/epk-v4/p2_crowd.webp', alt: 'Chazin on stage facing a packed outdoor crowd', position: 'center 55%' }} />

      <section className="section">
        <ShowsExplorer svg={mapSvg} />
        <p className="also">Also: {alsoPlayed} — and many more.</p>
      </section>

      <section className="section">
        <p className="eyebrow">Past shows</p>
        <h2 className="display h2">Selected flyers</h2>
        <Reveal className="flyers" stagger={0.1}>
          {flyers.map((f) => (
            <figure key={f.src} className="flyer" data-reveal>
              <span className="flyer__img"><Image src={f.src} alt={`${f.title} flyer`} fill quality={85} sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 17vw" /></span>
              <figcaption><strong>{f.title}</strong><span>{f.place}</span></figcaption>
            </figure>
          ))}
        </Reveal>
        <p className="eyebrow center shows-end">EUROPE · ASIA · AMERICA AND BEYOND</p>
      </section>
    </>
  );
}
