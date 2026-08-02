'use client';

import Link from 'next/link';
import { c, focusRing } from '@/lib/theme';
import { Content } from '@/components/ui';
import { useVimContent, useVimItem } from '@/components/vim';
import type { PostMeta } from '@/lib/posts';

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  useVimContent(posts.length);

  return (
    <Content maxWidth={760}>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 16 }}>~/blog $ ls -la</div>

      {posts.length === 0 ? (
        <div style={{ color: c.muted, fontSize: 14, lineHeight: 1.9, padding: '8px 6px' }}>
          <div style={{ color: c.yellow, fontSize: 16, marginBottom: 6 }}>More coming soon.</div>
          <div>
            <span style={{ color: c.green }}>#</span> I&apos;m working on the first posts. Check
            back later.
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {posts.map((p, i) => (
            <Row key={p.slug} post={p} index={i} />
          ))}
        </div>
      )}
    </Content>
  );
}

function Row({ post, index }: { post: PostMeta; index: number }) {
  const { ref, focused } = useVimItem(index);
  return (
    <Link
      ref={ref}
      href={`/blog/${post.slug}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        padding: '10px 12px',
        borderRadius: 4,
        ...focusRing(focused),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ color: c.blue }}>▸</span>
        <span style={{ color: c.yellow, fontWeight: 600 }}>{post.slug}.md</span>
        <span style={{ marginLeft: 'auto', color: c.muted, fontSize: 12.5 }}>
          {post.date} · {post.readTime}
        </span>
      </div>
      <div style={{ color: c.text, fontSize: 14, marginTop: 4, paddingLeft: 20 }}>{post.title}</div>
    </Link>
  );
}
