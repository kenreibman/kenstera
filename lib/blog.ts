import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
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
  content: string;
  readingTime: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  heroImage?: string;
  readingTime: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, filename);
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
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => {
      // Missing dates parse to NaN, which poisons the comparator — pin them to 0
      // so they sort last deterministically instead of scrambling the order.
      const ta = new Date(a.date).getTime() || 0;
      const tb = new Date(b.date).getTime() || 0;
      return tb - ta;
    });

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Prevent path traversal
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    return null;
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(BLOG_DIR))) {
    return null;
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

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
    keywords: data.keywords || [],
    canonical: data.canonical,
    heroImage: data.heroImage,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  // Date-only frontmatter parses as UTC midnight; without an explicit UTC
  // timezone the formatted text renders one day early on hosts west of UTC.
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
