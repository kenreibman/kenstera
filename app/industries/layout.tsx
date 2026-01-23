import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | Kenstera",
  description:
    "Kenstera provides AI-powered lead engagement solutions for law firms, healthcare, and real estate businesses.",
  openGraph: {
    title: "Industries | Kenstera",
    description:
      "Kenstera provides AI-powered lead engagement solutions for law firms, healthcare, and real estate businesses.",
  },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
