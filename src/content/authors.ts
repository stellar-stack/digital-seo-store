// Placeholder profiles until the real writers and reviewers are supplied.
// Posts reference these by id through the `author` and `reviewer` frontmatter.
export type Author = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
};

export const AUTHORS: Record<string, Author> = {
  "jane-doe": {
    name: "Jane Doe",
    role: "Copywriting Team Lead",
    image: "/images/authors/placeholder-author.svg",
    bio: "Jane Doe is a placeholder author profile. Replace this text with the writer's real biography, experience, and areas of expertise.",
    linkedin: "https://www.linkedin.com/",
  },
  "john-smith": {
    name: "John Smith",
    role: "Head of SEO",
    image: "/images/authors/placeholder-reviewer.svg",
    bio: "John Smith is a placeholder reviewer profile. Replace this text with the reviewer's real biography, experience, and areas of expertise.",
    linkedin: "https://www.linkedin.com/",
  },
};

export const DEFAULT_AUTHOR = "jane-doe";
export const DEFAULT_REVIEWER = "john-smith";

export function getAuthor(id: string | undefined, fallback: string): Author {
  return AUTHORS[id ?? fallback] ?? AUTHORS[fallback];
}
