"use client";

import { motion } from "framer-motion";

export function SemArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "60 90 480 320"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="sem-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#sem-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="300" cy="392" rx="160" ry="14" fill="#0a0e1a" fillOpacity="0.1" />

      {/* search bar */}
      <motion.g
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="130" y="140" width="340" height="64" rx="32" fill="#fff" stroke="#0a4fb0" strokeWidth="3" />
        <circle cx="168" cy="172" r="10" stroke="#0071e3" strokeWidth="3" fill="none" />
        <line x1="176" y1="180" x2="184" y2="188" stroke="#0071e3" strokeWidth="3" strokeLinecap="round" />
        <rect x="200" y="164" width="150" height="16" rx="4" fill="#0a4fb0" fillOpacity="0.18" />
        <rect x="392" y="154" width="46" height="36" rx="8" fill="#0071e3" />
        <path
          d="M405 172h20M415 162v20"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.g>

      {/* result rows, first tagged "Ad" */}
      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="130" y="226" width="340" height="72" rx="14" fill="#fff" stroke="#0071e3" strokeWidth="2.5" />
        <rect x="150" y="242" width="32" height="16" rx="4" fill="#0071e3" />
        <rect x="192" y="245" width="120" height="10" rx="3" fill="#0a4fb0" fillOpacity="0.4" />
        <rect x="150" y="268" width="260" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.16" />
        <rect x="150" y="282" width="190" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.16" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="130" y="310" width="340" height="56" rx="14" fill="#fff" fillOpacity="0.75" stroke="#0a4fb0" strokeOpacity="0.25" strokeWidth="2" />
        <rect x="150" y="328" width="150" height="9" rx="3" fill="#0a4fb0" fillOpacity="0.22" />
        <rect x="150" y="344" width="210" height="7" rx="3" fill="#0a4fb0" fillOpacity="0.14" />
      </motion.g>

      {/* small rising-chart badge */}
      <motion.g
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle cx="470" cy="330" r="42" fill="#fff" stroke="#0071e3" strokeWidth="3" />
        <path
          d="M452 340l10-14 8 8 12-18"
          stroke="#0071e3"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>

      <motion.circle cx="110" cy="180" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="500" cy="220" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}
