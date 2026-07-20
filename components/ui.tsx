import type { CSSProperties, ReactNode } from 'react';
import { c } from '@/lib/theme';

/** Left line-number gutter shown beside gutter-style pages (Home, Experience). */
export function Gutter({ lines = 40 }: { lines?: number }) {
  return (
    <div style={{ width: 44, flexShrink: 0, padding: '28px 0 0', textAlign: 'right' }}>
      <div
        style={{
          color: c.gutterLine,
          fontSize: 13,
          lineHeight: 1.9,
          paddingRight: 14,
          borderRight: `1px solid ${c.borderSoft}`,
        }}
      >
        {Array.from({ length: lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
    </div>
  );
}

/** Content column with the standard 28/40/60 padding + a max width. */
export function Content({
  children,
  maxWidth = 760,
  lineHeight,
  style,
}: {
  children: ReactNode;
  maxWidth?: number;
  lineHeight?: number;
  style?: CSSProperties;
}) {
  return (
    <div style={{ flex: 1, padding: '28px 40px 60px', maxWidth, lineHeight, ...style }}>
      {children}
    </div>
  );
}

/** Row wrapping gutter + content for the two "code file" pages. */
export function GutteredPage({
  children,
  maxWidth,
  lineHeight,
}: {
  children: ReactNode;
  maxWidth?: number;
  lineHeight?: number;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      <Gutter />
      <Content maxWidth={maxWidth} lineHeight={lineHeight}>
        {children}
      </Content>
    </div>
  );
}
