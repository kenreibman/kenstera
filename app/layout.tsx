import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { MainNavigation } from "@/components/MainNavigation";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kenstera.com"),
  title: "Kenstera",
  description: "Kenstera is a web design and development agency helping businesses redesign, optimize, and elevate their online presence through modern, high-performing websites.",
    alternates: {
    canonical: "https://kenstera.com",
  },
  openGraph: {
    title: "Kenstera — Web Design Agency",
    description:
      "Kenstera redesigns, optimizes, and develops high-performing websites for modern businesses.",
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
        className={`${figtree.variable} antialiased`}
      >
        <MainNavigation />
        {children}
      </body>
    </html>
  );
}
