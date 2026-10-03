"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function HirePricing({
  title,
  paragraphs,
  plans,
  closingParagraphs,
  tone = "white",
}: {
  title: string;
  paragraphs: string[];
  plans: string[];
  closingParagraphs: string[];
  tone?: "white" | "cream";
}) {
  return (
    <section className={tone === "cream" ? "bg-cream section-y" : "bg-white section-y"}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink md:text-4xl">
              {title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <ul className="grid gap-x-6 sm:grid-cols-2">
              {plans.map((plan, i) => (
                <motion.li
                  key={plan}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.06 }}
                  className="flex items-center justify-between gap-4 border-b border-line py-5 font-display text-base font-semibold text-ink md:text-lg"
                >
                  {plan}
                  <span aria-hidden className="text-blue-ink">→</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
              {closingParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
