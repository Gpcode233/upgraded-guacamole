import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  Section,
  SectionHeading,
  SideImage,
  buttonStyles,
} from "../components/page-shell";
import { HACKATHON_FORM, hackathon } from "../lib/programme";

export const metadata: Metadata = {
  title: "Innovation Hackathon",
  description:
    "Build real solutions to real challenges at the NCS SouthEast Innovation Summit & Awards Hackathon. Challenge areas, eligibility, judging criteria and how to register.",
};

export default function HackathonPage() {
  return (
    <PageShell
      eyebrow="Pillar II · Innovation Hackathon"
      title="Build real solutions to real challenges"
      intro={hackathon.intro}
      image={{ src: "/images/stock-hackathon.jpg" }}
      actions={
        <>
          <a href="#how-to-join" className={buttonStyles.lime}>
            How to join
          </a>
          <Link href="/schedule" className={buttonStyles.outlineLight}>
            See the schedule
          </Link>
        </>
      }
    >
      <Section tone="dark">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About the hackathon"
              title="Where research becomes innovation, and innovation becomes enterprise"
              intro="The Hackathon is one of four pillars of the Summit. It gives young innovators a stage to turn ideas into practical technology solutions that create value for the people, businesses and institutions of the SouthEast."
            />
            <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {hackathon.facts.map((fact) => (
                <div key={fact.label} className="border-l-2 border-accent pl-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <SideImage
            src="/images/summit-experience.jpg"
            alt="A packed hall at the Summit"
          />
        </div>
      </Section>

      <Section tone="green">
        <SectionHeading
          eyebrow="Challenge areas"
          title="Solve problems that matter"
          intro="Choose a real problem affecting one of these groups and build a practical solution for it."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hackathon.challenges.map((challenge, index) => (
            <li
              key={challenge.name}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <p className="text-3xl font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{challenge.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {challenge.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Eligibility" title="Who can take part" />
            <ul className="mt-6 space-y-3">
              {hackathon.eligibility.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <span aria-hidden className="mt-0.5 text-accent">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Judging" title="How entries are judged" />
            <ul className="mt-6 divide-y divide-line rounded-xl border border-line">
              {hackathon.criteria.map((criterion) => (
                <li key={criterion.name} className="px-4 py-3.5">
                  <p className="text-sm font-semibold">{criterion.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {criterion.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="light" id="how-to-join">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="How to join" title="Four steps to the stage" />
            <ol className="mt-8 space-y-6">
              {hackathon.steps.map((step, index) => (
                <li key={step.name} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-deep text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{step.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-8">
            <h3 className="text-xl font-semibold">Ready to build?</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Registration is handled through a Google Form. You will leave
              this site when you continue.
            </p>
            <a
              href={HACKATHON_FORM}
              target="_blank"
              rel="noreferrer noopener"
              className={`${buttonStyles.green} mt-6`}
            >
              Continue to the registration form
            </a>
            <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-muted">
              {hackathon.note}
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
