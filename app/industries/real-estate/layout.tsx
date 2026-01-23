import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Lead Engagement for Real Estate | Kenstera",
  description:
    "Never miss a buyer or seller inquiry. Kenstera helps real estate agents respond instantly, qualify leads, and book more showings automatically.",
  openGraph: {
    title: "AI Lead Engagement for Real Estate | Kenstera",
    description:
      "Never miss a buyer or seller inquiry. Kenstera helps real estate agents respond instantly, qualify leads, and book more showings automatically.",
  },
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
