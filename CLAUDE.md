# CHAZIN website — handoff for Claude Code

Next.js 15 static site (see README.md). Content lives in `src/data/site.ts`. Deploy: Vercel, branch `master`, domain djchazin.com (not connected yet).

## Already done (in master)
- Spotify artist link updated everywhere (`links.spotify`).
- `/press`: EPK v4 PDF, full press pack ZIP (photos + logos + riders), riders PDF, 8 press photos.

## TODO: sync the site with EPK v4 (the PDF was updated; the web was not)
1. **Genre wording**: replace "Latin Tech House" with "Latin House & Tech House" (hero eyebrow, footer tagline, metadata in `src/app/layout.tsx`, JSON-LD genre, README, `/links`, `/music`).
2. **Bio** (`bio` array in `site.ts`, `/about`, short bio in `/press`): replace with the text below. Note: Illuzion Phuket is a DJ Mag **Top 100** club.
3. **Photos** (already resized in `public/images/epk-v4/`, B&W): `p2_crowd.jpg` (statement/hero-style crowd), `p3_portrait.jpg` (bio portrait, /about), `p4_confetti.jpg` (highlights/live section), `p8_illuzion.jpg` (releases/music header), `p9_profile.jpg` (press/media hero). Use them instead of the old crowd/profile/booth/westin/shades images where equivalent.
4. **Flyers** (`/shows`, `flyers` in `site.ts`): replace the old set with these six in `public/images/epk-v4/`:
   - `fl_babyface.jpg` — Babyface, Bangkok
   - `fl_eden.jpg` — Eden Bangkok · Picante, July 2023
   - `fl_hatyai.jpg` — Hatyai Midnight Songkran, April 2025
   - `fl_insanity.jpg` — Insanity Nightclub, Bangkok
   - `fl_sound.jpg` — Sound Club, Koh Samui
   - `fl_maya.jpg` — Maya Music Festival, Pattaya, Jan–Feb 2020
   Original flyer colours are kept (no recolouring). Update width/height in the data from the real image sizes.
5. **Shows footer line**: "EUROPE · ASIA · AMERICA AND BEYOND" (replaces "Spain · Thailand · Japan · and beyond").
6. **Booking page** (`/booking`) and `/links`: add LINE: @djchazin (plain text).
7. Keep emails booking@ / info@djchazin.com on `/booking`; the EPK closing page shows only DJCHAZIN.COM.
8. Pending from README: live video, Tukutu credit check, vector logos, email routing.

## Bio text (EPK v4)

As he continues to take his distinctive blend of Tech House, Latin groove and percussive energy to dance floors around the world, Spanish-born, Venezuelan-descent DJ and producer Chazin has established himself as one of the emerging names shaping the new wave of Latin-inspired electronic music.

From Europe to Asia and the Americas, Chazin has brought his high-energy sound to renowned venues and festivals including Bora Bora Ibiza, Maya Music Festival, Summer Daze Festival and Nikki Beach Marbella just to name a few. His international journey took a major step forward after relocating to Asia, where he became a resident at Illuzion Phuket, a DJ Mag Top 100 club, performing more than 300 shows and cementing his position within the electronic music scene.

Behind the decks, Chazin’s sets combine the drive and precision of Tech House with Latin-rooted rhythms, percussion and infectious grooves, creating a sound designed to connect with dance floors from intimate clubs to major festival stages.

His growing presence as a producer has seen his music reach audiences across the international electronic music circuit, with releases on respected labels and a catalogue that continues to expand. His productions have accumulated more than 200,000 streams, further establishing his identity as an artist with a clear and distinctive musical direction.

Beyond his own productions, Chazin is also the founder of Magna Beat Records, an independent label focused on Tech House and Latin Groove. Through the label, he is developing a platform for a new generation of artists and helping push Latin-inspired club music further into the global electronic scene.

With an ever-growing catalogue, an international touring background and a sound built around rhythm, energy and Latin identity, Chazin continues to expand his reach across the world’s dance floors, with his sights firmly set on becoming a defining name in the next generation of Latin House and Tech House.
