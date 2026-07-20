"use client";

import type { CSSProperties } from "react";
import { c, focusRing } from "@/lib/theme";
import { CONTACT, STACK, type ContactRow } from "@/lib/content";
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
        &gt; Software Engineer | AI Researcher
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
        I&apos;m a software engineer and currently a master&apos;s student at{" "}
        <span style={{ color: c.green }}>Monash</span>, doing research in{" "}
        <span style={{ color: c.green }}>AI</span>. I like building fast
        interfaces, developer tooling, and things that make everyday work a
        little less tedious. This site is navigable with vim motions —{" "}
        <span style={{ color: c.blue }}>j</span> /{" "}
        <span style={{ color: c.blue }}>k</span> to move,{" "}
        <span style={{ color: c.blue }}>Ctrl-l</span> /{" "}
        <span style={{ color: c.blue }}>Ctrl-h</span> to hop between the tree and
        the editor, <span style={{ color: c.blue }}>Shift-L</span> /{" "}
        <span style={{ color: c.blue }}>Shift-H</span> to switch tabs, and{" "}
        <span style={{ color: c.blue }}>Enter</span> to open.
      </p>

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
