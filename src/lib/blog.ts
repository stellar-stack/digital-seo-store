import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
};

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((entry) =>
    fs.statSync(path.join(BLOG_DIR, entry)).isDirectory()
  );
}

export function getBlogPost(slug: string, locale: string): BlogPost | null {
  const localePath = path.join(BLOG_DIR, slug, `${locale}.md`);
  const fallbackPath = path.join(BLOG_DIR, slug, "en.md");
  const filePath = fs.existsSync(localePath) ? localePath : fallbackPath;

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    readTime: data.readTime,
    content,
  };
}

export function getAllBlogPosts(locale: string): BlogPost[] {
  return getBlogSlugs()
    .map((slug) => getBlogPost(slug, locale))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
