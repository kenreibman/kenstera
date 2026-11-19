import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // A plain-string title here would clear the inherited template for child
  // segments, leaving /industries/[slug] pages unbranded.
  title: {
    default: "Industries",
    template: "%s | Kenstera",
  },
  description:
    "Voice and text lead engagement for law firms, healthcare, real estate, and home services. Answer every lead and never miss a customer.",
  openGraph: {
    title: "Industries | Kenstera",
    description:
      "Voice and text lead engagement for law firms, healthcare, real estate, and home services. Answer every lead and never miss a customer.",
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
