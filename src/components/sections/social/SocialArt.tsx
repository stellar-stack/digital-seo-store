"use client";

import { motion } from "framer-motion";

export function SocialArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "60 80 520 340"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="social-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#social-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="300" cy="392" rx="160" ry="14" fill="#0a0e1a" fillOpacity="0.1" />

      {/* phone */}
      <motion.g
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect x="230" y="110" width="150" height="270" rx="26" fill="#fff" stroke="#0a4fb0" strokeWidth="3" />
        <line x1="290" y1="128" x2="320" y2="128" stroke="#0a4fb0" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
        <rect x="246" y="150" width="118" height="92" rx="12" fill="#0071e3" fillOpacity="0.18" />
        <circle cx="270" cy="200" r="12" fill="#0071e3" fillOpacity="0.5" />
        <rect x="290" y="190" width="58" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.25" />
        <rect x="290" y="206" width="40" height="8" rx="3" fill="#0a4fb0" fillOpacity="0.15" />
        <rect x="246" y="260" width="118" height="10" rx="4" fill="#0a4fb0" fillOpacity="0.18" />
        <rect x="246" y="278" width="88" height="10" rx="4" fill="#0a4fb0" fillOpacity="0.12" />
        <rect x="246" y="326" width="118" height="30" rx="15" fill="#0071e3" />
      </motion.g>

      {/* engagement bubbles */}
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "140px 170px" }}
      >
        <path d="M80 130h110a14 14 0 0 1 14 14v46a14 14 0 0 1-14 14h-62l-26 22v-22h-22a14 14 0 0 1-14-14v-46a14 14 0 0 1 14-14z" fill="#fff" stroke="#0a4fb0" strokeWidth="2.5" />
        <circle cx="110" cy="167" r="5" fill="#0071e3" />
        <circle cx="130" cy="167" r="5" fill="#0071e3" fillOpacity="0.5" />
        <circle cx="150" cy="167" r="5" fill="#0071e3" fillOpacity="0.25" />
      </motion.g>
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "460px 200px" }}
      >
        <circle cx="460" cy="200" r="34" fill="#0071e3" />
        <path d="M460 220c-14-9-20-16-20-24a10 10 0 0 1 20-3 10 10 0 0 1 20 3c0 8-6 15-20 24z" fill="#fff" />
      </motion.g>
      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "470px 330px" }}
      >
        <rect x="430" y="300" width="80" height="60" rx="14" fill="#fff" stroke="#0a4fb0" strokeWidth="2.5" />
        <path d="M446 342l12-12 10 8 14-16" stroke="#0071e3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      <motion.circle cx="100" cy="250" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="540" cy="120" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}
