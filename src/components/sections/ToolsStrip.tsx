"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

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

const INTERVAL_MS = 3500;

function usePerView() {
  const [perView, setPerView] = useState(5);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setPerView(mq.matches ? 5 : 3);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return perView;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 14 28" className="h-7 w-3.5" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M12 2 2 14l10 12" : "M2 2l10 12L2 26"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ToolsStrip() {
  const t = useTranslations("home.tools");
  const reduceMotion = useReducedMotion();
  const perView = usePerView();
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const pages = Math.ceil(TOOLS.length / perView);
  const current = page % pages;
  const visible = Array.from({ length: perView }, (_, i) => TOOLS[(current * perView + i) % TOOLS.length]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setDir(1);
      setPage((p) => (p + 1) % pages);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, pages, page]);

  const step = (d: 1 | -1) => {
    setDir(d);
    setPage((p) => (((p + d) % pages) + pages) % pages);
  };

  return (
    <section className="border-t border-line bg-white section-y">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center text-base leading-relaxed text-charcoal/80 md:text-lg"
        >
          {t("eyebrow")}
        </motion.p>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={t("eyebrow")}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="mt-8 flex items-center gap-2 md:mt-10 md:gap-6"
        >
          <button
            type="button"
            aria-label={t("previous")}
            onClick={() => step(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted/70 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-blue"
          >
            <Chevron direction="left" />
          </button>

          <div className="relative min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.ul
                key={`${perView}-${current}`}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid items-center"
                style={{ gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))` }}
              >
                {visible.map((tool) => (
                  <li key={tool.key} className="flex h-16 items-center justify-center md:h-20">
                    <Image
                      src={tool.src}
                      alt={t(`items.${tool.key}`)}
                      title={t(`items.${tool.key}`)}
                      width={56}
                      height={56}
                      className="h-10 w-10 object-contain md:h-14 md:w-14"
                    />
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <button
            type="button"
            aria-label={t("next")}
            onClick={() => step(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted/70 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-blue"
          >
            <Chevron direction="right" />
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted">{t("andMore")}</p>
      </Container>
    </section>
  );
}
