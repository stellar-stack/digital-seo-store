"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Item = { title: string; description: string };

export default function SeoWhatYouGet({
  eyebrow,
  title,
  description,
  items,
  tone = "white",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  items: Item[];
  tone?: "white" | "cream";
}) {
  return (
    <section id="what-you-get" className={`scroll-mt-24 section-y ${tone === "cream" ? "bg-cream" : "bg-white"}`}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="stack-gap grid gap-x-12 gap-y-10 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
              className="border-t border-ink/15 pt-8"
            >
              <h3 className="font-display flex items-center gap-3 text-2xl font-semibold tracking-tight text-ink">
                <span aria-hidden className="h-2 w-2 shrink-0 bg-blue" />
                {item.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
