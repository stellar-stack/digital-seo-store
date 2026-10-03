"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HireProcessNodes({
  title,
  description,
  steps,
  tone = "white",
}: {
  title: string;
  description: string;
  steps: string[];
  tone?: "white" | "cream";
}) {
  return (
    <section className={tone === "cream" ? "bg-cream section-y" : "bg-white section-y"}>
      <Container>
        <SectionHeading title={title} description={description} align="center" />

        <ol className="stack-gap relative grid gap-10 md:grid-cols-5 md:gap-6">
          <span
            aria-hidden
            className="absolute left-[27px] top-[27px] h-[calc(100%-54px)] w-px bg-blue/30 md:left-0 md:top-[27px] md:h-px md:w-full"
          />
          {steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="relative flex gap-5 md:flex-col md:gap-5 md:text-center"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue/30 bg-white font-display text-lg font-semibold text-blue md:mx-auto">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-3 text-sm leading-relaxed text-muted md:pt-0 md:text-[0.95rem]">{step}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
