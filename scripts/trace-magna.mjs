// Rebuilds the Magna Beat logo as clean vector art from the only available source (a 592px PNG).
// Rays and ring segments are redrawn as exact geometry; the script lettering is traced.
// Run: npm run trace:magna
import fs from 'node:fs/promises';
import { promisify } from 'node:util';
import sharp from 'sharp';
import potrace from 'potrace';

const SRC = new URL('../src/assets/magna-beat-source.png', import.meta.url).pathname;
const K = 6;           // working scale
const CX = 286 * K, CY = 308 * K; // centre of the sun, measured from the top/bottom rays

const meta = await sharp(SRC).metadata();
const W = meta.width * K, H = meta.height * K;
const { data } = await sharp(SRC).extractChannel('alpha')
  .resize(W, H, { kernel: 'lanczos3' }).blur(K * 0.55).threshold(118).raw().toBuffer({ resolveWithObject: true });

// Connected components (iterative flood fill on the thresholded alpha).
const labels = new Int32Array(W * H);
const comps = [];
for (let s = 0; s < W * H; s++) {
  if (!data[s] || labels[s]) continue;
  const id = comps.length + 1, pts = [], stack = [s];
  labels[s] = id;
  while (stack.length) {
    const p = stack.pop(); pts.push(p);
    const x = p % W;
    for (const n of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p - W, p + W]) {
      if (n >= 0 && n < W * H && data[n] && !labels[n]) { labels[n] = id; stack.push(n); }
    }
  }
  comps.push(pts);
}

const median = (a) => a.sort((x, y) => x - y)[a.length >> 1];
const shapes = { rays: [], arcs: [] };
const erase = new Set();

comps.forEach((pts, i) => {
  if (pts.length < K * K * 12) { erase.add(i + 1); return; } // specks
  const polar = pts.map((p) => {
    const x = (p % W) - CX, y = Math.floor(p / W) - CY;
    return { r: Math.hypot(x, y), a: Math.atan2(y, x) };
  });
  const rs = polar.map((v) => v.r).sort((a, b) => a - b);
  const r0 = rs[Math.floor(rs.length * 0.02)], r1 = rs[Math.floor(rs.length * 0.98)];
  // Unwrap angles around the component's mean direction.
  const mx = polar.reduce((t, v) => t + Math.cos(v.a), 0), my = polar.reduce((t, v) => t + Math.sin(v.a), 0);
  const mean = Math.atan2(my, mx);
  const rel = polar.map((v) => Math.atan2(Math.sin(v.a - mean), Math.cos(v.a - mean))).sort((a, b) => a - b);
  const a0 = rel[Math.floor(rel.length * 0.005)], a1 = rel[Math.floor(rel.length * 0.995)];
  const arcLen = (a1 - a0) * (r0 + r1) / 2, radial = r1 - r0;
  if (r0 > 262 * K && radial > arcLen * 1.5 && radial < 60 * K) {
    shapes.rays.push({ a: mean, r0, r1, w: pts.length / radial });
    erase.add(i + 1);
  } else if (arcLen > radial * 2.6 && radial < 22 * K && r0 > 150 * K) {
    shapes.arcs.push({ r: (r0 + r1) / 2, w: pts.length / arcLen, from: mean + a0, to: mean + a1 });
    erase.add(i + 1);
  }
});

// Snap: all rays share one length/width and a 22.5deg grid; rings share a radius and weight.
const step = Math.PI / 8;
const rayW = median(shapes.rays.map((r) => r.w)) * 0.82;
const ray0 = median(shapes.rays.map((r) => r.r0)), ray1 = median(shapes.rays.map((r) => r.r1));
const groups = [];
for (const arc of shapes.arcs) {
  const g = groups.find((x) => Math.abs(x.r - arc.r) < 8 * K);
  if (g) g.items.push(arc); else groups.push({ r: arc.r, items: [arc] });
}
const fmt = (n) => n.toFixed(1);
const pt = (r, a) => `${fmt(CX + r * Math.cos(a))} ${fmt(CY + r * Math.sin(a))}`;
let rayPath = '', strokes = '';
for (const r of shapes.rays) {
  const a = Math.round(r.a / step) * step;
  rayPath += `M${pt(ray0 + rayW / 2, a)}L${pt(ray1 - rayW / 2, a)}`;
}
const ringW = median(shapes.arcs.map((a) => a.w)) * 0.82; // thresholded blur inflates thin strokes
for (const g of groups) {
  const r = median(g.items.map((a) => a.r));
  for (const a of g.items) {
    const trim = (ringW / 2) / r; // the round cap adds half a stroke at each end
    const from = a.from + trim, to = a.to - trim;
    strokes += `M${pt(r, from)}A${fmt(r)} ${fmt(r)} 0 ${to - from > Math.PI ? 1 : 0} 1 ${pt(r, to)}`;
  }
}

