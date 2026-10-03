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

const CIRCLE_STYLES = [
  "bg-blue text-white shadow-[0_25px_50px_-18px_rgba(0,113,227,0.55)]",
  "bg-[#6b5ce7] text-white shadow-[0_25px_50px_-18px_rgba(107,92,231,0.55)]",
  "bg-ink text-white shadow-[0_25px_50px_-18px_rgba(10,14,26,0.5)]",
];

const CIRCLE_LAYOUT = [
  "h-44 w-44 md:h-52 md:w-52",
  "h-36 w-36 md:h-40 md:w-40",
  "h-40 w-40 md:h-48 md:w-48",
];

export default function PpcHero({
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

          <div className="relative flex min-h-[22rem] items-center justify-center md:min-h-[26rem]">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.7, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.15 }}
                className={`absolute flex flex-col items-center justify-center rounded-full text-center ${CIRCLE_STYLES[i % 3]} ${CIRCLE_LAYOUT[i % 3]}`}
                style={
                  i === 0
                    ? { top: "0%", left: "8%" }
                    : i === 1
                      ? { top: "6%", right: "2%" }
                      : { bottom: "2%", left: "26%" }
                }
              >
                <p className="font-display text-4xl font-semibold leading-none md:text-[2.75rem]">
                  <StatValue value={s.value} />
                </p>
                <p className="mt-2 max-w-[8rem] text-xs font-semibold uppercase tracking-wide opacity-90">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
      {footer && <div className="relative mt-10 md:mt-12">{footer}</div>}
    </section>
  );
}
