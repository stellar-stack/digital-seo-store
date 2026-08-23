"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { clsx } from "clsx";

const LABELS: Record<string, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
};

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className={clsx(
          "text-sm font-semibold tracking-wide px-3 py-2 rounded-full transition-colors",
          dark
            ? "text-white/80 hover:text-white"
            : "text-charcoal/80 hover:text-charcoal"
        )}
        aria-label="Change language"
      >
        {LABELS[locale]}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[7rem] overflow-hidden rounded-2xl border border-line bg-white/95 backdrop-blur-xl shadow-xl py-1 z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onMouseDown={() => router.replace(pathname, { locale: loc })}
              className={clsx(
                "block w-full text-left px-4 py-2 text-sm font-medium hover:bg-mist transition-colors",
                loc === locale ? "text-amber-dark" : "text-charcoal"
              )}
            >
              {LABELS[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
