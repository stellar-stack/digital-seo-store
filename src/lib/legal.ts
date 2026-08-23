import fs from "fs";
import path from "path";
import matter from "gray-matter";

const LEGAL_DIR = path.join(process.cwd(), "src/content/legal");

export function getLegalDoc(doc: string, locale: string) {
  const localePath = path.join(LEGAL_DIR, doc, `${locale}.md`);
  const fallbackPath = path.join(LEGAL_DIR, doc, "en.md");
  const filePath = fs.existsSync(localePath) ? localePath : fallbackPath;

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    title: data.title as string,
    updated: data.updated as string,
    content,
  };
}
