import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Trail Menu",
    template: "%s · Trail Menu",
  },
  description:
    "Las Cruces and Organ Mountains trail catalog. Drive time, vehicle access, fees, time on trail, and notes from the Trail Menu deck.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} dark h-full antialiased`}>
      <body className={`${archivo.className} flex min-h-full flex-col bg-black text-white`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="content" className="flex-1">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
