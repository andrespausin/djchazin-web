// Converts every web image in public/images to WebP and removes the original.
// Press downloads (public/press) are never touched. Run: npm run convert:images
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../public/images/', import.meta.url).pathname;
const TARGET = path.join(ROOT, process.argv[2] ?? ''); // optional subfolder, e.g. epk-v4

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(e.name)) yield p;
  }
}

let before = 0, after = 0;
for await (const file of walk(TARGET)) {
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const isLogo = /\.png$/i.test(file);
  // High quality: next/image re-encodes these on delivery, so avoid stacking loss here.
  const a = await fs.stat(file);
  let data;
  for (const quality of isLogo ? [92] : [88, 82, 78, 74, 70]) {
    data = await sharp(file).webp(isLogo ? { quality, alphaQuality: 100, effort: 6 } : { quality, effort: 6, smartSubsample: true }).toBuffer();
    if (isLogo || data.length < a.size * 0.8) break; // grainy photos can grow in WebP; step down until it pays off
  }
  await fs.writeFile(out, data);
  const b = { size: data.length };
  before += a.size; after += b.size;
  await fs.unlink(file);
  console.log(path.relative(ROOT, out), `${(a.size / 1024).toFixed(0)}KB -> ${(b.size / 1024).toFixed(0)}KB`);
}
console.log(`total ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB`);
