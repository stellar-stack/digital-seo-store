"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const STORAGE_KEY = "locale-suggestion-handled";

// Autonyms — a language's own name for itself — don't change with the
// current UI locale, so this stays a fixed lookup rather than translated
// copy.
const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};

function detectSupportedLocale(): Locale | null {
  const candidates = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const prefix = candidate.slice(0, 2).toLowerCase();
    if ((routing.locales as readonly string[]).includes(prefix)) {
      return prefix as Locale;
    }
  }
  return null;
}

export default function LocaleSuggestion() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("localeSuggestion");
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const detected = detectSupportedLocale();
    if (!detected || detected === locale) return;

    const timer = setTimeout(() => setSuggested(detected), 900);
    return () => clearTimeout(timer);
  }, [locale]);

  function handle(nextLocale: Locale | null) {
    localStorage.setItem(STORAGE_KEY, "1");
    setSuggested(null);
    if (nextLocale) {
      router.replace(pathname, { locale: nextLocale });
    }
  }

  return (
    <AnimatePresence>
      {suggested && (
        <motion.div
          role="dialog"
          aria-label={t("message", { language: LANGUAGE_NAMES[suggested] })}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-6 z-40 mx-auto flex max-w-sm flex-col gap-3 rounded-2xl border border-line bg-white p-4 shadow-xl shadow-ink/10 sm:inset-x-auto sm:left-6"
        >
          <p className="text-sm text-charcoal">
            {t("message", { language: LANGUAGE_NAMES[suggested] })}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handle(suggested)}
              className="rounded-full bg-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
            >
              {t("switch", { language: LANGUAGE_NAMES[suggested] })}
            </button>
            <button
              type="button"
              onClick={() => handle(null)}
              className="text-sm font-medium text-muted transition-colors hover:text-charcoal"
            >
              {t("dismiss")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
