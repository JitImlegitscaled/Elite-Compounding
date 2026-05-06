# Compliance Gap Checker Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero's right-column isometric SVG with an interactive compliance self-audit widget that shows a dynamic result CTA based on how many gaps the visitor identifies.

**Architecture:** All changes are in `index.html` — styles added to the `<style>` block, HTML replaces the `.hero-visual` div contents, and vanilla JS appended before `</body>`. No build step, no external dependencies beyond what's already loaded.

**Tech Stack:** Plain HTML/CSS/JS. Existing brand tokens (`--cobalt`, `--cobalt-dark`, etc.) and font stack (Montserrat + Inter). Node `serve.mjs` for local preview.

---

## File Map

| File | What changes |
|------|-------------|
| `index.html:227–236` | Replace `.hero-visual` and `.hero-svg-wrap` CSS with checklist card + strip styles |
| `index.html:239–257` | Replace absolute floating `.stat-card` position/animation CSS with `.stat-card--strip` modifier |
| `index.html:508–513` | Replace mobile overrides for `.hero-visual` and `.stat-card-*` with checklist responsive styles |
| `index.html:674–773` | Replace `.hero-visual` HTML contents (SVG + floating stat cards) with checklist card + stat strip |
| `index.html` (before `</body>`) | Add `<script>` block for toggle + result zone logic |

---

## Task 1: Add CSS — Checklist Card Shell

**Files:**
- Modify: `index.html:227–236` (replace `.hero-visual` and `.hero-svg-wrap` rules)

- [ ] **Step 1: Replace the `.hero-visual` and `.hero-svg-wrap` CSS rules**

Find this block (lines 227–236):
```css
    .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; padding: 30px 24px 50px; }
    .hero-visual::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,82,184,0.12) 0%, transparent 75%);
      pointer-events: none;
      border-radius: 50%;
    }
    .hero-svg-wrap { position: relative; width: 100%; max-width: 460px; filter: drop-shadow(0 8px 32px rgba(0,82,184,0.18)) brightness(1.15) saturate(1.2); }
```

