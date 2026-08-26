// One-off generator: bakes a static dot-matrix world map + real office pin
// positions into a JSON file consumed by OfficesStrip.tsx at render time.
// Re-run this only if the office list/addresses change. Heavy geo libraries
// (d3-geo, topojson-client, world-atlas) stay dev-only — nothing here ships
// to the browser bundle.
import { geoNaturalEarth1, geoContains } from "d3-geo";
import { feature } from "topojson-client";
import land50m from "world-atlas/land-50m.json" with { type: "json" };
import countries50m from "world-atlas/countries-50m.json" with { type: "json" };
import { writeFileSync } from "node:fs";

const WIDTH = 1400;
const HEIGHT = 660;
const DOT_SPACING = 7;
const DOT_RADIUS = 1.3;

const landGeo = feature(land50m, land50m.objects.land);
const countriesGeo = feature(countries50m, countries50m.objects.countries);

// ISO 3166-1 numeric codes for our 3 office countries, so their dots can be
// rendered in the brand accent color — makes the map instantly legible as
// "our footprint" instead of a flat, ambiguous grey world, and (since the
// highlighted shape traces the real country outline) removes any doubt
// about whether a pin actually sits inside the right country.
const HIGHLIGHT_COUNTRY_IDS = { "124": "canada", "840": "us", "356": "india" };
const highlightFeatures = countriesGeo.features.filter((f) => f.id in HIGHLIGHT_COUNTRY_IDS);

const projection = geoNaturalEarth1().fitSize([WIDTH, HEIGHT], landGeo);

const dots = [];
const highlightDots = [];
for (let x = DOT_SPACING / 2; x < WIDTH; x += DOT_SPACING) {
  for (let y = DOT_SPACING / 2; y < HEIGHT; y += DOT_SPACING) {
    const lonlat = projection.invert([x, y]);
    if (!lonlat) continue;
    if (!geoContains(landGeo, lonlat)) continue;
    const point = [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
    const isHighlight = highlightFeatures.some((f) => geoContains(f, lonlat));
    (isHighlight ? highlightDots : dots).push(point);
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

const out = { width: WIDTH, height: HEIGHT, dotRadius: DOT_RADIUS, dots, highlightDots, pins };
writeFileSync(
  new URL("../src/config/office-map.json", import.meta.url),
  JSON.stringify(out)
);
console.log(`Generated ${dots.length} land dots + ${highlightDots.length} highlighted. Pins:`, pins);
