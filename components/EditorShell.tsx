'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { c } from '@/lib/theme';
import { SIDEBAR, SIDEBAR_LEN, TABS } from '@/lib/content';
import { VimContext, type Mode, type Pane } from './vim';

function fmtClock(): string {
  const d = new Date();
  return (
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
    ' · ' +
    d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  );
}

// Which sidebar item is highlighted by default when a route loads.
function defaultFocusForPath(pathname: string): number {
  if (pathname === '/experience') return 1;
  if (pathname === '/projects') return 2;
  if (pathname.startsWith('/blog')) return 3;
  return 0;
}

// Which tab is active for the current route (blog posts map to the blog tab).
function tabIndexForPath(pathname: string): number {
  const i = TABS.findIndex((t) => t.href === pathname);
  if (i >= 0) return i;
  if (pathname.startsWith('/blog')) return TABS.findIndex((t) => t.href === '/blog');
  return 0;
}

function statusFile(pathname: string): string {
  if (pathname === '/experience') return 'experience.json';
  if (pathname === '/projects') return 'projects/';
  if (pathname === '/blog') return 'blog/';
  if (pathname.startsWith('/blog/')) return pathname.slice('/blog/'.length) + '.md';
  return 'about.md';
}

export default function EditorShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '/';
  const router = useRouter();

  const [pane, setPane] = useState<Pane>('tree');
  const [treeIndex, setTreeIndex] = useState(0);
  const [editorIndex, setEditorIndex] = useState(0);
  const [contentCount, setContentCount] = useState(0);
  const [mode, setMode] = useState<Mode>('NORMAL');
  const [clockText, setClockText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const sidebarRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<Record<number, HTMLElement | null>>({});
  const lastG = useRef(0);

  const registerContentRef = useCallback((i: number, el: HTMLElement | null) => {
    contentRefs.current[i] = el;
  }, []);

  // Reset cursors + pane + mode whenever the route changes.
  useEffect(() => {
    setPane('tree');
    setTreeIndex(defaultFocusForPath(pathname));
    setEditorIndex(0);
    setMode('NORMAL');
    setNavOpen(false); // close the mobile drawer after navigating
    contentRefs.current = {};
  }, [pathname]);

  // Track the mobile breakpoint so the sidebar can become a slide-in drawer.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Live clock (refresh every 15s), rendered client-side to avoid hydration drift.
  useEffect(() => {
    setClockText(fmtClock());
    const t = setInterval(() => setClockText(fmtClock()), 15000);
    return () => clearInterval(t);
  }, []);

  // Global vim keydown handler.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Shift+L / Shift+H switch buffers (tabs). Works even while typing.
      if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey && (e.key === 'L' || e.key === 'H')) {
        e.preventDefault();
        const len = TABS.length;
        const cur = tabIndexForPath(pathname);
        const next = e.key === 'L' ? (cur + 1) % len : (cur - 1 + len) % len;
        router.push(TABS[next].href);
        return;
      }

      // Ctrl+L moves the cursor from the tree into the editor; Ctrl+H back.
      if (e.ctrlKey && !e.altKey && !e.metaKey && (e.key === 'l' || e.key === 'h')) {
        e.preventDefault();
        if (e.key === 'l') {
          if (contentCount > 0) setPane('editor');
        } else {
          setPane('tree');
        }
        return;
      }

      const tag = (e.target as HTMLElement | null)?.tagName;
      // Let inputs (e.g. blog filter) handle their own keys.
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      // Move the cursor of the active pane.
      const max = (pane === 'tree' ? SIDEBAR_LEN : contentCount) - 1;
      if (max < 0) return;
      const move = pane === 'tree' ? setTreeIndex : setEditorIndex;

      switch (e.key) {
        case 'j':
        case 'ArrowDown':
          e.preventDefault();
          move((i) => Math.min(i + 1, max));
          break;
        case 'k':
        case 'ArrowUp':
          e.preventDefault();
          move((i) => Math.max(i - 1, 0));
          break;
        case 'G':
          e.preventDefault();
          move(() => max);
          break;
        case 'g': {
          const now = Date.now();
          if (now - lastG.current < 500) {
            e.preventDefault();
            move(() => 0);
            lastG.current = 0;
          } else {
            lastG.current = now;
          }
          break;
        }
        case 'Enter': {
          e.preventDefault();
          const el =
            pane === 'tree'
              ? sidebarRefs.current[treeIndex]
              : contentRefs.current[editorIndex];
          el?.click();
          break;
        }
        default:
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pane, treeIndex, editorIndex, contentCount, pathname, router]);

  const ctxValue = useMemo(
    () => ({
      pane,
      treeIndex,
      editorIndex,
      setEditorIndex,
      setContentCount,
      registerContentRef,
      mode,
      setMode,
    }),
    [pane, treeIndex, editorIndex, mode, registerContentRef],
  );

  const isBlogPost = pathname.startsWith('/blog/');
  const postSlug = isBlogPost ? pathname.slice('/blog/'.length) : '';

  return (
    <VimContext.Provider value={ctxValue}>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: c.bg,
          color: c.text,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* titlebar */}
        <div
          style={{
            height: 36,
            flexShrink: 0,
            background: c.chrome,
            borderBottom: `1px solid ${c.borderHard}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Dot color={c.red} />
            <Dot color={c.yellow} />
            <Dot color={c.green} />
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 13, color: c.muted }}>
            ghifari@portfolio: ~/site
          </div>
          {isMobile ? (
            <button
              type="button"
              aria-label={navOpen ? 'Close file tree' : 'Open file tree'}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((o) => !o)}
              style={{
                width: 52,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: navOpen ? c.blue : c.muted,
                fontSize: 18,
                lineHeight: 1,
                padding: '0 2px',
              }}
            >
              {navOpen ? '✕' : '☰'}
            </button>
          ) : (
            <div style={{ width: 52 }} />
          )}
        </div>

        {/* tab bar */}
        <div
          style={{
            height: 36,
            flexShrink: 0,
            background: c.chrome,
            borderBottom: `1px solid ${c.borderHard}`,
            display: 'flex',
            overflowX: 'auto',
          }}
        >
          {TABS.map((t) => (
            <TabLink key={t.href} href={t.href} label={t.label} active={pathname === t.href} />
          ))}
          {isBlogPost && (
            <TabLink href={pathname} label={`${postSlug}.md`} active />
          )}
        </div>

        {/* body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
          {/* backdrop (mobile drawer only) */}
          {isMobile && navOpen && (
            <div
              onClick={() => setNavOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 20,
              }}
            />
          )}

          {/* sidebar: static column on desktop, slide-in drawer on mobile */}
          <div
            style={{
              width: 230,
              flexShrink: 0,
              background: c.chrome,
              borderRight: `1px solid ${c.borderHard}`,
              padding: '14px 0',
              overflowY: 'auto',
              fontSize: 13.5,
              ...(isMobile
                ? {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 21,
                    maxWidth: '80vw',
                    transform: navOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.2s ease',
                    boxShadow: navOpen ? '2px 0 12px rgba(0,0,0,0.4)' : 'none',
                  }
                : null),
            }}
          >
            <div
              style={{
                padding: '0 14px 10px',
                color: c.muted,
                fontSize: 11.5,
                letterSpacing: '.4px',
                textTransform: 'uppercase',
              }}
            >
              ~/ghifari-arsa-ranandya
            </div>
            {SIDEBAR.map((item, i) => (
              <SidebarLink
                key={item.label}
                item={item}
                focused={pane === 'tree' && i === treeIndex}
                onNavigate={() => setNavOpen(false)}
                refCb={(el) => {
                  sidebarRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          {/* main content */}
          <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>{children}</div>
        </div>

        {/* status bar */}
        <div style={{ height: 26, flexShrink: 0, display: 'flex', alignItems: 'stretch', fontSize: 12 }}>
          <div
            style={{
              background: mode === 'INSERT' ? c.yellow : c.green,
              color: c.bg,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
            }}
          >
            {mode}
          </div>
          <StatusChip bg={c.chip} fg={c.text}>
            ⎇ main
          </StatusChip>
          <StatusChip bg={c.inset} fg={c.muted}>
            {statusFile(pathname)}
          </StatusChip>
          {!isMobile && (
            <StatusChip bg={c.bg} fg={pane === 'editor' ? c.blue : c.muted}>
              {pane === 'editor' ? '◧ editor' : '◧ tree'}
            </StatusChip>
          )}
          <div style={{ flex: 1, background: c.bg }} />
          {!isMobile && (
            <StatusChip bg={c.inset} fg={c.muted}>
              UTF-8
            </StatusChip>
          )}
          <StatusChip bg={c.chip} fg={c.text} pad={14}>
            {clockText}
          </StatusChip>
        </div>
      </div>
    </VimContext.Provider>
  );
}

function Dot({ color }: { color: string }) {
  return <div style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />;
}

function TabLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        fontSize: 13,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        background: active ? c.bg : c.chrome,
        color: active ? c.text : c.muted,
        borderTop: `2px solid ${active ? c.blue : 'transparent'}`,
        borderRight: `1px solid ${c.borderHard}`,
      }}
    >
      {label}
    </Link>
  );
}

function SidebarLink({
  item,
  focused,
  refCb,
  onNavigate,
}: {
  item: (typeof SIDEBAR)[number];
  focused: boolean;
  refCb: (el: HTMLElement | null) => void;
  onNavigate?: () => void;
}) {
  const style: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 14px',
    cursor: 'pointer',
    textDecoration: 'none',
    background: focused ? item.color : 'transparent',
    color: focused ? c.bg : item.color,
    fontWeight: focused ? 600 : 400,
  };
  const glyph = (
    <span style={{ opacity: 0.7, width: 12, display: 'inline-block' }}>{item.glyph}</span>
  );

  // CV download & hash-anchor links use a plain <a>; internal routes use Link.
  if (item.download || item.external || item.href.includes('#')) {
    return (
      <a
        ref={refCb}
        href={item.href}
        download={item.download}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noreferrer' : undefined}
        onClick={onNavigate}
        style={style}
      >
        {glyph}
        {item.label}
      </a>
    );
  }
  return (
    <Link ref={refCb} href={item.href} onClick={onNavigate} style={style}>
      {glyph}
      {item.label}
    </Link>
  );
}

function StatusChip({
  children,
  bg,
  fg,
  pad = 12,
}: {
  children: ReactNode;
  bg: string;
  fg: string;
  pad?: number;
}) {
  return (
    <div style={{ background: bg, color: fg, display: 'flex', alignItems: 'center', padding: `0 ${pad}px` }}>
      {children}
    </div>
  );
}
