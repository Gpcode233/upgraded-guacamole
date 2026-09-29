import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  PageShell,
  Section,
  SectionHeading,
  SideImage,
  buttonStyles,
} from "../components/page-shell";
import { objectives, pillars, summitDetails } from "../lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The NCS SouthEast Innovation Summit & Awards — a high-impact regional platform for technology, research, innovation and economic development.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About the Summit"
      title={summitDetails.event}
      intro="A high-impact regional platform for technology, research, innovation and economic development, designed to strengthen the SouthEast's contribution to Nigeria's and the global digital economy."
      image={{ src: "/images/summit-experience.jpg" }}
    >
      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Background" title="More than a conference" />
            <p className="mt-5 text-base leading-7 text-muted">
              The Summit will bring together government, academia, industry,
              researchers, technology professionals, innovators, entrepreneurs,
              investors and young people to examine how technology and
              Artificial Intelligence can accelerate sustainable development
              across the region. Rather than serving as a conventional
              conference, the Summit is designed around practical outcomes,
              collaboration and long-term impact — connecting research,
              innovation, enterprise and economic development.
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              {[
                ["Date", summitDetails.date],
                ["Venue", summitDetails.venue],
                ["Organizer", summitDetails.organizer],
              ].map(([label, value]) => (
                <div key={label} className="border-l-2 border-accent pl-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-4">
            <SideImage
              src="/images/stock-speaker-stage.jpg"
              alt="A speaker addressing a large audience"
            />
            <Card>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                Theme
              </p>
              <p className="mt-2 text-base font-medium">{summitDetails.theme}</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="green">
        <SectionHeading
          eyebrow="Strategic pillars"
          title="Built around four pillars"
          intro="Unlike a conventional conference, the Summit is driven by practical outcomes, bold ideas and lasting impact."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <Card key={pillar.name}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
                Pillar {pillar.numeral}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{pillar.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {pillar.detail}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_22rem]">
          <div>
            <SectionHeading eyebrow="Objectives" title="The Summit seeks to" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {objectives.map((objective) => (
                <li
                  key={objective}
                  className="rounded-xl border border-line bg-surface px-4 py-5 text-sm leading-6"
                >
                  {objective}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <SideImage
              src="/images/stock-awards.jpg"
              alt="Award trophies on stage"
              className="aspect-[3/4]"
            />
            <div className="flex flex-wrap gap-3">
              <Link href="/register" className={buttonStyles.green}>
                Register for the Summit
              </Link>
              <Link href="/sponsorship" className={buttonStyles.outlineDark}>
                Become a partner
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
