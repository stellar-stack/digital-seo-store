"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-blue" fill="none" aria-hidden>
      <path d="M4.5 10.5l3.6 3.6L15.5 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HireChecklist({
  title,
  items,
  tone = "cream",
}: {
  title: string;
  items: string[];
  tone?: "white" | "cream";
}) {
  return (
    <section className={tone === "white" ? "bg-white section-y" : "bg-cream section-y"}>
      <Container>
        <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
          {title}
        </h2>
        <ul className="stack-gap grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.04 }}
              className="flex items-start gap-3 border-b border-line/70 pb-4 text-[0.95rem] leading-relaxed text-ink/85"
            >
              <Tick />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
