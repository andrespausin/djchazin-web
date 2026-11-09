import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PlayerProvider from '@/components/PlayerProvider';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <a href="#main" className="skip">Skip to content</a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </PlayerProvider>
  );
}
