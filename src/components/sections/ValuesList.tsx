"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ValuesList({
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
    <section className="bg-mist py-20 md:py-24">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-14 border-t border-line">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.06 }}
              className="flex flex-col gap-3 border-b border-line py-9 sm:flex-row sm:items-start sm:gap-8"
            >
              <div className="sm:w-24 sm:shrink-0">
                <span className="font-display text-3xl font-semibold text-blue-ink md:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
