import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { c } from '@/lib/theme';
import { getAllPosts, getPost } from '@/lib/posts';
import { SITE } from '@/lib/site';
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
  if (!post) return { title: 'Not found' };

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.rawDate,
      authors: [SITE.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.rawDate,
    dateModified: post.rawDate,
    url: `${SITE.url}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    author: { '@type': 'Person', name: SITE.name, url: SITE.url },
  };

  return (
    <Content maxWidth={700}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
