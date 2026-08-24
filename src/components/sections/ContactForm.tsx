"use client";

import { useState, FormEvent, FocusEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { clsx } from "clsx";
import MagneticButton from "@/components/ui/MagneticButton";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
};

function FloatingField({ label, name, type = "text", required, as = "input", rows }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const active = focused || filled;

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFocused(false);
    setFilled(e.target.value.length > 0);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFilled(e.target.value.length > 0);
  }

  const fieldClass = clsx(
    "peer w-full rounded-xl border bg-white px-4 pt-6 pb-2.5 text-sm text-charcoal outline-none transition-colors duration-300",
    focused ? "border-amber" : "border-line"
  );

  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={fieldClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={fieldClass}
        />
      )}
      <motion.label
        initial={false}
        animate={{
          top: active ? "0.6rem" : "1.15rem",
          fontSize: active ? "0.7rem" : "0.875rem",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "pointer-events-none absolute left-4 font-medium",
          focused ? "text-amber-dark" : "text-muted"
        )}
      >
        {label}
      </motion.label>
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-amber/25"
      />
    </div>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => router.push("/thank-you"), 900);
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FloatingField label={t("name")} name="name" required />
        <FloatingField label={t("email")} name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FloatingField label={t("phone")} name="phone" type="tel" />
        <FloatingField label={t("subject")} name="subject" />
      </div>
      <FloatingField label={t("message")} name="message" as="textarea" rows={5} />

      <MagneticButton
        type="submit"
        variant="solid"
        disabled={status !== "idle"}
        className="w-full justify-center gap-2 sm:w-auto"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "sent" ? (
            <motion.span
              key="sent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path
                  d="M4.5 10.5l3.5 3.5L15.5 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("sent")}
            </motion.span>
          ) : status === "sending" ? (
            <motion.span
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="h-3.5 w-3.5 rounded-full border-2 border-ink/30 border-t-ink"
              />
              {t("sending")}
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {t("send")}
            </motion.span>
          )}
        </AnimatePresence>
      </MagneticButton>
    </form>
  );
}
