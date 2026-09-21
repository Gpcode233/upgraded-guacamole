"use client";

import { useState } from "react";
import { events } from "../lib/content";
import { Arrow } from "./page-shell";

const controlClass =
  "rounded-lg border border-line bg-background px-3.5 py-3 text-[15px] transition-colors aria-[invalid=true]:border-brand-red";
const labelClass = "text-sm font-medium";

type Errors = Partial<Record<"name" | "email" | "event", string>>;

export function RegisterForm({ defaultEvent }: { defaultEvent?: string }) {
  const openEvents = events.filter((event) => event.status !== "Concluded");
  const initialEvent = openEvents.some((event) => event.slug === defaultEvent)
    ? (defaultEvent as string)
    : "";

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    event: initialEvent,
    grade: "Professional member",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof values) => (value: string) =>
    setValues((previous) => ({ ...previous, [key]: value }));

  function onSubmit(formEvent: React.FormEvent) {
    formEvent.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (!values.event) next.event = "Choose an event.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  if (submitted) {
    const chosen = events.find((event) => event.slug === values.event);
    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-surface p-8 text-center sm:p-10"
      >
        <span
          aria-hidden
          className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand"
        >
          <svg viewBox="0 0 16 16" className="h-5 w-5">
            <path
              d="m3.5 8.5 3 3 6-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight">
          Registration recorded
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
          Thanks {values.name.split(" ")[0]} — your place at{" "}
          <strong className="font-semibold text-foreground">
            {chosen?.title}
          </strong>{" "}
          is pending confirmation. A confirmation will be sent to {values.email}.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setValues((previous) => ({ ...previous, name: "", email: "" }));
          }}
          className="mt-6 rounded-lg border border-line px-4 py-2.5 text-sm font-medium hover:bg-background"
        >
          Register someone else
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          id="name"
          required
          value={values.name}
          onChange={set("name")}
          error={errors.name}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          required
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
        />
        <Field
          label="Organisation"
          id="organisation"
          value={values.organisation}
          onChange={set("organisation")}
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="event" className={labelClass}>
            Event <span className="text-muted">*</span>
          </label>
          <select
            id="event"
            value={values.event}
            aria-invalid={Boolean(errors.event)}
            onChange={(element) => set("event")(element.target.value)}
            className={controlClass}
          >
            <option value="">Select an event</option>
            {openEvents.map((event) => (
              <option key={event.slug} value={event.slug}>
                {event.title} — {event.date}
              </option>
            ))}
          </select>
          {errors.event ? (
            <p className="text-xs font-medium text-brand-red">
              {errors.event}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="grade" className={labelClass}>
            Membership grade
          </label>
          <select
            id="grade"
            value={values.grade}
            onChange={(element) => set("grade")(element.target.value)}
            className={controlClass}
          >
            {[
              "Professional member",
              "Student member",
              "Corporate representative",
              "Not yet a member",
            ].map((grade) => (
              <option key={grade}>{grade}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>
            Anything we should know?
          </label>
          <textarea
            id="notes"
            rows={4}
            value={values.notes}
            onChange={(element) => set("notes")(element.target.value)}
            className={controlClass}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Fields marked <span className="font-semibold">*</span> are required.
        </p>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 sm:w-auto"
        >
          Submit registration
          <Arrow />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label} {required ? <span className="text-muted">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(element) => onChange(element.target.value)}
        className={controlClass}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-brand-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}
