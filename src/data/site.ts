// Single source of truth for the site's content. Edit here, not in the components.

import places from './places.json';

export const links = {
  spotify: 'https://open.spotify.com/artist/1rVSu8yc8cVsW5gXMUMXrf',
  beatport: 'https://www.beatport.com/artist/chazin/797529',
  label: 'https://www.beatport.com/label/magna-beat/148379',
  instagram: 'https://www.instagram.com/djchazin',
  youtube: 'https://www.youtube.com/@DjChazin',
  tiktok: 'https://www.tiktok.com/@djchazin',
  soundcloud: 'https://soundcloud.com/djchazin',
  site: 'https://djchazin.com',
  epk: '/press/CHAZIN_EPK_2026.pdf',
  pack: '/press/CHAZIN_Press_Pack.zip',
  ridersLocal: '/press/CHAZIN_Riders_Local_2026.pdf',
  ridersInternational: '/press/CHAZIN_Riders_International_2026.pdf',
} as const;

export const emails = {
  booking: 'booking@djchazin.com',
  info: 'info@djchazin.com',
} as const;

export const socials = [
  { key: 'spotify', label: 'Spotify', href: links.spotify },
  { key: 'beatport', label: 'Beatport', href: links.beatport },
  { key: 'instagram', label: 'Instagram', href: links.instagram },
  { key: 'youtube', label: 'YouTube', href: links.youtube },
  { key: 'tiktok', label: 'TikTok', href: links.tiktok },
  { key: 'soundcloud', label: 'SoundCloud', href: links.soundcloud },
] as const;

export type SocialKey = (typeof socials)[number]['key'];

export const nav = [
  { href: '/about', label: 'About' },
  { href: '/music', label: 'Music' },
  { href: '/shows', label: 'Shows' },
  { href: '/press', label: 'Press' },
  { href: '/booking', label: 'Booking' },
] as const;

export const releases = [
  {
    slug: 'ela-grita',
    title: 'Ela Grita',
    label: 'Magna Beat Records',
    year: '2026',
    cover: '/images/releases/ela-grita.webp',
    spotify: 'https://open.spotify.com/track/71u4TBqK6GLVtg2TD6bhCW',
  },
  {
    slug: 'tukutu',
    title: 'Tukutu',
    label: 'Magna Beat Records',
    year: '',
    cover: '/images/releases/tukutu.webp',
    // TODO: confirm — on Spotify this track is credited to Kastelo, RMAND, LOS MENOR3S.
    spotify: 'https://open.spotify.com/track/6YM6SHxAHVoKht0YhJFFIe',
  },
  {
    slug: 'mismo-que-yo',
    title: 'Mismo Que Yo',
    label: 'Magna Beat Records',
    year: '2025',
    cover: '/images/releases/mismo-que-yo.webp',
    spotify: 'https://open.spotify.com/track/6fqOEY1BlGlQXnsTVge7Yl',
  },
] as const;

export const stats = [
  { value: 300, suffix: '+', label: 'Shows at Illuzion Phuket', sub: 'DJ Mag Top 100 Club' },
  { value: 200, suffix: 'K+', label: 'Spotify streams', sub: 'and counting' },
  { value: 8, suffix: '', label: 'Official releases', sub: 'on international labels' },
  { value: 3, suffix: '', label: 'Continents', sub: '9 countries played' },
] as const;

export const bio = [
  'Chazin is a Spanish-born DJ and producer of Venezuelan descent. He started DJing at 14 and has been performing professionally since 2005, delivering peak-time Tech House infused with Latin groove and percussive energy.',
  "His career has taken him from the heart of Europe's club scene to stages across Europe, Asia and the Americas — from Pacha Ibiza and Bora Bora Ibiza to Nikki Beach Marbella, Maya Music Festival and Summer Daze.",
  "After relocating to Asia, he held a residency of more than 300 shows at Illuzion Phuket, a DJ Mag Top 100 club, becoming a fixture of the region's international circuit.",
  'Today, based in Bangkok, Chazin builds his sets around groove, tension and release. As founder of Magna Beat Records, he is driving the global rise of Latin-inspired Tech House.',
  "In the studio, he treats every record as an extension of the dancefloor: rolling basslines, hypnotic vocal hooks and Latin percussion shaped by years of reading crowds night after night. With new music on the way and an expanding international calendar, his mission remains the same — to bring the warmth of Latin rhythm to the world's most demanding dancefloors.",
];

