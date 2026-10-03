"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { useHeaderHidden } from "@/components/providers/HeaderVisibility";

const TOC_TARGETS = ["services", "what-you-get", "why-invest", "compare", "faqs", "get-started"];

function withPhoneLink(text: string, phone: string) {
  const at = text.indexOf(phone);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <a
        href={`tel:${phone.replace(/\D/g, "")}`}
        className="font-semibold text-blue-ink underline decoration-blue/30 underline-offset-4 transition-colors hover:text-ink"
      >
        {phone}
      </a>
      {text.slice(at + phone.length)}
    </>
  );
}

export default function SeoWhyInvest({
  eyebrow,
  title,
  subtitle,
  paragraphs,
  listIntro,
  list,
  closing,
  phone,
  tocTitle,
  toc,
  cta,
  tone = "cream",
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  listIntro: string;
  list: string[];
  closing: string;
  phone: string;
  tocTitle?: string;
  toc?: string[];
  cta?: string;
  tone?: "cream" | "white";
}) {
  const headerHidden = useHeaderHidden();
  const [active, setActive] = useState("why-invest");

  useEffect(() => {
    const els = TOC_TARGETS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-invest" className={`scroll-mt-24 section-y ${tone === "white" ? "bg-white" : "bg-cream"}`}>
      <Container>
        <div className={clsx("grid gap-10 md:gap-12", toc && toc.length > 0 && "lg:grid-cols-[1fr_320px] lg:gap-10 md:gap-12")}>
          <div>
            <SectionHeading eyebrow={eyebrow} title={title} />

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mt-10 text-xl font-semibold text-ink md:text-2xl"
            >
              {subtitle}
            </motion.h3>

            <div className="mt-5 max-w-2xl space-y-5 text-base leading-relaxed text-muted md:text-[1.05rem]">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="font-medium text-ink">{listIntro}</p>
            </div>

            <ul className="mt-5 grid max-w-2xl gap-x-10 gap-y-3 sm:grid-cols-2">
              {list.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-ink/85">
                  <span aria-hidden className="mt-[9px] h-[6px] w-[6px] shrink-0 bg-blue-ink" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-[1.05rem]">
              {withPhoneLink(closing, phone)}
            </p>

            {cta && (
              <div className="mt-9">
                <MagneticButton as="a" href="/contact" variant="solid">
                  {cta}
                </MagneticButton>
              </div>
            )}
          </div>

          {toc && toc.length > 0 && (
          <aside>
            <nav
              aria-label={tocTitle}
              className={clsx(
                "rounded-2xl border border-line bg-white p-7 transition-[top] duration-300 ease-out lg:sticky",
                headerHidden ? "lg:top-8" : "lg:top-28"
              )}
            >
              <p className="font-display text-lg font-semibold text-ink">{tocTitle}</p>
              <ul className="mt-5 space-y-1 border-l border-line">
                {toc.map((label, i) => {
                  const target = TOC_TARGETS[i];
                  const isActive = active === target;
                  return (
                    <li key={label}>
                      <a
                        href={`#${target}`}
                        className={clsx(
                          "-ml-px block border-l-2 py-2 pl-4 text-sm transition-colors",
                          isActive
                            ? "border-blue font-semibold text-blue-ink"
                            : "border-transparent text-muted hover:border-ink/20 hover:text-ink"
                        )}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
          )}
        </div>
      </Container>
    </section>
  );
}
