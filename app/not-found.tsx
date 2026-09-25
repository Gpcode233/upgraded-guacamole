import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted">
        That page doesn&apos;t exist. Try the home page, or use the menu above.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-lg bg-brand-deep px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
