import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  PageShell,
  Section,
  SectionHeading,
  buttonStyles,
} from "../components/page-shell";
import { sponsors } from "../lib/content";

export const metadata: Metadata = {
  title: "Sponsorship",
  description:
    "Partner with the NCS SouthEast Innovation Summit & Awards. The Anambra State Government, through the Solution Innovation District (SID), is already a key strategic partner — join them.",
};

const SPONSOR_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdiJbbJxAYEHM87WydJWW1Bcq8dbcu4zRpJNEYt6ng9__gT9w/viewform";

const tiers = [
  {
    name: "Platinum",
    price: "₦5,000,000",
    tone: "border-brand",
    perks: [
      "Headline logo placement on stage backdrop and all summit materials",
      "10-minute keynote or fireside slot",
      "Premium exhibition booth for the full summit",
      "8 delegate passes",
      "Logo on delegate badges and the summit website",
    ],
  },
  {
    name: "Gold",
    price: "₦2,500,000",
    tone: "border-accent",
    perks: [
      "Logo on stage backdrop and summit website",
      "Exhibition booth",
      "5 delegate passes",
      "Mention in opening and closing remarks",
    ],
  },
  {
    name: "Silver",
    price: "₦1,000,000",
    tone: "border-line",
    perks: [
      "Logo on summit website and printed programme",
      "3 delegate passes",
      "Shared exhibition table",
    ],
  },
];

export default function SponsorshipPage() {
  return (
    <PageShell
      eyebrow="Sponsorship"
      title="Partner with the Summit & Awards"
      intro="The Anambra State Government, through the Solution Innovation District (SID), is supporting the Summit as a key strategic partner. We welcome additional institutional, corporate, technology, academic and development partners to contribute to the Summit's vision."
      image={{ src: "/images/stock-partnership.jpg" }}
    >
      <Section tone="dark">
        <SectionHeading eyebrow="Partners" title="Our sponsors & partners" />
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <li
              key={sponsor.name}
              className="flex aspect-[3/2] items-center justify-center rounded-2xl bg-white p-4"
            >
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className="max-h-full w-auto max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeading eyebrow="Packages" title="Sponsorship tiers" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col border-t-4 ${tier.tone}`}
            >
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-2xl font-semibold text-brand">
                {tier.price}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-muted">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span aria-hidden className="text-brand">
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href={SPONSOR_FORM}
                target="_blank"
                rel="noreferrer noopener"
                className={`${buttonStyles.green} mt-6 w-full`}
              >
                Become a {tier.name} sponsor
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={SPONSOR_FORM}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonStyles.green}
          >
            Talk to us about sponsoring
          </a>
          <Link href="/register" className={buttonStyles.outlineDark}>
            Register for the summit
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
