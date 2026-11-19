import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustriesHero, IndustriesUseCases, IndustriesVoiceAgents, IndustriesMultimodal, IndustriesWorkflows, IndustriesCustomizable, IndustriesIntegrations, IndustriesGettingStarted, IndustriesFaqBlog, IndustriesCta } from "@/components/industries";
import { getIndustryContent, getAllIndustrySlugs } from "@/lib/industry-content";
import { OG_IMAGE, clipDescription } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllIndustrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getIndustryContent(slug);

  if (!content) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${content.name} Solutions`,
    description: clipDescription(content.hero.description),
    openGraph: {
      title: `${content.name} Solutions | Kenstera`,
      description: clipDescription(content.hero.description),
      images: [...OG_IMAGE],
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const content = getIndustryContent(slug);

  if (!content) {
    notFound();
  }


  return (
    <main className="min-h-screen bg-page">
      <JsonLd
        data={breadcrumbSchema([{ name: "Industries", path: "/industries" }, { name: content.name, path: `/industries/${slug}` }])}
      />
      <IndustriesHero
        headline={content.hero.headline}
        description={content.hero.description}
      />
      <IndustriesUseCases useCases={content.useCases} variant={slug === "law" ? "law" : "general"} />
      <IndustriesVoiceAgents
        label={content.voiceAgents.label}
        heading={content.voiceAgents.heading}
        description={content.voiceAgents.description}
      />
      <IndustriesMultimodal
        heading={content.multimodal.heading}
        features={content.multimodal.features}
      />
      <IndustriesWorkflows
        heading={content.workflows.heading}
        features={content.workflows.features}
      />
      <IndustriesCustomizable
        heading={content.customizable.heading}
        features={content.customizable.features}
      />
      <IndustriesIntegrations
        heading={content.integrations.heading}
        description={content.integrations.description}
        additionalText={content.integrations.additionalText}
        items={content.integrations.items}
      />
      <IndustriesGettingStarted
        heading={content.gettingStarted.heading}
        description={content.gettingStarted.description}
      />
      <IndustriesFaqBlog
        faqs={content.faqs}
      />
      <IndustriesCta heading={content.cta.heading} />
    </main>
  );
}
