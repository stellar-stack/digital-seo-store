"use client";

import { motion } from "framer-motion";

function float(delay: number, dist = 8, dur = 4.5) {
  return {
    animate: { y: [0, -dist, 0] },
    transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const, delay },
  };
}

export function EcomArt({ background = true }: { background?: boolean }) {
  return (
    <svg
      viewBox={background ? "0 0 600 470" : "70 100 460 336"}
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio={background ? "xMidYMid slice" : "xMidYMax meet"}
    >
      <defs>
        <linearGradient id="ecom-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      {background && (
        <>
          <rect width="600" height="470" fill="url(#ecom-bg)" />
          <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
          <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
        </>
      )}

      <ellipse cx="300" cy="418" rx="170" ry="16" fill="#0a0e1a" fillOpacity="0.1" />

      {/* dotted orbit */}
      <path
        d="M96,300 C120,140 300,70 470,130"
        stroke="#0071e3"
        strokeOpacity="0.45"
        strokeWidth="2.5"
        strokeDasharray="2 9"
        strokeLinecap="round"
        fill="none"
      />

      {/* shopping bag */}
      <motion.g {...float(0, 6, 5)}>
        <path d="M232,198 C232,150 264,124 300,124 C336,124 368,150 368,198" stroke="#0a4fb0" strokeWidth="13" strokeLinecap="round" fill="none" />
        <path d="M168,198 H432 L452,404 Q453,416 441,416 H159 Q147,416 148,404 Z" fill="#0071e3" />
        <path d="M300,198 H432 L452,404 Q453,416 441,416 H300 Z" fill="#005ecb" />
        <rect x="168" y="198" width="264" height="14" fill="#0a4fb0" fillOpacity="0.55" />
        <circle cx="236" cy="222" r="7" fill="#fff" />
        <circle cx="364" cy="222" r="7" fill="#fff" />
        <path d="M262,320 Q300,352 338,320" stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* magnifier */}
      <motion.g {...float(0.8, 9, 4.2)}>
        <line x1="452" y1="342" x2="512" y2="404" stroke="#0a0e1a" strokeWidth="18" strokeLinecap="round" />
        <circle cx="410" cy="298" r="64" fill="#fff" fillOpacity="0.92" stroke="#0a0e1a" strokeWidth="14" />
        <motion.path
          d="M378,326 L402,298 L420,312 L446,272"
          stroke="#0071e3"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, delay: 0.9, ease: "easeOut" }}
        />
        <motion.path
          d="M430,270 H448 V288"
          stroke="#0071e3"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.1 }}
        />
      </motion.g>

      {/* small parcels + tag */}
      <motion.g {...float(0.4, 10, 4.8)}>
        <g transform="translate(96 150) rotate(-12)">
          <rect width="62" height="62" rx="10" fill="#fff" />
          <path d="M0,22 H62 M31,0 V22" stroke="#0071e3" strokeWidth="5" />
        </g>
      </motion.g>
      <motion.g {...float(1.2, 8, 5.2)}>
        <g transform="translate(470 150) rotate(10)">
          <path d="M0,10 Q0,0 10,0 H38 L58,28 L38,56 H10 Q0,56 0,46 Z" fill="#fff" />
          <circle cx="16" cy="28" r="6" fill="#0071e3" />
        </g>
      </motion.g>
      <motion.g {...float(0.9, 7, 4.4)}>
        <circle cx="140" cy="352" r="16" fill="#fff" />
        <circle cx="140" cy="352" r="6" fill="#0071e3" />
      </motion.g>
      <motion.circle cx="540" cy="250" r="8" fill="#0071e3" fillOpacity="0.5" {...float(0.3, 6, 3.8)} />
      <motion.circle cx="70" cy="240" r="6" fill="#0071e3" fillOpacity="0.5" {...float(1.1, 6, 4.1)} />
    </svg>
  );
}
