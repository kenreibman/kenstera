import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudySidebarMeta {
  industry?: string;
  useTag?: string;
  firmSize?: string;
  location?: string;
}

export interface TocItem {
  id: string;
  text: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  keywords: string[];
  canonical?: string;
  heroImage?: string;
  category: string;
  clientName: string;
  clientTitle: string;
  clientPhoto?: string;
  pullQuote: string;
  stats: CaseStudyStat[];
  videoUrl?: string;
  sidebarMeta: CaseStudySidebarMeta;
  toc: TocItem[];
  content: string;
  readingTime: string;
}

export interface CaseStudyMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  heroImage?: string;
  category: string;
  clientName: string;
  clientTitle: string;
  clientPhoto?: string;
  readingTime: string;
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".mdx"));

  const studies = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(CASE_STUDIES_DIR, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || "",
        updated: data.updated,
        author: data.author || "Kenstera",
        tags: data.tags || [],
        heroImage: data.heroImage,
        category: data.category || "",
        clientName: data.clientName || "",
        clientTitle: data.clientTitle || "",
        clientPhoto: data.clientPhoto,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return studies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  // Prevent path traversal
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return null;
  }

  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(CASE_STUDIES_DIR))) {
    return null;
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Extract H2 headings for table of contents
  const toc: TocItem[] = [];
  const h2Regex = /^## (.+)$/gm;
  let match;
  while ((match = h2Regex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    toc.push({ id, text });
  }

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || "",
    updated: data.updated,
    author: data.author || "Kenstera",
    tags: data.tags || [],
    keywords: data.keywords || [],
    canonical: data.canonical,
    heroImage: data.heroImage,
    category: data.category || "",
    clientName: data.clientName || "",
    clientTitle: data.clientTitle || "",
    clientPhoto: data.clientPhoto,
    pullQuote: data.pullQuote || "",
    stats: data.stats || [],
    videoUrl: data.videoUrl,
    sidebarMeta: {
      industry: data.industry,
      useTag: data.useTag,
      firmSize: data.firmSize,
      location: data.location,
    },
    toc,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
