// Atom One Dark palette — single source of truth for all colors.
export const c = {
  bg: '#282c34', // main background
  chrome: '#21252b', // titlebar / tabbar / sidebar
  inset: '#2c313c', // cards / pills / current-file chip
  chip: '#3a3f4b', // branch / clock chips

  borderHard: '#181a1f',
  borderSoft: '#2c313c',
  gutterLine: '#495162',

  text: '#abb2bf', // primary
  body: '#b6bdc8', // body copy
  muted: '#5c6370', // comments / muted

  red: '#e06c75',
  yellow: '#e5c07b',
  green: '#98c379',
  cyan: '#56b6c2',
  blue: '#61afef',
  purple: '#c678dd',
} as const;

// Light-blue focus tint used behind the editor cursor everywhere.
export const FOCUS_TINT = 'rgba(97,175,239,0.14)';

// The editor "cursor": a solid blue bar down the left edge of the focused line.
export const CURSOR_BAR = `inset 3px 0 0 0 ${c.blue}`;

// Editor cursorline for transparent-base rows (Home contacts, Blog rows).
export const focusRing = (focused: boolean) => ({
  background: focused ? FOCUS_TINT : 'transparent',
  boxShadow: focused ? CURSOR_BAR : 'none',
});