Replace with:
```css
    .hero-visual { position: relative; display: flex; flex-direction: column; align-items: stretch; justify-content: center; gap: 12px; padding: 0; }

    /* ─── COMPLIANCE CHECKLIST CARD ─────────────────────────────── */
    .checklist-card {
      background: rgba(10,20,50,0.72);
      border: 1px solid rgba(0,82,184,0.25);
      border-radius: 14px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset;
      overflow: hidden;
    }
    .checklist-header { padding: 20px 24px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .checklist-eyebrow {
      font-family: 'Inter', sans-serif; font-size: 10.5px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #60a5fa; margin-bottom: 6px;
    }
    .checklist-title {
      font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 17px;
      color: #fff; line-height: 1.25; margin-bottom: 3px;
    }
    .checklist-subtitle { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.55); }

    /* ─── TOGGLE ROWS ────────────────────────────────────────────── */
    .checklist-items { padding: 8px 0; }
    .checklist-row {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; padding: 10px 24px; cursor: pointer;
      transition: background 0.18s ease;
    }
    .checklist-row:hover { background: rgba(255,255,255,0.04); }
    .checklist-row:focus-visible { outline: 2px solid var(--cobalt); outline-offset: -2px; }
    .checklist-label {
      font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 500;
      color: rgba(255,255,255,0.82); line-height: 1.4;
      transition: color 0.2s ease, text-decoration 0.2s ease;
      user-select: none;
    }
    .checklist-row.gap .checklist-label { color: rgba(255,255,255,0.42); text-decoration: line-through; }
    .checklist-toggle {
      flex-shrink: 0; width: 52px; height: 26px; border-radius: 100px;
      background: rgba(34,197,94,0.85);
      border: 1px solid rgba(34,197,94,0.4);
      display: flex; align-items: center; justify-content: center; gap: 4px;
      transition: background 0.2s ease, border-color 0.2s ease;
      position: relative;
    }
    .checklist-row.gap .checklist-toggle {
      background: rgba(239,68,68,0.6);
      border-color: rgba(239,68,68,0.35);
    }
    .checklist-toggle svg { width: 12px; height: 12px; color: #fff; flex-shrink: 0; }
    .checklist-toggle .icon-check { display: block; }
    .checklist-toggle .icon-x { display: none; }
    .checklist-row.gap .checklist-toggle .icon-check { display: none; }
    .checklist-row.gap .checklist-toggle .icon-x { display: block; }

    /* ─── RESULT ZONE ────────────────────────────────────────────── */
    .checklist-result-wrap { border-top: 1px solid rgba(255,255,255,0.08); padding: 16px 24px 20px; position: relative; }
    .checklist-result {
      opacity: 0; pointer-events: none;
      transition: opacity 0.3s ease;
      position: absolute; inset: 16px 24px 20px;
    }
    .checklist-result.active { opacity: 1; pointer-events: auto; position: relative; inset: auto; }
    .checklist-result-inner {
      border-radius: 10px; padding: 14px 16px;
      border: 1px solid;
    }
    .checklist-result--good .checklist-result-inner { background: rgba(34,197,94,0.07); border-color: rgba(34,197,94,0.25); }
    .checklist-result--warn .checklist-result-inner { background: rgba(245,158,11,0.07); border-color: rgba(245,158,11,0.25); }
    .checklist-result--urgent .checklist-result-inner { background: rgba(239,68,68,0.07); border-color: rgba(239,68,68,0.25); }
    .checklist-result-msg {
      font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13.5px;
      color: #fff; line-height: 1.35; margin-bottom: 3px;
    }
    .checklist-result-sub {
      font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.55);
      margin-bottom: 12px; line-height: 1.5;
    }
    .checklist-cta {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 18px; border-radius: 100px; font-family: 'Montserrat', sans-serif;
      font-size: 12.5px; font-weight: 600; letter-spacing: 0.02em; cursor: pointer;
      text-decoration: none; transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease, background 0.18s ease;
      white-space: nowrap;
    }
    .checklist-cta:focus-visible { outline: 2px solid var(--cobalt); outline-offset: 3px; }
    .checklist-cta:active { transform: scale(0.97) !important; }
    .checklist-cta--ghost {
      background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.18); backdrop-filter: blur(8px);
    }
    .checklist-cta--ghost:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3); transform: translateY(-2px); }
    .checklist-cta--primary {
      background: linear-gradient(135deg, var(--cobalt) 0%, var(--cobalt-dark) 100%);
      color: #fff; border: none; box-shadow: var(--shadow-cobalt);
    }
    .checklist-cta--primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,82,184,0.38), 0 4px 12px rgba(0,82,184,0.22); }
    .checklist-cta--urgent {
      width: 100%; justify-content: center;
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: #fff; border: none;
      box-shadow: 0 8px 24px rgba(220,38,38,0.4), 0 2px 8px rgba(220,38,38,0.25);
      font-size: 13px;
    }
    .checklist-cta--urgent:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(220,38,38,0.5), 0 4px 12px rgba(220,38,38,0.3); }
```

- [ ] **Step 2: Start the dev server (if not already running)**

```bash
node serve.mjs
```

