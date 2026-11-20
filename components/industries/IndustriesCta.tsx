import { Button } from "@/components/el/ui";
import { CtaBand } from "@/components/exact";

interface IndustriesCtaProps {
  heading?: string;
}

/** Closing band, the same one the home page uses. */
export function IndustriesCta({ heading = "The most realistic voice AI platform" }: IndustriesCtaProps) {
  return (
    <CtaBand title={heading}>
      <Button href="/contact">Contact Us</Button>
    </CtaBand>
  );
}

export default IndustriesCta;
