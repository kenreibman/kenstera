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
  title: "Kenstera",
  description: "Kenstera accelerates your businesses with automated marketing, lead generation, customer support, and more.",
    alternates: {
    canonical: "https://kenstera.com",
  },
  openGraph: {
    title: "Kenstera — Digital Agency",
    description:
      "Kenstera accelerates your businesses with automated marketing, lead generation, customer support, and more.",
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
