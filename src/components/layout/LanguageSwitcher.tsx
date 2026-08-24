"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const LABELS: Record<string, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
};

export default function LanguageSwitcher({
  dark = false,
  full = false,
  id = "default",
}: {
  dark?: boolean;
  full?: boolean;
  id?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="radiogroup"
      aria-label="Select language"
      className={clsx(
        "relative inline-flex items-center rounded-full p-1",
        full && "w-full",
        dark ? "bg-white/10" : "bg-charcoal/5"
      )}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => {
              if (!active) router.replace(pathname, { locale: loc });
            }}
            className={clsx(
              "relative rounded-full text-center font-semibold tracking-wide transition-colors duration-300",
              full ? "flex-1 py-3.5 text-sm" : "px-3.5 py-2 text-sm",
              active
                ? "text-ink"
                : dark
                  ? "text-white/60 hover:text-white"
                  : "text-charcoal/55 hover:text-charcoal"
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className="absolute inset-0 rounded-full bg-amber"
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
              />
            )}
            <span className="relative">{LABELS[loc]}</span>
          </button>
        );
      })}
    </div>
  );
}
