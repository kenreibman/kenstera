import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a 15-minute call with Kenstera. Tell us where your business leaks and we'll tell you honestly whether we can fix it.",
};

export default function ContactSalesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
