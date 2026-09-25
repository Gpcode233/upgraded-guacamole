import type { Metadata } from "next";
import { PageShell } from "../components/page-shell";
import { RegisterForm } from "../components/register-form";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Register for the NCS SouthEast Innovation Summit & Awards, 12–14 November 2026, International Conference Centre, Awka.",
};

export default async function RegisterPage(props: PageProps<"/register">) {
  const { event } = await props.searchParams;
  const defaultEvent = Array.isArray(event) ? event[0] : event;

  return (
    <PageShell
      eyebrow="Registration"
      title="Register for the Summit & Awards"
      intro="12–14 November 2026, International Conference Centre, Awka, Anambra State. Confirmation arrives by email."
    >
      <div className="max-w-3xl">
        <RegisterForm defaultEvent={defaultEvent} />
      </div>
    </PageShell>
  );
}
