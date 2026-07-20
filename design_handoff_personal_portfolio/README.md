# Handoff: Personal Portfolio (Terminal / Vim-nav theme)

## Overview
A 5-page personal portfolio site for Ghifari Arsa Ranandya (Software Engineer), styled like a code editor/terminal (Atom One Dark palette) and navigable with vim keyboard motions (j/k/gg/G/Enter/`/`).

## About the Design Files
The files in this bundle (`*.dc.html`) are **design references** built in an HTML prototyping tool (Design Components — a custom template/logic format, NOT plain React or vanilla JS). They are not meant to be copied as-is into a codebase. The task is to **recreate these designs in the target app's stack** (React, Next.js, plain HTML/CSS/JS, etc. — whichever the codebase already uses, or the best fit if starting fresh), following the structure, styling, and interactions documented below.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and layout are final. Recreate pixel-close using the values in this doc.

## Global layout (present on every page)
A full-viewport (100vw × 100vh) "editor window" chrome, flex column, overflow hidden:
1. **Titlebar** (36px): dark bg `#21252b`, 1px bottom border `#181a1f`. Left: 3 traffic-light dots (12px circles) — red `#e06c75`, yellow `#e5c07b`, green `#98c379`. Center: muted text `ghifari@portfolio: ~/site` in `#5c6370`, 13px.
2. **Tab bar** (36px): bg `#21252b`, one tab per page (`about.md`, `experience.json`, `projects/`, `blog/`, + post slug on post page). Active tab: bg `#282c34`, text `#abb2bf`, 2px top border `#61afef`. Inactive: bg `#21252b`, text `#5c6370`, transparent top border. All tabs 1px right border `#181a1f`, 13px font, 20px horizontal padding.
3. **Body** (flex row, flex:1, overflow hidden):
   - **Sidebar** (230px, bg `#21252b`, right border `#181a1f`): header label `~/ghifari-arsa-ranandya` (11.5px, uppercase, `#5c6370`). Then nav items, each a row (glyph + label), 5px/14px padding. Focused item: filled background in its own accent color, dark text `#282c34`, bold. Unfocused: transparent bg, colored text.
     - `≡ about.md` → Home — accent `#e5c07b`
     - `{} experience.json` → Experience — accent `#98c379`
     - `▸ projects/` → Projects — accent `#61afef`
     - `▸ blog/` → Blog — accent `#61afef`
     - `$ contact.sh` → Home#contact — accent `#e06c75`
     - `⇩ Ghifari-CV.pdf` → CV download — accent `#c678dd`
   - **Main content** (flex:1, scrollable): a left "gutter" column (44px, right-aligned line numbers 1–40, color `#495162`, 1px right border `#2c313c`, 13px, line-height 1.9) beside the actual page content (max-width 700–1000px depending on page, 28px/40px padding).
4. **Status bar** (26px, flex row): mode chip (`NORMAL` green `#98c379` bg / `INSERT` yellow `#e5c07b` bg, dark bold text), git branch chip (`⎇ main`, bg `#3a3f4b`), current file chip (bg `#2c313c`, `#5c6370` text), spacer, `UTF-8` chip, live clock chip (bg `#3a3f4b`).

Base: font `JetBrains Mono` (Google Fonts, weights 400/500/600/700), page bg `#282c34`, default text `#abb2bf`.

## Color palette (Atom One Dark)
- Background: `#282c34` (main), `#21252b` (chrome/sidebar), `#2c313c` (cards/inset)
- Borders: `#181a1f` (hard), `#2c313c` (soft)
- Text: `#abb2bf` (primary), `#b6bdc8` (body copy), `#5c6370` (muted/comments), `#495162` (line numbers)
- Accents: red `#e06c75`, yellow/orange `#e5c07b`, green `#98c379`, cyan `#56b6c2`, blue `#61afef`, purple `#c678dd`

## Screens

### 1. Home (about.md) — `Home.dc.html`
- H1 `# Ghifari Arsa Ranandya` (34px bold, `#e5c07b`), subtitle `> Software Engineer` (16px italic `#5c6370`).
- `## About` section: 15px body paragraph, inline colored spans for emphasis (`git commit` in green, `j`/`k`/`Enter` in blue).
- `## Stack` section: wrapped row of pill tags (bg `#2c313c`, text `#56b6c2`, 13px, 4px/10px padding, 4px radius): TypeScript, React, Node.js, Python, PostgreSQL, Docker, AWS, Git.
- `## Contact` section (anchor id `contact`): rows styled like shell commands — `$ open github.com/...`, `$ open linkedin.com/...`, `$ mail ghifari@ghifari.dev`, `$ wget Ghifari-Arsa-Ranandya-CV.pdf`. Command word in muted gray, rest in body color. Each row is a link; focused row gets a light blue inset highlight + 1px blue border.
- `## Resume` section: hint text below contact list.
- Focus/keyboard: sidebar items + contact rows form one linear focus list (j/k moves through all of them, Enter/click activates).

### 2. Experience (experience.json) — `Experience.dc.html`
- Header comment `// experience.json`, opening `[` in purple `#c678dd`.
- List of job cards (bg `#2c313c`, 4px radius, 14px/16px padding, 18px bottom margin, 1px inset border `#181a1f`; focused card: light-blue tinted bg + 1px blue inset border).
  - Card header row: role (17px bold blue `#61afef`) left, dates (12.5px `#5c6370`) right.
  - Company line: `@ Company Name` (14px `#e5c07b`).
  - Bulleted list of 2–3 achievements (14px `#b6bdc8`, line-height 1.8).
