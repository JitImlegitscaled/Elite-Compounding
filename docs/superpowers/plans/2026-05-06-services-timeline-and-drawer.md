# Services Timeline + Card Drawer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 4-step "How it works" process timeline between Services and Stats, and add a slide-up footer drawer to each service card showing an outcome statement + micro-CTA.

**Architecture:** Pure CSS additions to `index.html` — new CSS rules in the `<style>` block, a new `<section>` in the HTML body, and `.service-drawer` elements added inside each existing `.service-card`. No JavaScript, no new files.

**Tech Stack:** HTML, CSS (custom properties, CSS Grid, CSS transitions). No build step — edit `index.html` directly.

---

## File Map

| File | Change |
|------|--------|
| `index.html` | Add CSS for `.how-it-works`, `.hiw-*`, `.service-drawer` + bump `.service-card` padding-bottom. Add `<section class="how-it-works">` after `.services` closing tag. Add `.service-drawer` as last child of each `.service-card`. |

---

### Task 1: Add CSS for the "How it works" timeline section

**Files:**
- Modify: `index.html` — inside `<style>`, after the `/* ─── SERVICES ───` block (around line 525)

- [ ] **Step 1: Locate the insertion point**

Open `index.html`. Find the line:
```css
    .services-banner span { font-weight: 700; }
```
This is the last rule in the Services CSS block. Insert the new block immediately after it.

- [ ] **Step 2: Insert the How It Works CSS block**

Add the following after `.services-banner span { font-weight: 700; }`:

```css
    /* ─── HOW IT WORKS ──────────────────────────────────────── */
    .how-it-works { padding: 96px 0; background: var(--bg-soft); }
    .hiw-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
      position: relative; margin-top: 56px;
    }
    /* dashed connector line through the node row */
    .hiw-grid::before {
      content: ''; position: absolute;
      top: 28px; /* half of 56px node height */
      left: calc(12.5% + 28px); right: calc(12.5% + 28px);
      border-top: 2px dashed var(--cobalt-border);
      z-index: 0;
    }
    .hiw-step {
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 0 16px; position: relative; z-index: 1;
    }
    .hiw-node {
      width: 56px; height: 56px; border-radius: 50%;
      background: var(--cobalt-light); border: 2px solid var(--cobalt-border);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-bottom: 20px; position: relative; z-index: 1;
      box-shadow: 0 0 0 6px var(--bg-soft); /* punches through the dashed line */
    }
    .hiw-node svg { width: 22px; height: 22px; color: var(--cobalt); }
    .hiw-num {
      position: absolute; top: -8px; left: -8px;
      width: 20px; height: 20px; border-radius: 50%;
      background: var(--cobalt); color: #fff;
      font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      letter-spacing: 0.02em;
    }
    .hiw-title {
      font-family: 'Montserrat', sans-serif; font-weight: 700;
      font-size: 16px; color: var(--text); margin-bottom: 10px;
      letter-spacing: -0.02em;
    }
    .hiw-desc {
      font-family: 'Inter', sans-serif; font-size: 13.5px;
      color: var(--text-2); line-height: 1.6; max-width: 200px;
    }
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: add How It Works timeline CSS"
```

---

### Task 2: Add CSS for the service card drawer

**Files:**
- Modify: `index.html` — inside `<style>`, after the How It Works block added in Task 1

- [ ] **Step 1: Locate insertion point**

Find the end of the How It Works CSS block you just added (`.hiw-desc { ... }`). Insert immediately after.

- [ ] **Step 2: Insert the drawer CSS**

```css
    /* ─── SERVICE CARD DRAWER ────────────────────────────────── */
    .service-card { padding-bottom: 52px; } /* override: was 36px uniform */
    .service-drawer {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: var(--cobalt);
      padding: 18px 28px;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      transform: translateY(100%); opacity: 0; pointer-events: none;
      transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease;
    }
    .service-card:hover .service-drawer {
      transform: translateY(0); opacity: 1; pointer-events: auto;
    }
    .service-drawer-outcome {
      font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 500;
      color: rgba(255,255,255,0.90); line-height: 1.5;
    }
    .service-drawer-cta {
      font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 600;
      color: #fff; opacity: 0.9; white-space: nowrap; flex-shrink: 0;
      transition: opacity 0.18s ease, letter-spacing 0.18s ease;
    }
    .service-drawer-cta:hover { opacity: 1; letter-spacing: 0.02em; }
    .service-drawer-cta:focus-visible { outline: 2px solid rgba(255,255,255,0.6); outline-offset: 3px; border-radius: 2px; }
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: add service card drawer CSS"
```

---

### Task 3: Add mobile responsive overrides

**Files:**
- Modify: `index.html` — inside the existing `@media (max-width: 768px)` block (around line 656)

- [ ] **Step 1: Locate the 768px media query block**

Find:
```css
    @media (max-width: 768px) {
```
Scroll to the end of that block. Add before the closing `}`:

```css
      .how-it-works { padding: 72px 0; }
      .hiw-grid { grid-template-columns: repeat(2, 1fr); gap: 40px 0; }
      .hiw-grid::before { display: none; }
      .hiw-step { padding: 0 8px; }
```

- [ ] **Step 2: Locate or add the 480px media query**

Search for `@media (max-width: 480px)`. If it exists, add inside it. If it doesn't exist, add a new block after the 768px block:

```css
    @media (max-width: 480px) {
      .hiw-grid { grid-template-columns: 1fr; gap: 36px 0; }
    }
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: add How It Works + drawer mobile responsive rules"
```

