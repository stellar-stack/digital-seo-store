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
    focused ? "border-blue" : "border-line"
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
          focused ? "text-blue-ink" : "text-muted"
        )}
      >
        {label}
      </motion.label>
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-blue/25"
      />
    </div>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tInfo = useTranslations("contact.info.reassurance");
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => router.push("/thank-you"), 3000);
    }, 600);
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center py-10 text-center"
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-blue text-white"
          >
            <svg viewBox="0 0 20 20" className="h-7 w-7" fill="none">
              <path
                d="M4.5 10.5l3.5 3.5L15.5 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="font-display mt-6 text-xl font-semibold text-ink"
          >
            {t("sent")}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-2 max-w-xs text-sm text-muted"
          >
            {tInfo("speed.description")}
          </motion.p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
              {status === "sending" ? (
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
        </motion.form>
      )}
    </AnimatePresence>
  );
}
