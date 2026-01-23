import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Lead Engagement for Law Firms | Kenstera",
  description:
    "Capture every lead, respond instantly, and never miss a potential client. Kenstera helps law firms automate intake and book more consultations.",
  openGraph: {
    title: "AI Lead Engagement for Law Firms | Kenstera",
    description:
      "Capture every lead, respond instantly, and never miss a potential client. Kenstera helps law firms automate intake and book more consultations.",
  },
};

export default function LawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
