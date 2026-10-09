# Media Pons Portfolio — Design System Spec

> Companion to `spec.md`. Single place to change the look of the site.
> Palette lives only as Tailwind theme colors (per owner decision — no separate CSS-vars duplicate).
> To retheme: edit the palette table + `tailwind.config.js` snippet below, rebuild CSS, done.

## 1. Color Palette (explicit, changeable)

Edit these values in `tailwind.config.js` under `theme.extend.colors`. All classes like `bg-dark-950`, `text-accent-cyan` derive from here.

| Token | Hex | Usage |
|-------|-----|-------|
| `dark.950` | `#090a0f` | Page background (`body`, `theme-color` meta), modal backdrop base |
| `dark.900` | `#0d0f17` | Alt section bands (`#about`, `#portfolio`, `#contact`), card icon boxes |
| `dark.850` | `#131625` | Card hover bg (`glass-card-hover`) |
| `dark.800` | `#1a1f36` | Scrollbar thumb base, deep borders |
| `dark.700` | `#262d4d` | Scrollbar thumb hover / deep surfaces (reserved) |
| `accent.cyan` | `#00f2fe` | Primary highlight: typing text, active nav, progress %, dots active, cursor |
| `accent.blue` | `#4facfe` | Gradient end (`text-gradient-blue`), secondary accents |
| `accent.indigo` | `#6366f1` | CTA gradients (`from-violet-600 to-indigo-600`), borders, slider controls |
| `accent.violet` | `#8b5cf6` | CTA gradients, `selection:` bg, logo gradient start, headings gradient |
| `accent.emerald` | `#10b981` | Success: availability dot, `Online & Coding` pill, checklist checks, toast border |
| `slate-*` (Tailwind default) | — | Body copy (`slate-200/300/400`), muted labels (`slate-500`), borders (`slate-800/80`, `slate-700`) |
| `amber-300/400` | — | Badge sparkle, testimonial stars, one stat gradient |
| Supporting tints | `violet-600/10`, `cyan-500/10`, `indigo-600/10` | Fixed ambient background glows with `blur-[120px]` |

Copy-paste source of truth for `tailwind.config.js`:

```js
colors: {
  dark: {
    950: '#090a0f',
    900: '#0d0f17',
    850: '#131625',
    800: '#1a1f36',
    700: '#262d4d',
  },
  accent: {
    cyan: '#00f2fe',
    blue: '#4facfe',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    emerald: '#10b981'
  }
}
```

Rules:
- Never hardcode hex in `index.html` / `src/main.js` templates — always use `dark-*` / `accent-*` classes.
- Gradients allowed: `from-violet-600 via-indigo-600 to-cyan-500`, `from-violet-400 via-indigo-300 to-cyan-400`, `from-cyan-400 via-blue-400 to-indigo-400`, `from-emerald-400 via-teal-300 to-cyan-400`.
- Opacity modifiers (`/10`, `/40`, `/60`, `/80`) are part of the system — keep them.

## 2. Typography & Fonts

- `fontFamily.sans`: `['Plus Jakarta Sans', 'Inter', 'sans-serif']` — body + headings. Loaded via Google Fonts in `index.html`.
- `fontFamily.mono`: `['Fira Code', 'monospace']` — pills, terminal widget, eyebrow labels, tech tags.
- Scale: hero `h1` `text-4xl sm:5xl lg:6xl font-extrabold tracking-tight leading-[1.15]`; section `h2` `text-3xl sm:4xl font-extrabold`; body `text-sm/base/lg text-slate-300/400 leading-relaxed`.
- Eyebrow pills: `glass-pill` + `uppercase tracking-wider font-mono` with per-section tint (e.g. `border-cyan-500/30 text-accent-cyan`).

## 3. Styling Techniques Used (complete list)

An agent must reproduce all of these when rebuilding:

