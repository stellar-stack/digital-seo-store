"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { MARQUEE_LOGOS } from "@/components/icons/marqueeLogos";

// Every platform now has a real mark — a supplied brand asset for almost
// all of them, and a simple-icons path (in that brand's own official color)
// for the two (YouTube, Facebook) without a supplied file.
const PLATFORMS = [
  { name: "Google", image: "/images/home/google.png" },
  { name: "ChatGPT", image: "/images/home/chatgpt.png" },
  { name: "YouTube", logo: "youtube" },
  { name: "Facebook", logo: "facebook" },
  { name: "Instagram", image: "/images/home/instagram.png" },
  { name: "LinkedIn", image: "/images/home/linkedin.png" },
  { name: "TikTok", image: "/images/home/tiktok-light.png" },
  { name: "X", image: "/images/home/x.webp" },
  { name: "Reddit", image: "/images/home/reddit.png" },
  { name: "Google Maps", image: "/images/home/google-maps.png" },
  { name: "Amazon", image: "/images/home/amazon-light.png" },
  { name: "Bing", image: "/images/home/bing.png" },
  { name: "Gemini", image: "/images/home/gemini-color.png" },
  { name: "Perplexity", image: "/images/home/perplexity.png" },
] as const;

const CATEGORY_KEYS = ["search", "ai", "social"] as const;

export default function EcosystemSection() {
  const t = useTranslations("home.ecosystem");

  // Duplicated once so the CSS marquee can loop seamlessly at -50%.
  const marqueeItems = [...PLATFORMS, ...PLATFORMS];

  return (
    <section className="bg-mist py-20 md:py-24">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      </Container>

      <div className="relative mt-14 overflow-hidden border-y border-line bg-white py-5">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {marqueeItems.map((platform, i) => {
            const mark = "logo" in platform ? MARQUEE_LOGOS[platform.logo] : undefined;
            return (
              <span key={i} className="flex items-center gap-8">
                <span className="flex items-center gap-2.5 text-lg font-semibold text-charcoal/70">
                  {"image" in platform && (
                    <Image
                      src={platform.image}
                      alt=""
                      width={22}
                      height={22}
                      className="h-[22px] w-[22px] object-contain"
                    />
                  )}
                  {mark && (
                    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill={mark.hex} aria-hidden>
                      <path d={mark.path} />
                    </svg>
                  )}
                  {platform.name}
                </span>
                <span className="text-line" aria-hidden>
                  |
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <Container>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CATEGORY_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="rounded-3xl border border-line bg-white p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-ink">
                {t(`categories.${key}.label`)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`categories.${key}.items`)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
