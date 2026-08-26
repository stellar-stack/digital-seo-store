"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AlternatingFeatureRows({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  items: { title: string; description: string }[];
}) {
  return (
    <section className="bg-cream py-20 md:py-24">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.06 }}
              className="border-t border-line pt-6"
            >
              <span className="font-display text-xs font-semibold tracking-[0.2em] text-amber-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
