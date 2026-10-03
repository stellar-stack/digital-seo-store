"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import { EcomArt } from "@/components/sections/ecommerce/EcomArt";

export default function EcomHero({
  eyebrow,
  title,
  description,
  points,
  cta,
  art,
  footer,
}: {
  eyebrow?: string;
  points?: string[];
  title: string;
  description: string;
  cta: string;
  art?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-white hero-y">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-blue/[0.07] blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-blue"
              >
                {eyebrow}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {description}
            </motion.p>

            {points && (
              <ul className="mt-6 grid max-w-xl gap-x-8 gap-y-3 sm:grid-cols-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-semibold text-ink">
                    <span aria-hidden className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-blue-ink" />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="mt-10"
            >
              <MagneticButton as="a" href="/contact" variant="solid">
                {cta}
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="aspect-[6/4.7] overflow-hidden rounded-[2rem]"
          >
            {art ?? <EcomArt />}
          </motion.div>
        </div>
      </Container>
      {footer && <div className="relative mt-10 md:mt-12">{footer}</div>}
    </section>
  );
}
