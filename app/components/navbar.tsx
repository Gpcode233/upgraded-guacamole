"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  { href: "/about", label: "About" },
  { href: "/chapters", label: "Chapters" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the menu on navigation by adjusting state during render rather than
  // in an effect, which would cost an extra render pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Over the home hero the bar floats on the photo until you scroll; elsewhere
  // it is a solid brand bar that merges into the page hero beneath it.
  const surface = isHome
    ? scrolled || open
      ? "fixed inset-x-0 top-0 bg-brand/95 shadow-lg shadow-black/10 backdrop-blur-md"
      : "fixed inset-x-0 top-0 bg-gradient-to-b from-black/45 to-transparent"
    : "sticky top-0 bg-brand";

  return (
    <header className={`z-50 transition-colors duration-300 ${surface}`}>
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6"
      >
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors ${
                  isActive(link.href)
                    ? "bg-white/15 text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link
            href="/register"
            className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-white/85 transition-colors hover:text-white"
          >
            Register
          </Link>
          <Link
            href="/join"
            className="rounded-full bg-accent px-4 py-2 text-[13px] font-bold text-[#123305] transition-transform hover:scale-[1.03]"
          >
            Join NCS
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
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
          className={`border-t border-white/10 px-4 pb-5 pt-2 sm:px-6 lg:hidden ${
            isHome ? "bg-brand/95 backdrop-blur-md" : "bg-brand"
          }`}
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-[15px] font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/register"
              className="rounded-lg border border-white/25 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Register
            </Link>
            <Link
              href="/join"
              className="rounded-lg bg-accent px-4 py-3 text-center text-sm font-bold text-[#123305]"
            >
              Join NCS
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
