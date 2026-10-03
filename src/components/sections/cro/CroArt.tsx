"use client";

import { motion } from "framer-motion";

export function CroArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "60 80 520 340"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="cro-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#cro-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="260" cy="396" rx="170" ry="14" fill="#0a0e1a" fillOpacity="0.1" />

      {/* funnel */}
      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M130 150 H370 L290 260 V340 L210 364 V260 Z" fill="#fff" stroke="#0a4fb0" strokeWidth="3" strokeLinejoin="round" />
        <path d="M160 180 H340 L300 224 H200 Z" fill="#0071e3" fillOpacity="0.14" />
        <circle cx="200" cy="162" r="9" fill="#0071e3" fillOpacity="0.5" />
        <circle cx="250" cy="156" r="9" fill="#0071e3" fillOpacity="0.5" />
        <circle cx="300" cy="164" r="9" fill="#0071e3" fillOpacity="0.5" />
      </motion.g>

      {/* converted customer */}
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "260px 300px" }}
      >
        <circle cx="260" cy="300" r="34" fill="#0071e3" />
        <motion.path
          d="M246 300l10 10 20-22"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        />
      </motion.g>

      {/* A/B cards */}
      <motion.g
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="390" y="150" width="150" height="110" rx="14" fill="#fff" stroke="#0a4fb0" strokeWidth="2.5" />
        <rect x="408" y="170" width="34" height="16" rx="4" fill="#0a4fb0" fillOpacity="0.25" />
        <rect x="408" y="198" width="110" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.15" />
        <rect x="408" y="214" width="84" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.15" />
      </motion.g>
      <motion.g
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="410" y="250" width="150" height="110" rx="14" fill="#0071e3" />
        <rect x="428" y="270" width="34" height="16" rx="4" fill="#fff" fillOpacity="0.8" />
        <rect x="428" y="298" width="110" height="8" rx="3" fill="#fff" fillOpacity="0.5" />
        <rect x="428" y="314" width="84" height="8" rx="3" fill="#fff" fillOpacity="0.5" />
      </motion.g>

      <motion.circle cx="90" cy="220" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="560" cy="200" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}
