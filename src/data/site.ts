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
  djset: 'https://on.soundcloud.com/yqAdwmulZqU9Aqq7T0',
  site: 'https://djchazin.com',
  epk: '/press/CHAZIN_EPK_2026.pdf',
  pack: '/press/CHAZIN_Press_Pack.zip',
  ridersLocal: '/press/CHAZIN_Riders_Local_2026.pdf',
  ridersInternational: '/press/CHAZIN_Riders_International_2026.pdf',
  liveVideo: 'https://www.youtube.com/watch?v=ZKqKph_blNo',
} as const;

export const emails = {
  booking: 'booking@djchazin.com',
  info: 'info@djchazin.com',
} as const;

export const line = '@djchazin';

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
  'As he continues to take his distinctive blend of Tech House, Latin groove and percussive energy to dance floors around the world, Spanish-born, Venezuelan-descent DJ and producer Chazin has established himself as one of the emerging names shaping the new wave of Latin-inspired electronic music.',
  'From Europe to Asia and the Americas, Chazin has brought his high-energy sound to renowned venues and festivals including Bora Bora Ibiza, Maya Music Festival, Summer Daze Festival and Nikki Beach Marbella just to name a few. His international journey took a major step forward after relocating to Asia, where he became a resident at Illuzion Phuket, a DJ Mag Top 100 club, performing more than 300 shows and cementing his position within the electronic music scene.',
  'Behind the decks, Chazin’s sets combine the drive and precision of Tech House with Latin-rooted rhythms, percussion and infectious grooves, creating a sound designed to connect with dance floors from intimate clubs to major festival stages.',
  'His growing presence as a producer has seen his music reach audiences across the international electronic music circuit, with releases on respected labels and a catalogue that continues to expand. His productions have accumulated more than 200,000 streams, further establishing his identity as an artist with a clear and distinctive musical direction.',
  'Beyond his own productions, Chazin is also the founder of Magna Beat Records, an independent label focused on Tech House and Latin Groove. Through the label, he is developing a platform for a new generation of artists and helping push Latin-inspired club music further into the global electronic scene.',
  'With an ever-growing catalogue, an international touring background and a sound built around rhythm, energy and Latin identity, Chazin continues to expand his reach across the world’s dance floors, with his sights firmly set on becoming a defining name in the next generation of Latin House and Tech House.',
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
  { slug: 'overabove', name: 'Over & Above Penang', logo: '/images/clubs/overabove.webp' },
] as const;

export type VenueSite = { city: string; country: string; code: string; lng: number; lat: number };
/** Venues with a confirmed location. After editing places.json run `npm run generate:map`. */
export const venueSites: Record<string, VenueSite[]> = places.venues;

export const alsoPlayed =
  'Westin Pool Party · Amnesia Bangkok · Kudo Beach Club · Sound Club Koh Samui · Banje Beach Dubrovnik · Paradise Beach Festival · Rhythm Songkran Festival · Beerlao Festival · Garamond · Ramses · Nipponsei';

export const flyers = [
  { src: '/images/epk-v4/fl_babyface.webp', w: 900, h: 896, title: 'Babyface', place: 'Bangkok, Thailand' },
  { src: '/images/epk-v4/fl_eden.webp', w: 900, h: 903, title: 'Eden · Picante', place: 'Bangkok, Thailand · July 2023' },
  { src: '/images/epk-v4/fl_hatyai.webp', w: 900, h: 900, title: 'Hatyai Midnight Songkran', place: 'Hatyai, Thailand · April 2025' },
  { src: '/images/epk-v4/fl_insanity.webp', w: 678, h: 960, title: 'Insanity Nightclub', place: 'Bangkok, Thailand' },
  { src: '/images/epk-v4/fl_sound.webp', w: 900, h: 1279, title: 'Sound Club', place: 'Koh Samui, Thailand' },
  { src: '/images/epk-v4/fl_maya.webp', w: 900, h: 1116, title: 'Maya Music Festival', place: 'Pattaya, Thailand · Jan–Feb 2020' },
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
  { file: '/press/photos/chazin-press-00-color.jpg', thumb: '/images/photos/press-color.webp', label: 'Photo · colour' },
  { file: '/press/photos/chazin-press-01.jpg', thumb: '/images/photos/press-01.webp', label: 'Photo 01' },
  { file: '/press/photos/chazin-press-02.jpg', thumb: '/images/photos/press-02.webp', label: 'Photo 02' },
  { file: '/press/photos/chazin-press-03.jpg', thumb: '/images/photos/press-03.webp', label: 'Photo 03' },
  { file: '/press/photos/chazin-press-04.jpg', thumb: '/images/photos/press-04.webp', label: 'Photo 04' },
  { file: '/press/photos/chazin-press-05.jpg', thumb: '/images/photos/press-05.webp', label: 'Photo 05' },
  { file: '/press/photos/chazin-press-06.jpg', thumb: '/images/photos/press-06.webp', label: 'Photo 06' },
  { file: '/press/photos/chazin-press-07.jpg', thumb: '/images/photos/press-07.webp', label: 'Photo 07' },
  { file: '/press/photos/chazin-press-08.jpg', thumb: '/images/photos/press-08.webp', label: 'Photo 08' },
] as const;

export const pressLogos = [
  { file: '/press/logos/chazin_logo_white.svg', preview: '/brand/chazin-logo-white.svg', label: 'Chazin · white · SVG', light: false },
  { file: '/press/logos/chazin_logo_black.svg', preview: '/brand/chazin-logo-black.svg', label: 'Chazin · black · SVG', light: true },
  { file: '/press/logos/chazin-wordmark-white.png', preview: '/press/logos/chazin-wordmark-white.png', label: 'Chazin · wordmark · PNG', light: false },
  { file: '/press/logos/chazin-wordmark-chrome.png', preview: '/press/logos/chazin-wordmark-chrome.png', label: 'Chazin · chrome wordmark · PNG', light: false },
  { file: '/press/logos/chazin-emblem-white.png', preview: '/press/logos/chazin-emblem-white.png', label: 'Chazin · emblem · PNG', light: false },
  { file: '/press/logos/chazin-emblem-chrome.png', preview: '/press/logos/chazin-emblem-chrome.png', label: 'Chazin · chrome emblem · PNG', light: false },
  { file: '/press/logos/magna-beat-white.svg', preview: '/brand/magna-beat-white.svg', label: 'Magna Beat · white · SVG', light: false },
  { file: '/press/logos/magna-beat-black.svg', preview: '/press/logos/magna-beat-black.svg', label: 'Magna Beat · black · SVG', light: true },
  { file: '/press/logos/magna-beat-white.png', preview: '/brand/magna-beat-white.svg', label: 'Magna Beat · white · PNG', light: false },
] as const;

export const BPM = 124;
