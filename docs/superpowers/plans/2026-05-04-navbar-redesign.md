# Navbar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the desktop navbar to show the ECA logo image + company name + subtitle on the left, centered nav links, and a single "Request a Quote" pill CTA on the right — matching the Anchor Digital reference pattern.

**Architecture:** Three surgical edits to `index.html` only — update two CSS rules, add a text block next to the logo image in the HTML, and remove the ghost CTA button from the desktop nav. No new files, no new classes beyond what already exists.

**Tech Stack:** Plain HTML/CSS in `index.html`. Dev server: `node serve.mjs`. Screenshots: `node screenshot.mjs http://localhost:3000 <label>`.

---

## Files

- Modify: `index.html:111-113` — CSS for `.nav-logo-img`, `.nav-logo-text`, `.nav-logo-text span`
- Modify: `index.html:551-553` — nav-logo anchor HTML (add text block)
- Modify: `index.html:562-565` — nav-ctas div HTML (remove ghost button)

---

### Task 1: Update nav logo CSS

**Files:**
- Modify: `index.html:111-113`

- [ ] **Step 1: Open `index.html` and locate the three nav logo CSS rules**

  Find lines 111–113 (inside the `<style>` block):
  ```css
  .nav-logo-img { height: 48px; width: auto; display: block; }
  .nav-logo-text { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: -0.02em; color: var(--text); line-height: 1.2; }
  .nav-logo-text span { display: block; font-size: 10px; font-weight: 400; color: var(--text-2); letter-spacing: 0.04em; text-transform: uppercase; font-family: 'Inter', sans-serif; }
  ```

- [ ] **Step 2: Replace those three lines with the updated rules**

  ```css
  .nav-logo-img { height: 44px; width: auto; display: block; }
  .nav-logo-text { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: -0.02em; color: #0A0F1E; line-height: 1.2; }
  .nav-logo-text span { display: block; font-size: 9.5px; font-weight: 400; color: #0052B8; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'Inter', sans-serif; }
  ```

  Changes:
  - `.nav-logo-img`: `height` 48px → **44px**
  - `.nav-logo-text`: `font-size` 16px → **15px**, `color` `var(--text)` → **`#0A0F1E`** (same value, made explicit)
  - `.nav-logo-text span`: `font-size` 10px → **9.5px**, `color` `var(--text-2)` → **`#0052B8`** (cobalt), `letter-spacing` 0.04em → **0.08em**

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "style: update nav logo CSS — 44px img, cobalt subtitle color"
  ```

---

### Task 2: Add company name + subtitle text to logo HTML

**Files:**
- Modify: `index.html:551-553`

- [ ] **Step 1: Locate the nav-logo anchor in the HTML** (around line 551)

  Current state:
  ```html
  <a href="#" class="nav-logo" aria-label="Elite Compounding Agency home" id="logo-link">
    <img src="logo-v2.png" alt="Elite Compounding Agency" class="nav-logo-img" />
  </a>
  ```

- [ ] **Step 2: Add the text block inside the anchor, after the `<img>`**

  ```html
  <a href="#" class="nav-logo" aria-label="Elite Compounding Agency home" id="logo-link">
    <img src="logo-v2.png" alt="Elite Compounding Agency" class="nav-logo-img" />
    <div class="nav-logo-text" aria-hidden="true">
      Elite Compounding Agency
      <span>Compliance Specialists</span>
    </div>
  </a>
  ```

  Note: `aria-hidden="true"` on the text div prevents screen readers from reading it twice (the `aria-label` on the `<a>` already covers it).

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "feat: add company name and subtitle text to navbar logo"
  ```

---

### Task 3: Remove ghost "Schedule a Call" button from desktop nav

**Files:**
- Modify: `index.html:562-565`

- [ ] **Step 1: Locate the `.nav-ctas` div** (around line 562)

  Current state:
  ```html
  <div class="nav-ctas">
    <a href="tel:0000000000" class="btn btn-ghost btn-sm">Schedule a Call</a>
    <a href="#contact" class="btn btn-primary btn-sm">Request a Quote</a>
  </div>
  ```

- [ ] **Step 2: Remove the ghost button, keep only the primary CTA**

  ```html
  <div class="nav-ctas">
    <a href="#contact" class="btn btn-primary btn-sm">Request a Quote</a>
  </div>
  ```

  The "Schedule a Call" button stays in the mobile menu at `.nav-mobile-btns` — do not touch that section.

- [ ] **Step 3: Verify mobile menu is unchanged** — find `.nav-mobile-btns` (around line 579) and confirm it still reads:

  ```html
  <div class="nav-mobile-btns">
    <a href="tel:0000000000" class="btn btn-ghost">Schedule a Call</a>
    <a href="#contact" class="btn btn-primary">Request a Quote</a>
  </div>
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat: remove ghost CTA from desktop nav, keep single Request a Quote button"
  ```

---

### Task 4: Screenshot and verify

**Files:** none (read-only verification)

- [ ] **Step 1: Ensure dev server is running**

  ```bash
  node serve.mjs
  ```

  Expected: `Serving on http://localhost:3000` (if already running, skip — don't start a second instance).

- [ ] **Step 2: Take a navbar crop screenshot**

  ```bash
  node screenshot.mjs http://localhost:3000 navbar-final
  ```

  Then read the saved PNG from `./temporary screenshots/screenshot-N-navbar-final.png` using the Read tool.

- [ ] **Step 3: Check against the reference design**

  Verify all of the following:
  - Logo image present, ~44px tall, vertically centered in the 72px nav
  - "Elite Compounding Agency" text in dark (`#0A0F1E`), bold, beside the logo
  - "COMPLIANCE SPECIALISTS" in cobalt blue (`#0052B8`), uppercase, smaller, below the name
  - Nav links (Services, Why Elite, Who We Serve, Contact) centered
  - Single "Request a Quote" blue pill button on the right — no ghost button beside it

- [ ] **Step 4: Take a full-page screenshot for regression check**

  ```bash
  node screenshot.mjs http://localhost:3000 fullpage-final
  ```

  Read the PNG and confirm no other sections of the page were affected.

- [ ] **Step 5: If anything looks off, fix and re-screenshot**

  Common issues:
  - Text too large → reduce `.nav-logo-text` font-size
  - Subtitle wrong color → check `.nav-logo-text span` color is `#0052B8` not `var(--text-2)`
  - Logo image too tall → check `.nav-logo-img` height is `44px`
