# Media Pons Portfolio — Product & Architecture Spec

> Agent handover spec. Source of truth for rebuilding or extending this project.
> Companion file: `design-spec.md` (colors, typography, styling techniques, components).
> All file references are bare filenames / repo-relative paths. No absolute machine paths.

## 1. Overview

Build a clean, modern, dark-themed portfolio website for **Media Pons** (a team, not a solo developer).

- **Stack:** Tailwind CSS v3 CLI + PostCSS + Autoprefixer, Vanilla JavaScript (ES modules), static HTML. No Vite, no framework, no build bundler for JS.
- **Serving:** static files served directly (e.g. `serve .`).
- **Brand voice:** team-oriented. Header CTA is **`Hire Us`** (not "Hire Me"). Logo mark is **`MP`**.
- **Hero headline:** `Building high-converting websites that elevate your brand & drive real results.` with `your brand` and `real results` as gradient spans.
- **Hero typing rotation:** `WordPress Developer`, `PHP Developer`, `Python Developer`, `Server Admin`.

## 2. Tech Constraints (must follow)

- Do NOT introduce Vite, React, Next.js, or any JS bundler.
- CSS is compiled via Tailwind CLI only:
  - `build:css`: `tailwindcss -i ./src/style.css -o ./dist/output.css --minify`
  - `watch:css`: `tailwindcss -i ./src/style.css -o ./dist/output.css --watch`
- `index.html` links only `./dist/output.css`. No CDN Tailwind.
- JS is loaded as `<script type="module" src="./src/main.js">` with `import ... from './data.js'`.
- Content paths for Tailwind: `./*.html`, `./src/**/*.js`.
- `darkMode: 'class'`, `<html class="dark scroll-smooth">`.

## 3. File Map

| File | Purpose |
|------|---------|
| `package.json` | Manifest. Deps: `tailwindcss` (^3.4), `postcss`, `autoprefixer`, `serve`. Scripts: `build:css`, `watch:css`, `start` (`serve .`). |
| `tailwind.config.js` | Theme extension (colors, fonts, animations, keyframes). See `design-spec.md` for palette. |
| `postcss.config.js` | Registers `tailwindcss` + `autoprefixer` plugins. |
| `index.html` | Single HTML5 document. Semantic `<header>`, `<main>`, `<section>`, `<footer>`. SEO meta, Google Fonts, ARIA labels, all page sections. |
| `src/style.css` | Tailwind directives + custom utilities (glassmorphism, gradients, patterns, scrollbar, scroll-reveal, typing cursor). |
| `src/main.js` | All interactive logic (navbar, typing, skills render, portfolio + modal, testimonials, reveal, contact form, copy-email, scroll-top). |
| `src/data.js` | All site content as exported ES constants. Kept as-is by decision (see §7). |
| `dist/output.css` | Generated file. Never hand-edit. Rebuild via `build:css`. |
| `assets/` | Static images: `hero_office.webp`, `project_saas_dashboard.png`, `project_ecommerce_app.png`, `project_finance_mobile.png`, `testimonial_avatar_1.png`, `testimonial_avatar_2.png`. |

## 4. Page Structure (`index.html`)

Order must be preserved:

