"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

const HIGHLIGHT = "Local SEO";

const V_ROADS = [90, 210, 330, 450, 545];
const H_ROADS = [80, 170, 260, 350, 430];
const BLOCK_BUILDINGS: [number, number, number, number][] = [
  [104, 184, 34, 26], [146, 184, 46, 26], [104, 222, 60, 22], [226, 184, 40, 30], [274, 184, 42, 30],
  [226, 274, 30, 28], [262, 274, 50, 28], [348, 184, 44, 28], [398, 184, 36, 28], [348, 274, 30, 26],
  [384, 274, 48, 26], [466, 184, 50, 30], [466, 274, 34, 28], [104, 274, 44, 26], [156, 274, 36, 26],
  [226, 364, 60, 28], [296, 364, 20, 28], [348, 364, 46, 30], [104, 364, 40, 30], [466, 364, 60, 28],
  [226, 96, 44, 28], [278, 96, 38, 28], [466, 96, 60, 28],
];

const PINS = [
  { x: 90, y: 350, s: 0.8 },
  { x: 210, y: 260, s: 0.8 },
  { x: 450, y: 350, s: 0.8 },
  { x: 330, y: 170, s: 1.15 },
];

const ROUTE = "M90,350 H210 V260 V170 H330 H450 V350";

function Pin({ x, y, s, delay, main }: { x: number; y: number; s: number; delay: number; main?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {main && (
        <>
          <motion.circle
            r="18"
            fill="#0071e3"
            fillOpacity="0.18"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
          />
          <motion.circle
            r="18"
            fill="#0071e3"
            fillOpacity="0.14"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 2.8 }}
          />
        </>
      )}
      <ellipse cx="0" cy="2" rx={12 * s} ry={4 * s} fill="#0a0e1a" fillOpacity="0.18" />
      <motion.g
        initial={{ y: -46, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 15, delay }}
      >
        <g transform={`scale(${s}) translate(0 -24)`}>
          <path
            d="M0,-10 C-14,-10 -22,0 -22,11 C-22,27 0,48 0,48 C0,48 22,27 22,11 C22,0 14,-10 0,-10 Z"
            fill="#0071e3"
          />
          <circle cx="0" cy="11" r="8" fill="#fff" />
        </g>
      </motion.g>
    </g>
  );
}

function CityMap() {
  return (
    <svg viewBox="0 0 600 470" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="470" fill="#dfe9f6" />

      {BLOCK_BUILDINGS.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#eef4fc" />
      ))}

      <rect x="100" y="92" width="100" height="66" rx="10" fill="#d3e7d6" />
      <rect x="352" y="98" width="82" height="60" rx="10" fill="#d3e7d6" />

      <path
        d="M-20,318 C110,282 200,392 330,338 C455,286 520,372 640,322"
        stroke="#bcd8f6"
        strokeWidth="40"
        fill="none"
        strokeLinecap="round"
      />

      {H_ROADS.map((y) => (
        <line key={`h${y}`} x1="-10" y1={y} x2="610" y2={y} stroke="#fff" strokeWidth={y === 260 ? 14 : 9} />
      ))}
      {V_ROADS.map((x) => (
        <line key={`v${x}`} x1={x} y1="-10" x2={x} y2="480" stroke="#fff" strokeWidth={x === 330 ? 14 : 9} />
      ))}
      <line x1="-10" y1="410" x2="610" y2="90" stroke="#fff" strokeWidth="11" />

      <motion.path
        d={ROUTE}
        fill="none"
        stroke="#0071e3"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 9"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
      />

      {PINS.map((p, i) => (
        <Pin key={i} {...p} delay={0.5 + i * 0.35} main={i === PINS.length - 1} />
      ))}
    </svg>
  );
}

export default function LocalHero({
  eyebrow,
  title,
  description,
  points,
  cta,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  cta: string;
  footer?: React.ReactNode;
}) {
  const at = title.indexOf(HIGHLIGHT);
  const before = at === -1 ? "" : title.slice(0, at);
  const after = at === -1 ? title : title.slice(at + HIGHLIGHT.length);

  return (
    <section className="relative overflow-hidden bg-white hero-y">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-blue/[0.07] blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-blue"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
            >
              {before}
              {at !== -1 && (
                <span className="rounded-lg bg-blue/10 px-2.5 py-0.5 text-blue [box-decoration-break:clone]">
                  {HIGHLIGHT}
                </span>
              )}
              {after}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {description}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="mt-6 max-w-xl space-y-3"
            >
              {points.map((point) => {
                const cut = point.indexOf(": ");
                return (
                  <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-muted">
                    <span aria-hidden className="mt-[10px] h-[6px] w-[6px] shrink-0 bg-blue-ink" />
                    <span>
                      {cut > 0 ? (
                        <>
                          <strong className="font-semibold text-ink">{point.slice(0, cut + 1)}</strong>
                          {point.slice(cut + 1)}
                        </>
                      ) : (
                        point
                      )}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="mt-10"
            >
              <MagneticButton as="a" href="/contact" variant="solid">
                {cta}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="aspect-[6/4.7] overflow-hidden rounded-[2rem]"
          >
            <CityMap />
          </motion.div>
        </div>
      </Container>
      {footer && <div className="relative mt-10 md:mt-12">{footer}</div>}
    </section>
  );
}
