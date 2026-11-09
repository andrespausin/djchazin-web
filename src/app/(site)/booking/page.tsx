import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';
import Visualizer from '@/components/Visualizer';
import { Arrow, SocialIcon } from '@/components/Music';
import { emails, links } from '@/data/site';

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Book Chazin for your club, festival or private event: booking@djchazin.com',
};

export default function Booking() {
  return (
    <>
      <PageHeader index="05" eyebrow="Booking" title={"Let's talk."} />
      <section className="section booking">
        <Reveal className="booking__list">
          <a data-reveal href={`mailto:${emails.booking}`} className="booking__row"><span className="eyebrow">Bookings</span><span className="booking__mail">{emails.booking}</span><Arrow size={24} /></a>
          <a data-reveal href={`mailto:${emails.info}`} className="booking__row"><span className="eyebrow">Inquiries</span><span className="booking__mail">{emails.info}</span><Arrow size={24} /></a>
          <a data-reveal href={links.instagram} target="_blank" rel="noreferrer" className="booking__row"><span className="eyebrow">Instagram</span><span className="booking__mail"><SocialIcon name="instagram" size={26} /> @djchazin</span><Arrow size={24} /></a>
        </Reveal>
        <p className="muted booking__note">Technical and hospitality riders are shared once a booking is confirmed.</p>
        <Visualizer className="booking__viz" bars={120} mode="mirror" />
      </section>
    </>
  );
}
