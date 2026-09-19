import type { Metadata } from "next";
import { Card, PageShell } from "../components/page-shell";
import { contact, chapters } from "../lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the Greater SouthEast zonal secretariat or a chapter.",
};

export default function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="Get in touch">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold">Zonal secretariat</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-muted">Email</dt>
              <dd>
                <a className="font-medium text-brand" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="flex flex-col">
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    className="font-medium hover:text-brand"
                    href={`tel:${phone.replace(/\s/g, "")}`}
                  >
                    {phone}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Address</dt>
              <dd>{contact.address}</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h2 className="font-semibold">By chapter</h2>
          <ul className="mt-4 divide-y divide-line">
            {chapters.map((chapter) => (
              <li key={chapter.slug} className="flex justify-between gap-4 py-2.5 text-sm">
                <span>{chapter.name}</span>
                <span className="text-muted">{chapter.base}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PageShell>
  );
}
