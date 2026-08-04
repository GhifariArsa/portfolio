import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Projects by Ghifari Arsa Ranandya — including clarity (a medical RAG service), rem (a JacHacks finalist), bloomed (adaptive medical learning), and more.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects · Ghifari Arsa Ranandya',
    description:
      'A medical RAG service, a JacHacks finalist, an adaptive medical learning tool, and more.',
    url: '/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
