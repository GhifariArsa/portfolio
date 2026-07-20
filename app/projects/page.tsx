'use client';

import { c, FOCUS_TINT, CURSOR_BAR } from '@/lib/theme';
import { PROJECTS, type Project } from '@/lib/content';
import { Content } from '@/components/ui';
import { useVimContent, useVimItem } from '@/components/vim';

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
      <div style={{ marginBottom: 8, fontSize: 15 }}>
        <span style={{ color: c.blue }}>▸</span>{' '}
        <span style={{ color: c.yellow, fontWeight: 700 }}>{project.name}/</span>
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
