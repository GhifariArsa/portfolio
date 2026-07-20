'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { c, focusRing } from '@/lib/theme';
import { POSTS, type Post } from '@/lib/content';
import { Content } from '@/components/ui';
import { useVim, useVimContent, useVimItem } from '@/components/vim';

export default function BlogPage() {
  const { setEditorIndex, setMode } = useVim();
  const [filtering, setFiltering] = useState(false);
  const [filterText, setFilterText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const visiblePosts = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    if (!q) return POSTS;
    return POSTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [filterText]);

  useVimContent(visiblePosts.length);

  // Enter filter/INSERT mode with `/`.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '/') {
        e.preventDefault();
        setFiltering(true);
        setFilterText('');
        setMode('INSERT');
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setMode]);

  const exitFilter = () => {
    inputRef.current?.blur();
    setFiltering(false);
    setMode('NORMAL');
  };

  return (
    <Content maxWidth={760}>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 6 }}>
        ~/blog $ ls -la{' '}
        {filterText && <span style={{ color: c.muted }}>| grep &quot;{filterText}&quot;</span>}
      </div>

      {filtering && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          <span style={{ color: c.green }}>/</span>
          <input
            ref={inputRef}
            type="text"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setEditorIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter') {
                e.preventDefault();
                exitFilter();
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${c.blue}`,
              color: c.text,
              fontFamily: 'inherit',
              fontSize: 14,
              outline: 'none',
              padding: '2px 0',
              width: 280,
            }}
          />
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 16,
              background: c.text,
              animation: 'vim-blink 1s step-end infinite',
            }}
          />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {visiblePosts.map((post, i) => (
          <PostRow key={post.slug} post={post} index={i} />
        ))}
        {visiblePosts.length === 0 && (
          <div style={{ color: c.muted, fontSize: 13.5, padding: '8px 6px' }}>
            -- no matches for &quot;{filterText}&quot; --
          </div>
        )}
      </div>
    </Content>
  );
}

function PostRow({ post, index }: { post: Post; index: number }) {
  const { ref, focused } = useVimItem(index);
  return (
    <Link
      ref={ref}
      href={`/blog/${post.slug}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        padding: '8px 8px',
        margin: '0 -8px',
        borderRadius: 3,
        ...focusRing(focused),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ color: c.muted, fontSize: 12.5, width: 80, flexShrink: 0 }}>{post.date}</span>
        <span style={{ color: c.yellow, fontSize: 15, flex: 1 }}>{post.title}</span>
        <span style={{ color: c.muted, fontSize: 12, flexShrink: 0 }}>{post.readTime}</span>
      </div>
    </Link>
  );
}
