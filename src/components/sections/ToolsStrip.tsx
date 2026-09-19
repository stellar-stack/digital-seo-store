"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

// Real brand marks supplied directly — every tool in this row now has an
// official logo image, so there's no monogram/fallback path left to render.
const TOOLS = [
  { key: "search", src: "/images/home/google.png" },
  { key: "chatgpt", src: "/images/home/chatgpt.png" },
  { key: "googleAds", src: "/images/home/adwords.png" },
  { key: "meta", src: "/images/home/icons8-meta-94.png" },
  { key: "hubspot", src: "/images/home/icons8-hubspot-24.png" },
  { key: "semrush", src: "/images/home/semrush.png" },
  { key: "ahrefs", src: "/images/home/ahrefs-icon.png" },
  { key: "shopify", src: "/images/home/shopify.png" },
  { key: "wordpress", src: "/images/home/wordpress.png" },
  { key: "figma", src: "/images/home/figma.png" },
] as const;

export default function ToolsStrip() {
  const t = useTranslations("home.tools");

  return (
    <section className="border-t border-line bg-white py-12 md:py-14">
      <Container className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xs text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted lg:text-left"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {TOOLS.map((tool) => (
            <div
              key={tool.key}
              title={t(`items.${tool.key}`)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
            >
              <Image
                src={tool.src}
                alt={t(`items.${tool.key}`)}
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
          <span className="ml-1 text-sm text-muted">{t("andMore")}</span>
        </motion.div>
      </Container>
    </section>
  );
}
