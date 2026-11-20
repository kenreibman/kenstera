import { buttonClass } from "@/components/el/ui";
import Link from "next/link";
import { CtaBand } from "@/components/exact";

/** The same closing band as the home page. */
export function PricingCTA() {
  return (
    <CtaBand title="Ready to accelerate your business?">
      <Link href="/contact" className={buttonClass("primary", "md")}>
        Contact Us
      </Link>
    </CtaBand>
  );
}
