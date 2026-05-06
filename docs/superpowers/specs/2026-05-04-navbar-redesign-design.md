# Navbar Redesign — Design Spec
Date: 2026-05-04

## Overview

Redesign the desktop navbar to match the layout pattern from the reference image (Anchor Digital style): logo mark + company name + subtitle on the left, centered nav links, single pill CTA on the right. Keep the existing frosted-glass background and brand colors.

## Reference

The reference navbar (Anchor Digital) shows:
- Circular logo mark + bold company name + colored subtitle stacked beside it (left)
- Centered nav links, clean font weight
- Single pill-shaped CTA button (right)

## Changes

### 1. Logo Section (left)

**HTML:** Wrap the existing `<img>` and add a text block beside it inside `.nav-logo`:

```html
<a href="#" class="nav-logo" aria-label="Elite Compounding Agency home" id="logo-link">
  <img src="logo-v2.png" alt="Elite Compounding Agency" class="nav-logo-img" />
  <div class="nav-logo-text">
    Elite Compounding Agency
    <span>Compliance Specialists</span>
  </div>
</a>
```

**CSS changes:**
- `.nav-logo-img`: height `44px` (down from 48px to balance with text block)
- `.nav-logo-text`: `Montserrat` 700, `15px`, `#0A0F1E`, letter-spacing `-0.02em`, line-height `1.2`
- `.nav-logo-text span`: `Inter` 400, `9.5px`, `#0052B8` (cobalt), letter-spacing `0.08em`, `text-transform: uppercase`

### 2. Nav Links (center)

No changes to markup, font, weight, or hover behavior. Already matches the reference style.

### 3. CTA Buttons (right)

**Remove** the ghost "Schedule a Call" `<a>` from `.nav-ctas` on desktop.

**Keep** only:
```html
<a href="#contact" class="btn btn-primary btn-sm">Request a Quote</a>
```

The "Schedule a Call" link remains in the mobile menu (`.nav-mobile-btns`) — no change there.

### 4. Background / Height

No changes. Keep:
- `height: 72px`
- `background: rgba(255,255,255,0.82)` with `backdrop-filter: blur(18px) saturate(180%)`

## What Does NOT Change

- Nav height (72px)
- Frosted glass background
- Nav link styles and hover states
- Mobile hamburger menu and mobile nav content
- All other sections of the page

## Files Affected

- `index.html` — CSS block (nav styles) + nav HTML markup only