// Trace whatever is left: the lettering and the ring pieces fused to it.
const mono = Buffer.alloc(W * H, 255);
for (let p = 0; p < W * H; p++) if (data[p] && !erase.has(labels[p])) mono[p] = 0;
const png = await sharp(mono, { raw: { width: W, height: H, channels: 1 } }).png().toBuffer();
const trace = promisify(potrace.trace);
// alphaMax 0 returns the raw polygon; the PNG's stair-stepping is then removed along the contour,
// which (unlike blurring the bitmap) keeps the thin gaps between the letters and their shadow open.
const svgOut = await trace(png, { turdSize: 400, alphaMax: 0, optCurve: false, threshold: 128 });
const rawD = svgOut.match(/ d="([^"]+)"/)[1];

const SIGMA = 4 * K, SPACING = K * 0.5, OUT_EVERY = 10;
function smooth(points) {
  // Uniform resample along arc length.
  const seg = points.map((p, i) => Math.hypot(points[(i + 1) % points.length][0] - p[0], points[(i + 1) % points.length][1] - p[1]));
  const total = seg.reduce((a, b) => a + b, 0);
  const n = Math.max(12, Math.round(total / SPACING));
  const res = [];
  for (let i = 0, k = 0, acc = 0; i < n; i++) {
    const at = (i / n) * total;
    while (acc + seg[k] < at) acc += seg[k++];
    const t = seg[k] ? (at - acc) / seg[k] : 0;
    const a = points[k], b = points[(k + 1) % points.length];
    res.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  // Gaussian along the closed contour, with sigma capped on tiny loops so they do not collapse.
  const sig = Math.min(SIGMA / SPACING, n / 14), rad = Math.ceil(sig * 3);
  const kernel = Array.from({ length: rad * 2 + 1 }, (_, i) => Math.exp(-((i - rad) ** 2) / (2 * sig * sig)));
  const norm = kernel.reduce((a, b) => a + b, 0);
  return res.map((_, i) => {
    let x = 0, y = 0;
    for (let j = -rad; j <= rad; j++) {
      const p = res[((i + j) % n + n) % n];
      x += p[0] * kernel[j + rad]; y += p[1] * kernel[j + rad];
    }
    return [x / norm, y / norm];
  });
}
function toBezier(pts) {
  // Catmull-Rom through every Nth point of the smoothed contour.
  const p = pts.filter((_, i) => i % OUT_EVERY === 0);
  const n = p.length;
  let out = `M${fmt(p[0][0])} ${fmt(p[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    out += `C${fmt(p1[0] + (p2[0] - p0[0]) / 6)} ${fmt(p1[1] + (p2[1] - p0[1]) / 6)} ${fmt(p2[0] - (p3[0] - p1[0]) / 6)} ${fmt(p2[1] - (p3[1] - p1[1]) / 6)} ${fmt(p2[0])} ${fmt(p2[1])}`;
  }
  return out + 'Z';
}
const d = rawD.split(/(?=M)/).filter((x) => x.trim()).map((sub) => {
  const nums = sub.match(/-?\d+(?:\.\d+)?/g).map(Number);
  const pts = [];
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
  return toBezier(smooth(pts));
}).join('');

const build = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Magna Beat Records"><path fill="${color}" fill-rule="evenodd" d="${d}"/><g fill="none" stroke="${color}" stroke-linecap="round"><path stroke-width="${fmt(ringW)}" d="${strokes}"/><path stroke-width="${fmt(rayW)}" d="${rayPath}"/></g></svg>\n`;

const root = new URL('../public/', import.meta.url).pathname;
const white = build('#fff');
await fs.writeFile(`${root}brand/magna-beat-white.svg`, white);
await fs.writeFile(`${root}press/logos/magna-beat-white.svg`, white);
await fs.writeFile(`${root}press/logos/magna-beat-black.svg`, build('#0b0b0b'));
await sharp(Buffer.from(white), { density: 72 * (2000 / W) * 1 }).resize(2000).png({ compressionLevel: 9 }).toFile(`${root}press/logos/magna-beat-white.png`);
console.log(`ring ${(ringW / K).toFixed(1)}px ray ${(rayW / K).toFixed(1)}px · rays ${shapes.rays.length} · arcs ${shapes.arcs.length} in ${groups.length} rings (r=${groups.map((g) => Math.round(g.r / K))}) · ${(white.length / 1024).toFixed(0)}KB`);
