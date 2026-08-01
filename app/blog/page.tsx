'use client';

import { c } from '@/lib/theme';
import { Content } from '@/components/ui';
import { useVimContent } from '@/components/vim';

export default function BlogPage() {
  useVimContent(0);

  return (
    <Content maxWidth={760}>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 16 }}>
        ~/blog $ ls -la
      </div>
      <div
        style={{
          color: c.muted,
          fontSize: 14,
          lineHeight: 1.9,
          padding: '8px 6px',
        }}
      >
        <div style={{ color: c.yellow, fontSize: 16, marginBottom: 6 }}>
          More coming soon.
        </div>
        <div>
          <span style={{ color: c.green }}>#</span> I&apos;m working on the first
          posts — check back later.
        </div>
      </div>
    </Content>
  );
}
