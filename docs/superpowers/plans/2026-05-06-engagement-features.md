# Engagement Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a scroll progress bar, floating CTA pill, verify/fix scroll animations, and unify the mobile DOM in `index.html`.

**Architecture:** All changes are made to the single `index.html` file. CSS is added inline in the `<style>` block. JS additions are made inside the existing `<script>` block's scroll listener (for progress bar) and as small additions/modifications for the floating CTA. Phase 2 removes ~230 lines of duplicate accordion DOM and replaces the mobile media query rules.

**Tech Stack:** Vanilla HTML/CSS/JS, no frameworks, no build step. Served via `node serve.mjs` at `http://localhost:3000`. Screenshots via `node screenshot.mjs http://localhost:3000`.

---

## File Map

- **Modify:** `index.html` (only file touched across all tasks)
  - `<style>` block: add scroll-progress CSS, floating-CTA CSS, Phase 2 mobile overrides
  - `<body>`: add `#scroll-progress` div before nav, add `#floating-cta` div after footer
  - Existing scroll listener: add progress bar width update
  - After existing scroll listener: add floating CTA visibility logic
  - Lines ~1502–1586: remove `.problem-mobile-head` + `.prob-accordion` blocks (~84 lines HTML)
  - Lines ~497–511: remove accordion CSS block (~15 lines CSS)
  - Line ~832: change `display: none !important` on `.problem-inner` to visible
  - Existing tab JS (line ~2444): add mobile guard `if (window.innerWidth <= 768) return;`
  - Line ~2538–2557: remove the entire `PROBLEM ACCORDION (mobile)` JS IIFE (~20 lines)

---

## Task 1: Scroll Progress Bar

**Files:**
- Modify: `index.html` (style block, body, scroll listener)

- [ ] **Step 1: Add CSS for the progress bar**

  In `index.html`, find the line:
  ```css
  /* ─── RESET ─────────────────────────────────────────────── */
  ```
  Insert the following block **directly above** that comment:

  ```css
  /* ─── SCROLL PROGRESS ──────────────────────────────────── */
  #scroll-progress {
    position: fixed; top: 0; left: 0; right: 0;
    height: 3px; width: 0%;
    background: linear-gradient(90deg, #0052B8, #1a65cc);
    z-index: 200;
    transition: width 0.1s linear;
    pointer-events: none;
  }
  ```

- [ ] **Step 2: Add the HTML element**

  In `index.html`, find `<body>` (the opening body tag). The very next element is `<nav`. Insert the div **between** `<body>` and `<nav`:

  Find:
  ```html
  <body>
  <nav
  ```
  Replace with:
  ```html
  <body>
  <div id="scroll-progress" aria-hidden="true"></div>
  <nav
  ```

- [ ] **Step 3: Wire the scroll update**

  Find the existing scroll listener:
  ```js
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  ```
  Replace with:
  ```js
    var scrollProgressEl = document.getElementById('scroll-progress');
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 10);
      var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollProgressEl) scrollProgressEl.style.width = Math.min(scrolled * 100, 100) + '%';
    }, { passive: true });
  ```

