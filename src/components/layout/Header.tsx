"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import FlickerGlow from "@/components/ui/FlickerGlow";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { services } from "@/config/services";

const HEADER_HEIGHT = 80;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [navTheme, setNavTheme] = useState<"solid" | "transparent">("solid");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const darkElRef = useRef<Element | null>(null);

  useLayoutEffect(() => {
    darkElRef.current = document.querySelector('[data-nav-theme="dark"]');
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const el = darkElRef.current;
      if (!el) {
        setNavTheme("solid");
        return;
      }
      // Re-measured every tick (not cached) because GSAP's pin spacer
      // inflates this element's height asynchronously after mount.
      const rect = el.getBoundingClientRect();
      const bottomAbsolute = rect.bottom + window.scrollY;
      setNavTheme(window.scrollY < bottomAbsolute - HEADER_HEIGHT ? "transparent" : "solid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

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

  const isTransparent = navTheme === "transparent" && !mobileOpen;
  const isLight = isTransparent || mobileOpen;

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
          "fixed top-0 inset-x-0 z-50 transition-colors duration-500",
          mobileOpen
            ? "bg-ink"
            : isTransparent
              ? "bg-transparent"
              : "bg-white/80 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]"
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
              className={clsx(
                "h-9 w-auto transition-[filter] duration-500",
                isLight && "brightness-0 invert"
              )}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={clsx(
                  "px-4 py-2 text-sm font-semibold transition-colors",
                  isTransparent ? "text-white/85 hover:text-white" : "text-charcoal/80 hover:text-charcoal"
                )}
              >
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
                className={clsx(
                  "px-4 py-2 text-sm font-semibold transition-colors",
                  isTransparent ? "text-white/85 hover:text-white" : "text-charcoal/80 hover:text-charcoal"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher dark={isTransparent} />
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
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={clsx(
                  "h-[1.5px] transition-all duration-300",
                  isLight ? "bg-white" : "bg-charcoal",
                  mobileOpen && "translate-y-[6.5px] rotate-45"
                )}
              />
              <span
                className={clsx(
                  "h-[1.5px] transition-all duration-300",
                  isLight ? "bg-white" : "bg-charcoal",
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink lg:hidden"
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
                    className="flex w-full items-center justify-between py-3 text-left"
                  >
                    <span className="font-display text-2xl font-semibold text-white">
                      {t("servicesLabel")}
                    </span>
                    <span
                      className={clsx(
                        "text-xl text-amber transition-transform duration-300",
                        mobileServicesOpen && "rotate-45"
                      )}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
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
                              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                            >
                              {t(`services.${s.key}` as never)}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="h-px bg-white/10 my-1" />

                {links.map((l) => (
                  <motion.div key={l.href} variants={itemVariants}>
                    <Link
                      href={l.href}
                      className="block py-3 font-display text-2xl font-semibold text-white"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher dark />
                </div>
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
