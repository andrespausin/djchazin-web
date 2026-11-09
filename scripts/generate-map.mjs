// Generates src/assets/world-map.svg — the tour map with animatable routes.
// Run: npm run generate:map  (after editing CITIES / ROUTES below)
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';

const require = createRequire(import.meta.url);
const topo = require('world-atlas/countries-110m.json');
const land = feature(topo, topo.objects.countries);

const W = 1200, H = 540;
const proj = geoMercator().rotate([-25, 0]).fitExtent([[30, 24], [W - 30, H - 24]], {
  type: 'MultiPoint', coordinates: [[-98, 58], [148, -6]],
});
const path = geoPath(proj);

// ISO numeric codes of countries played
const VISITED = new Set(['724', '620', '764', '191', '458', '418', '840', '392', '862']);

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
  svg += `<path d="${path(f)}" class="${VISITED.has(f.id) ? 'visited' : ''}"/>`;
}
svg += '</g><g class="routes">';
for (const [a, b] of ROUTES) {
  svg += `<path class="route" d="${path({ type: 'LineString', coordinates: [CITIES[a], CITIES[b]] })}"/>`;
}
svg += '</g><g class="cities">';
for (const [name, c] of Object.entries(CITIES)) {
  const [x, y] = proj(c);
  const hub = HUBS.has(name);
  const [dx, dy, anchor] = LABELS[name];
  svg += `<g class="city${hub ? ' hub' : ''}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${hub ? 5 : 3}"/>`;
  if (hub) svg += `<circle class="ping" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"/>`;
  svg += `<text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${anchor}">${name.toUpperCase()}</text></g>`;
}
svg += '</g></svg>';
fs.writeFileSync(new URL('../src/assets/world-map.svg', import.meta.url), svg);
console.log('world-map.svg written', (svg.length / 1024).toFixed(0), 'KB');
