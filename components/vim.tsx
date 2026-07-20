'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export type Mode = 'NORMAL' | 'INSERT';
export type Pane = 'tree' | 'editor';

export interface VimContextValue {
  /** Which pane the cursor is in: the file tree (sidebar) or the editor. */
  pane: Pane;
  /** Cursor index within the sidebar tree. */
  treeIndex: number;
  /** Cursor index within the current page's editor items. */
  editorIndex: number;
  /** Let a page move the editor cursor (e.g. blog filter jumps to first match). */
  setEditorIndex: Dispatch<SetStateAction<number>>;
  /** Page tells the shell how many focusable editor items it renders. */
  setContentCount: (n: number) => void;
  /** Page registers each editor item's DOM node so Enter can .click() it. */
  registerContentRef: (i: number, el: HTMLElement | null) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
}

export const VimContext = createContext<VimContextValue | null>(null);

export function useVim(): VimContextValue {
  const ctx = useContext(VimContext);
  if (!ctx) throw new Error('useVim must be used within <EditorShell>');
  return ctx;
}

/**
 * Declare how many focusable items this page renders. Keeps the editor cursor's
 * range in sync (re-run whenever the count changes, e.g. blog filter).
 */
export function useVimContent(count: number): void {
  const { setContentCount } = useVim();
  useEffect(() => {
    setContentCount(count);
    return () => setContentCount(0);
  }, [count, setContentCount]);
}

/**
 * Wire up one editor item at local index `i`. Returns a ref to attach to the
 * (link) element and whether the editor cursor is currently on it.
 */
export function useVimItem(i: number): {
  ref: (el: HTMLElement | null) => void;
  focused: boolean;
} {
  const { pane, editorIndex, registerContentRef } = useVim();
  const ref = useCallback(
    (el: HTMLElement | null) => registerContentRef(i, el),
    [registerContentRef, i],
  );
  return { ref, focused: pane === 'editor' && editorIndex === i };
}

export type { ReactNode };
