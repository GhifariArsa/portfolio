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

export interface Education {
  school: string;
  detail: string;
  degree: string;
  dates: string;
  note?: string;
}

export const EDUCATION: Education[] = [
  {
    school: 'Monash University',
    detail: 'Melbourne, VIC',
    degree: "Master's in Artificial Intelligence (Research Pathway)",
    dates: 'Expected Jul 2027',
    note: 'GPA 4.0 / 4.0',
  },
  {
    school: 'Stanford University',
    detail: 'Stanford, CA · Visiting Summer Student',
    degree: 'Machine Learning and Symbolic Systems',
    dates: 'Aug 2026',
  },
  {
    school: 'RMIT University',
    detail: 'Melbourne, VIC',
    degree: "Bachelor's of Computer Science",
    dates: 'Dec 2024',
    note: 'Graduated with Distinction',
  },
];

export const STACK = [
  'Python',
  'TypeScript',
  'React',
  'Next.js',
  'FastAPI',
  'PostgreSQL',
  'vLLM',
  'LlamaIndex',
  'Neo4j',
  'Docker',
  'AWS',
];

export interface ContactRow {
  cmd: string;
  label: string;
  href: string;
  download?: boolean;
  external?: boolean;
}

export const CONTACT: ContactRow[] = [
  { cmd: 'open', label: 'github.com/GhifariArsa', href: 'https://github.com/GhifariArsa', external: true },
  { cmd: 'mail', label: 'ghifariarsa1403@gmail.com', href: 'mailto:ghifariarsa1403@gmail.com' },
  { cmd: 'echo', label: 'Melbourne, VIC, Australia', href: '#contact' },
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
    role: 'AI Engineer / Researcher',
    company: 'Cao Lab for Medical AGI/ASI',
    dates: 'Feb 2026 - Present',
    bullets: [
      'Architected and built a modular, API-based Retrieval-Augmented Generation (RAG) service adopted across multiple research and product initiatives within the lab.',
      'Evaluated and benchmarked RAG strategies (retrieval pipelines, chunking, embedding models, reranking, and hybrid search) to optimise factual accuracy, latency, and domain grounding.',
      'Designed an AI-powered learning platform for Monash postgraduate medical students, using knowledge graphs and RAG to accelerate mastery and personalised study.',
    ],
  },
  {
    role: 'AI Engineer / Team Lead',
    company: 'Monash Deep Neuron',
    dates: 'Sep 2025 - Present',
    bullets: [
      'Developing a reinforcement learning agent for autonomous laparoscopic surgery (appendix and gallbladder removal), expanding toward other procedures and robotic systems.',
      'Deploying and serving self-hosted large language models with vLLM for efficient inference and experimentation.',
      'Experimenting with Vision-Language-Action (VLA) and multimodal LLMs for surgical reasoning, perception, and decision-making.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'AssistX Enterprise',
    dates: 'Dec 2024 - Nov 2025',
    bullets: [
      'Led development of AssistX Copilot, a file management system that simplifies RAG workflows for end users: Python backend for file processing and user management, Next.js frontend.',
      'Built a Python queuing API with CuPy and FastAPI for GPU parallel processing, cutting file-processing wait times from 2–3 minutes to near zero.',
      'Delivered a custom AI workflow in 3 weeks for a provincial council, enabling natural-language querying of a large digital archive for non-technical users.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Reyts Fintech',
    dates: 'Jun 2024 - Nov 2024',
    bullets: [
      'Revamped the entire admin dashboard for a P2P currency-exchange platform using Vue.js, focusing on usability and functionality.',
      'Collaborated with the team to keep the codebase high-quality and maintainable; founders praised the improved dashboard.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'PT Kreasi Sentra Solusindo',
    dates: 'Jul 2021 - Dec 2021',
    bullets: [
      'Implemented a fully automated invoicing system for factory operations, eliminating manual invoicing and improving speed and accuracy.',
      'Designed financial reports with Jaspersoft Studio and wrote an algorithm to convert numeric values into Indonesian words for invoicing.',
    ],
  },
];

// ---- Projects ---------------------------------------------------------------

export interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
  /** Optional preview image/gif shown at the top of the project card. */
  media?: string;
  /** Alt text for the preview media. */
  mediaAlt?: string;
  /** Show a live GitHub star count (derived from `href`) on the card. */
  stars?: boolean;
}

export const PROJECTS: Project[] = [
  {
    name: 'clarity',
    description: 'Modular, API-based RAG service with hybrid search, reranking, and inline references, built for medical guidelines. Message-queued document ingestion with document versioning.',
    tags: ['Python', 'pgvector', 'Redis'],
    href: 'https://github.com/GhifariArsa',
    media: '/media/clarity.png',
    mediaAlt: 'clarity RAG answer with cited clinical guideline sources',
  },
  {
    name: 'soap',
    description: 'The Simple Organisation App, a lightweight organisation tool written in Python.',
    tags: ['Python'],
    href: 'https://github.com/ghifariarsa/soap',
    media: '/media/soap-demo.gif',
    mediaAlt: 'soap app demo',
    stars: true,
  },
  {
    name: 'rem',
    description:
      'JacHacks finalist (built in 24h at Founders, Inc., SF). Turns a nursing-home shift handoff into a memory-consolidation event: ingests notes, labs, wearables, and the spoken handoff into a provenance-linked belief graph, emits an SBAR-plus report, and places a live phone call to the on-duty nurse when a deterministic rule fires.',
    tags: ['Jac', 'Jaseci', 'LLM', 'Healthcare'],
    href: 'https://github.com/peytonli/rem',
    media: '/media/rem.png',
    mediaAlt: 'rem provenance-linked belief graph for a resident handoff',
  },
  {
    name: 'bloomed',
    description: 'Adaptive learning tool for medical students that pinpoints where their diagnostic reasoning went wrong and helps them study faster.',
    tags: ['AI', 'EdTech', 'RAG'],
    href: 'https://bloomed.study',
    media: '/media/bloomed.png',
    mediaAlt: 'bloomed knowledge graph of medical topics',
  },
  {
    name: 'assistx-copilot',
    description: 'File management system that simplifies RAG workflows for end users: Python backend, Next.js frontend.',
    tags: ['Python', 'Next.js', 'RAG'],
    href: 'https://github.com/GhifariArsa',
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

export const POSTS: Post[] = [];

export const getPost = (slug: string): Post | undefined =>
  POSTS.find((p) => p.slug === slug);
