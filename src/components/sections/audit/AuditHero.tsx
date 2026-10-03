"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

function AuditArt() {
  return (
    <svg viewBox="0 0 600 470" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="audit-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f0fc" />
          <stop offset="100%" stopColor="#d6e5fa" />
        </linearGradient>
      </defs>
      <rect width="600" height="470" fill="url(#audit-bg)" />
      <circle cx="470" cy="90" r="120" fill="#fff" fillOpacity="0.45" />
      <circle cx="90" cy="400" r="90" fill="#fff" fillOpacity="0.35" />
      <ellipse cx="300" cy="418" rx="170" ry="16" fill="#0a0e1a" fillOpacity="0.1" />

      {/* report / clipboard */}
      <motion.g initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
        <rect x="190" y="120" width="180" height="240" rx="14" fill="#fff" stroke="#0a4fb0" strokeWidth="3" />
        <rect x="240" y="106" width="80" height="28" rx="8" fill="#0071e3" />
        {[168, 200, 232].map((y) => (
          <g key={y}>
            <rect x="216" y={y} width="14" height="14" rx="4" stroke="#0071e3" strokeWidth="2.4" fill="none" />
            <line x1="244" y1={y + 7} x2="330" y2={y + 7} stroke="#0a4fb0" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
          </g>
        ))}
        <motion.path
          d="M220 175 l6 6 10-11"
          stroke="#1fae7a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
        <motion.path
          d="M220 207 l6 6 10-11"
          stroke="#1fae7a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        />
        <line x1="216" y1="264" x2="354" y2="264" stroke="#0a4fb0" strokeOpacity="0.2" strokeWidth="1.5" />
        <line x1="216" y1="292" x2="330" y2="292" stroke="#0a4fb0" strokeOpacity="0.2" strokeWidth="8" strokeLinecap="round" />
        <line x1="216" y1="318" x2="300" y2="318" stroke="#0a4fb0" strokeOpacity="0.2" strokeWidth="8" strokeLinecap="round" />
      </motion.g>

      {/* magnifier scanning */}
      <motion.g
        initial={{ x: -30, y: 40, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <line x1="400" y1="330" x2="452" y2="382" stroke="#0a0e1a" strokeWidth="16" strokeLinecap="round" />
        <circle cx="368" cy="298" r="56" fill="#fff" stroke="#0071e3" strokeWidth="12" />
        <path d="m348 300 12-14 12 10 20-24" stroke="#0071e3" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      <motion.circle cx="510" cy="230" r="7" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="130" cy="150" r="6" fill="#0071e3" fillOpacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
    </svg>
  );
}

const HIGHLIGHT = "SEO Audit";

export default function AuditHero({
  title,
  hook,
  lead,
  description,
  cta,
  footer,
}: {
  title: string;
  hook: string;
  lead: string;
  description: string;
  cta: string;
  footer?: React.ReactNode;
}) {
  const at = title.indexOf(HIGHLIGHT);
  const before = at === -1 ? "" : title.slice(0, at);
  const highlighted = at === -1 ? title : title.slice(at, at + HIGHLIGHT.length);
  const after = at === -1 ? "" : title.slice(at + HIGHLIGHT.length);

  return (
    <section className="relative overflow-hidden bg-white hero-y">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-blue/[0.07] blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
            >
              {before}
              <span className="rounded-lg bg-blue/10 px-2.5 py-0.5 text-blue [box-decoration-break:clone]">
                {highlighted}
              </span>
              {after}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-7 max-w-xl text-xl font-semibold leading-snug text-ink"
            >
              {hook}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="mt-3 max-w-xl text-lg font-semibold text-blue-ink"
            >
              {lead}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="mt-10"
            >
              <MagneticButton as="a" href="/contact" variant="solid">
                {cta}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="aspect-[6/4.7] overflow-hidden rounded-[2rem]"
          >
            <AuditArt />
          </motion.div>
        </div>
      </Container>
      {footer && <div className="relative mt-10 md:mt-12">{footer}</div>}
    </section>
  );
}