Expected: `Listening on http://localhost:3000`

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: add compliance checklist card CSS"
```

---

## Task 2: Add CSS — Stat Card Strip

**Files:**
- Modify: `index.html:239–257` (replace floating `.stat-card` position/animation rules)

- [ ] **Step 1: Replace the floating stat-card position/animation CSS**

Find this block (lines 239–257):
```css
    /* Floating stat cards — dark hero */
    .stat-card {
      position: absolute;
      background: rgba(10,20,50,0.75);
      border: 1px solid rgba(0,82,184,0.25);
      border-radius: 14px; padding: 14px 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset;
      backdrop-filter: blur(20px);
      display: flex; align-items: center; gap: 12px; white-space: nowrap; z-index: 10;
    }
    .stat-card-icon { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #0070f3, #0ea5e9); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 12px rgba(0,82,184,0.5); }
    .stat-card-icon svg { width: 18px; height: 18px; color: #fff; }
    .stat-card-val { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 15px; color: #fff; line-height: 1.2; }
    .stat-card-lbl { font-size: 11px; color: rgba(255,255,255,0.55); font-weight: 400; }
    .stat-card-1 { top: 5%; right: 0; animation: float1 4.5s ease-in-out infinite; }
    .stat-card-2 { bottom: 28%; left: 0; animation: float2 5s ease-in-out infinite; }
    .stat-card-3 { bottom: 4%; right: 8%; animation: float3 4s ease-in-out infinite; }
    @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
```

Replace with:
```css
    /* ─── STAT STRIP (below checklist card) ─────────────────────── */
    .stat-strip { display: flex; gap: 8px; }
    .stat-card {
      flex: 1;
      background: rgba(10,20,50,0.72);
      border: 1px solid rgba(0,82,184,0.25);
      border-radius: 10px; padding: 10px 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: flex; align-items: center; gap: 8px;
    }
    .stat-card-icon { width: 30px; height: 30px; border-radius: 8px; background: linear-gradient(135deg, #0070f3, #0ea5e9); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,82,184,0.5); }
    .stat-card-icon svg { width: 14px; height: 14px; color: #fff; }
    .stat-card-val { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 11.5px; color: #fff; line-height: 1.2; }
    .stat-card-lbl { font-size: 10px; color: rgba(255,255,255,0.5); font-weight: 400; }
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "style: convert floating stat cards to horizontal strip"
```

---

## Task 3: Update Mobile CSS Overrides

**Files:**
- Modify: `index.html:508–513` (responsive block inside `@media`)

- [ ] **Step 1: Find and replace the mobile hero-visual and stat-card overrides**

Find (around line 508–513, inside the mobile media query):
```css
      .hero-inner { grid-template-columns: 1fr; gap: 52px; }
      .hero-headline { font-size: 42px; }
      .hero-visual { max-width: 420px; margin: 0 auto; }
      .stat-card-1 { right: 0; top: 5%; }
      .stat-card-2 { left: 0; bottom: 15%; }
      .stat-card-3 { right: 10%; bottom: -5%; }
```

Replace with:
```css
      .hero-inner { grid-template-columns: 1fr; gap: 52px; }
      .hero-headline { font-size: 42px; }
      .hero-visual { max-width: 480px; margin: 0 auto; }
      .stat-strip { flex-wrap: wrap; }
      .stat-card { min-width: calc(50% - 4px); }
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "style: update mobile responsive overrides for checklist + stat strip"
```

---

## Task 4: Replace Hero Visual HTML

**Files:**
- Modify: `index.html:674–773` (the entire `.hero-visual` div)

- [ ] **Step 1: Replace the `.hero-visual` div contents**

Find the entire block from line 674 to 773 (the `<div class="hero-visual reveal reveal-delay-2">` through its closing `</div>`):

```html
      <div class="hero-visual reveal reveal-delay-2">
        <div class="hero-svg-wrap">
          <svg viewBox="0 0 460 400" ...>
            ...
          </svg>

          <div class="stat-card stat-card-1">...</div>
          <div class="stat-card stat-card-2">...</div>
          <div class="stat-card stat-card-3">...</div>
        </div>
      </div>
```

Replace it with:

```html
      <div class="hero-visual reveal reveal-delay-2">

        <!-- Compliance Gap Checker Card -->
        <div class="checklist-card" role="region" aria-label="Compliance self-audit">
          <div class="checklist-header">
            <div class="checklist-eyebrow">Compliance Self-Audit</div>
            <div class="checklist-title">Is your facility covered?</div>
            <div class="checklist-subtitle">Uncheck anything you're missing.</div>
          </div>

          <div class="checklist-items" role="list">
            <div class="checklist-row" role="listitem" tabindex="0" data-item="0" aria-pressed="true">
              <span class="checklist-label">USP &lt;797&gt; Compliance Program</span>
              <span class="checklist-toggle" aria-hidden="true">
                <svg class="icon-check" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="icon-x" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
            </div>
            <div class="checklist-row" role="listitem" tabindex="0" data-item="1" aria-pressed="true">
              <span class="checklist-label">USP &lt;800&gt; Hazardous Drug Policies</span>
              <span class="checklist-toggle" aria-hidden="true">
                <svg class="icon-check" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="icon-x" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
            </div>
            <div class="checklist-row" role="listitem" tabindex="0" data-item="2" aria-pressed="true">
              <span class="checklist-label">Cleanroom Certification (ISO class current)</span>
              <span class="checklist-toggle" aria-hidden="true">
                <svg class="icon-check" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="icon-x" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
            </div>
            <div class="checklist-row" role="listitem" tabindex="0" data-item="3" aria-pressed="true">
              <span class="checklist-label">SOP Documentation (written &amp; accessible)</span>
              <span class="checklist-toggle" aria-hidden="true">
                <svg class="icon-check" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="icon-x" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
            </div>
            <div class="checklist-row" role="listitem" tabindex="0" data-item="4" aria-pressed="true">
              <span class="checklist-label">Staff Training &amp; Competency Records</span>
              <span class="checklist-toggle" aria-hidden="true">
                <svg class="icon-check" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="icon-x" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
            </div>
            <div class="checklist-row" role="listitem" tabindex="0" data-item="5" aria-pressed="true">
              <span class="checklist-label">Environmental Monitoring Program</span>
              <span class="checklist-toggle" aria-hidden="true">
                <svg class="icon-check" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="icon-x" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
            </div>
            <div class="checklist-row" role="listitem" tabindex="0" data-item="6" aria-pressed="true">
              <span class="checklist-label">Inspection Readiness Documentation</span>
              <span class="checklist-toggle" aria-hidden="true">
                <svg class="icon-check" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="icon-x" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </span>
            </div>
          </div>

          <!-- Result zone — 3 pre-rendered states, JS toggles .active -->
          <div class="checklist-result-wrap" aria-live="polite">

            <div class="checklist-result checklist-result--good active" id="result-good">
              <div class="checklist-result-inner">
                <div class="checklist-result-msg">You're in good shape. Let's keep it that way.</div>
                <div class="checklist-result-sub">Stay ahead of regulatory changes with a maintenance review.</div>
                <a href="#contact" class="checklist-cta checklist-cta--ghost">Schedule a Maintenance Review</a>
              </div>
            </div>

            <div class="checklist-result checklist-result--warn" id="result-warn">
              <div class="checklist-result-inner">
                <div class="checklist-result-msg">You have some exposure. Let's talk.</div>
                <div class="checklist-result-sub">A few gaps can compound into a failed inspection.</div>
                <a href="#contact" class="checklist-cta checklist-cta--primary">Request a Quote</a>
              </div>
            </div>

            <div class="checklist-result checklist-result--urgent" id="result-urgent">
              <div class="checklist-result-inner">
                <div class="checklist-result-msg">Your facility is at risk. You need this call.</div>
                <div class="checklist-result-sub">Don't wait for an inspection to find out.</div>
                <a href="#contact" class="checklist-cta checklist-cta--urgent">Get Emergency Consultation</a>
              </div>
            </div>

          </div>
        </div>

        <!-- Stat strip -->
        <div class="stat-strip" aria-label="Key credentials">
          <div class="stat-card">
            <div class="stat-card-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.5L13.5 4.5V11.5C13.5 13 11 14 8 14.5C5 14 2.5 13 2.5 11.5V4.5L8 1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <div class="stat-card-val">100% Pass Rate</div>
              <div class="stat-card-lbl">All audits &amp; inspections</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/>
                <path d="M8 5V8.5L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <div class="stat-card-val">24hr Response</div>
              <div class="stat-card-lbl">Guaranteed SLA</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <div class="stat-card-val">USP &lt;797&gt; Compliant</div>
              <div class="stat-card-lbl">Certified specialists</div>
            </div>
          </div>
        </div>

      </div>
```

- [ ] **Step 2: Screenshot and verify the widget renders**

```bash
node screenshot.mjs http://localhost:3000 checklist-initial
```

Read `temporary screenshots/screenshot-N-checklist-initial.png`. Verify:
- Right column shows the checklist card, not the SVG illustration
- All 7 rows visible with green toggles (checkmarks)
- Stat strip shows 3 cards below
- "You're in good shape" result zone visible

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace hero SVG with compliance gap checker widget HTML"
```

---

## Task 5: Add JavaScript

**Files:**
- Modify: `index.html` — append `<script>` block immediately before `</body>`

- [ ] **Step 1: Find the closing `</body>` tag and insert the script block before it**

Locate `</body>` near the end of the file and insert immediately before it:

```html
<script>
(function() {
  var rows = document.querySelectorAll('.checklist-row');
  var resultGood = document.getElementById('result-good');
  var resultWarn = document.getElementById('result-warn');
  var resultUrgent = document.getElementById('result-urgent');

  function getGapCount() {
    var count = 0;
    rows.forEach(function(row) {
      if (row.classList.contains('gap')) count++;
    });
    return count;
  }

  function updateResult() {
    var gaps = getGapCount();
    resultGood.classList.remove('active');
    resultWarn.classList.remove('active');
    resultUrgent.classList.remove('active');
    if (gaps <= 2) {
      resultGood.classList.add('active');
    } else if (gaps <= 4) {
      resultWarn.classList.add('active');
    } else {
      resultUrgent.classList.add('active');
    }
  }

  function toggleRow(row) {
    var isGap = row.classList.toggle('gap');
    row.setAttribute('aria-pressed', isGap ? 'false' : 'true');
    updateResult();
  }

  rows.forEach(function(row) {
    row.addEventListener('click', function() { toggleRow(row); });
    row.addEventListener('keydown', function(e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleRow(row);
      }
    });
  });
})();
</script>
```

- [ ] **Step 2: Screenshot with gaps toggled — test all 3 result states**

In browser DevTools console or by clicking, verify:
- Unchecking 1 row → still shows "You're in good shape"
- Unchecking 3 rows → shows "You have some exposure"
- Unchecking 5 rows → shows "Your facility is at risk"

Take a screenshot:
```bash
node screenshot.mjs http://localhost:3000 checklist-js
```

Read the screenshot. Confirm toggles are interactive (rows should show gap state visually).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add compliance checklist toggle + result zone JS"
```

---

## Task 6: Screenshot Review & Polish

**Files:**
- Modify: `index.html` (CSS tweaks only if needed)

- [ ] **Step 1: Full-page screenshot — desktop**

```bash
node screenshot.mjs http://localhost:3000 checklist-desktop-final
```

Read the screenshot. Check:
- Hero two-column layout intact (headline left, checklist right)
- Card doesn't overflow or clip
- Stat strip is flush below the card with correct gap
- Result zone visible and not cut off
- No leftover SVG or floating stat card artifacts

- [ ] **Step 2: Mobile screenshot**

```bash
node screenshot.mjs http://localhost:3000/index.html?mobile checklist-mobile
```

Or resize manually. Check:
- Single-column layout: checklist card stacks below headline/CTAs
- Stat strip wraps correctly (2+1 or 3 horizontal)
- Toggle rows are tall enough for touch (min 44px)

- [ ] **Step 3: Fix any visual issues found, then commit**

```bash
git add index.html
git commit -m "fix: compliance checklist polish after screenshot review"
```

---

## Self-Review Checklist

- [x] **Spec: all 7 items present** — Tasks 4 lists all 7 rows by exact label
- [x] **Spec: default state all checked/green** — rows start without `.gap` class; `aria-pressed="true"` signals covered
- [x] **Spec: gap count = unchecked items** — `toggleRow` adds `.gap` on uncheck; `getGapCount` counts `.gap` rows
- [x] **Spec: 3-tier result states (0–2 / 3–4 / 5–7)** — `updateResult` uses `gaps <= 2` / `gaps <= 4` / else
- [x] **Spec: glassmorphic card treatment** — matches exact rgba/blur values from spec
- [x] **Spec: result zone opacity transition, no layout shift** — `.checklist-result` uses `position: absolute` for inactive states, `position: relative` for active, with `opacity` transition only
- [x] **Spec: stat strip below card** — `.stat-strip` in HTML after `.checklist-card`, inside `.hero-visual`
- [x] **Spec: no phone number** — urgent CTA links to `#contact` only
- [x] **Spec: ghost / primary / urgent CTA variants** — `.checklist-cta--ghost`, `--primary`, `--urgent` all defined in Task 1
- [x] **Spec: floating animation keyframes removed** — Task 2 removes `float1/2/3` keyframes and absolute positioning
- [x] **Type consistency** — `checklist-row`, `gap`, `active`, `result-good/warn/urgent` IDs consistent across Tasks 1, 4, 5
- [x] **No placeholders** — all code blocks are complete and exact
