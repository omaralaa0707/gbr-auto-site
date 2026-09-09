import type { Metadata } from "next";
import { Almarai, Khand, Rakkas, Rethink_Sans } from "next/font/google";
import "./globals.css";

/* Latin display — a heavy geometric face, matched to their own logotype. */
const khand = Khand({
  variable: "--font-khand",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  display: "swap",
});

/* Latin text. */
const rethink = Rethink_Sans({
  variable: "--font-rethink",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/* Arabic display. */
const rakkas = Rakkas({
  variable: "--font-rakkas",
  subsets: ["arabic", "latin"],
  weight: ["400"],
  display: "swap",
});

/* Arabic text. */
const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GBR Auto — New Cairo",
  description:
    "Instagram states 62 posts and opens none of them. A concept page built from the nine images, one caption and one car name that GBR Auto has actually published.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      // Chrome's auto-translate garbles the Arabic quoted verbatim from the
      // dealer's own artwork, so the page opts out of it wholesale.
      translate="no"
      className={`${khand.variable} ${rethink.variable} ${rakkas.variable} ${almarai.variable} h-full antialiased`}
    >
      <head>
        {/* Without scripting there is no observer to fire, so the arrival is
            switched off rather than leaving every block invisible. */}
        <noscript>
          <style>{`
            [data-reg] [data-reg-item],
            [data-reg-item] {
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
              animation: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
