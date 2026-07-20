import { c } from './theme';

// ---- Editor chrome config ---------------------------------------------------

export interface SidebarItem {
  glyph: string;
  label: string;
  href: string;
  color: string;
  download?: boolean;
  external?: boolean;
}

// The sidebar nav. Its length is the offset at which page content items begin
// in the global vim focus list.
export const SIDEBAR: SidebarItem[] = [
  { glyph: '≡', label: 'about.md', href: '/', color: c.yellow },
  { glyph: '{}', label: 'experience.json', href: '/experience', color: c.green },
  { glyph: '▸', label: 'projects/', href: '/projects', color: c.blue },
  { glyph: '▸', label: 'blog/', href: '/blog', color: c.blue },
  { glyph: '$', label: 'contact.sh', href: '/#contact', color: c.red },
  {
    glyph: '⇩',
    label: 'Ghifari-CV.pdf',
    href: '/Ghifari-Arsa-Ranandya-CV.pdf',
    color: c.purple,
    download: true,
  },
];

export const SIDEBAR_LEN = SIDEBAR.length;

export interface Tab {
  label: string;
  href: string;
}

export const TABS: Tab[] = [
  { label: 'about.md', href: '/' },
  { label: 'experience.json', href: '/experience' },
  { label: 'projects/', href: '/projects' },
  { label: 'blog/', href: '/blog' },
];

// ---- Home -------------------------------------------------------------------

export const STACK = [
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Git',
];

export interface ContactRow {
  cmd: string;
  label: string;
  href: string;
  download?: boolean;
  external?: boolean;
}

export const CONTACT: ContactRow[] = [
  { cmd: 'open', label: 'github.com/ghifariarsa', href: 'https://github.com/ghifariarsa', external: true },
  { cmd: 'open', label: 'linkedin.com/in/ghifariarsa', href: 'https://linkedin.com/in/ghifariarsa', external: true },
  { cmd: 'mail', label: 'ghifari@ghifari.dev', href: 'mailto:ghifari@ghifari.dev' },
  { cmd: 'wget', label: 'Ghifari-Arsa-Ranandya-CV.pdf', href: '/Ghifari-Arsa-Ranandya-CV.pdf', download: true },
];

// ---- Experience -------------------------------------------------------------

export interface Job {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

export const JOBS: Job[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Placeholder Labs',
    dates: '2023 — Present',
    bullets: [
      'Led rewrite of the core dashboard, cutting load time by 40%.',
      'Mentored two junior engineers through their first on-call rotations.',
      'Shipped an internal CLI that the whole team now depends on daily.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Example Systems',
    dates: '2021 — 2023',
    bullets: [
      'Built and maintained a payments service handling 10k+ req/min.',
      'Introduced end-to-end tests, reducing regressions by half.',
      'Partnered with design to ship a fully accessible component library.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Sample Co',
    dates: 'Summer 2020',
    bullets: [
      'Prototyped a data pipeline later adopted into production.',
      'Presented findings to the eng org at the summer demo day.',
    ],
  },
];

// ---- Projects ---------------------------------------------------------------

export interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'lazyfetch',
    description: 'A tiny data-fetching layer with built-in caching and retries for React apps.',
    tags: ['TypeScript', 'React'],
    href: 'https://github.com/ghifariarsa',
  },
  {
    name: 'termfolio',
    description: 'This very site — a vim-navigable portfolio shell inspired by code editors.',
    tags: ['React', 'UX'],
    href: 'https://github.com/ghifariarsa',
  },
  {
    name: 'queue-lite',
    description: 'Minimal job queue for Node with Redis, built for side projects that outgrew cron.',
    tags: ['Node.js', 'Redis'],
    href: 'https://github.com/ghifariarsa',
  },
  {
    name: 'pg-snapshot',
    description: 'CLI that snapshots and restores Postgres schemas during local development.',
    tags: ['Python', 'Postgres'],
    href: 'https://github.com/ghifariarsa',
  },
];

// ---- Blog -------------------------------------------------------------------

export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  paragraphs: string[];
}

export const POSTS: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello, world (again)',
    date: '2026-06-02',
    readTime: '3 min',
    paragraphs: [
      'Every developer has rewritten their personal site a dozen times. This is my latest attempt, and honestly, probably not the last.',
      "This time the theme is simple: make it feel like the place I already spend most of my day — a terminal and a code editor. So that's what you're looking at.",
      'More posts coming whenever I have something worth writing down. No promises on a schedule.',
    ],
  },
  {
    slug: 'vim-motions-everywhere',
    title: 'Why I put vim motions on my portfolio',
    date: '2026-05-14',
    readTime: '5 min',
    paragraphs: [
      'I spend so much time in modal editing that reaching for a mouse on my own website felt wrong.',
      "So j/k moves the cursor, Enter opens whatever's highlighted, gg and G jump to the top and bottom, and / filters the blog list. It's a small thing, but it's mine.",
      "If you've never used vim, arrow keys and clicking still work fine everywhere.",
    ],
  },
  {
    slug: 'debugging-at-2am',
    title: 'Notes from debugging at 2am',
    date: '2026-04-27',
    readTime: '4 min',
    paragraphs: [
      'The bug only reproduced in production, only under load, and only on Tuesdays. Or so it felt at the time.',
      'The actual fix was three lines. The four hours before it were mostly me staring at logs and questioning my life choices.',
      'Lesson, as always: add better logging before you need it, not after.',
    ],
  },
  {
    slug: 'small-tools-big-wins',
    title: 'Small tools, big wins',
    date: '2026-03-19',
    readTime: '6 min',
    paragraphs: [
      "The highest-leverage thing I built last year wasn't a feature — it was a fifty-line script that saved everyone on the team ten minutes a day.",
      "Nobody puts 'wrote a small CLI' on their highlight reel, but the team notices.",
    ],
  },
  {
    slug: 'on-taking-breaks',
    title: 'On taking breaks from side projects',
    date: '2026-02-08',
    readTime: '2 min',
    paragraphs: [
      "Side projects don't have deadlines. That's the whole point of them, and also the reason they're easy to abandon.",
      "I've made peace with letting things sit for months and picking them back up later. The code is always still there.",
    ],
  },
];

export const getPost = (slug: string): Post =>
  POSTS.find((p) => p.slug === slug) ?? POSTS[0];
