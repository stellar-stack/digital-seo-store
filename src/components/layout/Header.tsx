"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { services } from "@/config/services";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: "/about", label: t("about") },
    { href: "/pricing", label: t("pricing") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/brand/logo.png"
            alt="Digital SEO Store"
            width={168}
            height={86}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="px-4 py-2 text-sm font-semibold text-charcoal/80 hover:text-charcoal transition-colors">
              {t("servicesLabel")}
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px]"
                >
                  <div className="grid grid-cols-2 gap-1 rounded-3xl border border-line bg-white/95 backdrop-blur-xl p-4 shadow-2xl shadow-ink/5">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal/80 hover:bg-mist hover:text-charcoal transition-colors"
                      >
                        {t(`services.${s.key}` as never)}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-semibold text-charcoal/80 hover:text-charcoal transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <MagneticButton as="a" href="/contact" variant="solid" className="text-xs px-6 py-3">
            {t("cta")}
          </MagneticButton>
        </div>

        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 -mr-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span
              className={clsx(
                "h-[1.5px] bg-charcoal transition-transform duration-300",
                mobileOpen && "translate-y-[6.5px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "h-[1.5px] bg-charcoal transition-transform duration-300",
                mobileOpen && "-translate-y-[6.5px] -rotate-45"
              )}
            />
          </div>
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-white border-b border-line"
          >
            <Container className="py-6 flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mt-2 mb-1">
                {t("servicesLabel")}
              </p>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="py-2 text-sm font-medium text-charcoal/80"
                >
                  {t(`services.${s.key}` as never)}
                </Link>
              ))}
              <div className="h-px bg-line my-3" />
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="py-2 text-sm font-semibold">
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center justify-between mt-4">
                <LanguageSwitcher />
                <MagneticButton as="a" href="/contact" variant="solid" className="text-xs">
                  {t("cta")}
                </MagneticButton>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
