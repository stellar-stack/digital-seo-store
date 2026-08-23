"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    router.push("/thank-you");
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-charcoal/70">
            {t("name")}
          </label>
          <input required name="name" type="text" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-charcoal/70">
            {t("email")}
          </label>
          <input required name="email" type="email" className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-charcoal/70">
            {t("phone")}
          </label>
          <input name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-charcoal/70">
            {t("subject")}
          </label>
          <input name="subject" type="text" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-charcoal/70">
          {t("message")}
        </label>
        <textarea name="message" rows={5} className={inputClass} />
      </div>
      <MagneticButton
        type="submit"
        variant="solid"
        className="w-full justify-center sm:w-auto"
      >
        {submitting ? t("sending") : t("send")}
      </MagneticButton>
    </form>
  );
}
