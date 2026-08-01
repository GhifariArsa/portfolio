"use client";

import type { CSSProperties } from "react";
import { c, focusRing } from "@/lib/theme";
import { CONTACT, EDUCATION, STACK, type ContactRow } from "@/lib/content";
import { GutteredPage } from "@/components/ui";
import { useVimContent, useVimItem } from "@/components/vim";

const heading: CSSProperties = {
  fontSize: 15,
  color: c.text,
  marginBottom: 10,
};

export default function HomePage() {
  useVimContent(CONTACT.length);

  return (
    <GutteredPage maxWidth={720} lineHeight={1.9}>
      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: c.yellow,
          marginBottom: 2,
        }}
      >
        # Ghifari Arsa Ranandya
      </div>
      <div
        style={{
          fontSize: 16,
          color: c.muted,
          fontStyle: "italic",
          marginBottom: 24,
        }}
      >
        &gt; AI Engineer &amp; Researcher | Software Engineer
      </div>

      <div style={{ ...heading, marginBottom: 8 }}>## About</div>
      <p
        style={{
          fontSize: 15,
          color: c.body,
          maxWidth: 600,
          margin: "0 0 24px",
        }}
      >
        I&apos;m an AI engineer and researcher pursuing a Master&apos;s in{" "}
        <span style={{ color: c.green }}>Artificial Intelligence</span> at{" "}
        <span style={{ color: c.green }}>Monash</span> (research pathway), after
        a CS degree at RMIT. I build{" "}
        <span style={{ color: c.green }}>RAG</span> and{" "}
        <span style={{ color: c.green }}>LLM</span> systems, from medical AI
        platforms to self-hosted inference, and I like fast interfaces and
        developer tooling that make everyday work a little less tedious. This
        site is navigable with vim motions:{" "}
        <span style={{ color: c.blue }}>j</span> /{" "}
        <span style={{ color: c.blue }}>k</span> to move,{" "}
        <span style={{ color: c.blue }}>Ctrl-l</span> /{" "}
        <span style={{ color: c.blue }}>Ctrl-h</span> to hop between the tree and
        the editor, <span style={{ color: c.blue }}>Shift-L</span> /{" "}
        <span style={{ color: c.blue }}>Shift-H</span> to switch tabs, and{" "}
        <span style={{ color: c.blue }}>Enter</span> to open.
      </p>

      <div style={heading}>## Education</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {EDUCATION.map((edu) => (
          <div key={edu.school}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 15, color: c.blue, fontWeight: 700 }}>
                {edu.school}
              </span>
              <span
                style={{ fontSize: 12.5, color: c.muted, flexShrink: 0 }}
              >
                {edu.dates}
              </span>
            </div>
            <div style={{ fontSize: 14, color: c.body }}>{edu.degree}</div>
            <div style={{ fontSize: 12.5, color: c.muted }}>{edu.detail}</div>
            {edu.note && (
              <div style={{ fontSize: 12.5, color: c.green, marginTop: 2 }}>
                {edu.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={heading}>## Stack</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}
      >
        {STACK.map((s) => (
          <span
            key={s}
            style={{
              background: c.inset,
              color: c.cyan,
              fontSize: 13,
              padding: "4px 10px",
              borderRadius: 4,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div id="contact" style={heading}>
        ## Contact
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginBottom: 28,
        }}
      >
        {CONTACT.map((row, i) => (
          <ContactLink key={row.label} row={row} index={i} />
        ))}
      </div>

      <div style={heading}>## Resume</div>
      <div style={{ color: c.muted, fontSize: 13, marginBottom: 6 }}>
        // press Enter on the line below to download
      </div>
    </GutteredPage>
  );
}

function ContactLink({ row, index }: { row: ContactRow; index: number }) {
  const { ref, focused } = useVimItem(index);
  return (
    <a
      ref={ref}
      href={row.href}
      download={row.download}
      target={row.external ? "_blank" : undefined}
      rel={row.external ? "noreferrer" : undefined}
      style={{
        display: "block",
        textDecoration: "none",
        color: c.body,
        fontSize: 14.5,
        padding: "2px 6px",
        margin: "0 -6px",
        borderRadius: 3,
        ...focusRing(focused),
      }}
    >
      <span style={{ color: c.green }}>$</span>{" "}
      <span style={{ color: c.muted }}>{row.cmd}</span> {row.label}
    </a>
  );
}
