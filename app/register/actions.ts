"use server";

import { randomBytes } from "node:crypto";
import { contact, events } from "../lib/content";
import { sendConfirmationEmail } from "../lib/registration-email";
import {
  membershipGrades,
  type RegisterState,
  type RegistrationField,
  type RegistrationValues,
} from "../lib/registration";
import { supabaseAdmin } from "../lib/supabase";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// No 0/O or 1/I, so codes survive being read aloud or copied by hand.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export async function register(
  _previous: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const text = (key: string, max: number) =>
    String(formData.get(key) ?? "").trim().slice(0, max);

  const values: RegistrationValues = {
    name: text("name", 120),
    email: text("email", 254).toLowerCase(),
    phone: text("phone", 40),
    organisation: text("organisation", 160),
    event: text("event", 80),
    grade: text("grade", 60),
    notes: text("notes", 2000),
  };

  // Honeypot: people never see this field, so anything in it is a bot.
  if (text("website", 200)) {
    return fail(values, {}, "Something went wrong. Please try again.");
  }

  const event = events.find(
    (item) => item.slug === values.event && item.status !== "Concluded",
  );
  const fieldErrors: Partial<Record<RegistrationField, string>> = {};
  if (!values.name) fieldErrors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(values.email))
    fieldErrors.email = "Enter a valid email address.";
  if (!event) fieldErrors.event = "Choose an event.";
  if (!membershipGrades.includes(values.grade as never))
    fieldErrors.grade = "Choose a membership grade.";
  if (!event || Object.keys(fieldErrors).length > 0) {
    return fail(values, fieldErrors);
  }

  const eventDetails = {
    title: event.title,
    date: event.date,
    location: event.location,
  };
  let accessCode = "";
  let alreadyRegistered = false;
  try {
    ({ accessCode, alreadyRegistered } = await save(values, event.slug));
  } catch (error) {
    console.error("Registration insert failed", error);
  }

  if (!accessCode) {
    return fail(
      values,
      {},
      `We couldn't save your registration. Please try again, or email ${contact.email}.`,
    );
  }

  let emailSent = false;
  try {
    await sendConfirmationEmail({
      to: values.email,
      fullName: values.name,
      accessCode,
      event: eventDetails,
      grade: values.grade,
    });
    emailSent = true;
    await supabaseAdmin()
      .from("registrations")
      .update({ email_sent_at: new Date().toISOString() })
      .eq("access_code", accessCode);
  } catch (error) {
    // The registration is saved either way; a new registrant also sees the
    // code on screen.
    console.error("Confirmation email failed", error);
  }

  return {
    status: "success",
    firstName: values.name.split(/\s+/)[0],
    email: values.email,
    eventTitle: event.title,
    // A repeat submission only proves someone knows the address, so the
    // existing code goes to that inbox and never back to the page.
    accessCode: alreadyRegistered ? null : accessCode,
    emailSent,
    alreadyRegistered,
  };
}

async function save(values: RegistrationValues, eventSlug: string) {
  const db = supabaseAdmin();

  for (let attempt = 0; attempt < 3; attempt++) {
    const candidate = generateAccessCode();
    const { error } = await db.from("registrations").insert({
      full_name: values.name,
      email: values.email,
      phone: values.phone || null,
      organisation: values.organisation || null,
      event_slug: eventSlug,
      membership_grade: values.grade,
      notes: values.notes || null,
      access_code: candidate,
    });

    if (!error) return { accessCode: candidate, alreadyRegistered: false };
    if (error.code !== "23505") throw error;

    if (error.message.includes("registrations_email_event_key")) {
      // Same email, same event: reuse the code they already hold.
      const { data, error: lookupError } = await db
        .from("registrations")
        .select("access_code")
        .eq("email", values.email)
        .eq("event_slug", eventSlug)
        .single();
      if (lookupError) throw lookupError;
      return { accessCode: data.access_code as string, alreadyRegistered: true };
    }
    // Any other unique violation is an access-code collision: draw again.
  }

  throw new Error("Could not generate a unique access code");
}

function fail(
  values: RegistrationValues,
  fieldErrors: Partial<Record<RegistrationField, string>>,
  message?: string,
): RegisterState {
  return { status: "error", fieldErrors, values, message };
}

// SE26-XXXX-XXXX: 8 random characters from a 32-letter alphabet (40 bits).
function generateAccessCode() {
  const bytes = randomBytes(8);
  const chars = Array.from(bytes, (byte) => CODE_ALPHABET[byte & 31]);
  return `SE26-${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`;
}
