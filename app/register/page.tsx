import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { RegisterForm } from "../components/register-form";

export const metadata: Metadata = {
  title: "Event registration",
  description:
    "Register for Greater SouthEast NCS assemblies, conferences and summits.",
};

export default async function RegisterPage(props: PageProps<"/register">) {
  const { event } = await props.searchParams;
  const defaultEvent = Array.isArray(event) ? event[0] : event;

  return (
    <PageShell
      eyebrow="Registration"
      title="Register for an"
      titleAccent="event"
      intro="One form for every zonal and national date. Confirmation arrives by email."
      image={{
        src: "/images/icc-awka-venue.jpg",
        alt: "The International Conference Centre, Awka",
      }}
    >
      <div className="max-w-3xl">
        <RegisterForm defaultEvent={defaultEvent} />
      </div>
    </PageShell>
  );
}
