import { notFound } from "next/navigation";
import { IndustriesHero, IndustriesUseCases, IndustriesVoiceAgents, IndustriesMultimodal, IndustriesWorkflows, IndustriesCustomizable, IndustriesIntegrations, IndustriesGettingStarted, IndustriesFaqBlog, IndustriesCta } from "@/components/industries";
import { getAllPosts } from "@/lib/blog";
import { getIndustryContent, getAllIndustrySlugs } from "@/lib/industry-content";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllIndustrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const content = getIndustryContent(slug);

  if (!content) {
    notFound();
  }

  const posts = getAllPosts();
  const blogPosts = posts.map(post => ({ slug: post.slug, title: post.title }));

  return (
    <main className="min-h-screen bg-white">
      <IndustriesHero
        headline={content.hero.headline}
        description={content.hero.description}
      />
      <IndustriesUseCases useCases={content.useCases} />
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
        blogPosts={blogPosts}
      />
      <IndustriesCta heading={content.cta.heading} />
    </main>
  );
}
