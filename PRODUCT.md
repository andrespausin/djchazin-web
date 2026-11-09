# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two audiences of equal weight:
- **Bookers and promoters** (clubs, festivals, agencies) evaluating whether to hire Chazin. They need proof of experience, a press kit, and a fast route to contact.
- **Fans and listeners** discovering the music: releases, Spotify, social profiles, upcoming/past shows. Many arrive on mobile via the QR code in the EPK (`/links`).

## Product Purpose
Official website of Chazin, a Spanish-born DJ and producer of Venezuelan descent based in Bangkok. It presents the artist, music, shows, and press material, and converts visitors into booking inquiries, EPK downloads, and listens/follows. Success: a booker can reach `/booking` or download the EPK, and a fan can reach Spotify or social links, in a few taps.

## Positioning
Latin House & Tech House that fuses Spain and Venezuela identity with tech house, played from Bangkok; founder of Magna Beat Records. The Spain × Venezuela × Bangkok combination is the claim a neighboring tech-house DJ could not truthfully copy.

## Operating Context
Static Next.js site (App Router, all routes prerendered), content centralized in `src/data/site.ts`. Built from the 2026 Electronic Press Kit; the EPK PDF links to `djchazin.com/links` and `djchazin.com/press`, which must keep existing. Tempo is 124 BPM (`BPM` in `site.ts`, `--beat` in `globals.css`).

## Capabilities and Constraints
- Routes: `/`, `/about`, `/music`, `/shows`, `/press`, `/booking`, and `/links` (link hub, no nav, mobile-first).
- Press page offers EPK PDF, high-res photos, logos, copy-ready short bio.
- Stack in place: Next.js, React 19, TypeScript, GSAP + ScrollTrigger, Lenis, self-hosted fonts.
- Content is English (`lang="en"`).
- The home page features the Paradise Beach Festival aftermovie, embedded from YouTube.

## Brand Commitments
Existing identity from the 2026 EPK: black base, champagne accent (`#C2A878`), Archivo Expanded titles, Montserrat text, B&W photography. Name is written CHAZIN. Treated as the incumbent identity; any change is a user decision.

## Evidence on Hand
Real assets in `public/images/` (photos, flyers, covers, club logos) and `public/press/` (photos, logos, `CHAZIN_EPK_2026.pdf`). Releases, bio, clubs, flyers, countries in `src/data/site.ts`. Do not invent video, testimonials, stats, or tour dates.

## Product Principles
- Serve bookers and fans without making either work: contact and listening are always one step away.
- The music and the artist's real history are the proof; never fabricate credentials.
- Mobile-first for the `/links` QR path and social traffic.
- Static, fast, and motion-aware: respect `prefers-reduced-motion`.

## Accessibility & Inclusion
No product-specific standard established. Existing commitment: reduced-motion support disables smooth scroll, reveals, and loops.
