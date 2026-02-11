import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Kenstera",
  description:
    "Intake and scheduling, custom development, and support automation. Built, managed, and improved by Kenstera.",
  openGraph: {
    title: "Services | Kenstera",
    description:
      "Intake and scheduling, custom development, and support automation. Built, managed, and improved by Kenstera.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
