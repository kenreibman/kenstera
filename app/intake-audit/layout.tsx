import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Intake Leak Audit for PI Auto Accident Firms | Kenstera",
  description:
    "Get a free 15-minute intake leak audit. We'll map where you're losing cases and give you a fix plan you can implement immediately.",
  openGraph: {
    title: "Free Intake Leak Audit for PI Auto Accident Firms",
    description:
      "Get a free 15-minute intake leak audit. We'll map where you're losing cases and give you a fix plan you can implement immediately.",
    type: "website",
  },
};

export default function IntakeAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