1. **Ambient background glows** — three fixed `blur-[120px]` divs (`violet-600/10`, `cyan-500/10`, `indigo-600/10`), `pointer-events-none -z-10`.
2. **Header `#main-header`** — fixed top, `py-5 bg-transparent` initially. Contains: `MP` gradient logo badge + `Media Pons` / `Portfolio` wordmark, desktop `<nav>` (Home, About, Skills, Portfolio, Testimonials, Contact), availability badge (`Available for Hire` + pulsing emerald dot), `Hire Us` CTA (`#contact`), hamburger `#mobile-menu-btn`, dropdown `#mobile-menu` with `.mobile-nav-link`s.
3. **Hero `#home`** — `bg-grid-pattern`, 12-col grid. Left: badge pill (`Custom Web Development & Server Solutions`), `h1` headline, typing line (`We specialize in` + `#typing-text.typing-cursor`), bio paragraph, buttons (`View Portfolio` → `#portfolio`, `Get In Touch` → `#contact`, `#copy-email-btn` with `.copy-tooltip`), GitHub-only social link. Right: profile glass card with glow backdrop, `hero_office.webp`, `Online & Coding` + `SF, CA` pills, mini terminal widget (`developer.config.js`).
4. **About `#about`** — `bg-dark-900/40 border-y`, `About Me` pill, `h2` with gradient words, two paragraphs, 2x2 stats grid (6+ Years, 45+ Projects, 30+ Clients, 2.4k+ Commits) each in `glass-card`.
5. **Skills `#skills`** — header (`Expertise` pill + `h2` + subtitle), empty `#skills-container.grid md:grid-cols-3` filled by JS.
6. **Portfolio `#portfolio`** — `bg-dark-900/40 border-t`, `Featured Works` pill, filter tabs (`.portfolio-filter-btn`, `data-filter`: `all`, `fullstack`, `webapps`, `mobile`, `uiux`; `all` active by default with `from-indigo-600 to-violet-600`), empty `#projects-grid.grid md:2 lg:3` filled by JS.
7. **Testimonials `#testimonials`** — pill + `h2`, carousel: `.overflow-hidden` > `#testimonials-slider.flex` (JS-rendered), controls `#testimonial-prev` / `#testimonial-next` + `#testimonial-dots`.
8. **Contact `#contact`** — `bg-dark-900/40 border-t`, 12-col grid. Left: `Let's Connect` pill, `h2`, three info cards (Direct Email `info@media-pons.de`, Location `San Francisco, CA & Remote Worldwide`, Response Time `Usually within 24 hours`). Right: `form#contact-form.glass-card` with `#contact-name`, `#contact-email`, `#contact-subject`, `#contact-message`, submit button. Validation: name/email/message required.
9. **Footer** — `MP` badge, `© 2026 Media Pons. All rights reserved. Crafted with Tailwind CSS v3 & Vanilla JS.`, links Home/Portfolio/Testimonials/Contact.
10. **Overlays** — `#scroll-to-top` (hidden until `scrollY > 400`), `#project-modal` (hidden flex modal with `#modal-backdrop`, `#close-modal-btn`, `#modal-content`), `#toast-notification` (hidden, `.toast-message` inside).

Accessibility: every icon-only button needs `aria-label` (menu toggle, slider arrows, modal close, scroll-top, GitHub link). All `<img>` need `alt` + `loading="lazy"` except hero.

## 5. Behaviour Spec (`src/main.js`)

Entry: on `DOMContentLoaded` call `initNavbar`, `initTypingEffect`, `renderSkills`, `initPortfolio`, `initTestimonials`, `initScrollReveal`, `initContactForm`, `initCopyEmail`, `initScrollTop`.

| Function | Required behaviour |
|----------|-------------------|
| `initNavbar` | On scroll > 20px: header gains `glass-header py-3`, loses `py-5 bg-transparent` (and reverse). Scrollspy: for each `section[id]`, if `scrollY` in `[offsetTop-120, offsetTop-120+offsetHeight)` mark matching `.nav-link[href="#id"]` with `text-accent-cyan font-semibold`, others `text-slate-400`. Mobile toggle swaps hamburger/X SVG and `.hidden` on `#mobile-menu`; clicking a `.mobile-nav-link` closes menu. |
| `initTypingEffect` | Cycles `titles` array in §1. Type 100ms/char, delete 50ms/char, hold 2000ms at full word, 400ms gap after delete. Writes to `#typing-text.textContent`. No-op if element missing. |
| `renderSkills` | Renders `skills` from `src/data.js` into `#skills-container`. Card: `glass-card p-6 reveal-on-scroll`, icon box, `h3` category, per-item row (emoji icon + name + `level%` in `text-accent-cyan`), progress track `bg-slate-900 h-2 rounded-full border` with fill `bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400` + inline `style="width: {level}%"`. |
| `initPortfolio` + `openProjectModal` | `renderProjects(category)`: `all` → all projects, else filter `p.categoryKey === category`. Card: `glass-card-hover`, `aspect-video` image + gradient overlay + category pill, title, `line-clamp-2` description, tag pills, `Explore Details` button with `data-project-id`. Rebind `.open-modal-btn` clicks → `openProjectModal(id)`. Re-run `initScrollReveal()` after render. Filter buttons: reset all to `bg-slate-900/60 text-slate-400`, set active to `bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg`. Modal: fill `#modal-content` (hero image, category pill, `h2` title, description, `Key Highlights & Architecture` checklist with emerald check SVG, `Technologies Used` mono pills, `View Live Demo` + `Source Code` buttons using `demoUrl`/`githubUrl`). Show via `hidden`→`flex`, lock `body.overflow=hidden`. Close via `#close-modal-btn` or `#modal-backdrop` restores scroll. |
| `initTestimonials` | Renders all `testimonials` as `.testimonial-slide.min-w-full` cards (amber stars = `rating` count, italic quote, avatar + name + `role · company`). `updateSlider()`: `container.style.transform = translateX(-index*100%)` + re-render dots. Dots: active `bg-accent-cyan w-8`, inactive `bg-slate-700`. Prev/next wrap with modulo. |
| `initScrollReveal` | `IntersectionObserver threshold 0.1` on `.reveal-on-scroll` → add `is-visible` once intersecting. Must be re-callable (portfolio re-render). |
| `initContactForm` | `submit` → `preventDefault`, trim name/email/message; if empty → toast error `Please fill out all required fields.` Otherwise disable submit, show spinner SVG, after 1200ms `form.reset()`, restore button, toast success `Thank you! Your message has been sent successfully.` Toast auto-hides after 4000ms (+300ms fade). |
| `initCopyEmail` | Click `#copy-email-btn` → `navigator.clipboard.writeText(personalInfo.email)`, set `.copy-tooltip` text to `Copied!` for 2000ms then revert to `Copy Email`. |
| `initScrollTop` | Show `#scroll-to-top` (`hidden opacity-0` → `flex opacity-100`) when `scrollY > 400`, hide otherwise. Click → `window.scrollTo({top:0, behavior:'smooth'})`. |

