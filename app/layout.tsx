import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNavigation } from "@/components/MainNavigation";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kenstera.com"),
  title: "Kenstera - Web Design Agency that Drives Leads",
  description: "Kenstera is a digital design and development agency that helps businesses with lead generation, audience engagement, and building a strong online presence.",
    alternates: {
    canonical: "https://kenstera.com",
  },
  openGraph: {
    title: "Kenstera — Web Design Agency",
    description:
      "Kenstera is a digital design and development agency that helps businesses with lead generation, audience engagement, and building a strong online presence.",
    url: "https://kenstera.com",
    siteName: "Kenstera",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <MainNavigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
