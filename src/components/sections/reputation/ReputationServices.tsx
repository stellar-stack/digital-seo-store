"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { REPUTATION_SERVICE_ICONS } from "@/components/sections/reputation/ReputationIcons";

type Item = { title: string; description: string };

export default function ReputationServices({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Item[];
}) {
  return (
    <section className="bg-mist section-y">
      <Container>
        <SectionHeading title={title} description={description} className="max-w-3xl" />

        <div className="stack-gap flex flex-wrap justify-center gap-6">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.07 }}
              className="w-full rounded-2xl border border-line bg-white p-7 shadow-[0_20px_45px_-30px_rgba(10,14,26,0.35)] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue-dark [&_svg]:h-[22px] [&_svg]:w-[22px]">
                {REPUTATION_SERVICE_ICONS[i]}
              </span>
              <h3 className="font-display mt-5 text-lg font-semibold leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
