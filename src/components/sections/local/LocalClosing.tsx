"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function LocalClosing({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="relative overflow-hidden bg-blue section-y">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[140px]" />
      </div>
      <Container className="relative text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight text-white md:text-4xl"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-white/75 md:text-lg"
        >
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