## 6. Data Contracts (`src/data.js`)

Keep exact shapes — `main.js` depends on them:

- `personalInfo: { name, title, tagline, about, location, email, availability, socials: { github }, stats: [{label, value}] }`. Current values: name `Media Pons`, email `info@media-pons.de`, github `https://github.com/emre-edu-tech`, 4 stats.
- `skills: [{ category, icon (inline SVG string), items: [{ name, level (0-100), icon (emoji) }] }]` — 3 categories expected.
- `projects: [{ id (slug, unique), title, category (label), categoryKey (one of `fullstack|webapps|mobile|uiux`), image (path under `assets/`), description, highlights[string], tags[string], demoUrl, githubUrl, featured (bool) }]` — 4 entries expected.
- `testimonials: [{ id, quote, name, role, company, avatar (path under `assets/`), rating (1-5) }]` — 3 entries expected.

Socials rule: GitHub only. Do not add LinkedIn/X/Dribbble unless accounts exist.

## 7. Data Storage Decision: keep `src/data.js` as-is

**Decision: keep `src/data.js` as a plain exported ES module. It is secure for this project.**

Rationale:
- All content in it is intentionally public (bio, stats, project blurbs, testimonials, public contact email, public GitHub URL). Frontend JS is public by definition — no secrecy is lost.
- No secrets, API keys, tokens, passwords, or non-public PII live in the file. As long as that rule holds, this pattern is correct for a static site.
- It is the simplest handover-friendly approach: one file for all copy, no backend/CMS to run.

Rules for agents editing this project:
1. NEVER put secrets, private emails, API keys, or backend credentials in `src/data.js`.
2. The contact form is currently simulated (no backend). If a real delivery backend is added later, keys go server-side / env vars — never into `data.js`.
3. Current rendering uses `innerHTML` with trusted static data. If data ever comes from users or a CMS, add HTML escaping/sanitization first (XSS risk).
4. Public email `info@media-pons.de` is scrapable by bots — accepted tradeoff; do not "secure" it by moving it into `data.js` (it already is there). Obfuscation/`mailto:` is optional.
5. Only split into `src/content/*.json` + `fetch()` or a headless CMS if the file grows past comfortable review size or non-devs must edit copy. Not needed now.

## 8. Build & Verification

- Install: `npm install`.
- CSS check: `npx tailwindcss -i ./src/style.css -o ./dist/output.css --minify` must exit clean (last known good: ~34.6 KB).
- Serve check: `npm run start` → `http://localhost:3000` returns HTTP 200, shows `MP` logo + `Media Pons` branding.
- Manual checklist: typing effect cycles 4 titles; filters switch project grid with fade; modal opens/closes with highlights/tags/links; slider arrows + dots move slides; contact empty-submit shows error toast, valid shows success; layout correct at Mobile (<640px), Tablet (768px), Desktop (>1024px); mobile menu opens/closes; copy-email tooltip shows `Copied!`; scroll-top appears after 400px.

## 9. Definition of Done for Agents

- No absolute local paths introduced anywhere.
- No new dependencies without updating `package.json` + this spec.
- `dist/output.css` regenerated, not hand-edited.
- Design tokens unchanged unless `design-spec.md` is updated alongside.
- `src/data.js` shapes unchanged unless `src/main.js` renderers are updated alongside.
