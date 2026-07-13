import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services | Kenstera",
  description:
    "Intake and scheduling, custom development, and support automation. Built, managed, and improved by Kenstera.",
  openGraph: {
    title: "Services | Kenstera",
    description:
      "Intake and scheduling, custom development, and support automation. Built, managed, and improved by Kenstera.",
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
