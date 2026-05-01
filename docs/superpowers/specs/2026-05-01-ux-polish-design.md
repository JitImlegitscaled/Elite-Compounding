# UX Polish — Dark Mode, Skeleton Shimmer & Animation Enhancements

## Context

The Elite Compounding Agency website is a production-ready single-page marketing site built in vanilla HTML/CSS/JS (`index.html`). The goal of this work is to add three polish layers that meaningfully improve perceived performance and user experience without introducing any new dependencies or breaking the single-file architecture:

1. **Dark mode** — system-preference-aware with manual toggle and localStorage persistence
2. **Page-load skeleton shimmer** — a cosmetic overlay that dissolves on `DOMContentLoaded`, giving the browser's brief parse/paint gap a polished, intentional feel
3. **Enhanced animations** — staggered card entry, hero entrance sequence, nav spring micro-interaction, and button press feedback

All changes stay within `index.html`. No new files, no build tooling, no CDN additions.

---

## Critical File

**`c:/Users/alexa/Downloads/Elite Compounding Agency Website/index.html`** — single source of truth. All CSS is in the `<style>` block; all JS is at the bottom in `<script>` tags.

---

## Feature 1: Dark Mode

### Theme switching mechanism

- Add `data-theme` attribute to `<html>`. Default: no attribute (light). Dark: `data-theme="dark"`.
- Add a `[data-theme="dark"]` CSS block that overrides the existing design tokens:

```css
[data-theme="dark"] {
  --bg:           #0A0F1E;
  --bg-soft:      #111827;
  --text:         #F0F4FF;
  --text-2:       #94A3B8;
  --text-3:       #64748B;
  --border:       rgba(255,255,255,0.08);
  --cobalt-light: #0f1f3d;
  --cobalt-border:#1e3a6e;
}
```

The `--cobalt` brand color (`#0070F3`) stays unchanged — it reads well on dark backgrounds. Surface layering: base `#0A0F1E` → soft `#111827` → card surfaces use `--bg-soft`. Any hard-coded `#fff` or `#F7F9FC` backgrounds in section rules also need dark overrides.

### Flash prevention

In `<head>`, before any stylesheets, add an inline `<script>`:

```js
(function() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
```

This runs synchronously before paint, preventing flash of wrong theme.

### Toggle button

Add a `<button id="theme-toggle" aria-label="Toggle dark mode">` to the nav, between the nav links and the CTA buttons. Renders `☀` in dark mode, `☾` in light mode. On click: flip `data-theme`, update `localStorage`, swap the icon. Style to match nav link aesthetics (no visible border, icon size ~18px, hover state with background tint).

### Transition

Add `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease` to `body` and key elements so the switch animates smoothly rather than flashing.

---

## Feature 2: Page-load Skeleton Shimmer

### Structure

Inject a `<div id="skeleton-overlay">` as the first child of `<body>`. It is `position: fixed; inset: 0; z-index: 9999` and mirrors the above-the-fold layout:

- Nav bar placeholder (full-width, ~64px tall)
- Hero content column:
  - Badge rectangle (~120×24px)
  - Headline block (~520×56px, then ~400×56px second line)
  - Sub-copy block (~460×20px, then ~380×20px)
  - Two CTA button outlines (~160×48px side by side)
  - Trust indicators row (3 small rectangles, ~100×16px each)

Each placeholder is a `border-radius: 8px` div with the shimmer animation applied.

### Shimmer animation

```css
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}
.skeleton-block {
  background: linear-gradient(
    90deg,
    var(--shimmer-base) 25%,
    var(--shimmer-highlight) 50%,
    var(--shimmer-base) 75%
  );
  background-size: 1200px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
```

Light mode shimmer tokens: `--shimmer-base: #E2E8F4; --shimmer-highlight: #F0F4FF`.
Dark mode shimmer tokens (override in `[data-theme="dark"]`): `--shimmer-base: #1a2235; --shimmer-highlight: #243049`.

Overlay background matches `--bg` so it fully covers the real content beneath.

### Dismissal

In JS, on `DOMContentLoaded`:

```js
const overlay = document.getElementById('skeleton-overlay');
overlay.style.opacity = '0';
overlay.style.transition = 'opacity 0.4s ease';
setTimeout(() => overlay.remove(), 400);
```

---

## Feature 3: Enhanced Animations

### 3a. Staggered card/stat entry

The existing `IntersectionObserver` reveal system stays intact. Add a post-intersection JS step: when the `.services .cards-grid` or `.stats .stats-grid` container enters the viewport, iterate its direct children and set `animationDelay` to `index * 80ms`. This produces a natural left-to-right cascade.

Implementation: in the existing IntersectionObserver callback, check if the newly-visible element has a `data-stagger-children` attribute; if so, iterate children and apply delays before adding the `visible` class to each.

Add `data-stagger-children` to the service cards wrapper and the stats grid wrapper in HTML.

### 3b. Hero entrance sequence

On `DOMContentLoaded` (fired after skeleton dissolves), animate hero elements in sequence. Target elements by class in this order, 60ms apart:

1. `.hero-badge`
2. `.hero-headline` (or first `h1`)
3. `.hero-sub` (sub-copy paragraph)
4. `.hero-cta` (CTA button group)
5. `.trust-indicators`

Each starts `opacity: 0; transform: translateY(16px)` and transitions to `opacity: 1; transform: translateY(0)` with `0.6s cubic-bezier(0.22,1,0.36,1)`. Delays: 0ms, 60ms, 120ms, 180ms, 240ms.

These elements are set to `opacity: 0; transform: translateY(16px)` via a CSS class `.hero-pre-animate` applied in HTML. The JS entrance sequence removes this class and adds `.hero-animate` (which has the transition and final state) on each element in turn. This keeps the initial hidden state in CSS (no JS flash) and the sequence entirely in JS.

### 3c. Nav link spring micro-interaction

Add to nav link CSS:

```css
.nav-link {
  transition: color 0.2s ease, background 0.2s ease, transform 0.15s cubic-bezier(0.34,1.56,0.64,1);
}
.nav-link:hover {
  transform: translateY(-2px);
}
```

The `cubic-bezier(0.34,1.56,0.64,1)` provides a slight overshoot (spring feel) on hover entry.

### 3d. Button press feedback

Add to all `.btn` elements:

```css
.btn:active {
  transform: scale(0.97);
  transition: transform 0.1s ease-out;
}
```

Existing hover states (`translateY(-2px)`) remain. The `active` state compounds — pressed feel is scale-down, not translate-up.

---

## Verification

1. Start `node serve.mjs` in the background
2. Open `http://localhost:3000` — observe skeleton shimmer on first load, dissolves ~400ms after DOM ready
3. Toggle dark mode button in nav — site switches, reload confirms localStorage persistence
4. Open in a browser with OS dark mode enabled, clear localStorage — confirm it starts dark
5. Scroll to services section — confirm cards stagger in left-to-right
6. Scroll to stats section — confirm stats cascade
7. Observe hero on hard reload — badge/headline/copy/CTAs sequence in
8. Hover nav links — confirm spring overshoot
9. Click any button — confirm scale press feedback
10. Run `node screenshot.mjs http://localhost:3000` in both light and dark mode, compare screenshots