---

### Task 4: Insert the "How it works" HTML section

**Files:**
- Modify: `index.html` — HTML body, after line ~1277 (closing `</section>` of `.services`)

- [ ] **Step 1: Locate insertion point**

Find this comment in the HTML:
```html
<!-- ─── STATS ─────────────────────────────────────────────────── -->
```
Insert the new section immediately before this comment.

- [ ] **Step 2: Insert the HTML**

```html
<!-- ─── HOW IT WORKS ────────────────────────────────────────── -->
<section class="how-it-works" aria-labelledby="hiw-headline">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-eyebrow">Our Process</span>
      <h2 class="section-headline" id="hiw-headline">How it works</h2>
    </div>
    <div class="hiw-grid">

      <div class="hiw-step reveal">
        <div class="hiw-node">
          <span class="hiw-num" aria-hidden="true">01</span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <rect x="9" y="3" width="6" height="4" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M9 12H15M9 16H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="hiw-title">Assess</div>
        <p class="hiw-desc">We audit your facility against current USP &lt;797&gt;/&lt;800&gt; standards and identify every gap.</p>
      </div>

      <div class="hiw-step reveal reveal-delay-1">
        <div class="hiw-node">
          <span class="hiw-num" aria-hidden="true">02</span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="hiw-title">Plan</div>
        <p class="hiw-desc">A prioritized remediation roadmap is delivered within 5 business days.</p>
      </div>

      <div class="hiw-step reveal reveal-delay-2">
        <div class="hiw-node">
          <span class="hiw-num" aria-hidden="true">03</span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="hiw-title">Execute</div>
        <p class="hiw-desc">Our team implements fixes — SOPs, certifications, staffing — on your timeline.</p>
      </div>

      <div class="hiw-step reveal reveal-delay-3">
        <div class="hiw-node">
          <span class="hiw-num" aria-hidden="true">04</span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2L20 6.5V17.5C20 19.5 16.5 21 12 21.5C7.5 21 4 19.5 4 17.5V6.5L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="hiw-title">Maintain</div>
        <p class="hiw-desc">Ongoing monitoring, annual reviews, and pre-inspection readiness keep you compliant.</p>
      </div>

    </div>
  </div>
</section>

```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add How It Works timeline section"
```

---

### Task 5: Add drawer HTML to each service card

**Files:**
- Modify: `index.html` — inside each `.service-card` div (3 cards total, lines ~1219–1271)

- [ ] **Step 1: Add drawer to the Cleanroom Compliance card (`.service-card.featured`)**

Find the closing `</div>` of the `.service-card.featured` block — it comes after the `</ul>` that closes `.service-deliverables`. Insert the drawer as the last child before that `</div>`:

```html
        <div class="service-drawer" aria-hidden="true">
          <span class="service-drawer-outcome">Facilities we onboard pass their next inspection. Guaranteed.</span>
          <a href="#contact" class="service-drawer-cta">Get Started →</a>
        </div>
```

- [ ] **Step 2: Add drawer to the Sterile Staffing card (`.service-card.staffing`)**

Same pattern — insert as last child before the closing `</div>` of `.service-card.staffing`:

```html
        <div class="service-drawer" aria-hidden="true">
          <span class="service-drawer-outcome">Credentialed staff, deployed in 48–72 hours. No surprises.</span>
          <a href="#contact" class="service-drawer-cta">Find Staff →</a>
        </div>
```

- [ ] **Step 3: Add drawer to the Regulatory Consulting card (`.service-card.consulting`)**

Same pattern — insert as last child before the closing `</div>` of `.service-card.consulting`:

```html
        <div class="service-drawer" aria-hidden="true">
          <span class="service-drawer-outcome">We've resolved every citation we've ever taken on. Zero exceptions.</span>
          <a href="#contact" class="service-drawer-cta">Talk to Us →</a>
        </div>
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add outcome drawer to service cards"
```

---

### Task 6: Visual verification

**Files:**
- Read-only: `index.html`, browser

- [ ] **Step 1: Start the dev server**

```bash
node serve.mjs
```
Server runs at `http://localhost:3000`. If already running, skip.

- [ ] **Step 2: Screenshot desktop view**

```bash
node screenshot.mjs http://localhost:3000 services-desktop
```
Read the saved PNG from `temporary screenshots/`. Check:
- "How it works" section appears between services and stats bar
- 4 nodes visible in a row with dashed line running through them
- Step numbers (01–04) visible as small cobalt badges on each node
- Titles (Assess / Plan / Execute / Maintain) and descriptions render

- [ ] **Step 3: Screenshot to verify card drawer**

Hover state can't be captured with a static screenshot — visually verify in browser that:
- Hovering a service card causes the cobalt drawer to slide up from the bottom
- The outcome text and CTA are visible
- The `.service-deliverables` list above is not obscured

- [ ] **Step 4: Screenshot mobile view (768px)**

```bash
node screenshot.mjs http://localhost:3000/index.html?viewport=768 services-mobile
```
If the screenshot tool doesn't support viewport params, use DevTools in the browser to verify:
- Timeline collapses to 2×2 grid
- Dashed connector line is hidden
- Service cards still show drawers on hover/touch

- [ ] **Step 5: Fix any visual regressions, then final commit**

```bash
git add index.html
git commit -m "fix: visual adjustments from review pass"
```
(Only needed if changes were made in this step.)
