"use client";

import { motion } from "framer-motion";

export function ContentArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "60 80 520 340"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="content-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#content-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="290" cy="392" rx="170" ry="14" fill="#0a0e1a" fillOpacity="0.1" />

      {/* article page */}
      <motion.g
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="170" y="100" width="230" height="280" rx="16" fill="#fff" stroke="#0a4fb0" strokeWidth="3" />
        <rect x="200" y="132" width="110" height="18" rx="5" fill="#0071e3" fillOpacity="0.28" />
        <rect x="200" y="166" width="170" height="10" rx="4" fill="#0a4fb0" fillOpacity="0.2" />
        <rect x="200" y="186" width="150" height="10" rx="4" fill="#0a4fb0" fillOpacity="0.14" />
        <rect x="200" y="206" width="168" height="10" rx="4" fill="#0a4fb0" fillOpacity="0.14" />
        <rect x="200" y="236" width="170" height="70" rx="10" fill="#0071e3" fillOpacity="0.14" />
        <path d="M212 290 l30-30 16 14 26-28 26 22" stroke="#0071e3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="200" y="322" width="120" height="10" rx="4" fill="#0a4fb0" fillOpacity="0.14" />
        <rect x="200" y="342" width="90" height="10" rx="4" fill="#0a4fb0" fillOpacity="0.1" />
      </motion.g>

      {/* pen */}
      <motion.g
        initial={{ x: 40, y: 40, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <g transform="rotate(35 400 250)">
          <rect x="390" y="150" width="22" height="150" rx="6" fill="#0a4fb0" />
          <path d="M390 300 l11 26 11-26z" fill="#0071e3" />
          <rect x="390" y="150" width="22" height="18" rx="4" fill="#fff" stroke="#0a4fb0" strokeWidth="2" />
        </g>
      </motion.g>

      {/* engagement chips */}
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "470px 150px" }}
      >
        <circle cx="470" cy="150" r="34" fill="#0071e3" />
        <path d="M470 166c-14-9-20-16-20-24a10 10 0 0 1 20-3 10 10 0 0 1 20 3c0 8-6 15-20 24z" fill="#fff" />
      </motion.g>
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "120px 300px" }}
      >
        <rect x="70" y="270" width="100" height="58" rx="14" fill="#fff" stroke="#0a4fb0" strokeWidth="2.5" />
        <path d="M88 312l14-14 10 8 18-20" stroke="#0071e3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      <motion.circle cx="110" cy="170" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="530" cy="290" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}
