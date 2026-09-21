import { CtaLink, PageShell } from "./components/page-shell";

export default function NotFound() {
  return (
    <PageShell
      eyebrow="404"
      title="Page not"
      titleAccent="found"
      intro="That page doesn't exist. Try the home page, or use the menu above."
      actions={
        <CtaLink href="/" variant="onPhoto">
          Back to home
        </CtaLink>
      }
    >
      <nav aria-label="Popular pages" className="flex flex-wrap gap-3">
        <CtaLink href="/events" variant="secondary">
          Events
        </CtaLink>
        <CtaLink href="/chapters" variant="secondary">
          Chapters
        </CtaLink>
        <CtaLink href="/news" variant="secondary">
          News
        </CtaLink>
        <CtaLink href="/join" variant="secondary">
          Join NCS
        </CtaLink>
      </nav>
    </PageShell>
  );
}
