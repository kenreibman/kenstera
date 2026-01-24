// Types for industry page content

export interface UseCase {
  title: string;
  description: string;
  gradient?: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface IndustryContent {
  slug: string;
  name: string;
  hero: {
    headline: string;
    description: string;
  };
  useCases: UseCase[];
  voiceAgents: {
    label: string;
    heading: string;
    description: string;
  };
  multimodal: {
    heading: string;
    features: Feature[];
  };
  workflows: {
    heading: string;
    features: Feature[];
  };
  customizable: {
    heading: string;
    features: Feature[];
  };
  integrations: {
    heading: string;
    description: string;
    additionalText: string;
    items: string[];
  };
  gettingStarted: {
    heading: string;
    description: string;
  };
  faqs: FAQ[];
  cta: {
    heading: string;
  };
}

// Import all industry content
import { defaultContent } from "@/content/industries/default";
import { healthcareContent } from "@/content/industries/healthcare";
import { lawContent } from "@/content/industries/law";
import { realEstateContent } from "@/content/industries/real-estate";

// Registry of all industry content - add new industries here
const industryRegistry: Record<string, IndustryContent> = {
  default: defaultContent,
  healthcare: healthcareContent,
  law: lawContent,
  "real-estate": realEstateContent,
  // Add more industries here:
  // finance: financeContent,
};

// Helper to get industry content by slug
export function getIndustryContent(slug: string): IndustryContent | null {
  const content = industryRegistry[slug];
  return content || null;
}

// Get all available industry slugs (excludes "default" since /industries is the default)
export function getAllIndustrySlugs(): string[] {
  return Object.keys(industryRegistry).filter(slug => slug !== "default");
}
