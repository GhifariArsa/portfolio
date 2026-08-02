import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { c } from '@/lib/theme';
import { getAllPosts, getPost } from '@/lib/posts';
import { Content } from '@/components/ui';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? `${post.title} · Ghifari Arsa Ranandya` : 'Not found' };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <Content maxWidth={700}>
      <Link
        href="/blog"
        style={{
          display: 'inline-block',
          color: c.muted,
          fontSize: 13,
          textDecoration: 'none',
          marginBottom: 18,
        }}
      >
        ← cd ../blog
      </Link>

      <div style={{ fontSize: 13, color: c.muted, marginBottom: 6 }}>$ cat blog/{post.slug}.md</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: c.yellow, marginBottom: 6 }}>
        {post.title}
      </div>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 24 }}>
        {post.date} · {post.readTime} read
      </div>

      <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
    </Content>
  );
}
