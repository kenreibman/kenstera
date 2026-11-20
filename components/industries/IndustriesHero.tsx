import { Button } from "@/components/el/ui";
import { BlockSection } from "@/components/exact";

interface IndustriesHeroProps {
  headline?: string;
  description?: string;
}

/** Hero in the exact layout: borderless block, headline and buttons left, paragraph from column 7. */
export function IndustriesHero({
  headline = "The conversational\nagents platform",
  description = "Build and deploy AI-powered voice agents that handle complex conversations with human-like understanding and empathy, transforming customer experiences across industries.",
}: IndustriesHeroProps) {
  const headlineParts = headline.split("\n");

  return (
    <BlockSection bare className="pb-10 pt-16 lg:pb-14 lg:pt-24">
      <div className="grid grid-cols-12 gap-x-3">
        <div className="contents lg:col-span-6 lg:block lg:pr-5">
          <h1 className="el-trim col-span-12 text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
            {headlineParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < headlineParts.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <div className="order-last col-span-12 mt-8 flex flex-wrap gap-2">
            <Button href="/contact">Contact Us</Button>
            <Button href="/contact" variant="secondary">
              Book a call
            </Button>
          </div>
        </div>
        <div className="col-span-12 mt-8 flex flex-col lg:col-span-6 lg:mt-0 lg:pl-5">
          <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
            {description}
          </p>
        </div>
      </div>
    </BlockSection>
  );
}

export default IndustriesHero;
