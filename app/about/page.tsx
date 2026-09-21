import type { Metadata } from "next";
import {
  Card,
  CtaLink,
  PageShell,
  SectionHeading,
} from "../components/page-shell";
import { chapters, focusAreas } from "../lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who the Greater SouthEast zone of the Nigeria Computer Society is, and what it works on.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Unlocking the full potential of the"
      titleAccent="SouthEast"
      intro="The Greater SouthEast zone of the Nigeria Computer Society is where professionals connect, chapters coordinate and the region's ICT agenda gets set — across Abia, Anambra, Ebonyi, Enugu and Imo."
      image={{
        src: "/images/elders-forum.jpg",
        alt: "Members of the Greater SouthEast zone at the Elders Forum",
      }}
      facts={[
        { label: "Chapters", value: String(chapters.length) },
        { label: "Membership target", value: "+500 by July 2026" },
        { label: "Elders Forum", value: "Inaugurated" },
      ]}
    >
      <Card>
        <blockquote className="text-lg leading-8 sm:text-xl sm:leading-9">
          &ldquo;The future will not be given to us — we will build it
          together.&rdquo;
        </blockquote>
        <p className="mt-4 text-sm font-medium">
          Chidiebere Ugwuegbulam
          <span className="block text-muted">Zonal Coordinator</span>
        </p>
      </Card>

      <section className="mt-12">
        <SectionHeading>Focus areas</SectionHeading>
        <ul className="mt-5 flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm"
            >
              {area}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionHeading>Partners and collaborators</SectionHeading>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "IEEE Nigeria SouthEast Sub Section",
            "Zinox Computers",
            "OGSL Group",
            "CBTng.Com",
          ].map((partner) => (
            <li
              key={partner}
              className="rounded-2xl border border-line px-4 py-5 text-sm font-medium"
            >
              {partner}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <CtaLink href="/team">Meet the zonal working committee</CtaLink>
        <CtaLink href="/chapters" variant="secondary">
          Browse chapters
        </CtaLink>
      </div>
    </PageShell>
  );
}
