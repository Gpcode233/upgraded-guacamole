"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  { href: "/about", label: "About" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/contact", label: "Contact" },
  { href: "/register", label: "Register" },
  { href: "/join", label: "Join NCS" },
];

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
      className={`z-50 bg-transparent ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0 bg-brand"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-[13px] font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white ${
                  isActive(link.href) ? "text-white" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="grid h-9 w-9 place-items-center rounded-md text-white lg:hidden"
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
          className={`border-t border-white/15 px-4 py-2 lg:hidden ${
            isHome ? "bg-black/70 backdrop-blur-sm" : "bg-brand"
          }`}
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2.5 text-sm font-semibold uppercase tracking-wide text-white/85 ${
                    isActive(link.href) ? "text-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
