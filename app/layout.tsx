import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://southeastzone.org.ng"),
  title: {
    default: "NCS SouthEast Innovation Summit & Awards",
    template: "%s | NCS SouthEast Innovation Summit & Awards",
  },
  description:
    "13–14 November 2026, International Conference Centre, Awka. Theme: Technology-Enhanced Development in the Era of Artificial Intelligence: The Pros and the Cons. Connecting research, innovation, enterprise and technology for regional development.",
  openGraph: {
    title: "NCS SouthEast Innovation Summit & Awards",
    description:
      "Connecting Research, Innovation, Enterprise and Technology for Regional Development. 13–14 November 2026, Awka.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
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
        <Footer />
      </body>
    </html>
  );
}
