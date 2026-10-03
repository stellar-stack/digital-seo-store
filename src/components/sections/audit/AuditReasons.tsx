"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";

type Item = { title: string; description: string };

const ICONS: React.ReactNode[] = [
  // Boost Online Visibility — eye
  <svg key="eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Improve User Experience — layout
  <svg key="ux" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <path d="M3.5 9.5h17M9 9.5v10" />
  </svg>,
  // Stay Ahead of Updates — refresh
  <svg key="refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11a8 8 0 0 0-14.9-3.5M4 13a8 8 0 0 0 14.9 3.5" />
    <path d="M4.5 4.5v4h4M19.5 19.5v-4h-4" />
  </svg>,
  // Enhance Content Relevance — document with pen
  <svg key="content" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3.5h8l4 4V20.5H6z" />
    <path d="M14 3.5v4h4" />
    <path d="M9 12h6M9 15.5h4" />
  </svg>,
  // Prevent Penalties — shield
  <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5 19.5 6.5v5.5c0 5-3.4 7.6-7.5 8.5-4.1-.9-7.5-3.5-7.5-8.5V6.5Z" />
    <path d="M9 12l2 2 4-4.4" />
  </svg>,
  // Secure Long-Term Growth — trophy
  <svg key="trophy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4.5h10v5a5 5 0 0 1-10 0z" />
    <path d="M7 6H4.5A2.5 2.5 0 0 0 7 9.5M17 6h2.5A2.5 2.5 0 0 1 17 9.5" />
    <path d="M12 14.5V18M9 20.5h6" />
  </svg>,
];

export default function AuditReasons({
  title,
  paragraphs,
  items,
  cta,
}: {
  title: string;
  paragraphs: string[];
  items: Item[];
  cta: string;
}) {
  return (
    <section className="bg-cream section-y">
      <Container>
        <h2 className="font-display mx-auto max-w-3xl text-center text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-relaxed text-muted md:text-lg">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="stack-gap grid gap-x-10 gap-y-8 md:gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.07 }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue/10 text-blue-dark [&_svg]:h-[22px] [&_svg]:w-[22px]">
                {ICONS[i]}
              </span>
              <h3 className="font-display mt-4 text-xl font-semibold leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex justify-center">
          <MagneticButton as="a" href="/contact" variant="solid">
            {cta}
          </MagneticButton>
        </div>
      </Container>
    </section>
  );
}
