# Personal Portfolio Website - Implementation Plan

Building a clean, modern, dark-themed personal portfolio website from scratch for **Media Pons** using **Tailwind CSS v3 CLI** (`tailwindcss -i ./src/style.css -o ./dist/output.css --watch`) and **Vanilla JavaScript** (without Vite). The site features a sticky glassmorphic navigation header with **`MP`** logo mark and a **`Hire Us`** CTA button (reflecting Media Pons as a team, not a solo developer), a dynamic Hero section with high-converting headline (*Building high-converting websites that elevate **your brand** & drive **real results***), specialized typing animation (*WordPress Developer*, *PHP Developer*, *Python Developer*, *Server Admin*), a filtered Portfolio section, a Testimonials carousel, an interactive Skills showcase, a Contact form, and responsive navigation.

## User Feedback & Branding Updates Incorporated

> [!IMPORTANT]
> **No Vite**: Per user instructions, Vite is excluded. Tailwind CSS v3 CLI build mechanism is used for CSS compilation (`npm run build:css` / `npm run watch:css`), and static files are served directly.
>
> **Media Pons Branding & MP Logo**: Logo letters updated to **`MP`** in header and footer badges; company title updated to **`Media Pons`** across index.html, metadata, data structures, and testimonials.

---

## Proposed Changes

### Project Setup & Config

#### [NEW] [package.json](file:///c:/Users/emreebru/Documents/FreelanceWebsiteProjects/simple-portfolio-website/package.json)
- Project manifest defining `tailwindcss` (^3.4), `postcss`, `autoprefixer`, and static server `serve`.
- Scripts:
  - `build:css`: `tailwindcss -i ./src/style.css -o ./dist/output.css --minify`
  - `watch:css`: `tailwindcss -i ./src/style.css -o ./dist/output.css --watch`
  - `start`: `serve .`

#### [NEW] [tailwind.config.js](file:///c:/Users/emreebru/Documents/FreelanceWebsiteProjects/simple-portfolio-website/tailwind.config.js)
- Tailwind CSS v3 configuration file configuring content paths (`./*.html`, `./src/**/*.js`), extending theme color palettes (slate/zinc darks, electric indigo, neon cyan, emerald accents), font families ('Inter'/'Outfit'), custom animations (glow, float, typing, scroll reveal), and keyframes.

#### [NEW] [postcss.config.js](file:///c:/Users/emreebru/Documents/FreelanceWebsiteProjects/simple-portfolio-website/postcss.config.js)
- PostCSS setup registering `tailwindcss` and `autoprefixer`.

#### [NEW] [index.html](file:///c:/Users/emreebru/Documents/FreelanceWebsiteProjects/simple-portfolio-website/index.html)
- Main HTML5 document structured with semantic sections (`<header>`, `<main>`, `<section>`, `<footer>`), **`MP`** gradient logo badge, **`Media Pons`** branding, a **`Hire Us`** nav CTA button (team-oriented wording), linking `./dist/output.css`, SEO meta tags, Google Fonts, responsive viewport configurations, and accessible ARIA attributes.

---

### Styles & Scripts

#### [NEW] [src/style.css](file:///c:/Users/emreebru/Documents/FreelanceWebsiteProjects/simple-portfolio-website/src/style.css)
- Imports `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`.
- Adds utility classes for glassmorphism, glowing borders, custom scrollbar styling, and smooth scroll reveal states.

#### [NEW] [src/main.js](file:///c:/Users/emreebru/Documents/FreelanceWebsiteProjects/simple-portfolio-website/src/main.js)
- Vanilla JS application logic:
  - **Scroll reveal & Sticky Navbar**: Dynamic blur background on scroll, active section highlighting in header nav.
  - **Mobile Menu**: Interactive toggle for responsive navigation drawer.
  - **Hero Typing Effect**: Dynamic cycling text for titles (*WordPress Developer*, *PHP Developer*, *Python Developer*, *Server Admin*).
  - **Portfolio Filtering**: Category filters (All, Full Stack, Web Apps, Mobile & Web, UI/UX) with animated fade transitions.
  - **Project Modal Preview**: Detailed popup modal showing deep-dive project features, technologies, screenshots, and live demo links.
  - **Testimonials Carousel**: Next/Prev slide transitions, pagination dots, drag/swipe and auto-play options.
  - **Contact Form Validation**: Form handling, input validation, and interactive toast notification on submission.
  - **Click-to-Copy**: Quick copy for `info@media-pons.de` with animated tooltip.

#### [NEW] [src/data.js](file:///c:/Users/emreebru/Documents/FreelanceWebsiteProjects/simple-portfolio-website/src/data.js)
- Data structures for **Media Pons** projects, testimonials, skill sets, and personal bio details. Socials include **GitHub only** (`https://github.com/emre-edu-tech`); LinkedIn, X (Twitter) and Dribbble are excluded (no accounts).

---

## Verification Plan

### Automated Tests
- CSS Compilation test: Run `npx tailwindcss -i ./src/style.css -o ./dist/output.css --minify` to verify Tailwind CSS v3 builds output CSS cleanly without syntax errors (verified: 34.6 KB compiled).
- Local Server test: Verified `http://localhost:3000` returns HTTP 200 OK with `MP` logo and `Media Pons` branding.

### Manual Verification
- **Hero Section**: Verified typing effect, action buttons, social links, and profile image.
- **Portfolio Section**: Verified category filters and project detail modal popups.
- **Testimonials Section**: Verified slider navigation, pagination dots, and responsive cards.
- **Contact Form**: Verified required field validation and toast notifications.
- **Responsive Layout**: Verified layout on Mobile (<640px), Tablet (768px), and Desktop (>1024px) views.
