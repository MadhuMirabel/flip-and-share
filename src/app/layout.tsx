import type { Metadata } from "next";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Providers } from "@/components/site/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FlipAndShare | Turn PDFs into interactive digital experiences",
    template: "%s | FlipAndShare",
  },
  description:
    "Turn PDF magazines, catalogs and brochures into interactive, SEO-ready flipbooks with links, video, lead forms, QR codes, shoppable ads and analytics.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
