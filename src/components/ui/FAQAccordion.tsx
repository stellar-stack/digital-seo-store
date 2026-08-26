"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export type FAQItem = { question: string; answer: string };

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-trigger-${i}`;
        return (
          <div key={i}>
            <button
              id={buttonId}
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
            >
              <span className="font-display text-base font-semibold text-ink md:text-lg">
                {item.question}
              </span>
              <span
                aria-hidden
                className={clsx(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-amber-dark transition-transform duration-300",
                  open && "rotate-45 bg-amber/15"
                )}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted md:px-8 md:pb-8">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