export const clubs = [
  { slug: 'pacha', name: 'Pacha Ibiza', logo: '/images/clubs/pacha.webp' },
  { slug: 'illuzion', name: 'Illuzion Phuket', logo: '/images/clubs/illuzion.webp' },
  { slug: 'nikki', name: 'Nikki Beach', logo: '/images/clubs/nikki.webp' },
  { slug: 'maya', name: 'Maya Music Festival', logo: '/images/clubs/maya.webp' },
  { slug: 'shoko', name: 'Shôko Barcelona', logo: '/images/clubs/shoko.webp' },
  { slug: 'borabora', name: 'Bora Bora Ibiza', logo: '/images/clubs/borabora.webp' },
  { slug: 'celavi', name: 'Cé La Vi', logo: '/images/clubs/celavi.webp' },
  { slug: 'opium', name: 'Opium Madrid', logo: '/images/clubs/opium.webp' },
  { slug: 'kapital', name: 'Teatro Kapital', logo: '/images/clubs/kapital.webp' },
  { slug: 'summerdaze', name: 'Summer Daze Series', logo: '/images/clubs/summerdaze.webp' },
  { slug: 'wmiami', name: 'W Miami', logo: '/images/clubs/wmiami.webp' },
] as const;

export type VenueSite = { city: string; country: string; code: string; lng: number; lat: number };
/** Venues with a confirmed location. After editing places.json run `npm run generate:map`. */
export const venueSites: Record<string, VenueSite[]> = places.venues;

export const alsoPlayed =
  'Westin Pool Party · Amnesia Bangkok · Kudo Beach Club · Sound Club Koh Samui · Banje Beach Dubrovnik · Over & Above Penang · Paradise Beach Festival · Rhythm Songkran Festival · Beerlao Festival · Garamond · Ramses · Nipponsei';

export const flyers = [
  { src: '/images/flyers/freedom.webp', w: 1000, h: 1333, title: 'Club Freedom', place: 'Oita, Japan · 2026' },
  { src: '/images/flyers/sound.webp', w: 1000, h: 1333, title: 'Sound Club', place: 'Koh Samui, Thailand' },
  { src: '/images/flyers/songkran.webp', w: 1000, h: 1241, title: 'Rhythm Pool Party', place: 'Hyatt Regency · Bangkok' },
  { src: '/images/flyers/xmas.webp', w: 1000, h: 1013, title: 'Sound Club · Christmas', place: 'Koh Samui, Thailand' },
  { src: '/images/flyers/madelements.webp', w: 1000, h: 1005, title: 'Mad Stash · Mad Elements', place: 'SO/ Bangkok · 2021' },
  { src: '/images/flyers/spectrum.webp', w: 1000, h: 996, title: 'Mad Stash', place: 'Spectrum Lounge & Bar · 2021' },
] as const;

export const countries = [
  { name: 'Spain', cities: 'Madrid · Barcelona · Ibiza', flag: 'es' },
  { name: 'Portugal', cities: 'Oporto', flag: 'pt' },
  { name: 'Croatia', cities: 'Dubrovnik', flag: 'hr' },
  { name: 'Thailand', cities: 'Bangkok · Phuket · Koh Samui · Pattaya', flag: 'th' },
  { name: 'Malaysia', cities: 'Penang', flag: 'my' },
  { name: 'Laos', cities: 'Savannakhet', flag: 'la' },
  { name: 'Japan', cities: 'Fukuoka · Oita', flag: 'jp' },
  { name: 'USA', cities: 'Miami', flag: 'us' },
  { name: 'Venezuela', cities: 'Caracas', flag: 've' },
] as const;

export const pressPhotos = [
  { file: '/press/photos/chazin-press-01.jpg', thumb: '/images/photos/cover.webp', label: 'Press photo 01' },
  { file: '/press/photos/chazin-press-02.jpg', thumb: '/images/photos/profile.webp', label: 'Press photo 02' },
  { file: '/press/photos/chazin-press-03.jpg', thumb: '/images/photos/prayer.webp', label: 'Press photo 03' },
  { file: '/press/photos/chazin-press-04.jpg', thumb: '/images/photos/shades.webp', label: 'Press photo 04' },
] as const;

export const pressLogos = [
  { file: '/press/logos/chazin_logo_white.svg', preview: '/brand/chazin-logo-white.svg', label: 'Chazin · white · SVG', light: false },
  { file: '/press/logos/chazin_logo_black.svg', preview: '/brand/chazin-logo-black.svg', label: 'Chazin · black · SVG', light: true },
  { file: '/press/logos/magna-beat-white.svg', preview: '/brand/magna-beat-white.svg', label: 'Magna Beat · white · SVG', light: false },
  { file: '/press/logos/magna-beat-black.svg', preview: '/press/logos/magna-beat-black.svg', label: 'Magna Beat · black · SVG', light: true },
  { file: '/press/logos/magna-beat-white.png', preview: '/brand/magna-beat-white.svg', label: 'Magna Beat · white · PNG', light: false },
] as const;

export const BPM = 124;
