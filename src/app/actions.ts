"use server";

import { z } from "zod";
import { Resend } from "resend";
import { getDictionary, isLocale, defaultLocale, type Locale } from "@/lib/i18n";
import type { FormState } from "@/lib/form-state";
import { eventTypes, OTHER_EVENT_TYPE } from "@/content/event-types";
import { site } from "@/content/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE = /^[+()\d][\d\s()/-]{7,19}$/;

function localeOf(data: FormData): Locale {
  const raw = String(data.get("locale") ?? "");
  return isLocale(raw) ? raw : defaultLocale;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function deliver(subject: string, rows: [string, string][], replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX;
  const from = process.env.CONTACT_FROM;

  if (!key || !inbox || !from) {
    // Bez nakonfigurovaného odosielania radšej priznáme chybu, než by sme
    // návštevníkovi potvrdili odoslanie správy, ktorá nikam nedorazila.
    console.error(
      "Odosielanie e-mailov nie je nakonfigurované. Chýba RESEND_API_KEY, CONTACT_INBOX alebo CONTACT_FROM.",
    );
    return false;
  }

  const html = `<h2>${escapeHtml(subject)}</h2><table cellpadding="6">${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to: [inbox],
      subject,
      html,
      replyTo: replyTo && EMAIL.test(replyTo) ? replyTo : undefined,
      text: rows.map(([l, v]) => `${l}: ${v}`).join("\n"),
    });
    if (error) {
      console.error("Resend odmietol správu:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Odoslanie e-mailu zlyhalo:", err);
    return false;
  }
}

/** Nezáväzná kontaktná správa. */
export async function submitContact(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const locale = localeOf(data);
  const t = getDictionary(locale).validation;

  if (String(data.get("website") ?? "").length > 0) {
    return { status: "success" };
  }

  const values = {
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    phone: String(data.get("phone") ?? "").trim(),
    type: String(data.get("type") ?? "").trim(),
    typeOther: String(data.get("typeOther") ?? "").trim(),
    message: String(data.get("message") ?? "").trim(),
  };

  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = t.nameRequired;
  if (!values.email) errors.email = t.emailRequired;
  else if (!EMAIL.test(values.email)) errors.email = t.emailInvalid;
  if (values.message.length < 5) errors.message = t.messageRequired;
  if (data.get("consent") !== "on") errors.consent = t.consentRequired;

  // Telefón a typ podujatia sú nepovinné, kontrolujeme ich len keď sú vyplnené.
  if (values.phone && !PHONE.test(values.phone)) errors.phone = t.phoneInvalid;
  if (values.type && !eventTypes.some((e) => e.id === values.type)) {
    errors.type = t.typeRequired;
  }
  if (values.type === OTHER_EVENT_TYPE && values.typeOther.length < 2) {
    errors.typeOther = t.typeOtherRequired;
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const typeLabel = !values.type
    ? "-"
    : values.type === OTHER_EVENT_TYPE
      ? values.typeOther
      : (eventTypes.find((e) => e.id === values.type)?.label[locale] ?? values.type);

  const ok = await deliver(
    `Dopyt z webu ${site.shortName}: ${values.name}`,
    [
      ["Meno", values.name],
      ["E-mail", values.email],
      ["Telefón", values.phone || "-"],
      ["Typ podujatia", typeLabel],
      ["Správa", values.message],
      ["Jazyk formulára", locale],
    ],
    values.email,
  );

  return ok
    ? { status: "success" }
    : { status: "error", errors: { form: t.serverError }, values };
}
