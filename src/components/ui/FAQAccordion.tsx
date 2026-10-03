"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export type FAQBlock = string | { list: string[] };
export type FAQItem = { question: string; answer: string | FAQBlock[] };

// "Label: text" list items get a bold label; the colon is kept as written.
function AnswerList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const cut = item.indexOf(": ");
        const label = cut >= 2 && cut <= 45 ? item.slice(0, cut + 1) : null;
        return (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
            <span aria-hidden className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-blue-ink" />
            <span>
              {label ? (
                <>
                  <strong className="font-semibold text-ink">{label}</strong>
                  {item.slice(cut + 1)}
                </>
              ) : (
                item
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// "Lead-in -- text" paragraphs get a bold lead-in; the "--" itself is kept as written.
function AnswerParagraph({ text }: { text: string }) {
  const cut = text.indexOf(" -- ");
  const match = cut >= 2 && cut <= 40 ? [text, text.slice(0, cut), text.slice(cut + 4)] : null;
  return (
    <p className="text-sm leading-relaxed text-muted">
      {match ? (
        <>
          <strong className="font-semibold text-ink">{match[1]}</strong>
          {` -- ${match[2]}`}
        </>
      ) : (
        text
      )}
    </p>
  );
}

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
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-blue-dark transition-transform duration-300",
                  open && "rotate-45 bg-blue/15"
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
                  <div className="space-y-4 px-6 pb-6 md:px-8 md:pb-8">
                    {(Array.isArray(item.answer) ? item.answer : [item.answer]).map((block, k) =>
                      typeof block === "string" ? (
                        <AnswerParagraph key={k} text={block} />
                      ) : (
                        <AnswerList key={k} items={block.list} />
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
