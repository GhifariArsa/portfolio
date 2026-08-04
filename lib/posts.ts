import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Blog posts are authored as markdown files in content/blog/<slug>.md with a
// small YAML frontmatter header:
//
//   ---
//   title: My Post Title
//   date: 2026-08-01
//   ---
//   Markdown body goes here...
//
// The slug is the filename (my-post.md -> /blog/my-post). Read time is derived
// from the word count unless `readTime` is set in frontmatter.

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // formatted for display, e.g. "Aug 1, 2026"
  rawDate: string; // ISO-ish, used only for sorting
  readTime: string;
  description: string; // frontmatter `description`, else derived from the body
}

export interface PostFull extends PostMeta {
  html: string;
}

function formatDate(value: unknown): { display: string; raw: string } {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    const s = String(value ?? '');
    return { display: s, raw: s };
  }
  return {
    display: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
    raw: date.toISOString(),
  };
}

function readTimeFromText(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

// A short plain-text summary for meta descriptions / social cards: the
// frontmatter `description` if present, else the first prose paragraph of the
// body with markdown syntax stripped, trimmed to ~160 chars.
function excerpt(data: Record<string, unknown>, content: string): string {
  if (data.description) return String(data.description);
  const firstPara =
    content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !p.startsWith('#') && !p.startsWith('```')) ?? '';
  const plain = firstPara
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links / images -> text
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 160 ? `${plain.slice(0, 157).trimEnd()}…` : plain;
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
}

function readMeta(file: string): PostMeta {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const { display, raw: rawDate } = formatDate(data.date);
  return {
    slug,
    title: String(data.title ?? slug),
    date: display,
    rawDate,
    readTime: data.readTime ? String(data.readTime) : readTimeFromText(content),
    description: excerpt(data, content),
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return listFiles()
    .map(readMeta)
    .sort((a, b) => (a.rawDate < b.rawDate ? 1 : -1));
}

/** A single rendered post, or null if the slug doesn't exist. */
export function getPost(slug: string): PostFull | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const { display, raw: rawDate } = formatDate(data.date);
  return {
    slug,
    title: String(data.title ?? slug),
    date: display,
    rawDate,
    readTime: data.readTime ? String(data.readTime) : readTimeFromText(content),
    description: excerpt(data, content),
    html: marked.parse(content, { async: false }) as string,
  };
}
