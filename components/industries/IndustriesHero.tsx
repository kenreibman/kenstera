import { Button, Container } from "@/components/el/ui";

interface IndustriesHeroProps {
  headline?: string;
  description?: string;
}

export function IndustriesHero({
  headline = "The conversational\nagents platform",
  description = "Build and deploy AI-powered voice agents that handle complex conversations with human-like understanding and empathy, transforming customer experiences across industries.",
}: IndustriesHeroProps) {
  const headlineParts = headline.split("\n");

  return (
    <section className="pb-12 pt-14 sm:pt-20">
      <Container framed>
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-12">
          <h1 className="text-[44px] leading-[1.05] text-black sm:text-[56px] lg:text-[60px]">
            {headlineParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < headlineParts.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <div className="md:pb-2">
            <p className="max-w-[440px] text-[16px] leading-[1.5] text-black/80">{description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button href="/contact">Contact Us</Button>
              <Button href="/contact" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default IndustriesHero;
