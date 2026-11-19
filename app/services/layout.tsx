import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // A plain-string title here would clear the inherited template for child
  // segments, leaving /services/[slug] pages unbranded.
  title: {
    default: "Services",
    template: "%s | Kenstera",
  },
  description:
    "Intake and scheduling, custom development, and support automation, including voice and text. Built, managed, and improved by Kenstera.",
  openGraph: {
    title: "Services | Kenstera",
    description:
      "Intake and scheduling, custom development, and support automation, including voice and text. Built, managed, and improved by Kenstera.",
    images: [...OG_IMAGE],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
