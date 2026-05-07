# Engagement Features Design
**Date:** 2026-05-06  
**Status:** Approved

## Overview

Four engagement improvements to `index.html` delivered in two phases. Phase 1 adds three purely additive features (no existing markup removed). Phase 2 removes ~200 lines of duplicate DOM in the Problems section.

---

## Phase 1 — Additive Engagement Features

### Feature 1: Scroll Progress Bar

**What:** A 3px-tall horizontal bar pinned to the absolute top of the page (`position: fixed; top: 0; left: 0; right: 0`), filled left-to-right proportional to scroll depth.

**Implementation:**
- Single `<div id="scroll-progress">` inserted as first child of `<body>`, before the nav
- `z-index: 200` — above everything including nav (it's just a 3px line, doesn't block interaction)
- Width driven by JS: `scrollY / (document.body.scrollHeight - innerHeight) * 100 + '%'`
- Updated inside the existing `scroll` event listener (no new listener added)
- Color: `linear-gradient(90deg, #0052B8, #1a65cc)`
- CSS: `transition: width 0.1s linear` for smooth fill

**CSS token used:** `--cobalt`, `--cobalt-mid`

---

### Feature 2: Floating CTA Pill

**What:** A fixed pill button bottom-right that appears after user scrolls past the hero, disappears when the contact section enters view.

**Markup:** `<div id="floating-cta">` inserted after the `<footer>` closing tag, containing a single `<a href="#contact" class="btn btn-primary btn-sm">Get a free assessment →</a>`

**Visibility logic:**
- Hidden by default (`opacity: 0; pointer-events: none; transform: translateY(16px)`)
- Shown (`.visible` class) when `window.scrollY > heroHeight` — hero height measured once on load
- Hidden again when `#contact` section enters viewport (`IntersectionObserver` on `#contact`)
- Transition: `opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)`

**Z-index: 90** — below nav (z-100) and mobile menu (z-99), above page content.

**Position:** `bottom: 28px; right: 28px`

**Mobile adjustment:** On screens ≤480px, `bottom: 20px; right: 16px` and slightly smaller via `.btn-sm`.

---

### Feature 3: Scroll Animation Audit & Fix

**What:** Audit all major sections for missing `.reveal` classes; add any that are absent in the same pass.

**Sections to audit:**
- Hero visual panel — already has `.reveal.reveal-delay-2`
- Services cards — already has `.reveal` + delay classes
- How It Works steps (`.hiw-step`) — already has `.reveal` + delays per HTML inspection
- Stats items — already has `.reveal` + delays
- Why Us cards — already has `.reveal` + delays
- Who We Serve cards — already has `.reveal` + delays
- CTA box — already has `.reveal`
- Problems section header — needs audit; the desktop panel is not animated, mobile accordion items are not animated
- Contact section header — needs audit

**Fix rule:** Any `.section-header`, top-level `.card`, or major block element without `.reveal` gets it added. No structural changes — class addition only.

---

## Phase 2 — Mobile DOM Unification (Problems Section)

**Problem:** The Problems section contains two fully separate DOM trees rendered for the same content:
- `.problem-inner` — desktop tab panel (~150 lines), hidden via `display: none !important` at ≤768px
- `.prob-accordion` + `.problem-mobile-head` — mobile accordion (~80 lines), hidden at >768px

Total duplicate content: ~230 lines of HTML.

**Solution:** Remove `.prob-accordion` and `.problem-mobile-head` entirely. Make the existing desktop tab structure also function as a mobile accordion using CSS-only responsive rules.

**Desktop behavior (>768px) — unchanged:**
- Left column: `.prob-tabs` with auto-advancing tab buttons and progress bar
- Right column: `.prob-panel-wrap` with panel content
- All existing tab JS, cycling, and ARIA attributes preserved exactly

**Mobile behavior (≤768px) — new CSS rules:**
- `.problem-inner` is un-hidden (remove `display: none !important` override)
- `.problem-inner` switches to `grid-template-columns: 1fr` (single column)
- `.prob-tabs` tab buttons become full-width with chevron indicator (via `::after` pseudo)
- Each `.prob-panel-wrap` moves below its button using CSS ordering or adjacent sibling approach
- Panel visibility: `.prob-panel-wrap` stays in its existing DOM position (after `.prob-tabs`). On mobile, all `.prob-panel-wrap` children are hidden by default; only the one whose panel matches the active tab button is shown. The existing JS already toggles `.active` on both buttons and panels — no JS changes needed for visibility, only CSS changes to show `.prob-panel-wrap .prob-panel.active` and hide the rest.
- Auto-advance cycling is disabled on mobile (JS checks `window.innerWidth <= 768` before starting the interval)

**Lines removed:** Target ~230 lines (the `.problem-mobile-head` div + `.prob-accordion` div and all children, plus accordion CSS rules).

**Post-implementation:** Confirm exact line count delta via `git diff --stat`.

---

## Constraints

- Single `index.html`, all styles inline — no external CSS files
- No new JS libraries
- All changes backward-compatible with existing sections
- Mobile-first responsive, no behavior regressions on desktop
