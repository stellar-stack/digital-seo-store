"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

type Stat = { value: string; label: string };

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(match ? 0 : -1);

  useEffect(() => {
    if (!match || !inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {match ? `${display}${suffix}` : value}
    </span>
  );
}

const LINE = "M8,232 C60,226 84,214 122,196 C160,178 176,188 214,158 C252,128 268,140 306,104 C344,68 372,82 412,44 C428,30 440,24 452,18";

function RankingChart() {
  return (
    <svg viewBox="0 0 460 260" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="seo-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0071e3" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[52, 104, 156, 208].map((y) => (
        <line key={y} x1="0" y1={y} x2="460" y2={y} stroke="#0a0e1a" strokeOpacity="0.06" strokeDasharray="3 6" />
      ))}
      <motion.path
        d={`${LINE} L452,260 L8,260 Z`}
        fill="url(#seo-area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <motion.path
        d={LINE}
        stroke="#0071e3"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      />
      {[
        [122, 196],
        [214, 158],
        [306, 104],
        [412, 44],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={cy}
          r="5"
          fill="#fff"
          stroke="#0071e3"
          strokeWidth="2.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 + i * 0.25 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      <motion.circle
        cx="452"
        cy="18"
        r="8"
        fill="#0071e3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 2 }}
        style={{ transformOrigin: "452px 18px" }}
      />
    </svg>
  );
}

export default function SeoHero({
  eyebrow,
  title,
  description,
  cta,
  stats,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  stats: Stat[];
  footer?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cream hero-y">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-blue/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(10,14,26,0.045)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 md:gap-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-blue"
            >
              {eyebrow}
            </motion.p>

            <h1 className="font-display max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block"
                >
                  {title}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
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
            className="relative"
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-gradient-to-br from-blue/20 to-blue/5 sm:translate-x-6 sm:translate-y-6"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_40px_90px_-40px_rgba(10,14,26,0.35)]">
              <div className="relative aspect-[16/9] bg-gradient-to-b from-white to-blue/[0.04] px-5 pt-6 sm:px-8 sm:pt-8">
                <RankingChart />
              </div>
              <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
                {stats.map((s) => (
                  <div key={s.label} className="px-3 py-5 sm:px-6 sm:py-6">
                    <p className="font-display whitespace-nowrap text-xl font-semibold text-ink sm:text-[1.9rem]">
                      <StatValue value={s.value} />
                    </p>
                    <p className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      {footer && <div className="relative mt-10 md:mt-12">{footer}</div>}
    </section>
  );
}
