"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

export default function HireChallenges({
  title,
  quotes,
  cta,
  button,
}: {
  title: string;
  quotes: string[];
  cta: string;
  button: string;
}) {
  return (
    <section className="bg-white section-y">
      <Container>
        <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
          {title}
        </h2>
        <ul className="stack-gap divide-y divide-line border-y border-line">
          {quotes.map((q, i) => (
            <motion.li
              key={q}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              className="font-display py-5 text-lg font-medium leading-snug text-ink md:py-6 md:text-xl"
            >
              {q}
            </motion.li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-semibold text-ink md:text-2xl">{cta}</p>
          <MagneticButton as="a" href="/contact" variant="solid">
            {button}
          </MagneticButton>
        </div>
      </Container>
    </section>
  );
}
