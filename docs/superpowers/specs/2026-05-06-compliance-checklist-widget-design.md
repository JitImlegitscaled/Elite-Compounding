# Design Spec: Compliance Gap Checker Widget
**Date:** 2026-05-06
**Status:** Approved

---

## Overview

Replace the right-column hero visual (`.hero-visual` and its isometric SVG) with an interactive compliance self-audit widget. The widget lets pharmacy visitors check off their compliance gaps and receive a tiered, dynamic response. Stat cards are preserved as a compact strip below the checklist card.

---

## Placement

- Replaces the entire contents of `.hero-visual` (the isometric SVG + floating stat cards in their current positions).
- The `.hero-visual` column remains in place within `.hero-inner` grid.
- Widget card is the dominant element; stat cards move to a horizontal strip directly below it, still inside `.hero-visual`.

---

## Widget Card

### Visual treatment
- Background: `rgba(10,20,50,0.72)`
- Border: `1px solid rgba(0,82,184,0.25)`
- Border-radius: `14px`
- Backdrop-filter: `blur(20px)`
- Box-shadow: `0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset`
- Matches the existing `.stat-card` glass treatment for visual coherence

### Header
- Small eyebrow label: "Compliance Self-Audit" (uppercase, cobalt-tinted, 11px)
- Title: "Is your facility covered?" (Montserrat 700, white, ~18px)
- Subtitle: "Check off what you're missing." (Inter, white 60% opacity, 13px)

---

## Toggle Items

### Default state
All 7 items start **checked/green** — meaning "I have this covered." The visitor unchecks items they're missing. Unchecked = gap.

### Gap count
`gapCount = number of unchecked items` (0–7)

### The 7 items
1. USP \<797\> Compliance Program
2. USP \<800\> Hazardous Drug Policies
3. Cleanroom Certification (ISO class current)
4. SOP Documentation (written & accessible)
5. Staff Training & Competency Records
6. Environmental Monitoring Program
7. Inspection Readiness Documentation

### Toggle row anatomy
- Full-width clickable row
- Left: item label (Inter 500, white 82% opacity when covered, white 45% + strikethrough when gap)
- Right: pill toggle — green (`#22c55e`) with checkmark icon when covered; muted red-orange (`rgba(239,68,68,0.7)`) with X icon when gap
- Hover: row gets subtle `rgba(255,255,255,0.04)` background
- Transition: `opacity 0.18s ease, background 0.18s ease` on label; toggle pill uses `background 0.2s ease`

---

## Footer Result Zone

Appears below the 7 items, separated by a `1px solid rgba(255,255,255,0.08)` divider. Updates reactively as items are toggled. State changes animate via `opacity 0.3s ease` (no layout shift — all three states occupy the same space, non-active ones have `opacity: 0; pointer-events: none`).

### State 1 — 0–2 gaps (0–2 unchecked)
- Tint: `rgba(34,197,94,0.08)` background, `rgba(34,197,94,0.2)` border
- Icon: green shield checkmark
- Message: **"You're in good shape. Let's keep it that way."**
- Sub-copy: "Stay ahead of regulatory changes with a maintenance review."
- CTA: Ghost-style button — "Schedule a Maintenance Review" (links to `#contact` section)

### State 2 — 3–4 gaps (3–4 unchecked)
- Tint: `rgba(245,158,11,0.08)` background, `rgba(245,158,11,0.2)` border
- Icon: amber warning triangle
- Message: **"You have some exposure. Let's talk."**
- Sub-copy: "A few gaps can compound into a failed inspection."
- CTA: Primary cobalt button — "Request a Quote"

### State 3 — 5–7 gaps (5–7 unchecked)
- Tint: `rgba(239,68,68,0.08)` background, `rgba(239,68,68,0.2)` border
- Icon: red alert circle
- Message: **"Your facility is at risk. You need this call."**
- Sub-copy: "Don't wait for an inspection to find out."
- CTA: Full-width urgent primary button — "Get Emergency Consultation" (links to `#contact`), styled with stronger box-shadow and slightly larger font than the standard primary button to signal urgency. No phone number (none exists yet).

### Initial state (0 gaps — all covered on load)
Show State 1 by default since all 7 start checked.

---

## Stat Cards Strip

The three existing stat cards (`100% Pass Rate`, `24hr Response`, `USP <797> Compliant`) are moved from absolute-floating positions into a compact horizontal flex row directly below the checklist card.

- Layout: `display: flex; gap: 8px; margin-top: 12px`
- Each card: same glass treatment as existing `.stat-card` but smaller padding (`10px 14px`), `flex: 1`
- No floating animations on the strip cards (they're static, not absolute-positioned)
- Keep the existing `.stat-card` class and add a modifier `.stat-card--strip` for the horizontal treatment

---

## Responsive

- On mobile (< 768px): `.hero-inner` already collapses to single column. Checklist card goes full-width below the headline/CTAs. Stat strip stacks or wraps.
- Toggle rows remain full-width tap targets (min 44px height).

---

## JavaScript

Pure vanilla JS, inline in `index.html`. No libraries.

- On load: all 7 items initialized as `covered = true`
- Each row click: toggles `covered` state, updates visual, recalculates `gapCount`, updates footer result zone
- Footer uses three pre-rendered state divs; active one has `opacity: 1`, others `opacity: 0`
- No form submission, no data sent anywhere

---

## What's Removed

- The isometric SVG (`<svg viewBox="0 0 460 400" ...>`) is removed entirely
- The three `.stat-card` divs with `position: absolute` and float animations are removed from their current positions and replaced by the strip below the checklist
