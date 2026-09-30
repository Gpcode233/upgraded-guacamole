"use client";

import { useActionState, useState } from "react";
import { events } from "../lib/content";
import {
  membershipGrades,
  type RegisterState,
  type RegistrationValues,
} from "../lib/registration";
import { register } from "../register/actions";

const inputClass =
  "w-full rounded-lg border border-line bg-background px-3.5 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-brand aria-invalid:border-[#d00000]";

export function RegisterForm() {
  // Remounting the flow is the only way to clear useActionState's result.
  const [attempt, setAttempt] = useState(0);
  return (
    <RegisterFlow
      key={attempt}
      onRestart={() => setAttempt((value) => value + 1)}
    />
  );
}

function RegisterFlow({ onRestart }: { onRestart: () => void }) {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    register,
    { status: "idle" },
  );

  if (state.status === "success") {
    return <Confirmation state={state} onRestart={onRestart} />;
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values: Partial<RegistrationValues> =
    state.status === "error" ? state.values : {};

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-line bg-surface p-5 sm:p-8"
    >
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-[#d00000]/30 bg-[#d00000]/5 px-4 py-3 text-sm text-[#a00000]"
        >
          {state.message}
        </p>
      ) : null}

      <input type="hidden" name="event" value={events[0].slug} />

      <FormStep number={1} title="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full name"
            name="name"
            autoComplete="name"
            required
            defaultValue={values.name}
            error={errors.name}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            error={errors.email}
            hint="Your access code is sent here."
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone}
          />
          <Field
            label="Organisation"
            name="organisation"
            autoComplete="organization"
            defaultValue={values.organisation}
          />
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="grade" className="text-sm font-medium">
              Membership grade
            </label>
            <select
              id="grade"
              name="grade"
              defaultValue={values.grade ?? membershipGrades[0]}
              aria-invalid={Boolean(errors.grade)}
              className={inputClass}
            >
              {membershipGrades.map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </select>
            <FieldError id="grade-error" message={errors.grade} />
          </div>
        </div>
      </FormStep>

      <FormStep number={2} title="Anything we should know?" last>
        <label htmlFor="notes" className="sr-only">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          maxLength={2000}
          defaultValue={values.notes}
          placeholder="Accessibility needs, dietary requirements, or questions for the organisers."
          className={inputClass}
        />
      </FormStep>

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted">
          Fields marked <span className="text-foreground">*</span> are required.
          We only use your details to manage your registration.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
              Registering…
            </>
          ) : (
            "Complete registration"
          )}
        </button>
      </div>
    </form>
  );
}

function Confirmation({
  state,
  onRestart,
}: {
  state: Extract<RegisterState, { status: "success" }>;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);

  let message: React.ReactNode;
  if (state.alreadyRegistered) {
    message = state.emailSent ? (
      <>
        You were already registered for{" "}
        <strong className="text-foreground">{state.eventTitle}</strong>. We’ve
        re-sent your access code to <strong className="text-foreground">{state.email}</strong>.
      </>
    ) : (
      <>
        You’re already registered for{" "}
        <strong className="text-foreground">{state.eventTitle}</strong>, but we
        couldn’t re-send your code just now. Check your inbox for the original
        email, or contact us.
      </>
    );
  } else {
    message = (
      <>
        Your place at <strong className="text-foreground">{state.eventTitle}</strong>{" "}
        is confirmed.{" "}
        {state.emailSent ? (
          <>
            We’ve emailed your access code to{" "}
            <strong className="text-foreground">{state.email}</strong>.
          </>
        ) : (
          <>
            We couldn’t send the confirmation email just now, so please save the
            code below.
          </>
        )}
      </>
    );
  }

  return (
    <div
      role="status"
      className="rounded-2xl border border-line bg-surface p-6 text-center sm:p-10"
    >
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
        <svg aria-hidden viewBox="0 0 16 16" className="h-5 w-5">
          <path
            d="M3.5 8.5 6.5 11.5 12.5 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight">
        {state.alreadyRegistered
          ? `Welcome back, ${state.firstName}`
          : `You're in, ${state.firstName}`}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        {message}
      </p>

      {state.accessCode ? (
        <div className="mx-auto mt-7 max-w-sm rounded-xl bg-brand-soft px-6 py-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
            Your access code
          </p>
          <p className="mt-2 font-mono text-2xl font-bold tracking-[0.12em] text-accent">
            {state.accessCode}
          </p>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(state.accessCode ?? "");
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
            className="mt-3 text-xs font-medium text-white/80 underline-offset-4 hover:underline"
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      ) : null}

      <p className="mx-auto mt-6 max-w-md text-xs leading-5 text-muted">
        Show your access code at the accreditation desk on arrival. Didn’t get
        the email? Check your spam folder.
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 rounded-lg border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:bg-background"
      >
        Register someone else
      </button>
    </div>
  );
}

function FormStep({
  number,
  title,
  last = false,
  children,
}: {
  number: number;
  title: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={last ? "" : "mb-8 border-b border-line pb-8"}>
      <h2 className="mb-5 flex items-center gap-3 text-base font-semibold [word-spacing:0.2em]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-deep font-sans text-xs text-white">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  defaultValue,
  error,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
  hint?: string;
}) {
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required ? <span aria-hidden>*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={inputClass}
      />
      {error ? (
        <FieldError id={`${name}-error`} message={error} />
      ) : hint ? (
        <p id={`${name}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-[#b00000]">
      {message}
    </p>
  );
}
