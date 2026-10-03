"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

type Item = { title: string; description: string };

export default function AuditQuickList({
  title,
  description,
  items,
  cta,
}: {
  title: string;
  description: string;
  items: Item[];
  cta: string;
}) {
  return (
    <section className="bg-white section-y">
      <Container>
        <SectionHeading title={title} description={description} className="max-w-2xl" />

        <div className="stack-gap grid gap-x-12 border-b border-line md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (i % 6) * 0.05 }}
              className="flex items-start gap-4 border-t border-line py-6"
            >
              <span className="font-display mt-0.5 text-sm tabular-nums text-blue-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <MagneticButton as="a" href="/contact" variant="solid">
            {cta}
          </MagneticButton>
        </div>
      </Container>
    </section>
  );
}
