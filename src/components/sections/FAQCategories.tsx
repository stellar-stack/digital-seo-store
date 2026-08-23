"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FAQAccordion, { FAQItem } from "@/components/ui/FAQAccordion";

export default function FAQCategories({
  categories,
}: {
  categories: { title: string; items: FAQItem[] }[];
}) {
  return (
    <section className="bg-cream py-16 md:py-20">
      <Container className="max-w-4xl">
        <div className="space-y-16">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (ci % 3) * 0.05 }}
            >
              <h2 className="font-display mb-6 text-xl font-semibold text-ink">{cat.title}</h2>
              <FAQAccordion items={cat.items} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
