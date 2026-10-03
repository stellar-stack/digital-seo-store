"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-[18px] w-[18px] shrink-0 text-blue" fill="none" aria-hidden>
      <path d="M4.5 10.5l3.6 3.6L15.5 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-[18px] w-[18px] shrink-0 text-[#e0483d]" fill="none" aria-hidden>
      <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function EcomWhyDss({
  title,
  description,
  columns,
  rows,
}: {
  title: string;
  description?: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <section className="bg-mist section-y">
      <Container>
        <SectionHeading title={title} description={description} align="center" />

        <div className="stack-gap grid gap-6 lg:grid-cols-3 lg:gap-8">
          {columns.map((col, c) => (
            <motion.div
              key={col}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: c * 0.08 }}
              className={clsx(
                "rounded-2xl px-7 py-9 md:px-9",
                c === 0 ? "bg-blue/[0.09] ring-1 ring-blue/25" : "bg-transparent"
              )}
            >
              <h3
                className={clsx(
                  "font-display text-center text-2xl font-semibold tracking-tight",
                  c === 0 ? "text-blue" : "text-[#e0483d]"
                )}
              >
                {col}
              </h3>
              <ul className="mt-8 space-y-5">
                {rows.map((row) => (
                  <li
                    key={row[c]}
                    className={clsx(
                      "flex items-start gap-3 text-[0.95rem] leading-relaxed",
                      c === 0 ? "font-medium text-ink" : "text-muted"
                    )}
                  >
                    {c === 0 ? <Tick /> : <Cross />}
                    <span>{row[c]}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
