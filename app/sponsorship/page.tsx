import type { Metadata } from "next";
import Link from "next/link";
import { Card, PageShell } from "../components/page-shell";
import { contact } from "../lib/content";

export const metadata: Metadata = {
  title: "Sponsorship",
  description:
    "Partner with the NCS SouthEast Innovation Summit & Awards. The Anambra State Government, through the Solution Innovation District (SID), is already a key strategic partner — join them.",
};

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
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`border-t-4 ${tier.tone}`}>
            <h2 className="text-lg font-semibold">{tier.name}</h2>
            <p className="mt-1 text-2xl font-semibold text-brand">
              {tier.price}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex gap-2">
                  <span aria-hidden className="text-brand">
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          Partnership opportunities
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Brand visibility and audience engagement",
            "Thought leadership",
            "Technology and innovation showcases",
            "Stakeholder engagement",
            "Media and digital visibility",
            "Support for research, innovation and entrepreneurship program",
            "Association with a high-impact regional technology initiative",
          ].map((reason) => (
            <li
              key={reason}
              className="rounded-xl border border-line px-4 py-5 text-sm"
            >
              {reason}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${contact.email}?subject=Sponsorship enquiry — NCS SouthEast Innovation Summit & Awards`}
          className="rounded-lg bg-brand-deep px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Talk to us about sponsoring
        </a>
        <Link
          href="/register"
          className="rounded-lg border border-line px-5 py-3 text-sm font-medium hover:bg-surface"
        >
          Register for the summit
        </Link>
      </div>
    </PageShell>
  );
}
