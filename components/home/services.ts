import type { Palette } from "@/components/el/ui";

// Home-page service list, shared by the hero showcase and the services bento.
export type MockKind = "website" | "textback" | "review" | "campaign" | "local";

export interface HomeService {
  title: string;
  short: string;
  description: string;
  palette: Palette;
  mock: MockKind;
}

export const HOME_SERVICES: HomeService[] = [
  {
    title: "Custom Websites",
    short: "Websites",
    description: "Conversion-optimized, high-performance websites.",
    palette: "dawn",
    mock: "website",
  },
  {
    title: "Missed Call Text Back",
    short: "Text back",
    description: "24/7 intake that instantly texts back missed calls, so no lead is ever lost.",
    palette: "dusk",
    mock: "textback",
  },
  {
    title: "Review Funnel",
    short: "Reviews",
    description: "Automatic review funnels that acquire genuine social proof for your business.",
    palette: "ember",
    mock: "review",
  },
  {
    title: "Marketing Campaigns",
    short: "Campaigns",
    description: "Targeted paid and email campaigns that drive qualified demand.",
    palette: "iris",
    mock: "campaign",
  },
  {
    title: "Local SEO",
    short: "Local SEO",
    description: "Organic lead acquisition through local search visibility.",
    palette: "moss",
    mock: "local",
  },
];
