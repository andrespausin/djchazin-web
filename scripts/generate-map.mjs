// Generates src/assets/world-map.svg — the tour map with animatable routes.
// Run: npm run generate:map  (after editing CITIES / ROUTES below)
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';

const require = createRequire(import.meta.url);
const topo = require('world-atlas/countries-110m.json');
const land = feature(topo, topo.objects.countries);
// Countries the camera can zoom into get the finer outline; the rest stay light.
const fineTopo = require('world-atlas/countries-50m.json');
const fine = new Map(feature(fineTopo, fineTopo.objects.countries).features.map((f) => [f.id, f]));
const places = JSON.parse(fs.readFileSync(new URL('../src/data/places.json', import.meta.url), 'utf8'));

const W = 1200, H = 540;
const proj = geoMercator().rotate([-25, 0]).fitExtent([[30, 24], [W - 30, H - 24]], {
  type: 'MultiPoint', coordinates: [[-98, 58], [148, -6]],
});
const path = geoPath(proj).digits(1);

// ISO numeric codes of countries played
const VISITED = new Map([['724', 'es'], ['620', 'pt'], ['764', 'th'], ['191', 'hr'], ['458', 'my'], ['418', 'la'], ['840', 'us'], ['392', 'jp'], ['862', 've']]);
const CITY_COUNTRY = {
  Madrid: 'es', Barcelona: 'es', Ibiza: 'es', Oporto: 'pt', Dubrovnik: 'hr', Miami: 'us', Caracas: 've',
  Bangkok: 'th', Phuket: 'th', 'Koh Samui': 'th', Pattaya: 'th', Penang: 'my', Savannakhet: 'la', Fukuoka: 'jp', Oita: 'jp',
};

const CITIES = {
  Madrid: [-3.70, 40.42], Barcelona: [2.17, 41.39], Ibiza: [1.43, 38.91], Oporto: [-8.61, 41.15],
  Dubrovnik: [18.09, 42.65], Miami: [-80.19, 25.76], Caracas: [-66.90, 10.48],
  Bangkok: [100.50, 13.76], Phuket: [98.39, 7.88], 'Koh Samui': [100.01, 9.51], Pattaya: [100.88, 12.93],
  Penang: [100.33, 5.41], Savannakhet: [104.75, 16.55], Fukuoka: [130.40, 33.59], Oita: [131.61, 33.24],
};
const LABELS = {
  Madrid: [-10, -10, 'end'], Barcelona: [8, -10, 'start'], Ibiza: [8, 14, 'start'], Oporto: [-10, 4, 'end'],
  Dubrovnik: [8, -8, 'start'], Miami: [-10, -8, 'end'], Caracas: [8, 14, 'start'], Bangkok: [-10, -10, 'end'],
  Phuket: [-10, 12, 'end'], 'Koh Samui': [10, 6, 'start'], Pattaya: [10, -10, 'start'], Penang: [-10, 16, 'end'],
  Savannakhet: [10, -4, 'start'], Fukuoka: [-10, -10, 'end'], Oita: [10, 12, 'start'],
};
const HUBS = new Set(['Madrid', 'Bangkok']);
// Labels in dense clusters only appear once the camera zooms in.
const MINOR = new Set(['Oporto', 'Barcelona', 'Ibiza', 'Dubrovnik', 'Pattaya', 'Phuket', 'Koh Samui', 'Penang', 'Savannakhet', 'Oita']);
const ROUTES = [
  ['Madrid', 'Barcelona'], ['Madrid', 'Ibiza'], ['Madrid', 'Oporto'], ['Madrid', 'Dubrovnik'],
  ['Madrid', 'Miami'], ['Madrid', 'Caracas'], ['Madrid', 'Bangkok'],
  ['Bangkok', 'Phuket'], ['Bangkok', 'Koh Samui'], ['Bangkok', 'Pattaya'], ['Bangkok', 'Penang'],
  ['Bangkok', 'Savannakhet'], ['Bangkok', 'Fukuoka'], ['Bangkok', 'Oita'],
];

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="world-map" role="img" aria-label="Map of cities where Chazin has performed">`;
svg += '<g class="land">';
for (const f of land.features) {
  if (f.id === '010') continue; // Antarctica
  const code = VISITED.get(f.id);
  svg += code
    ? `<path d="${path(fine.get(f.id) ?? f)}" class="visited" data-country="${code}"/>`
    : `<path d="${path(f)}"/>`;
}
svg += '</g><g class="routes">';
for (const [a, b] of ROUTES) {
  svg += `<path class="route" d="${path({ type: 'LineString', coordinates: [CITIES[a], CITIES[b]] })}"/>`;
}
// Three nested groups per marker: position (attribute) > counter-zoom (CSS) > entrance (GSAP).
svg += '</g><g class="cities">';
for (const [name, c] of Object.entries(CITIES)) {
  const [x, y] = proj(c);
  const hub = HUBS.has(name);
  const [dx, dy, anchor] = LABELS[name];
  svg += `<g class="city${hub ? ' hub' : ''}${MINOR.has(name) ? ' minor' : ''}" data-country="${CITY_COUNTRY[name]}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><g class="marker"><g class="city__in"><circle r="${hub ? 5 : 3}"/>`;
  if (hub) svg += '<circle class="ping" r="5"/>';
  svg += `<text x="${dx}" y="${dy}" text-anchor="${anchor}">${name.toUpperCase()}</text></g></g></g>`;
}
svg += '</g><g class="pins">';
for (const [slug, sites] of Object.entries(places.venues)) {
  for (const site of sites) {
    const [x, y] = proj([site.lng, site.lat]);
    svg += `<g class="pin" data-venue="${slug}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><g class="marker"><circle class="pin__ring" r="11"/><circle class="pin__dot" r="5"/><text x="16" y="5">${site.city.toUpperCase()}</text></g></g>`;
  }
}
svg += '</g></svg>';
fs.writeFileSync(new URL('../src/assets/world-map.svg', import.meta.url), svg);

// Camera targets: a viewBox per country and venue, framed on the places actually played.
const frame = (coords, minW) => {
  const pts = coords.map((c) => proj(c));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const ratio = W / H;
  const w = Math.min(W, Math.max(minW, (Math.max(...xs) - Math.min(...xs)) * 2.4, (Math.max(...ys) - Math.min(...ys)) * 2.4 * ratio));
  const h = w / ratio;
  return [Math.max(0, Math.min(W - w, cx - w / 2)), Math.max(0, Math.min(H - h, cy - h / 2)), w, h].map((n) => +n.toFixed(1));
};
const focus = { countries: {}, venues: {} };
for (const code of VISITED.values()) {
  focus.countries[code] = frame(Object.keys(CITIES).filter((n) => CITY_COUNTRY[n] === code).map((n) => CITIES[n]), 170);
}
for (const [slug, sites] of Object.entries(places.venues)) {
  focus.venues[slug] = frame(sites.map((s) => [s.lng, s.lat]), 130);
}
fs.writeFileSync(new URL('../src/assets/world-map.focus.json', import.meta.url), `${JSON.stringify(focus, null, 2)}\n`);
console.log('world-map.svg written', (svg.length / 1024).toFixed(0), 'KB');
