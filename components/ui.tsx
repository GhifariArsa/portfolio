"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from 'react';
import { c } from '@/lib/theme';

const GUTTER_TOP_PADDING = 28;
const GUTTER_LINE_HEIGHT = 13 * 1.9;

/** Left line-number gutter shown beside gutter-style pages (Home, Experience). */
export function Gutter({ lines }: { lines: number }) {
  return (
    <div style={{ width: 44, flexShrink: 0, padding: '28px 0 0', textAlign: 'right' }}>
      <div
        style={{
          color: c.gutterLine,
          fontSize: 13,
          lineHeight: 1.9,
          paddingRight: 14,
          height: '100%',
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
  contentRef,
}: {
  children: ReactNode;
  maxWidth?: number;
  lineHeight?: number;
  style?: CSSProperties;
  contentRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div ref={contentRef} style={{ flex: 1, padding: '28px 40px 60px', maxWidth, lineHeight, ...style }}>
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateLines = () => {
      const contentHeight = content.getBoundingClientRect().height;
      const lineSpace = contentHeight - GUTTER_TOP_PADDING;
      setLines(Math.max(0, Math.floor(lineSpace / GUTTER_LINE_HEIGHT)));
    };

    updateLines();
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(updateLines);
    observer.observe(content);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      <Gutter lines={lines} />
      <Content contentRef={contentRef} maxWidth={maxWidth} lineHeight={lineHeight}>
        {children}
      </Content>
    </div>
  );
}
