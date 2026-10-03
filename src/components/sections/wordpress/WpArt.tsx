"use client";

import { motion } from "framer-motion";

export function WpArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "60 80 520 340"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="wp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#wp-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="260" cy="396" rx="190" ry="14" fill="#0a0e1a" fillOpacity="0.1" />

      {/* desktop browser */}
      <motion.g
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="120" y="120" width="330" height="230" rx="14" fill="#fff" stroke="#0a4fb0" strokeWidth="3" />
        <line x1="120" y1="152" x2="450" y2="152" stroke="#0a4fb0" strokeWidth="3" />
        <circle cx="140" cy="136" r="5" fill="#0071e3" />
        <circle cx="158" cy="136" r="5" fill="#0071e3" fillOpacity="0.5" />
        <circle cx="176" cy="136" r="5" fill="#0071e3" fillOpacity="0.3" />
        {/* page blocks */}
        <rect x="140" y="170" width="140" height="70" rx="8" fill="#0071e3" fillOpacity="0.16" />
        <rect x="296" y="170" width="134" height="32" rx="6" fill="#0a4fb0" fillOpacity="0.18" />
        <rect x="296" y="212" width="134" height="28" rx="6" fill="#0a4fb0" fillOpacity="0.1" />
        <rect x="140" y="256" width="290" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.18" />
        <rect x="140" y="272" width="220" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.12" />
        <rect x="140" y="292" width="90" height="26" rx="13" fill="#0071e3" />
      </motion.g>

      {/* mobile device */}
      <motion.g
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="400" y="180" width="92" height="170" rx="16" fill="#fff" stroke="#0a4fb0" strokeWidth="3" />
        <line x1="430" y1="194" x2="462" y2="194" stroke="#0a4fb0" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
        <rect x="412" y="210" width="68" height="44" rx="6" fill="#0071e3" fillOpacity="0.2" />
        <rect x="412" y="264" width="68" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.2" />
        <rect x="412" y="278" width="50" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.14" />
        <rect x="412" y="308" width="68" height="22" rx="11" fill="#0071e3" />
      </motion.g>

      <motion.circle cx="90" cy="200" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="540" cy="150" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}
