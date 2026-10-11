import type { ReactNode } from "react";
import { isValidElement } from "react";

export type Heading = { id: string; text: string };

export function slugifyHeading(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Strips inline markdown (bold, italics, code, links) so the TOC label and the
// rendered heading produce the same id.
function stripInline(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

export function getHeadings(content: string): Heading[] {
  return content
    .split("\n")
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const text = stripInline(line.replace(/^##\s+/, ""));
      return { id: slugifyHeading(text), text };
    });
}

export function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}
