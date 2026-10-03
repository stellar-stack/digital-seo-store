"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import { CRO_SERVICE_ICONS } from "@/components/sections/cro/CroIcons";

type Item = { title: string; description: string };

export default function CroServices({
  eyebrow,
  title,
  paragraphs,
  items,
  cta,
  icons = CRO_SERVICE_ICONS,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  items: Item[];
  cta?: string;
  icons?: React.ReactNode[];
}) {
  return (
    <section className="bg-mist section-y">
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-ink">{eyebrow}</p>
          )}
          <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted md:text-lg">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="stack-gap grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.07 }}
              className="rounded-2xl border border-line bg-white p-7 shadow-[0_20px_45px_-30px_rgba(10,14,26,0.35)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue-dark [&_svg]:h-[22px] [&_svg]:w-[22px]">
                {icons[i]}
              </span>
              <h3 className="font-display mt-5 text-lg font-semibold leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.article>
          ))}
        </div>

        {cta && (
          <div className="mt-10 md:mt-12 flex justify-center">
            <MagneticButton as="a" href="/contact" variant="solid">
              {cta}
            </MagneticButton>
          </div>
        )}
      </Container>
    </section>
  );
}
