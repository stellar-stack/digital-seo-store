"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

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

export default function AuditFinalCta({
  title,
  paragraphs,
  listIntro,
  list,
  closing,
  cta,
}: {
  title: string;
  paragraphs: string[];
  listIntro: string;
  list: string[];
  closing: string;
  cta?: string;
}) {
  return (
    <section className="bg-white section-y">
      <Container>
        <div className="grid gap-10 md:gap-12 lg:grid-cols-2 lg:gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
              {title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="font-display text-lg font-semibold text-ink">{listIntro}</p>
            <ul className="mt-5 space-y-4">
              {list.map((item) => {
                const cut = item.indexOf(": ");
                const label = cut > 0 ? item.slice(0, cut + 1) : null;
                return (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-muted">
                    <CheckIcon />
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
            <p className="mt-6 text-base leading-relaxed text-muted">{closing}</p>
            {cta && (
              <div className="mt-8">
                <MagneticButton as="a" href="/contact" variant="solid">
                  {cta}
                </MagneticButton>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
