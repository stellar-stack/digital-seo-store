"use client";

import { motion } from "framer-motion";

export function HireArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "60 80 520 340"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="hire-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#hire-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="300" cy="392" rx="170" ry="14" fill="#0a0e1a" fillOpacity="0.1" />

      {/* profile cards */}
      {[
        { x: 120, y: 170, s: 1, d: 0.1 },
        { x: 250, y: 130, s: 1.15, d: 0.25 },
        { x: 380, y: 180, s: 1, d: 0.4 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
        <motion.g
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: p.d, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x="0" y="0" width="100" height="130" rx="18" fill="#fff" stroke="#0a4fb0" strokeWidth="2.5" />
          <circle cx="50" cy="42" r="20" fill="#0071e3" fillOpacity={i === 1 ? 0.9 : 0.25} />
          <path d="M22 110 q28 -34 56 0" fill="#0071e3" fillOpacity={i === 1 ? 0.9 : 0.25} />
        </motion.g>
        </g>
      ))}

      {/* verified badge */}
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "400px 110px" }}
      >
        <circle cx="400" cy="110" r="30" fill="#0071e3" />
        <path d="M388 110l8 8 16-17" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      <motion.circle cx="90" cy="110" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="530" cy="250" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}
