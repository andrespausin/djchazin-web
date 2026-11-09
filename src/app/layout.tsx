import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

const sans = localFont({
  src: '../fonts/montserrat.woff2',
  weight: '100 900',
  variable: '--font-sans',
  display: 'swap',
});

const display = localFont({
  src: '../fonts/archivo-wdth.woff2',
  weight: '100 900',
  variable: '--font-display',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://djchazin.com'),
  title: { default: 'CHAZIN — Latin Tech House', template: '%s — CHAZIN' },
  description:
    'Official website of Chazin: Spanish-born DJ and producer of Venezuelan descent, based in Bangkok. Latin Tech House, founder of Magna Beat Records.',
  openGraph: {
    title: 'CHAZIN — Latin Tech House',
    description: 'Spain × Venezuela · Based in Bangkok. Founder of Magna Beat Records.',
    url: 'https://djchazin.com',
    siteName: 'CHAZIN',
    images: [{ url: '/images/photos/cover.jpg', width: 1800, height: 2700 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0B0B0B', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <SmoothScroll />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
