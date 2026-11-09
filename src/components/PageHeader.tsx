import { SplitTitle } from './Motion';

export default function PageHeader({ index, eyebrow, title, intro }: {
  index: string; eyebrow: string; title: string; intro?: string;
}) {
  return (
    <section className="page-head">
      <p className="eyebrow page-head__eyebrow">{index} — {eyebrow}</p>
      <SplitTitle text={title} className="display page-head__title" />
      {intro && <p className="page-head__intro">{intro}</p>}
    </section>
  );
}
