import en from "@/content/answers/en.json";

export type AnswerBlock = string | { list: string[] };
export type AnswerItem = { id: string; question: string; answer: AnswerBlock[] | null };
export type AnswerCategory = { id: string; title: string; items: AnswerItem[] };

// Only English content exists so far; other locales show it until translated
// files (src/content/answers/fr.json, es.json) are added here.
export function getAnswerCategories(_locale: string): AnswerCategory[] {
  return en.categories as AnswerCategory[];
}

// An answer as plain text, for search and structured data.
export function answerText(answer: AnswerBlock[] | null): string {
  return (answer ?? []).flatMap((block) => (typeof block === "string" ? [block] : block.list)).join("\n");
}
