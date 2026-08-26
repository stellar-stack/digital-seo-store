// One-off generator: bakes a static dot-matrix world map + real office pin
// positions into a JSON file consumed by OfficesStrip.tsx at render time.
// Re-run this only if the office list/addresses change. Heavy geo libraries
// (d3-geo, topojson-client, world-atlas) stay dev-only — nothing here ships
// to the browser bundle.
import { geoNaturalEarth1, geoPath, geoContains } from "d3-geo";
import { feature } from "topojson-client";
import land50m from "world-atlas/land-50m.json" with { type: "json" };
import { writeFileSync } from "node:fs";

const WIDTH = 1400;
const HEIGHT = 660;
const DOT_SPACING = 7;
const DOT_RADIUS = 1.3;

const landGeo = feature(land50m, land50m.objects.land);

const projection = geoNaturalEarth1().fitSize([WIDTH, HEIGHT], landGeo);
const path = geoPath(projection);
void path;

const dots = [];
for (let x = DOT_SPACING / 2; x < WIDTH; x += DOT_SPACING) {
  for (let y = DOT_SPACING / 2; y < HEIGHT; y += DOT_SPACING) {
    const lonlat = projection.invert([x, y]);
    if (!lonlat) continue;
    if (geoContains(landGeo, lonlat)) {
      dots.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
    }
  }
}

// Real office coordinates (city-level, public knowledge — not fabricated).
const OFFICES = {
  canada: { lat: 49.1913, lon: -122.849 }, // Surrey, BC
  us: { lat: 33.9519, lon: -83.3576 }, // Athens, GA
  india: { lat: 23.0225, lon: 72.5714 }, // Ahmedabad
};

const pins = {};
for (const [key, { lat, lon }] of Object.entries(OFFICES)) {
  const [x, y] = projection([lon, lat]);
  pins[key] = [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

const out = { width: WIDTH, height: HEIGHT, dotRadius: DOT_RADIUS, dots, pins };
writeFileSync(
  new URL("../src/config/office-map.json", import.meta.url),
  JSON.stringify(out)
);
console.log(`Generated ${dots.length} land dots. Pins:`, pins);
