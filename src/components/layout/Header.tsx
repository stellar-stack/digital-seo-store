"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import FlickerGlow from "@/components/ui/FlickerGlow";
import { services, SERVICE_CATEGORY_COLUMNS, type ServiceCategory } from "@/config/services";
import { SERVICE_ICONS } from "@/components/icons/ServiceIcons";
import { useHeaderHidden, useSetHeaderHidden } from "@/components/providers/HeaderVisibility";

const HEADER_HEIGHT = 80;
const HIDE_SCROLL_THRESHOLD = 140;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const hidden = useHeaderHidden();
  const setHidden = useSetHeaderHidden();
  const lastScrollY = useRef(0);
  const tService = useTranslations("services.seoAudit");

  // Slides the header out of view on scroll-down past a threshold, and
  // back in the instant the user scrolls up even slightly — reads scroll
  // position only, never writes it, so it can't fight Lenis or native
  // momentum the way the earlier snap experiment did.
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      setHidden(goingDown && y > HIDE_SCROLL_THRESHOLD && !mobileOpen && !servicesOpen);
      lastScrollY.current = y;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, servicesOpen]);

  useEffect(() => {
    if (mobileOpen || servicesOpen) setHidden(false);
  }, [mobileOpen, servicesOpen]);

  useEffect(() => {
    if (!servicesOpen && !mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setServicesOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen, mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = [
    { href: "/about", label: t("about") },
    { href: "/pricing", label: t("pricing") },
    { href: "/blog", label: t("blog") },
  ];

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          hidden && "-translate-y-full",
          "bg-white/80 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        )}
      >
        <Container className="flex items-center justify-between py-4">
          <Link href="/" className="relative z-10 flex items-center gap-2 shrink-0">
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
              onFocus={() => setServicesOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setServicesOpen(false);
                }
              }}
            >
              <button
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="mega-menu-panel"
                onClick={() => setServicesOpen((v) => !v)}
                className={clsx(
                  "px-4 py-2 text-sm font-semibold transition-colors",
                  "text-charcoal/80 hover:text-charcoal"
                )}
              >
                {t("servicesLabel")}
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    id="mega-menu-panel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full pt-3 w-[720px]"
                  >
                    <div className="grid grid-cols-[1fr_1fr_240px] gap-1 rounded-3xl border border-line bg-white/95 backdrop-blur-xl p-5 shadow-2xl shadow-ink/5">
                      {SERVICE_CATEGORY_COLUMNS.map((categories, colIdx) => (
                        <div key={colIdx} className="space-y-5">
                          {categories.map((cat: ServiceCategory) => (
                            <div key={cat}>
                              <p className="px-3 text-[0.65rem] font-semibold uppercase tracking-widest text-muted/70">
                                {t(`megaMenu.categories.${cat}` as never)}
                              </p>
                              <div className="mt-1">
                                {services
                                  .filter((s) => s.category === cat)
                                  .map((s) => (
                                    <Link
                                      key={s.slug}
                                      href={`/services/${s.slug}`}
                                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-charcoal/80 hover:bg-mist hover:text-charcoal transition-colors"
                                    >
                                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-mist text-blue-dark [&_svg]:h-4 [&_svg]:w-4">
                                        {SERVICE_ICONS[s.key]}
                                      </span>
                                      {t(`services.${s.key}` as never)}
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}

                      <Link
                        href="/services/seo-audit"
                        className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-mist/50 transition-colors hover:border-blue/40"
                      >
                        <div className="relative h-28 w-full overflow-hidden">
                          <Image
                            src="/nav/audit-analytics.jpg"
                            alt=""
                            fill
                            sizes="240px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <span className="text-[0.62rem] font-semibold uppercase tracking-widest text-blue-ink">
                            {t("megaMenu.featured.label")}
                          </span>
                          <p className="font-display mt-2 text-sm font-semibold leading-snug text-ink">
                            {tService("hero.title")}
                          </p>
                          <span className="mt-auto flex items-center gap-1.5 pt-3 text-xs font-semibold text-blue-ink">
                            {t("megaMenu.featured.cta")}
                            <span className="transition-transform group-hover:translate-x-0.5">→</span>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "px-4 py-2 text-sm font-semibold transition-colors",
                  "text-charcoal/80 hover:text-charcoal"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <FlickerGlow>
              <MagneticButton as="a" href="/contact" variant="solid" className="text-xs px-6 py-3">
                {t("cta")}
              </MagneticButton>
            </FlickerGlow>
          </div>

          <button
            className="relative z-10 lg:hidden flex items-center justify-center w-10 h-10 -mr-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={clsx(
                  "h-[1.5px] transition-all duration-300",
                  "bg-charcoal",
                  mobileOpen && "translate-y-[6.5px] rotate-45"
                )}
              />
              <span
                className={clsx(
                  "h-[1.5px] transition-all duration-300",
                  "bg-charcoal",
                  mobileOpen && "-translate-y-[6.5px] -rotate-45"
                )}
              />
            </div>
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white lg:hidden"
            style={{ paddingTop: HEADER_HEIGHT }}
          >
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="flex min-h-[calc(100vh-80px)] flex-col px-6 pt-8 pb-10"
            >
              <div className="flex-1">
                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-panel"
                    className="flex w-full items-center justify-between py-3 text-left"
                  >
                    <span className="font-display text-2xl font-semibold text-ink">
                      {t("servicesLabel")}
                    </span>
                    <span
                      className={clsx(
                        "text-xl text-blue transition-transform duration-300",
                        mobileServicesOpen && "rotate-45"
                      )}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        id="mobile-services-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="flex items-center gap-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-mist text-blue-dark [&_svg]:h-3.5 [&_svg]:w-3.5">
                                {SERVICE_ICONS[s.key]}
                              </span>
                              {t(`services.${s.key}` as never)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="h-px bg-line my-1" />

                {links.map((l) => (
                  <motion.div key={l.href} variants={itemVariants}>
                    <Link
                      href={l.href}
                      className="block py-3 font-display text-2xl font-semibold text-ink"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-5">
                <MagneticButton as="a" href="/contact" variant="solid" className="w-full">
                  {t("cta")}
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
