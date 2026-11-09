// Builds sharp, high-quality web previews for /press from the original JPGs.
// Originals in public/press/photos are never modified. Run: node scripts/press-thumbs.mjs
import fs from 'node:fs/promises';
import sharp from 'sharp';

const SRC = new URL('../public/press/photos/', import.meta.url).pathname;
const OUT = new URL('../public/images/photos/', import.meta.url).pathname;

for (const f of (await fs.readdir(SRC)).filter((n) => /^chazin-press-\d+\.jpg$/.test(n))) {
  const n = f.match(/(\d+)/)[1];
  const out = `${OUT}press-${n}.webp`;
  const { size } = await sharp(`${SRC}${f}`)
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(out);
  console.log(`press-${n}.webp ${(size / 1024).toFixed(0)}KB`);
}
