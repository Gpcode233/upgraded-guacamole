import type { Metadata } from "next";
import { PageShell, Section } from "../components/page-shell";
import { RegisterForm } from "../components/register-form";
import { contact, summitDetails } from "../lib/content";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Register for the NCS SouthEast Innovation Summit & Awards, 12–14 November 2026, International Conference Centre, Awka.",
};

const steps = [
  {
    title: "Register",
    detail: "Tell us who you are. It takes about a minute.",
  },
  {
    title: "Get your access code",
    detail: "A confirmation email with your personal access code lands in your inbox.",
  },
  {
    title: "Show it on arrival",
    detail: "Present the code at the accreditation desk to collect your badge.",
  },
];

export default function RegisterPage() {
  return (
    <PageShell
      eyebrow="Registration"
      title="Register for the Summit & Awards"
      intro="12–14 November 2026, International Conference Centre, Awka, Anambra State. Your access code arrives by email."
      image={{ src: "/images/stock-speaker-stage.jpg" }}
    >
      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <div>
            <RegisterForm />
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-brand-deep p-6 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                The Summit
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-snug">
                {summitDetails.event}
              </h2>
              <dl className="mt-5 flex flex-col gap-3 text-sm">
                <div>
                  <dt className="text-white/60">When</dt>
                  <dd className="font-medium">{summitDetails.date}</dd>
                </div>
                <div>
                  <dt className="text-white/60">Where</dt>
                  <dd className="font-medium">{summitDetails.venue}</dd>
                </div>
                <div>
                  <dt className="text-white/60">Theme</dt>
                  <dd className="leading-6 text-white/90">
                    {summitDetails.theme}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-line p-6">
              <h2 className="text-base font-semibold [word-spacing:0.2em]">
                What happens next
              </h2>
              <ol className="mt-5 flex flex-col gap-5">
                {steps.map((step, position) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-[#10241a]">
                      {position + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="px-1 text-sm leading-6 text-muted">
              Need help? Email{" "}
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-brand underline-offset-4 hover:underline"
              >
                {contact.email}
              </a>{" "}
              or call {contact.phones[0]}.
            </p>
          </aside>
        </div>
      </Section>
    </PageShell>
  );
}
