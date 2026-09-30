import type { Metadata } from "next";
import Link from "next/link";
import {
  PageShell,
  Section,
  SectionHeading,
  SideImage,
  buttonStyles,
} from "../components/page-shell";
import { contact } from "../lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the NCS SouthEast zonal secretariat about the Innovation Summit & Awards.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in touch"
      intro="Questions about the Summit, registration, speaking or partnership? Reach the zonal secretariat."
      image={{ src: "/images/summit-speakers.jpg" }}
    >
      <Section tone="dark">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Zonal secretariat" title="How to reach us" />
            <dl className="mt-8 space-y-6 text-sm">
              <div className="border-l-2 border-accent pl-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    className="text-base font-medium text-accent hover:underline"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  Phone
                </dt>
                <dd className="mt-1 flex flex-col">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      className="text-base font-medium hover:text-accent"
                      href={`tel:${phone.replace(/\s/g, "")}`}
                    >
                      {phone}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  Address
                </dt>
                <dd className="mt-1 text-base font-medium">{contact.address}</dd>
              </div>
            </dl>
          </div>
          <SideImage
            src="/images/stock-speaker-stage.jpg"
            alt="A speaker addressing an audience on stage"
          />
        </div>
      </Section>

      <Section tone="light">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SideImage
            src="/images/stock-partnership.jpg"
            alt="Partners in a meeting"
            className="order-last lg:order-first"
          />
          <div>
            <SectionHeading
              eyebrow="Get involved"
              title="Be part of the Summit"
              intro="Register to attend, join the Hackathon or partner with us to support technology and innovation in the SouthEast."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className={buttonStyles.green}>
                Register
              </Link>
              <Link href="/hackathon" className={buttonStyles.outlineDark}>
                Join the Hackathon
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
