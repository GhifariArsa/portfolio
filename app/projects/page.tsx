'use client';

import { useEffect, useState } from 'react';
import { c, FOCUS_TINT, CURSOR_BAR } from '@/lib/theme';
import { PROJECTS, type Project } from '@/lib/content';
import { Content } from '@/components/ui';
import { useVimContent, useVimItem } from '@/components/vim';

// Extract "owner/repo" from a GitHub repo URL, or null for profile/non-GitHub links.
function githubRepo(href: string): string | null {
  const m = href.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)\/?$/);
  return m ? `${m[1]}/${m[2]}` : null;
}

const STARS_TTL = 3600_000; // 1 hour

// Live GitHub star count for a repo. Served by our own cached /api/stars route,
// with a localStorage layer so repeat visits render instantly and skip the
// network when the cached value is still fresh.
function useStars(href: string, enabled: boolean): number | null {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const repo = githubRepo(href);
    if (!repo) return;

    const key = `stars:${repo}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const cached = JSON.parse(raw) as { value: number; ts: number };
        if (typeof cached.value === 'number') setStars(cached.value);
        if (Date.now() - cached.ts < STARS_TTL) return; // still fresh, no fetch
      }
    } catch {}

    let active = true;
    fetch(`/api/stars?repo=${encodeURIComponent(repo)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active && d && typeof d.stars === 'number') {
          setStars(d.stars);
          try {
            localStorage.setItem(key, JSON.stringify({ value: d.stars, ts: Date.now() }));
          } catch {}
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [href, enabled]);
  return stars;
}

export default function ProjectsPage() {
  useVimContent(PROJECTS.length);

  return (
    <Content maxWidth={1000}>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 16 }}>~/projects $ ls -la</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Content>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, focused } = useVimItem(index);
  const stars = useStars(project.href, project.stars === true);
  return (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'block',
        textDecoration: 'none',
        background: focused ? FOCUS_TINT : c.inset,
        padding: 16,
        borderRadius: 4,
        boxShadow: focused ? CURSOR_BAR : 'none',
      }}
    >
      {project.media && (
        <img
          src={project.media}
          alt={project.mediaAlt || `${project.name} preview`}
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            height: 160,
            objectFit: 'cover',
            borderRadius: 4,
            marginBottom: 12,
            background: c.chrome,
            border: `1px solid ${c.borderHard}`,
          }}
        />
      )}
      <div
        style={{
          marginBottom: 8,
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: c.blue }}>▸</span>
        <span style={{ color: c.yellow, fontWeight: 700 }}>{project.name}/</span>
        {stars !== null && (
          <span
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              color: c.muted,
              fontSize: 12.5,
            }}
            title={`${stars} stars on GitHub`}
          >
            <span style={{ color: c.yellow }}>★</span>
            {stars}
          </span>
        )}
      </div>
      <div style={{ fontSize: 13.5, color: c.body, lineHeight: 1.7, marginBottom: 12 }}>
        {project.description}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: c.chrome,
              color: c.cyan,
              fontSize: 11.5,
              padding: '3px 8px',
              borderRadius: 4,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
