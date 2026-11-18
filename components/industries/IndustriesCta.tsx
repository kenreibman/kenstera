import { Button, Container } from "@/components/el/ui";

interface IndustriesCtaProps {
  heading?: string;
}

export function IndustriesCta({ heading = "The most realistic voice AI platform" }: IndustriesCtaProps) {
  return (
    <section className="border-t border-hairline">
      <Container framed>
        <div className="py-20 sm:py-28">
          <div className="grad g-dusk flex min-h-[340px] flex-col justify-end rounded-2xl p-8 sm:p-12">
            <h2 className="max-w-2xl text-[32px] leading-[1.15] text-white sm:text-[44px]">{heading}</h2>
            <div className="mt-8">
              <Button href="/contact" variant="light">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default IndustriesCta;
