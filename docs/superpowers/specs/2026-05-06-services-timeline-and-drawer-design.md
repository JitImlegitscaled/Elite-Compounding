# Services: Timeline + Card Drawer — Design Spec
**Date:** 2026-05-06  
**Status:** Approved

---

## Overview

Two independent UI enhancements to the Services section of `index.html`:

1. **"How it works" timeline** — 4-column grid inserted between the Services section and the Why Elite section.
2. **Service card footer drawer** — slide-up panel on card hover containing an outcome statement + micro-CTA.

---

## 1. "How it Works" Timeline

### Placement
Inserted immediately after the closing `</section>` of `.services` (line ~1277) and before the `<!-- STATS -->` section. Sits between the services grid and the stats bar, which sits between services and Why Elite.

### Structure
A new `<section class="how-it-works">` with:
- Standard `.section-header` (eyebrow: "Our Process", headline: "How it works", no sub-copy needed)
- A `.hiw-grid` — CSS grid with 4 equal columns
- Each step: `.hiw-step` containing:
  - `.hiw-node` — circle with step number (01–04) and an icon
  - `.hiw-title` — step name (Assess / Plan / Execute / Maintain)
  - `.hiw-desc` — 1-sentence description of what happens at that step
- A dashed connecting line runs horizontally through the center of the icon row

### Connecting Line
Implemented as a pseudo-element on `.hiw-grid::before`: absolute-positioned, vertically centered on the node row, `border-top: 2px dashed var(--cobalt-border)`. Z-index below the nodes so nodes sit on top of the line. The line spans from node 1 center to node 4 center (padded so it doesn't extend to edges).

### Step Content
| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 01 | Clipboard/checklist | Assess | We audit your facility against current USP &lt;797&gt;/&lt;800&gt; standards and identify every gap. |
| 02 | Document/plan | Plan | A prioritized remediation roadmap is delivered within 5 business days. |
| 03 | Wrench/gear | Execute | Our team implements fixes — SOPs, certifications, staffing — on your timeline. |
| 04 | Shield/check | Maintain | Ongoing monitoring, annual reviews, and pre-inspection readiness keep you compliant. |

### Styling
- Background: `var(--bg-soft)` — matches the site's alternating section rhythm
- Node circles: 56×56px, `background: var(--cobalt-light)`, `border: 2px solid var(--cobalt-border)`, step number in `var(--cobalt)` (Montserrat 700)
- Icon inside node: 22×22px SVG in `var(--cobalt)`
- Title: Montserrat 700, 16px, `var(--text)`
- Description: Inter 400, 13.5px, `var(--text-2)`, line-height 1.6
- Padding: `96px 0` desktop, `72px 0` mobile
- Reveal animation: `.reveal` class on each `.hiw-step` with staggered delay

### Mobile Behavior
- At ≤768px: grid collapses to 2×2
- Connecting line hides on mobile (pseudo-element `display:none`) — vertical reading order makes it unnecessary
- At ≤480px: 1-column stack

---

## 2. Service Card Footer Drawer

### Mechanism
Each `.service-card` gets a `.service-drawer` child as the last element inside the card. 

- Default state: `transform: translateY(100%)`, `opacity: 0`, `pointer-events: none`
- Hover state on parent `.service-card:hover .service-drawer`: `transform: translateY(0)`, `opacity: 1`, `pointer-events: auto`
- Transition: `transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease`

### Positioning
`.service-drawer` is `position: absolute; bottom: 0; left: 0; right: 0`. The parent `.service-card` already has `overflow: hidden` and `position: relative` — no structural changes needed.

### Drawer Content per Card
| Card | Outcome Statement | CTA text |
|------|-------------------|----------|
| Cleanroom Compliance (featured) | "Facilities we onboard pass their next inspection. Guaranteed." | Get Started → |
| Sterile Staffing Solutions | "Credentialed staff, deployed in 48–72 hours. No surprises." | Find Staff → |
| Regulatory Consulting | "We've resolved every citation we've ever taken on. Zero exceptions." | Talk to Us → |

All CTAs link to `#contact`.

### Visual Design
- Background: `var(--cobalt)` (solid blue)
- Text color: `#fff`
- Padding: `18px 28px`
- Outcome text: Inter 500, 13.5px, `rgba(255,255,255,0.90)`, line-height 1.5
- CTA link: Montserrat 600, 13px, `#fff`, `opacity: 0.9` default → `opacity: 1` + `letter-spacing: 0.02em` on hover
- Layout: flexbox, `justify-content: space-between`, `align-items: center`, `gap: 12px`
- CTA has a right-arrow `→` inline (not an icon — plain unicode)

### Existing card styles unaffected
- `.service-deliverables` list stays fully visible at all times — the drawer overlays only the bottom padding area
- Card `padding-bottom` increased from `36px` to `52px` to create a visual buffer zone that the drawer slides over — deliverables are never obscured when not hovering

---

## Files Changed

- `index.html` only — new CSS block, new HTML section, modified service card HTML

## No new files, no JS required
Both features are pure CSS. The existing IntersectionObserver scroll-reveal system already handles `.reveal` on new elements automatically.
