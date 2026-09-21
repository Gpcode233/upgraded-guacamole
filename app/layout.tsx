import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://southeastzone.org.ng"),
  title: {
    default: "Greater SouthEast | Nigeria Computer Society",
    template: "%s | Greater SouthEast NCS",
  },
  description:
    "The SouthEast zone of the Nigeria Computer Society: events, announcements, chapters and membership across Abia, Anambra, Ebonyi, Enugu and Imo.",
  openGraph: {
    title: "Greater SouthEast | Nigeria Computer Society",
    description:
      "Events, announcements and membership for the SouthEast zone of the Nigeria Computer Society.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&display=swap"
          precedence="default"
        />
      </head>
      <body className="min-h-full font-sans flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
