"use server";

import { insertRow } from "@/lib/supabase";

export type FormResult = { ok: true } | { ok: false };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// FormData is untrusted: read each field as a trimmed string, capped at the
// same length the database allows, and treat anything else as empty.
function field(formData: FormData, name: string, max: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Hidden "website" field: invisible to people, but form-filling bots complete
// it. Those submissions report success without being stored.
function isBot(formData: FormData): boolean {
  return field(formData, "website", 200) !== "";
}

function context(formData: FormData) {
  return {
    locale: field(formData, "locale", 10) || null,
    page: field(formData, "page", 300) || null,
  };
}

export async function submitContact(formData: FormData): Promise<FormResult> {
  if (isBot(formData)) return { ok: true };

  const name = field(formData, "name", 200);
  const email = field(formData, "email", 320).toLowerCase();
  if (!name || !EMAIL.test(email)) return { ok: false };

  const saved = await insertRow("contact_submissions", {
    name,
    email,
    phone: field(formData, "phone", 50) || null,
    subject: field(formData, "subject", 300) || null,
    message: field(formData, "message", 5000) || null,
    ...context(formData),
  });
  return { ok: saved };
}

export async function subscribeNewsletter(formData: FormData): Promise<FormResult> {
  if (isBot(formData)) return { ok: true };

  const email = field(formData, "email", 320).toLowerCase();
  if (!EMAIL.test(email)) return { ok: false };

  const saved = await insertRow(
    "newsletter_subscribers",
    { email, ...context(formData) },
    { ignoreDuplicatesOn: "email" }
  );
  return { ok: saved };
}
