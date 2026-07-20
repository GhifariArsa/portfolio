'use client';

import { c, FOCUS_TINT, CURSOR_BAR } from '@/lib/theme';
import { JOBS, type Job } from '@/lib/content';
import { GutteredPage } from '@/components/ui';
import { useVimContent, useVimItem } from '@/components/vim';

export default function ExperiencePage() {
  useVimContent(JOBS.length);

  return (
    <GutteredPage maxWidth={760}>
      <div style={{ fontSize: 13, color: c.muted, marginBottom: 4 }}>// experience.json</div>
      <div style={{ fontSize: 15, color: c.purple, marginBottom: 18 }}>[</div>

      {JOBS.map((job, i) => (
        <JobCard key={job.company} job={job} index={i} />
      ))}

      <div style={{ fontSize: 15, color: c.purple, marginTop: 8 }}>]</div>
    </GutteredPage>
  );
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const { ref, focused } = useVimItem(index);
  return (
    <div
      ref={ref}
      style={{
        background: focused ? FOCUS_TINT : c.inset,
        borderRadius: 4,
        padding: '14px 16px',
        marginBottom: 18,
        boxShadow: focused ? CURSOR_BAR : `inset 0 0 0 1px ${c.borderHard}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 700, color: c.blue }}>{job.role}</span>
        <span style={{ fontSize: 12.5, color: c.muted }}>{job.dates}</span>
      </div>
      <div style={{ fontSize: 14, color: c.yellow, marginBottom: 10 }}>@ {job.company}</div>
      <ul
        style={{
          margin: 0,
          paddingLeft: 20,
          color: c.body,
          fontSize: 14,
          lineHeight: 1.8,
        }}
      >
        {job.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
