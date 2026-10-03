"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Item = { title: string; description: string };

const ring = (color: string) => (
  <circle cx="60" cy="60" r="52" stroke={color} strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="1.5 6" strokeLinecap="round" />
);

const ART: { color: string; bg: string; svg: React.ReactNode }[] = [
  {
    color: "#6b5ce7",
    bg: "bg-[#f3f1ff]",
    svg: (
      // Funnel with items dropping through — conversions
      <g stroke="#6b5ce7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M32 36h56L67 62v20l-14 8V62z" fill="#6b5ce7" fillOpacity="0.12" />
        <circle cx="50" cy="26" r="3.2" />
        <circle cx="62" cy="22" r="3.2" />
        <circle cx="74" cy="27" r="3.2" />
        <path d="M60 94v10M55 99l5 5 5-5" />
      </g>
    ),
  },
  {
    color: "#ef8a2e",
    bg: "bg-[#fff4ea]",
    svg: (
      // Target with arrow — specific targeting
      <g stroke="#ef8a2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <circle cx="56" cy="64" r="26" fill="#ef8a2e" fillOpacity="0.1" />
        <circle cx="56" cy="64" r="15" />
        <circle cx="56" cy="64" r="4" fill="#ef8a2e" />
        <path d="M58 62 84 36M84 36h-8M84 36v8" />
      </g>
    ),
  },
  {
    color: "#1fae95",
    bg: "bg-[#e9f9f5]",
    svg: (
      // Rising bars — measurable growth
      <g stroke="#1fae95" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="32" y="70" width="12" height="22" rx="2" fill="#1fae95" fillOpacity="0.14" />
        <rect x="54" y="56" width="12" height="36" rx="2" fill="#1fae95" fillOpacity="0.14" />
        <rect x="76" y="40" width="12" height="52" rx="2" fill="#1fae95" fillOpacity="0.14" />
        <path d="M30 52 52 38l14 8 24-20M80 26h10v10" />
      </g>
    ),
  },
  {
    color: "#d8a200",
    bg: "bg-[#fff8de]",
    svg: (
      // Magnifier with rising arrow — organic traffic
      <g stroke="#d8a200" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <circle cx="54" cy="54" r="22" fill="#d8a200" fillOpacity="0.12" />
        <path d="m70 70 20 20" />
        <path d="M44 62l8-9 6 5 9-11M62 47h6v6" />
      </g>
    ),
  },
];

export default function EcomBenefits({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Item[];
}) {
  return (
    <section className="bg-cream section-y">
      <Container>
        <SectionHeading title={title} description={description} align="center" />

        <div className="stack-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const art = ART[i % ART.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className={`flex flex-col rounded-2xl px-7 pb-10 pt-9 ${art.bg}`}
              >
                <svg viewBox="0 0 120 120" className="mx-auto h-[120px] w-[120px]" fill="none" aria-hidden>
                  {ring(art.color)}
                  {art.svg}
                </svg>
                <h3 className="font-display mt-7 text-center text-xl font-semibold leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-center text-sm leading-relaxed text-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
