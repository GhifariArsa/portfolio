import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Work experience of Ghifari Arsa Ranandya — AI engineering and research roles spanning RAG services, self-hosted LLM inference, reinforcement learning for surgery, and full-stack development.',
  alternates: { canonical: '/experience' },
  openGraph: {
    title: 'Experience · Ghifari Arsa Ranandya',
    description:
      'AI engineering and research roles spanning RAG services, self-hosted LLM inference, reinforcement learning for surgery, and full-stack development.',
    url: '/experience',
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
