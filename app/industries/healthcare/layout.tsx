import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Patient Intake for Healthcare | Kenstera",
  description:
    "Streamline patient intake, reduce no-shows, and deliver a modern scheduling experience. Kenstera helps healthcare providers automate patient communication.",
  openGraph: {
    title: "AI Patient Intake for Healthcare | Kenstera",
    description:
      "Streamline patient intake, reduce no-shows, and deliver a modern scheduling experience. Kenstera helps healthcare providers automate patient communication.",
  },
};

export default function HealthcareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
