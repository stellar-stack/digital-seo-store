import en from "@/content/answers/en.json";

export type AnswerItem = { id: string; question: string; answer: string | null };
export type AnswerCategory = { id: string; title: string; items: AnswerItem[] };

// Only English content exists so far; other locales show it until translated
// files (src/content/answers/fr.json, es.json) are added here.
export function getAnswerCategories(_locale: string): AnswerCategory[] {
  return en.categories;
}