- Closing `]` below the list.
- Placeholder jobs: Senior Software Engineer @ Placeholder Labs (2023–Present), Software Engineer @ Example Systems (2021–2023), Software Engineer Intern @ Sample Co (Summer 2020).

### 3. Projects (projects/) — `Projects.dc.html`
- Header line `~/projects $ ls -la` (13px `#5c6370`).
- CSS grid, `repeat(auto-fill, minmax(280px,1fr))`, 16px gap, max-width 1000px.
- Each project card (link, opens in new tab): bg `#2c313c` (focused: blue-tinted + blue inset border), 16px padding, 4px radius.
  - Header row: `▸` (blue) + folder name in bold yellow `#e5c07b` with trailing `/`.
  - Description (13.5px `#b6bdc8`).
  - Tag pills (bg `#21252b`, text cyan `#56b6c2`, 11.5px).
- Placeholder projects: lazyfetch, termfolio, queue-lite, pg-snapshot (each with 2 tags + description).

### 4. Blog list (blog/) — `Blog.dc.html`
- Header line `~/blog $ ls -la` + optional live `| grep "query"` suffix when filtering.
- Pressing `/` enters filter mode: status bar mode chip switches to `INSERT` (yellow), a text input appears (bg transparent, bottom border blue, blinking block cursor span using a CSS `vim-blink` keyframe: opacity 1↔0 every 0.5s), filtering the post list live by title substring match (case-insensitive). Escape/Enter exits back to `NORMAL` mode.
- Post rows (link): date (12.5px `#5c6370`, 80px fixed width) — title (15px `#e5c07b`, flex:1) — read time (12px `#5c6370`). Focused row: light-blue tint + 1px blue inset border, no bg box shadow when unfocused.
- Empty state: `-- no matches for "query" --` in muted gray when filter yields nothing.
- Placeholder posts (5): Hello world (again) 2026-06-02/3min, Why I put vim motions on my portfolio 2026-05-14/5min, Notes from debugging at 2am 2026-04-27/4min, Small tools big wins 2026-03-19/6min, On taking breaks from side projects 2026-02-08/2min.

### 5. Blog post — `BlogPost.dc.html`
- Extra tab in tab bar showing `<slug>.md`, active state.
- `← cd ../blog` back-link (13px `#5c6370`) above content.
- `$ cat blog/<slug>.md` header line, then H1 title (28px bold `#e5c07b`), meta line (date · read time, 13px `#5c6370`).
- Body: 2–3 paragraphs, 15px `#b6bdc8`, line-height 1.9.
- Loads content by `?slug=` query param; falls back to `hello-world` if missing/unknown.

## Interactions & Behavior (vim navigation)
Implemented per-page with a small keydown handler attached on mount, removed on unmount. Global focus index moves through: sidebar nav items (in order) → then page-specific content list (jobs / project cards / contact rows / blog rows), as one flat array.
- `j` / `ArrowDown`: focus next item (clamped to last)
- `k` / `ArrowUp`: focus previous item (clamped to first)
- `gg` (two `g` presses within 500ms): jump to first item
- `G`: jump to last item
- `Enter` / `l`: activate (click) the focused item — navigates link or triggers download
- `/` (blog page only): enter filter/insert mode, focuses a text input
- `Escape` (while filter input focused): blur input, return to normal mode
- Key handling is skipped while an `<input>`/`<textarea>` is focused (except Escape/Enter inside the filter box), so typing works normally.
- Status bar mode chip reflects `NORMAL`/`INSERT` state; only the blog page currently has an insert-mode state (the filter box).
- A live clock in the status bar updates every 15s (`toLocaleTimeString` + short date).

## State Management
Each page keeps local component state: `focusIndex` (int), `clockText` (string, refreshed on interval). Blog page additionally: `filtering` (bool), `filterText` (string). Blog post page reads `slug` from `location.search` on render (no state needed beyond focus/clock).

## Design Tokens
**Colors:** see palette table above.
**Font:** JetBrains Mono, 400/500/600/700, Google Fonts.
**Radius:** 3–4px on cards/pills/rows.
**Spacing:** sidebar padding 14px vertical / 14px horizontal on header, 5px/14px on nav rows; main content padding 28px top, 40px sides, 60px bottom; card gaps 16–18px.
**Shadows/borders:** all "elevation" is done via 1px inset borders (`box-shadow: inset 0 0 0 1px <color>`), not drop shadows — matches the flat editor look.
**Animation:** `vim-blink` keyframes (opacity 1→0 step-end, 1s infinite) for the filter cursor.

## Assets
- CV PDF: `assets/Ghifari-Arsa-Ranandya-CV.pdf` (user-uploaded, linked from sidebar "⇩ Ghifari-CV.pdf" and Home's contact `$ wget` row) — included in this bundle.
- No other images/icons; all glyphs (`≡ {} ▸ $ ⇩ ▸`) are plain Unicode characters, not icon fonts or SVGs.

## Files
- `Home.dc.html` — About/bio/skills/contact/CV page
- `Experience.dc.html` — Work history
- `Projects.dc.html` — Project grid
- `Blog.dc.html` — Blog list with filter
- `BlogPost.dc.html` — Individual post view
- `assets/Ghifari-Arsa-Ranandya-CV.pdf` — resume file

All content (job history, projects, blog posts) is placeholder text — replace with real content during implementation.
