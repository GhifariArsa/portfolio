import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Writing by Ghifari Arsa Ranandya on AI engineering, developer tooling, and building fast interfaces.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog · Ghifari Arsa Ranandya',
    description:
      'Writing on AI engineering, developer tooling, and building fast interfaces.',
    url: '/blog',
  },
};

export default function BlogPage() {
  return <BlogList posts={getAllPosts()} />;
}
