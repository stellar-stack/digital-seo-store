"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

export default function LocalIntro({
  title,
  paragraphs,
  button,
}: {
  title: string;
  paragraphs: string[];
  button?: string;
}) {
  return (
    <section className="bg-white section-y">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 rounded-[2rem] bg-blue/[0.05] px-8 py-12 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:px-14 md:py-14"
        >
          <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[1.75rem]">
            {title}
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {button && (
              <div className="pt-4">
                <MagneticButton as="a" href="/contact" variant="solid">
                  {button}
                </MagneticButton>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
