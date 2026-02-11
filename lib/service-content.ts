import { IndustryContent } from "@/lib/industry-content";

// Import all service content
import { defaultContent } from "@/content/services/default";
import { intakeAndSchedulingContent } from "@/content/services/intake-and-scheduling";
import { customDevelopmentContent } from "@/content/services/custom-development";
import { supportAutomationContent } from "@/content/services/support-automation";

// Registry of all service content - add new services here
const serviceRegistry: Record<string, IndustryContent> = {
  default: defaultContent,
  "intake-and-scheduling": intakeAndSchedulingContent,
  "custom-development": customDevelopmentContent,
  "support-automation": supportAutomationContent,
};

// Helper to get service content by slug
export function getServiceContent(slug: string): IndustryContent | null {
  const content = serviceRegistry[slug];
  return content || null;
}

// Get all available service slugs (excludes "default" since /services is the default)
export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceRegistry).filter(slug => slug !== "default");
}
