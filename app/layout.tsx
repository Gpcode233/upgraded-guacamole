import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
  variable: "--font-baloo",
});

const rotifera = localFont({
  src: "../public/fonts/rotifera-font/RotiferaDEMO-BlackItalic-BF67eb4c233bf52.ttf",
  weight: "900",
  style: "italic",
  display: "swap",
  variable: "--font-rotifera",
});

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
    <html
      lang="en"
      className={`h-full antialiased ${baloo.variable} ${rotifera.variable}`}
    >
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
        <Footer />
      </body>
    </html>
  );
}
