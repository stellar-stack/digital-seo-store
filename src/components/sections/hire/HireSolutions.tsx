"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

type Solution = { title: string; paragraphs: string[]; list?: string[]; cta: string };

export default function HireSolutions({
  title,
  description,
  items,
  tone = "white",
}: {
  title: string;
  description: string;
  items: Solution[];
  tone?: "white" | "cream";
}) {
  return (
    <section className={tone === "cream" ? "bg-cream section-y" : "bg-white section-y"}>
      <Container>
        <SectionHeading title={title} description={description} />

        <div className="stack-gap divide-y divide-line border-y border-line">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.05 }}
              className="grid gap-6 py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:py-10"
            >
              <h3 className="font-display text-xl font-semibold leading-snug text-ink md:text-2xl">
                {item.title}
              </h3>
              <div>
                <div className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
                  {item.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {item.list && (
                  <ul className="mt-4 space-y-2.5">
                    {item.list.map((li) => (
                      <li key={li} className="flex items-start gap-3 text-sm text-ink/85 md:text-base">
                        <span aria-hidden className="mt-[8px] h-[6px] w-[6px] shrink-0 bg-blue-ink" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  <MagneticButton as="a" href="/contact" variant="outline">
                    {item.cta}
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
