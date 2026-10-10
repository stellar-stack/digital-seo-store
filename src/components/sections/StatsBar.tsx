"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

const STATS = [
  { value: 250, suffix: "+", key: "businesses" },
  { value: 30, suffix: "+", key: "experience" },
  { value: 30, suffix: "+", key: "industries" },
  { value: 50, suffix: "+", key: "countries" },
] as const;

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const t = useTranslations("home.stats");

  return (
    <section className="bg-white section-y" style={{ paddingTop: "clamp(0.5rem, 1.5vw, 1.25rem)" }}>
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate inline-block pl-5 pt-5 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-blue-ink sm:pl-7 sm:pt-7 md:text-4xl"
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 -z-10 h-[4.25rem] w-[4.25rem] bg-blue/10 sm:h-[5.5rem] sm:w-[5.5rem]"
          />
          {t("title")}
        </motion.h2>

        <dl className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 md:mt-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className="flex flex-col border-l-2 border-line pl-5 sm:pl-6"
            >
              <dd className="order-1 font-display text-5xl font-semibold leading-none tracking-tight text-blue-ink md:text-[3.5rem]">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="order-2 mt-3 max-w-[15rem] text-base leading-snug text-muted md:text-lg">
                {t(s.key)}
              </dt>
            </motion.div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
