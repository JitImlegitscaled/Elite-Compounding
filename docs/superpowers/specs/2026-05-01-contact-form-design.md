# Contact Form Design Spec
**Date:** 2026-05-01  
**Project:** Elite Compounding Agency Website  
**Scope:** Add a real contact form to the `#contact` section with Web3Forms integration, inline validation, and multi-state submission flow.

---

## Overview

Replace the current `#contact` section's two CTA buttons ("Email Us Now" and phone number) with a functional contact form. The form submits to the Web3Forms API, which delivers messages to `info@elitecompoundingagency.com` with no backend required.

---

## Layout

**Card with cobalt header.** A self-contained card centered in the `#contact` section, max-width `520px`, replacing the existing button pair. Structure:

- **Header band:** cobalt blue (`#0070F3`) background, white text. Title: "Request a Free Assessment". Subtitle: "USP compliance specialists · 24hr response guarantee".
- **Body:** white background, `24px` padding on all sides. Contains the field grid and submit button.
- **Card shadow:** layered cobalt-tinted shadow, consistent with existing `.shadow-lg` token on the site.

The existing section headline ("Ready to get compliant?") and supporting copy remain above the card, unchanged.

---

## Fields

Five fields in a 2-column grid layout, with message spanning full width:

| Field | Type | Required | Row |
|---|---|---|---|
| Full Name | `text` input | Yes | 1 — left |
| Email | `email` input | Yes | 1 — right |
| Phone | `tel` input | No | 2 — left |
| Facility Type | `select` dropdown | No | 2 — right |
| Message | `textarea` (3 rows) | Yes | 3 — full width |

**Facility Type dropdown options:**
- 503A Pharmacy
- 503B Outsourcing Facility
- Hospital IV Room
- Oncology Clinic
- Nuclear Pharmacy
- Other

**Field label style:** uppercase, `11px`, `font-weight: 600`, `letter-spacing: 0.04em`, color `--text-2`. Required fields show a red asterisk (`*`).

---

## Validation

**Trigger:** On blur (when the user leaves a field). On submit, all fields are re-validated and any errors surface at once.

**Error state per field:**
- Border changes to `#ef4444` (red), `1.5px`
- Background tints to `#fff9f9`
- Error message appears below the field: `11px`, red, prefixed with `⚠`

**Valid state per field (after correction):**
- Border changes to `#22c55e` (green), `1.5px`
- Background tints to `#f9fff9`
- Helper text: `✓ Looks good` in green

**Validation rules:**
- Full Name: non-empty, minimum 2 characters
- Email: non-empty, valid email format (RFC-compliant regex)
- Message: non-empty, minimum 10 characters
- Phone: optional — if filled, must match a loose phone pattern (`[\d\s\-\+\(\)]{7,}`)
- Facility Type: optional, no validation needed

**Submit button disabled** while any required field has an active error.

---

## Submission Flow

### 1. Loading state
When the user clicks "Send Message" and all validation passes:
- Form fields fade to `opacity: 0.15` and become non-interactive (`pointer-events: none`)
- A centered spinner and "Sending your message…" text replace the visible content area
- Spinner: `40px` circle, `3px` border, `border-top-color: #0070F3`, CSS `spin` keyframe animation at `0.8s linear infinite`
- Submit button hides

### 2. Success state
On a successful Web3Forms API response (`{ success: true }` in JSON):
- Entire card body content swaps (CSS class toggle, no page reload) to:
  - Green circle checkmark icon (`52px`, `background: #dcfce7`)
  - Heading: "Message sent!" (`18px`, bold, `--text` color)
  - Body: "We'll be in touch within 24 hours. Check your inbox for a confirmation copy." (`13px`, `--text-2`, `line-height: 1.7`)
- Card header remains visible (cobalt band stays)
- Transition: `opacity` fade-in over `300ms`

### 3. Error state
On a failed API response or network error:
- Form fields return to normal (loading state reversed)
- A red error banner appears **below the textarea, above the submit button**:
  - Background `#fef2f2`, border `1px solid #fecaca`, border-radius `7px`
  - Icon `⚠` in `#ef4444`, bold title "Couldn't send your message", subtext with direct email fallback linking to `mailto:info@elitecompoundingagency.com`
- Submit button label changes to "Try Again"
- Banner dismisses and button resets on next valid submit attempt

---

## Web3Forms Integration

Web3Forms is a free, no-backend form API. Setup:

1. User registers at web3forms.com and gets an **access key** tied to `info@elitecompoundingagency.com`
2. The access key is placed in a hidden `<input name="access_key">` field inside the form
3. On submit, JavaScript sends a `fetch` POST to `https://api.web3forms.com/submit` with `Content-Type: application/json`, body containing all field values plus the access key
4. Web3Forms responds with `{ success: true }` or `{ success: false, message: "..." }`
5. The access key is not a secret (it's client-side by design — Web3Forms spam protection is handled server-side)

**Additional hidden fields to include:**
- `subject`: "New Assessment Request — Elite Compounding Agency"
- `from_name`: value of the Name field (so emails show sender name)
- `replyto`: value of the Email field (so replies go directly to the lead)

**Note on access key:** The implementation plan will include a placeholder `YOUR_WEB3FORMS_ACCESS_KEY` in the code. The user must replace this with their actual key before going live.

---

## Animation & Transitions

All transitions must use `transform` and/or `opacity` only — no `transition-all` (per project rules).

- **Field focus:** border color transitions `200ms ease`
- **Error/valid state:** border color + background `150ms ease`
- **Loading state:** form content `opacity` transition `250ms ease`
- **Success state:** content swap with `opacity` fade-in `300ms ease`
- **Submit button:** matches existing site button interaction style (scale + shadow on hover/active)

---

## Dark Mode

All new elements must respect the existing `[data-theme="dark"]` CSS variable system. Specifically:
- Card background uses `var(--bg)` / `var(--bg-soft)`
- Borders use `var(--border)`
- Text uses `var(--text)`, `var(--text-2)`, `var(--text-3)`
- Field backgrounds use `var(--bg)`
- Error/success tint colors will be darkened variants: error bg `#2d0a0a`, success bg `#0a2d0f` in dark mode
- Cobalt header band stays the same in both modes (already hard-coded dark per project pattern)

---

## Accessibility

- All inputs have explicit `<label>` elements with matching `for`/`id` pairs
- Required fields include `aria-required="true"`
- Error messages use `role="alert"` so screen readers announce them immediately on blur
- Submit button has descriptive `aria-label` that updates per state ("Send message", "Sending…", "Try again")
- Form has `aria-live="polite"` region wrapping the success/error states

---

## Files Changed

Only `index.html` is modified. All CSS and JS remain inline per project conventions.

- **CSS additions:** card styles, field states (error/valid/focus), spinner keyframe, success/loading state classes
- **HTML additions:** replace the two CTA buttons in `#contact` with the form markup
- **JS additions:** validation logic, blur handlers, submit handler with fetch, state transitions

No new files created.
