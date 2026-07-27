import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // A plain-string title here would clear the inherited template for child
  // segments, leaving /industries/[slug] pages unbranded.
  title: {
    default: "Industries | Kenstera",
    template: "%s | Kenstera",
  },
  description:
    "Kenstera provides AI-powered lead engagement solutions for law firms, healthcare, and real estate businesses.",
  openGraph: {
    title: "Industries | Kenstera",
    description:
      "Kenstera provides AI-powered lead engagement solutions for law firms, healthcare, and real estate businesses.",
    images: [...OG_IMAGE],
  },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
