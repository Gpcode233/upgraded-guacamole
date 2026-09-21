import type { Metadata } from "next";
import { Card, CtaLink, PageShell, SectionHeading } from "../components/page-shell";
import { contact } from "../lib/content";

export const metadata: Metadata = {
  title: "Join NCS",
  description:
    "Join the Nigeria Computer Society through the Greater SouthEast zone.",
};

const grades = [
  {
    name: "Student membership",
    detail: "For undergraduates and polytechnic/college students in ICT-related programmes.",
  },
  {
    name: "Professional membership",
    detail: "For practising ICT professionals across the five chapters.",
  },
  {
    name: "Corporate membership",
    detail: "For organisations supporting the zone's programmes and events.",
  },
];

export default function JoinPage() {
  return (
    <PageShell
      eyebrow="Membership"
      title="Join the Nigeria Computer"
      titleAccent="Society"
      intro="500 new members is the target for the zone by July 2026, across Abia, Anambra, Ebonyi, Enugu and Imo."
      image={{
        src: "/images/membership-drive.jpg",
        alt: "Members at a Greater SouthEast zone membership drive",
      }}
      actions={
        <CtaLink href={`mailto:${contact.email}`} variant="onPhoto">
          Talk to the secretariat
        </CtaLink>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {grades.map((grade) => (
          <Card key={grade.name}>
            <h2 className="font-semibold">{grade.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{grade.detail}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <SectionHeading>How to sign up</SectionHeading>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>Complete the national NCS membership application.</li>
          <li>Select the Greater SouthEast zone and your state chapter.</li>
          <li>Pay the applicable membership dues.</li>
          <li>Your chapter secretary confirms and welcomes you.</li>
        </ol>
        <p className="mt-5 text-sm">
          Questions before signing up? Reach the zonal secretariat at{" "}
          <a className="font-medium text-brand" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      </Card>
    </PageShell>
  );
}
