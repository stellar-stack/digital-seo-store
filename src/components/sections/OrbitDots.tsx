"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const RINGS = 20;
const START_RADIUS = 50;
const RING_GAP = 68;
const DOT_SPACING = 32;
const SIZE = 2760;
const SPOKE_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

type Dot = { x: number; y: number; r: number; fill: string; opacity: number };

// Rounded to 2dp: Math.cos/Math.sin can differ in their last float bit between
// the server's V8 (build time) and the client's V8 (hydration), which otherwise
// causes a hydration mismatch on these SVG coordinates.
const round = (n: number) => Math.round(n * 100) / 100;

function buildDots(): Dot[] {
  const dots: Dot[] = [];
  const center = SIZE / 2;

  for (let ring = 0; ring < RINGS; ring++) {
    const radius = START_RADIUS + ring * RING_GAP;
    const circumference = 2 * Math.PI * radius;
    const count = Math.max(10, Math.round(circumference / DOT_SPACING));
    const fade = 1 - (ring / (RINGS - 1)) * 0.55;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      dots.push({
        x: round(center + radius * Math.cos(angle)),
        y: round(center + radius * Math.sin(angle)),
        r: 2,
        fill: "#ffffff",
        opacity: round(0.13 * fade),
      });
    }

    SPOKE_ANGLES.forEach((angle) => {
      dots.push({
        x: round(center + radius * Math.cos(angle)),
        y: round(center + radius * Math.sin(angle)),
        r: 3,
        fill: "#f5a623",
        opacity: round(0.4 * fade),
      });
    });
  }

  return dots;
}

export default function OrbitDots({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const dots = useMemo(buildDots, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        left: "50%",
        top: "50%",
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
      }}
      animate={reducedMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.fill} opacity={d.opacity} />
        ))}
      </svg>
    </motion.div>
  );
}
