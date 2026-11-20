import { BentoGrid, BlockSection, TITLE_CLASS, TitleBlock } from "@/components/exact";
import { Feature } from "@/lib/industry-content";

const defaultFeatures: Feature[] = [
  {
    title: "Agents that deeply understand your business, powered by your knowledge base",
    description:
      "Connect internal documents, FAQs, and URLs in just a few clicks. With built-in Retrieval-Augmented Generation (RAG), agents provide accurate, real-time answers grounded in your own content, automatically reindexed as it changes.",
  },
  {
    title: "Custom voices & tailored personalities",
    description:
      "Create unique voice profiles that match your brand identity. Fine-tune tone, pace, and personality to deliver consistent experiences across every interaction.",
  },
  {
    title: "Tight integration with your stack",
    description:
      "Connect seamlessly with your CRM, helpdesk, calendar, and other tools. Agents can read and write data, trigger workflows, and keep everything in sync.",
  },
];

interface IndustriesCustomizableProps {
  heading?: string;
  features?: Feature[];
}

const PALETTES = ["ember", "moss", "dusk"];

/** Title block, then the card-grid block: three cards, each with a painted panel at the bottom. */
export function IndustriesCustomizable({
  heading = "Fully customizable to your brand and systems",
  features = defaultFeatures,
}: IndustriesCustomizableProps) {
  return (
    <>
      <BlockSection className="px-6 pb-10 pt-20 lg:px-8 lg:pb-10 lg:pt-[120px]">
        <TitleBlock eyebrow="Fully customizable">
          <h2 className={TITLE_CLASS}>{heading}</h2>
        </TitleBlock>
      </BlockSection>
      <BlockSection className="px-6 pb-20 pt-10 lg:px-8 lg:pb-[120px]">
        <BentoGrid
          cards={features.map((f, i) => ({
            title: f.title,
            description: f.description,
            height: 560 as const,
            media: <div className={`grad g-${PALETTES[i % 3]} h-[260px] w-full`} aria-hidden="true" />,
          }))}
        />
      </BlockSection>
    </>
  );
}

export default IndustriesCustomizable;
