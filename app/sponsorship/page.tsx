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
    name: "Headline Sponsor",
    description: "The Summit's exclusive principal corporate partner.",
    price: "₦20M",
    tone: "border-brand",
    perks: [
      "Exclusive Headline Partner status",
      "Exclusive co-branding opportunity",
      "Premium branding across all Summit assets",
      "Opening ceremony recognition",
      "Keynote or executive speaking opportunity",
      "Double booth exhibition and showcase space",
      "VIP stakeholder engagement",
      "Awards presentation opportunity",
      "Dedicated media and digital visibility",
      "Inclusion in official press and publicity",
      "Executive networking access",
      "2 executive rooms for 3 nights",
    ],
  },
  {
    name: "Platinum Sponsor",
    description: "Significant visibility and thought leadership.",
    price: "₦10M",
    tone: "border-accent",
    perks: [
      "Platinum Partner status",
      "Prominent event branding",
      "Speaking or panel opportunity",
      "Premium exhibition space",
      "Awards category sponsorship",
      "Media and digital visibility",
      "VIP access",
      "Stakeholder networking",
      "Inclusion in official communications",
      "1 executive room for 3 nights",
    ],
  },
  {
    name: "Gold Partner",
    description: "Engage the technology and innovation ecosystem.",
    price: "₦5M",
    tone: "border-brand-blue",
    perks: [
      "Gold Partner status",
      "Event branding",
      "Exhibition and showcase space",
      "Panel or session participation",
      "Awards association",
      "Digital and social media visibility",
      "VIP invitations",
      "Networking opportunities",
    ],
  },
  {
    name: "Silver Partner",
    description: "Strategic brand presence at the Summit.",
    price: "₦2.5M",
    tone: "border-line",
    perks: [
      "Silver Partner status",
      "Event branding",
      "Logo placement across selected materials",
      "Exhibition or activation opportunity",
      "Digital and social media visibility",
      "Event invitations",
      "Networking access",
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col border-t-4 ${tier.tone}`}
            >
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>
              <p className="mt-4 text-2xl font-semibold text-brand">
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
                Become a {tier.name}
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <h3 className="text-lg font-semibold">Exhibition booths</h3>
          <p className="mt-2 text-sm text-muted">
            Single booth: <span className="font-semibold text-foreground">₦1M</span>
            <span aria-hidden="true"> · </span>
            Double booth: <span className="font-semibold text-foreground">₦1.5M</span>
          </p>
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
