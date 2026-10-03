"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { LOCAL_SERVICE_ICONS } from "@/components/sections/local/LocalIcons";

type Item = { title: string; paragraphs: string[] };
type Closing = { title: string; description: string; cta: string };

export default function LocalServices({
  title,
  description,
  items,
  icons = LOCAL_SERVICE_ICONS,
  closing,
}: {
  title: string;
  description: string;
  items: Item[];
  icons?: React.ReactNode[];
  closing?: Closing;
}) {
  return (
    <section className="bg-cream section-y">
      <Container>
        <SectionHeading title={title} description={description} align="center" />

        <div className="stack-gap grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.07 }}
              className="border-t border-ink/15 pt-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue-dark [&_svg]:h-[22px] [&_svg]:w-[22px]">
                  {icons[i]}
                </span>
                <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                  {item.title}
                </h3>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
                {item.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {closing && (
          <div className="mt-16 text-center">
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {closing.title}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:text-base">
              {closing.description}
            </p>
            <div className="mt-7 flex justify-center">
              <MagneticButton as="a" href="/contact" variant="solid">
                {closing.cta}
              </MagneticButton>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