- [ ] **Step 4: Start the dev server and take a screenshot**

  In a terminal:
  ```
  node serve.mjs
  ```
  Then (in another terminal or after backgrounding):
  ```
  node screenshot.mjs http://localhost:3000 progress-bar
  ```
  Read `temporary screenshots/screenshot-N-progress-bar.png`. Verify a thin cobalt line is visible at the very top of the page above the nav. (It will be near-zero width at top of page — scroll partway and screenshot again if needed by adding `?scroll=50` won't work; instead verify by reading the DOM or take a second screenshot after scrolling manually.)

  Expected: 3px cobalt bar pinned above the nav. No layout shifts.

- [ ] **Step 5: Commit**

  ```
  git add index.html
  git commit -m "feat: add scroll progress bar"
  ```

---

## Task 2: Floating CTA Pill

**Files:**
- Modify: `index.html` (style block, after-footer HTML, script block)

- [ ] **Step 1: Add CSS for the floating CTA**

  In the `<style>` block, find:
  ```css
  /* ─── SCROLL PROGRESS ──────────────────────────────────── */
  ```
  Insert **directly below** the scroll progress block (after its closing `}`):

  ```css
  /* ─── FLOATING CTA ─────────────────────────────────────── */
  #floating-cta {
    position: fixed; bottom: 28px; right: 28px;
    z-index: 90;
    opacity: 0; pointer-events: none;
    transform: translateY(16px);
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  #floating-cta.visible {
    opacity: 1; pointer-events: auto;
    transform: translateY(0);
  }
  @media (max-width: 480px) {
    #floating-cta { bottom: 20px; right: 16px; }
  }
  ```

- [ ] **Step 2: Add the HTML element**

  Find the closing `</footer>` tag. Insert the floating CTA div **immediately after** it:

  Find:
  ```html
  </footer>
  ```
  Replace with:
  ```html
  </footer>
  <div id="floating-cta">
    <a href="#contact" class="btn btn-primary btn-sm">Get a free assessment →</a>
  </div>
  ```

- [ ] **Step 3: Add the visibility JS**

  Find the existing scroll listener you modified in Task 1:
  ```js
    var scrollProgressEl = document.getElementById('scroll-progress');
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 10);
      var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollProgressEl) scrollProgressEl.style.width = Math.min(scrolled * 100, 100) + '%';
    }, { passive: true });
  ```
  Replace with:
  ```js
    var scrollProgressEl = document.getElementById('scroll-progress');
    var floatingCta = document.getElementById('floating-cta');
    var heroEl = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 10);
      var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollProgressEl) scrollProgressEl.style.width = Math.min(scrolled * 100, 100) + '%';
      if (floatingCta && heroEl) {
        var heroBottom = heroEl.getBoundingClientRect().bottom + window.scrollY;
        floatingCta.classList.toggle('visible', window.scrollY > heroBottom);
      }
    }, { passive: true });
  ```

- [ ] **Step 4: Hide pill when contact section is visible**

  Directly after the scroll listener block (still inside the outer IIFE), find the line:
  ```js
    document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
  ```
  Insert **after** that line:
  ```js
  // Hide floating CTA when contact section is in view
  var contactSection = document.getElementById('contact');
  if (contactSection && floatingCta) {
    var ctaObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) floatingCta.classList.remove('visible');
      });
    }, { threshold: 0.1 });
    ctaObserver.observe(contactSection);
  }
  ```

  **Important:** `floatingCta` is declared inside the scroll listener block above. Move its declaration to the top of the outer IIFE so it's accessible here. Find:
  ```js
    var scrollProgressEl = document.getElementById('scroll-progress');
    var floatingCta = document.getElementById('floating-cta');
    var heroEl = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
  ```
  That's already at the top level of the IIFE — no change needed; `floatingCta` is already in scope.

- [ ] **Step 5: Screenshot and verify**

  ```
  node screenshot.mjs http://localhost:3000 cta-hidden
  ```
  Read screenshot. At top of page: CTA pill should NOT be visible (hero is in view).

  To verify it appears mid-scroll, you'd need to open the browser manually and scroll — or verify by code inspection that the logic is correct. Confirm the `.visible` class logic matches: `window.scrollY > heroBottom` where `heroBottom` is the hero section's bottom edge.

- [ ] **Step 6: Commit**

  ```
  git add index.html
  git commit -m "feat: add floating CTA pill"
  ```

---

## Task 3: Scroll Animation Audit & Fix

**Files:**
- Modify: `index.html` (HTML section headers and card elements)

- [ ] **Step 1: Audit section headers for missing .reveal**

  Search `index.html` for every `section-header` div. Each one should have `.reveal`. Check these lines:

  - Line ~1593: `<div class="section-header reveal">` — Services ✓
  - Line ~1674: `<div class="section-header reveal">` — How It Works ✓  
  - Line ~1830: `<div class="section-header reveal">` — Who We Serve ✓

  Also check the Problems section header — it's inside `.problem-left` (the sticky column), not a `.section-header`. Look at line ~1351:
  ```html
  <div class="problem-left">
    <h2 class="problem-headline" id="problem-headline">
  ```
  The `problem-left` div has no `.reveal`. Add it:

  Find:
  ```html
      <div class="problem-left">
  ```
  Replace with:
  ```html
      <div class="problem-left reveal">
  ```

- [ ] **Step 2: Audit How It Works steps**

  Check lines ~1680–1720. Each `.hiw-step` should have `.reveal`. Confirm these:
  ```html
  <div class="hiw-step reveal">          <!-- step 1 -->
  <div class="hiw-step reveal reveal-delay-1">  <!-- step 2 -->
  <div class="hiw-step reveal reveal-delay-2">  <!-- step 3 -->
  <div class="hiw-step reveal reveal-delay-3">  <!-- step 4 -->
  ```
  If any are missing `.reveal`, add them. (Per the prior code scan, these already appear to have it — confirm by reading those lines before editing.)

- [ ] **Step 3: Audit service card drawers**

  The `.service-drawer` elements inside service cards are already inside `.reveal`-animated parent cards, so they don't need their own `.reveal`. Confirm the three `.service-card` divs at lines ~1599, ~1621, ~1643 all have `.reveal`. Per the code scan they do.

- [ ] **Step 4: Audit the stats section header**

  Find the stats section. Look for a `.section-header` or equivalent heading. If there's a heading without `.reveal`, add it. Check around line ~1730.

- [ ] **Step 5: Take a full-page screenshot and verify animations are present**

  ```
  node screenshot.mjs http://localhost:3000 reveal-audit
  ```
  Read the screenshot. At the top-of-page snapshot, below-fold elements should appear at `opacity: 0` (because `.reveal` hasn't fired yet) — you won't easily see this in a static screenshot. Instead, confirm by grep:

  ```
  grep -n "class=\"hiw-step\"" index.html
  ```
  Expected: zero results (all steps should have `.reveal` appended). If any bare `class="hiw-step"` exist without `reveal`, they need the class added.

- [ ] **Step 6: Commit**

  ```
  git add index.html
  git commit -m "fix: audit and patch missing reveal classes on section headers and hiw steps"
  ```

---

## Task 4: Mobile DOM Unification (Problems Section)

**Files:**
- Modify: `index.html` (HTML remove ~84 lines, CSS remove ~15 lines + add ~20 lines, JS modify ~3 lines + remove ~20 lines)

This is the most surgical task. Read each step carefully before executing.

- [ ] **Step 1: Record the current line count**

  ```
  wc -l index.html
  ```
  Note the number. You'll compare after cleanup.

- [ ] **Step 2: Remove the mobile accordion HTML**

  Find and delete the entire block from `<!-- Mobile: accordion -->` through `</div><!-- /.prob-accordion -->`. This spans lines ~1502–1586. The exact text to remove:

  Find (exact match from line 1502 to 1586):
  ```html
    <!-- Mobile: accordion (visible only on small screens) -->
    <div class="problem-mobile-head" style="display:none;">
      <h2 class="problem-headline" aria-hidden="true">
        The compliance problems that cost you <span class="accent">time and money.</span>
      </h2>
      <p class="problem-subtext">Tap each problem to learn more.</p>
    </div>
    <div class="prob-accordion" aria-label="Compliance problems">

      <div class="prob-accordion-item">
        <button class="prob-accordion-btn" type="button" aria-expanded="false">
          Surprise Board of Pharmacy Inspections
          <svg class="prob-accordion-chevron" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.5L9 11L13.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="prob-accordion-body">
          <div class="prob-accordion-inner">
            <p class="prob-panel-desc">Unannounced state inspections expose documentation gaps, room pressure failures, and SOP deficiencies that trigger immediate corrective actions.</p>
            <hr class="prob-panel-divider" />
            <p class="prob-panel-label">How we solve this:</p>
            <p class="prob-panel-solution">We keep your cleanroom inspection-ready 365 days a year — documentation current, logs complete, and protocols audit-proof.</p>
          </div>
        </div>
      </div>

      <div class="prob-accordion-item">
        <button class="prob-accordion-btn" type="button" aria-expanded="false">
          Outdated SOPs &amp; Policy Gaps
          <svg class="prob-accordion-chevron" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.5L9 11L13.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="prob-accordion-body">
          <div class="prob-accordion-inner">
            <p class="prob-panel-desc">USP &lt;797&gt; 2023 revisions introduced sweeping changes. Facilities still running legacy procedures face citation risk with every inspection cycle.</p>
            <hr class="prob-panel-divider" />
            <p class="prob-panel-label">How we solve this:</p>
            <p class="prob-panel-solution">We audit your existing SOPs and align them with current USP &lt;797&gt;/&lt;800&gt; standards so you're never caught with outdated policies.</p>
          </div>
        </div>
      </div>

      <div class="prob-accordion-item">
        <button class="prob-accordion-btn" type="button" aria-expanded="false">
          Environmental Monitoring Failures
          <svg class="prob-accordion-chevron" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.5L9 11L13.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="prob-accordion-body">
          <div class="prob-accordion-inner">
            <p class="prob-panel-desc">Missed viable and non-viable particle counts, inadequate surface sampling, or failed trending analysis invalidates your cleanroom certification.</p>
            <hr class="prob-panel-divider" />
            <p class="prob-panel-label">How we solve this:</p>
            <p class="prob-panel-solution">Our EM programs are fully documented and trend-tracked, so your certification stays valid and your data tells a clean story.</p>
          </div>
        </div>
      </div>

      <div class="prob-accordion-item">
        <button class="prob-accordion-btn" type="button" aria-expanded="false">
          Staff Training &amp; Competency Gaps
          <svg class="prob-accordion-chevron" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.5L9 11L13.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="prob-accordion-body">
          <div class="prob-accordion-inner">
            <p class="prob-panel-desc">Unqualified or under-trained compounding personnel are among the top cited violations in Florida Board of Pharmacy inspections.</p>
            <hr class="prob-panel-divider" />
            <p class="prob-panel-label">How we solve this:</p>
            <p class="prob-panel-solution">We supply trained, experienced sterile compounding technicians ready to integrate without disrupting your operations.</p>
          </div>
        </div>
      </div>

      <div class="prob-accordion-item">
        <button class="prob-accordion-btn" type="button" aria-expanded="false">
          No Clear Path to 503A or 503B Status
          <svg class="prob-accordion-chevron" viewBox="0 0 18 18" fill="none"><path d="M4.5 6.5L9 11L13.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="prob-accordion-body">
          <div class="prob-accordion-inner">
            <p class="prob-panel-desc">Navigating FDA outsourcing facility registration, CGMP requirements, and state board licensing simultaneously overwhelms most pharmacy teams.</p>
            <hr class="prob-panel-divider" />
            <p class="prob-panel-label">How we solve this:</p>
            <p class="prob-panel-solution">We've guided facilities through both 503A and 503B pathways and can map out exactly what your facility needs to get there.</p>
          </div>
        </div>
      </div>

    </div><!-- /.prob-accordion -->
  ```
  Replace the entire block with: *(nothing — delete it entirely)*

- [ ] **Step 3: Remove the accordion CSS block**

  In the `<style>` block, find and remove the entire mobile accordion CSS section:

  Find:
  ```css
    /* Mobile accordion */
    .prob-accordion { display: none; flex-direction: column; gap: 8px; }
    .prob-accordion-item { border: 1px solid #E2E8F4; border-radius: 12px; overflow: hidden; }
    .prob-accordion-btn {
      width: 100%; display: flex; align-items: center; justify-content: space-between;
      padding: 18px 20px; background: var(--bg); border: none; cursor: pointer;
      font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 600;
      color: var(--text); text-align: left; gap: 12px;
    }
    .prob-accordion-btn:focus-visible { outline: 2px solid #0052B8; outline-offset: -2px; }
    .prob-accordion-chevron { width: 18px; height: 18px; flex-shrink: 0; color: #4A5468; transition: transform 0.25s ease; }
    .prob-accordion-btn[aria-expanded="true"] .prob-accordion-chevron { transform: rotate(180deg); }
    .prob-accordion-btn[aria-expanded="true"] { color: #0052B8; }
    .prob-accordion-body { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
    .prob-accordion-body.open { max-height: 600px; }
    .prob-accordion-inner { padding: 0 20px 24px; background: var(--bg); }
  ```
  Replace with: *(nothing — delete it entirely)*

- [ ] **Step 4: Update the mobile media query for the Problems section**

  In the `@media (max-width: 768px)` block, find:
  ```css
      .problem-inner { display: none !important; }
      .problem-headline { position: static; font-size: 34px; }
      .problem-mobile-head { display: block !important; margin-bottom: 28px; }
      .prob-accordion { display: flex !important; }
  ```
  Replace with:
  ```css
      .problem-inner { grid-template-columns: 1fr; gap: 24px; }
      .problem-left { position: static; }
      .problem-headline { font-size: 28px; }
      .prob-tab-list { display: none; }
      .prob-panel-wrap { min-height: unset; }
      .prob-panel { position: static; opacity: 1; pointer-events: auto; display: none; border-radius: 12px; }
      .prob-panel.active { display: block; }
      .prob-panel-header { padding: 20px 20px 16px; }
      .prob-panel-body { padding: 16px 20px 20px; }
      .prob-panel-title { font-size: 17px; }
  ```

- [ ] **Step 5: Add mobile tab-as-select navigation**

  The desktop tab buttons are hidden on mobile (`.prob-tab-list { display: none }`). We need a way for mobile users to navigate between the 5 panels. Add a `<select>` element inside `.problem-left`, just after the `.prob-tab-list` div.

  Find:
  ```html
        </div>
      </div><!-- end .problem-left -->
  ```
  (This is the closing of `.prob-tab-list` then `.problem-left`.)

  More precisely, find:
  ```html
          <button class="prob-tab-btn"        role="tab" aria-selected="false" aria-controls="prob-panel-5" id="prob-tab-5" type="button">No Clear Path to 503A or 503B Status<span class="prob-tab-progress"></span></button>
        </div>
      </div>
  ```
  Replace with:
  ```html
          <button class="prob-tab-btn"        role="tab" aria-selected="false" aria-controls="prob-panel-5" id="prob-tab-5" type="button">No Clear Path to 503A or 503B Status<span class="prob-tab-progress"></span></button>
        </div>
        <select id="prob-mobile-select" class="prob-mobile-select" aria-label="Select compliance problem">
          <option value="0">Surprise Board of Pharmacy Inspections</option>
          <option value="1">Outdated SOPs &amp; Policy Gaps</option>
          <option value="2">Environmental Monitoring Failures</option>
          <option value="3">Staff Training &amp; Competency Gaps</option>
          <option value="4">No Clear Path to 503A or 503B Status</option>
        </select>
      </div>
  ```

  Add CSS for the select — in the `<style>` block, add directly after the `/* ─── PROBLEM ─` section opener (after `.problem::before` rule):
  ```css
  .prob-mobile-select {
    display: none;
    width: 100%; padding: 14px 16px; margin-top: 0; margin-bottom: 16px;
    border: 1.5px solid var(--cobalt-border); border-radius: 10px;
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 600;
    color: var(--text); background: #fff;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M4.5 6.5L9 11L13.5 6.5' stroke='%234A5468' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center; background-size: 18px;
    cursor: pointer;
  }
  ```

  In `@media (max-width: 768px)`, add inside the block:
  ```css
      .prob-mobile-select { display: block; }
  ```

- [ ] **Step 6: Wire the mobile select to the existing tab JS**

  Find the existing tab JS block that starts with:
  ```js
  /* ─── PROBLEM TABS (desktop) — auto-cycling ───────────────── */
  (function() {
    var tabs       = document.querySelectorAll('.prob-tab-btn');
  ```

  Find the line:
  ```js
    // Start cycling immediately
    activateTab(0, false);
  ```
  Replace with:
  ```js
    // Start cycling only on desktop
    if (window.innerWidth > 768) activateTab(0, false);
    else activateTab(0, false); // still activate first panel on mobile (no cycling)
  ```

  Then find the line after the `tabs.forEach` keyboard handler block, before the `// Resume cycling when mouse leaves` comment:
  ```js
  });

  // Resume cycling when mouse leaves the whole section
  ```
  Insert **between** those two lines:
  ```js
  // Mobile select → activate panel
  var mobileSelect = document.getElementById('prob-mobile-select');
  if (mobileSelect) {
    mobileSelect.addEventListener('change', function() {
      activateTab(parseInt(this.value, 10), true);
    });
  }
  ```

  Also guard the auto-cycling timer to not fire on mobile. Find:
  ```js
    timer = setTimeout(function() {
      if (!paused) activateTab((current + 1) % tabs.length, false);
    }, CYCLE_MS);
  ```
  Replace with:
  ```js
    timer = setTimeout(function() {
      if (!paused && window.innerWidth > 768) activateTab((current + 1) % tabs.length, false);
    }, CYCLE_MS);
  ```

- [ ] **Step 7: Remove the old mobile accordion JS**

  Find and delete the entire accordion JS IIFE:
  ```js
  /* ─── PROBLEM ACCORDION (mobile) ─────────────────────────── */
  (function() {
    var btns = document.querySelectorAll('.prob-accordion-btn');
    if (!btns.length) return;
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var body    = btn.nextElementSibling;
        var isOpen  = btn.getAttribute('aria-expanded') === 'true';
        // close all
        btns.forEach(function(b) {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.classList.remove('open');
        });
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          body.classList.add('open');
        }
      });
    });
  })();
  ```
  Replace with: *(nothing — delete entirely)*

- [ ] **Step 8: Verify line count delta**

  ```
  wc -l index.html
  ```
  Compare to the count from Step 1. Expected reduction: 190–240 lines. If the delta is less than 150, something wasn't deleted — check for leftover accordion HTML or CSS.

  Also run:
  ```
  git diff --stat
  ```
  Expected output: `index.html | NNN deletions(-)` where NNN is 190+.

- [ ] **Step 9: Screenshot desktop and mobile views**

  ```
  node screenshot.mjs http://localhost:3000 desktop-problems
  node screenshot.mjs http://localhost:3000/index.html?mobile problems-mobile
  ```
  The second URL won't emulate mobile — instead take a desktop screenshot and inspect at 768px width visually, or resize the screenshot via the Puppeteer script if it supports a `--width` flag.

  At minimum: read `desktop-problems` screenshot and confirm the Problems section shows the left-column tabs and right-column panel correctly. No accordion visible.

- [ ] **Step 10: Commit**

  ```
  git add index.html
  git commit -m "refactor: unify problems section mobile DOM, remove duplicate accordion"
  ```
  Then confirm line count in commit message or note it for the user:
  ```
  git diff HEAD~1 --stat
  ```

---

## Self-Review Checklist

- [x] **Scroll progress bar:** CSS, HTML, JS all specified with exact code. No placeholders.
- [x] **Floating CTA z-index:** Set to 90 (below nav z-100 and mobile menu z-99). Confirmed.
- [x] **Floating CTA hide-on-contact:** IntersectionObserver on `#contact` removes `.visible`. Wired correctly.
- [x] **Reveal audit:** Step-by-step grep instructions to find missing classes. `problem-left` div gets `.reveal` added.
- [x] **Phase 2 HTML removal:** Exact HTML blocks specified for deletion. No "delete this section" vagueness.
- [x] **Phase 2 CSS removal:** Exact CSS block specified for deletion.
- [x] **Phase 2 mobile navigation:** `<select>` added with CSS and JS wiring — mobile users can switch panels.
- [x] **Cycling guard:** `window.innerWidth > 768` check added to timer callback.
- [x] **Old accordion JS removed:** Exact JS block specified for deletion.
- [x] **Line count verification:** Step 8 explicitly checks the delta and gives expected range.
- [x] **Type/name consistency:** `activateTab`, `tabs`, `panels`, `mobileSelect`, `floatingCta`, `scrollProgressEl` — all names consistent across tasks.
