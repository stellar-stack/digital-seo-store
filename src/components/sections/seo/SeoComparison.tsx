"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-blue" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="currentColor" fillOpacity="0.16" />
      <path
        d="M6 10.3l2.6 2.6L14.2 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SeoComparison({
  title,
  description,
  columns,
  rows,
  rowLabels,
}: {
  title: string;
  description?: string;
  columns: string[];
  rows: string[][];
  rowLabels?: string[];
}) {
  return (
    <section id="compare" className="scroll-mt-24 bg-mist section-y">
      <Container>
        <SectionHeading title={title} description={description} className="max-w-3xl" />

        <div
          role="table"
          aria-label={title}
          className="mt-14 overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_70px_-45px_rgba(10,14,26,0.25)]"
        >
          <div role="row" className="hidden grid-cols-3 md:grid">
            {columns.map((col, c) => (
              <div
                key={col}
                role="columnheader"
                className={clsx(
                  "px-8 py-6 font-display text-lg font-semibold",
                  c === 0 ? "bg-blue text-white" : "border-l border-line bg-white text-ink"
                )}
              >
                {col}
              </div>
            ))}
          </div>

          {rows.map((row, r) => (
            <motion.div
              key={r}
              role="row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: r * 0.05 }}
              className={clsx(
                "grid border-line md:grid-cols-3 md:border-t",
                r > 0 && "border-t"
              )}
            >
              {rowLabels?.[r] && (
                <p className="col-span-full border-b border-line/70 bg-cream px-6 pt-5 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted md:px-8">
                  {rowLabels[r]}
                </p>
              )}
              {row.map((cell, c) => (
                <div
                  key={c}
                  role="cell"
                  className={clsx(
                    "px-6 py-5 md:px-8 md:py-6",
                    c === 0 ? "bg-blue/[0.06]" : "md:border-l md:border-line",
                    c > 0 && "border-t border-line md:border-t-0"
                  )}
                >
                  <p
                    className={clsx(
                      "mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] md:hidden",
                      c === 0 ? "text-blue-ink" : "text-muted"
                    )}
                  >
                    {columns[c]}
                  </p>
                  {c === 0 ? (
                    <div className="flex items-start gap-3 text-sm font-medium leading-relaxed text-ink">
                      <CheckIcon />
                      <span>{cell}</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-muted">{cell}</p>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
