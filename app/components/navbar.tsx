"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CAROUSEL_RESET_EVENT } from "./carousel";
import { Logo } from "./logo";

const links = [
  { href: "/schedule", label: "Schedule" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

const actions: { href: string; label: string; external?: boolean }[] = [
  { href: "/register", label: "Register" },
  { href: "/hackathon", label: "Join Hackathon" },
];

const actionClass =
  "inline-flex items-center justify-center rounded-lg bg-brand-deep px-3.5 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90";

function ActionLink({
  action,
  className,
}: {
  action: { href: string; label: string; external?: boolean };
  className: string;
}) {
  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {action.label}
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const isHome = pathname === "/";

  return (
    <header
      className={`z-50 ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl rounded-b-2xl bg-white text-[#10241a] shadow-lg">
        <nav
          aria-label="Main"
          className="flex h-12 items-center justify-between gap-4 px-4 sm:px-6"
        >
          <Link
            href="/"
            aria-label="Home"
            className="shrink-0"
            onClick={() => {
              if (isHome) window.dispatchEvent(new Event(CAROUSEL_RESET_EVENT));
            }}
          >
            <Logo tone="dark" />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <ul className="hidden items-center gap-6 lg:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`text-[13px] font-medium transition-colors hover:text-brand-deep ${
                      isActive(link.href) ? "text-brand-deep" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="hidden items-center gap-3 lg:flex">
              {actions.map((action) => (
                <li key={action.href}>
                  <ActionLink action={action} className={actionClass} />
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-md lg:hidden"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
              {open ? (
                <path
                  d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </nav>

        {open ? (
          <div
            id="mobile-menu"
            className="border-t border-black/10 px-4 pb-4 pt-2 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2.5 text-sm font-medium ${
                      isActive(link.href) ? "text-brand-deep" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-2 grid gap-2">
              {actions.map((action) => (
                <li key={action.href}>
                  <ActionLink
                    action={action}
                    className={`${actionClass} w-full`}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </header>
  );
}
