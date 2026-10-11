"use client";

import { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import { useRouter } from "@/i18n/navigation";

export default function NewsletterBox({ className }: { className?: string }) {
  const t = useTranslations("blogPage.post");
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/thank-you");
  }

  return (
    <div className={clsx("rounded-3xl bg-[#f3f6fb] p-6 sm:p-7", className)}>
      <div className="flex items-end justify-between gap-4">
        <p className="font-display text-[1.6rem] font-bold leading-[1.3] text-ink">
          <span className="text-blue">{t("newsletterAccent")}</span> {t("newsletterRest")}
        </p>
        <svg viewBox="0 0 90 44" className="mb-2 h-9 w-[4.5rem] shrink-0 text-blue" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 14C26 1 61 2 82 36" />
          <path d="M70 32.5 82.5 37l1.8-13" />
        </svg>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-label={t("emailPlaceholder")}
          className="h-14 w-full rounded-xl border border-line bg-white px-5 text-base text-charcoal outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted focus:border-blue focus:shadow-[0_0_0_4px_rgba(0,113,227,0.15)]"
        />
        <button
          type="submit"
          className="h-14 w-full rounded-xl bg-blue text-lg font-semibold text-white transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-blue-dark active:scale-[0.98] active:bg-blue-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          {t("subscribe")}
        </button>
      </form>
    </div>
  );
}
