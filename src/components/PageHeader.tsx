import Image from 'next/image';
import { SplitTitle } from './Motion';

export default function PageHeader({ index, eyebrow, title, intro, image }: {
  index: string; eyebrow: string; title: string; intro?: string;
  image?: { src: string; alt: string; position?: string };
}) {
  return (
    <section className={`page-head${image ? ' page-head--media' : ''}`}>
      <p className="eyebrow page-head__eyebrow">{index} — {eyebrow}</p>
      <SplitTitle text={title} className="display page-head__title" />
      {intro && <p className="page-head__intro">{intro}</p>}
      {image && (
        <div className="page-head__media">
          <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 700px) 100vw, 58vw" style={{ objectFit: 'cover', objectPosition: image.position ?? 'center' }} />
        </div>
      )}
    </section>
  );
}
