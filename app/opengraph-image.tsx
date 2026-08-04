import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Atom One Dark palette (kept inline; next/og can't import the theme module's CSS context).
const bg = '#282c34';
const chrome = '#21252b';
const yellow = '#e5c07b';
const green = '#98c379';
const blue = '#61afef';
const muted = '#5c6370';
const text = '#abb2bf';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: bg,
          fontFamily: 'monospace',
          padding: 64,
        }}
      >
        {/* window chrome */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#e06c75' }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: yellow }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: green }} />
        </div>

        <div style={{ display: 'flex', color: muted, fontSize: 30, marginBottom: 8 }}>
          ~/ghifari $ whoami
        </div>
        <div
          style={{
            display: 'flex',
            color: yellow,
            fontSize: 76,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          # {SITE.name}
        </div>
        <div style={{ display: 'flex', color: muted, fontStyle: 'italic', fontSize: 36, marginBottom: 40 }}>
          &gt; {SITE.jobTitle}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {['RAG', 'LLM', 'Python', 'Next.js', 'vLLM'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                background: chrome,
                color: green,
                fontSize: 30,
                padding: '10px 22px',
                borderRadius: 10,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', marginTop: 'auto', color: text, fontSize: 30 }}>
          <span style={{ color: blue }}>ghifariarsa.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