1. **Tailwind v3 CLI pipeline** — directives `@tailwind base/components/utilities` in `src/style.css`, PostCSS `tailwindcss` + `autoprefixer`, content scan `./*.html` + `./src/**/*.js`.
2. **Glassmorphism utilities** (`src/style.css` `@layer utilities`): `.glass-header` (`bg-dark-950/80 backdrop-blur-xl border-b`), `.glass-card` (`bg-dark-900/60 backdrop-blur-md rounded-2xl border shadow-xl`), `.glass-card-hover` (border/bg/shadow/translate on hover), `.glass-pill` (rounded-full blur badge).
3. **Gradient text helpers**: `.text-gradient-purple` (`violet-400→indigo-300→cyan-400`), `.text-gradient-blue` (`cyan-400→blue-400→indigo-400`), `.text-gradient-emerald` (`emerald-400→teal-300→cyan-400`) via `bg-clip-text text-transparent`.
4. **Ambient background glows** — three `fixed` rounded-full divs with `blur-[120px]` + low-opacity brand colors, `-z-10 pointer-events-none`; plus per-card glow (`-inset-1 bg-gradient blur-2xl opacity-40 animate-pulse-slow`) and testimonial inner glow (`bg-indigo-500/10 blur-3xl`).
5. **Background patterns** — `.bg-grid-pattern` (40px white 3% grid lines, hero) and `.bg-dots-pattern` (24px radial dots, reserved).
6. **Custom dark scrollbar + selection** — 8px track `#090a0f`, thumb `#1e243b` → hover `#374151`; `selection:bg-accent-violet selection:text-white` on `body`.
7. **Scroll-reveal system** — `.reveal-on-scroll` (`opacity:0 translateY(30px)`, `0.8s cubic-bezier(0.16,1,0.3,1)`, `will-change`) → `.is-visible` (`opacity:1 translateY(0)`), driven by `IntersectionObserver threshold 0.1` in `src/main.js`.
8. **Typing cursor** — `.typing-cursor::after` (`content:'|'`, `blink 1s step-start infinite`, `text-accent-cyan`), JS types/deletes into `#typing-text`.
9. **Custom animations** (`tailwind.config.js`): `pulse-slow 4s` (hero glow), `float 6s ease-in-out infinite` (`translateY(-12px)` midpoint), `glow 3s alternate` (opacity + blur), `spin-slow 12s linear` (reserved), plus `animate-pulse` dots and `animate-spin` form spinner.
10. **Card hover lift + image zoom** — `hover:-translate-y-1 hover:shadow-indigo-500/10`, portfolio images `group-hover:scale-105 duration-700`, overlay gradient `from-dark-950 via-dark-950/40` fading on hover.
11. **Pills, tags & progress bars** — category pills (`glass-pill` + tinted borders), tag pills (`bg-slate-900 border-slate-800 text-[11px]`), tech pills (`font-mono text-xs`), skill bars (track `bg-slate-900 h-2 rounded-full border`, fill `bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400` with inline width%).
12. **Overlays & transitions** — modal `bg-dark-950/80 backdrop-blur-md`, `max-w-3xl max-h-[90vh] overflow-y-auto`; toast `translate-y-10 opacity-0` → visible; filter buttons swap gradient vs `bg-slate-900/60`; testimonial track `flex transition-transform duration-500 ease-out` with JS `translateX`; global `scroll-behavior:smooth`, `overflow-x-hidden`, `antialiased`, `scroll-smooth` anchors with `scrollspy offset -120px`.

## 4. Component Tokens (do not restyle ad hoc)

- Header states: default `py-5 bg-transparent` → scrolled `glass-header py-3`.
- Buttons primary: `bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 rounded-xl shadow-xl shadow-indigo-500/25`.
- Buttons secondary: `bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl`.
- Inputs: `bg-slate-950 border-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-600 text-sm`.
- Nav links: base `text-sm text-slate-300 hover:text-accent-cyan`, active adds `text-accent-cyan font-semibold`.
- Filter active: `bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20`; inactive: `bg-slate-900/60 text-slate-400 hover:text-slate-200`.
- Testimonial dot active: `bg-accent-cyan w-8`; inactive: `bg-slate-700 hover:bg-slate-500`.

## 5. How to Change the Theme Later

1. Edit hex values in the §1 table.
2. Mirror the same change in `tailwind.config.js` `extend.colors`.
3. Run `npm run build:css` to regenerate `dist/output.css`.
4. Do not edit generated CSS or scatter new hex codes in markup — keep everything mapped to `dark-*` / `accent-*`.
