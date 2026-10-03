"use client";

import { motion } from "framer-motion";

export function ReputationArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "60 80 520 340"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="reputation-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#reputation-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="300" cy="392" rx="170" ry="14" fill="#0a0e1a" fillOpacity="0.1" />

      {/* review card */}
      <motion.g
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="160" y="130" width="280" height="200" rx="18" fill="#fff" stroke="#0a4fb0" strokeWidth="3" />
        <circle cx="200" cy="170" r="18" fill="#0071e3" fillOpacity="0.25" />
        <rect x="230" y="160" width="110" height="10" rx="4" fill="#0a4fb0" fillOpacity="0.3" />
        <rect x="230" y="178" width="70" height="8" rx="4" fill="#0a4fb0" fillOpacity="0.16" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            transform={`translate(${190 + i * 24} 222) scale(0.9)`}
            d="M10 0l2.9 6 6.6.9-4.8 4.6 1.2 6.5L10 14.9l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"
            fill="#0071e3"
            fillOpacity={i < 4 ? 1 : 0.25}
          />
        ))}
        <rect x="190" y="292" width="200" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.16" />
        <rect x="190" y="306" width="140" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.1" />
      </motion.g>

      {/* rating badge */}
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "470px 180px" }}
      >
        <circle cx="470" cy="180" r="36" fill="#0071e3" />
        <path d="M470 160l5.6 11.4 12.6 1.8-9.1 8.9 2.1 12.6-11.2-5.9-11.2 5.9 2.1-12.6-9.1-8.9 12.6-1.8z" fill="#fff" />
      </motion.g>

      {/* shield */}
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "110px 300px" }}
      >
        <path d="M110 262l44 16v30c0 28-19 44-44 52-25-8-44-24-44-52v-30z" fill="#fff" stroke="#0a4fb0" strokeWidth="2.5" />
        <path d="M94 300l12 12 22-24" stroke="#0071e3" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      <motion.circle cx="100" cy="150" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="530" cy="300" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}
