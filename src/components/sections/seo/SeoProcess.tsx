"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Step = { title: string; description: string };

export default function SeoProcess({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: Step[];
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section className="bg-white section-y">
      <Container>
        <div className="grid gap-10 md:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 md:gap-12">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading title={title} description={description} />
          </div>

          <ol ref={listRef} className="relative">
            <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-line" />
            <motion.span
              aria-hidden
              style={{ scaleY }}
              className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-blue"
            />
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative pb-12 pl-12 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-blue bg-white"
                />
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
