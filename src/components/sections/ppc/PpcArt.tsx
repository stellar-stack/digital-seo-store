"use client";

import { motion } from "framer-motion";

export function PpcArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "70 100 460 300"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="ppc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#ppc-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="300" cy="392" rx="150" ry="14" fill="#0a0e1a" fillOpacity="0.1" />

      {/* target rings */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx="230" cy="250" r="90" fill="#fff" stroke="#0a4fb0" strokeWidth="3" />
        <circle cx="230" cy="250" r="58" fill="none" stroke="#0071e3" strokeWidth="10" strokeOpacity="0.18" />
        <circle cx="230" cy="250" r="30" fill="#0071e3" fillOpacity="0.16" stroke="#0071e3" strokeWidth="3" />
        <circle cx="230" cy="250" r="7" fill="#0071e3" />
      </motion.g>

      {/* arrow hitting the target */}
      <motion.g
        initial={{ x: 90, y: -60, opacity: 0, rotate: -35 }}
        animate={{ x: 0, y: 0, opacity: 1, rotate: -20 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <line x1="150" y1="330" x2="222" y2="258" stroke="#0a0e1a" strokeWidth="6" strokeLinecap="round" />
        <path d="M222 258 l-16 4 4-16 z" fill="#0a0e1a" />
        <path d="M150 330 l-16 20 20-4 4-20z" fill="#0071e3" />
      </motion.g>

      {/* megaphone */}
      <motion.g
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M340 210 l70-38v170l-70-38z" fill="#0071e3" />
        <path d="M340 210v94l-34-6a20 20 0 0 1 0-82z" fill="#0a4fb0" />
        <rect x="352" y="298" width="16" height="34" rx="4" fill="#0a4fb0" />
        <motion.path
          d="M424 190c14 20 14 78 0 98"
          stroke="#0071e3"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
        <motion.path
          d="M444 172c22 30 22 116 0 146"
          stroke="#0071e3"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.55"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
      </motion.g>

      <motion.circle cx="120" cy="200" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="500" cy="300" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}
