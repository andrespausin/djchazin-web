'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, links } from '@/data/site';
import { SocialIcon } from './Music';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('menu-open', open); }, [open]);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <Link href="/" className="nav__logo" aria-label="Chazin — home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/chazin-logo-white.svg" alt="" width={132} height={38} />
      </Link>
      <nav aria-label="Main">
        <ul className="nav__links">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={pathname.startsWith(n.href) ? 'is-active' : undefined}>
                <span>{n.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <a className="nav__onair" href={links.spotify} target="_blank" rel="noreferrer">
        <SocialIcon name="spotify" size={16} /> <span>Listen</span>
      </a>
      <button className="nav__burger" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
        <span /><span />
      </button>
    </header>
  );
}
