"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Group = { title: string; items: string[] };

export default function AuditTaxonomy({
  title,
  description,
  groups,
}: {
  title: string;
  description: string;
  groups: Group[];
}) {
  return (
    <section className="bg-mist section-y">
      <Container>
        <SectionHeading title={title} description={description} className="max-w-2xl" />

        <div className="stack-gap grid gap-x-10 gap-y-8 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.07 }}
            >
              <h3 className="font-display border-b border-blue/25 pb-3 text-base font-semibold text-ink">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-blue-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
