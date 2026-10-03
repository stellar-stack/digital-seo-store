"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import { EcomArt } from "@/components/sections/ecommerce/EcomArt";

export default function CtaBand({
  title,
  paragraphs,
  button,
  reverse = false,
  art,
  tone = "white",
}: {
  title: string;
  paragraphs: string[];
  button?: string;
  reverse?: boolean;
  art?: React.ReactNode;
  tone?: "white" | "cream";
}) {
  return (
    <section className={tone === "cream" ? "bg-cream section-y" : "bg-white section-y"}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-mist px-8 pt-10 md:grid-cols-[0.75fr_1.25fr] md:gap-12 md:px-14 md:py-0"
        >
          <div
            className={clsx(
              "order-2 h-56 md:h-[21rem]",
              reverse ? "md:order-2" : "md:order-1"
            )}
          >
            {art ?? <EcomArt background={false} />}
          </div>
          <div
            className={clsx(
              "order-1 pb-2 md:py-14",
              reverse ? "md:order-1" : "md:order-2"
            )}
          >
            <h2 className="font-display max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
              {title}
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {button && (
              <div className="mt-8">
                <MagneticButton as="a" href="/contact" variant="solid">
                  {button}
                </MagneticButton>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
