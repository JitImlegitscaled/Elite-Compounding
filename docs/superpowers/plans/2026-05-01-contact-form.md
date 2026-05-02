# Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two CTA buttons in the `#contact` section with a real contact form that validates on blur, submits to the Web3Forms API, and handles loading/success/error states.

**Architecture:** All changes are in `index.html` — CSS added inline in the `<style>` block, HTML replaces the `.cta-buttons` div, and JS appended before `</script>`. The form is a self-contained card with a cobalt header band, a 2-column field grid, and three display states (form / loading / success) toggled via CSS classes.

**Tech Stack:** Vanilla JS, CSS custom properties (existing design system), Web3Forms REST API (`https://api.web3forms.com/submit`), no new dependencies.

---

## File Map

| File | Change |
|---|---|
| `index.html:1048–1093` | Add form card CSS after `.cta-buttons {}` block |
| `index.html:1939–1948` | Replace `.cta-buttons` div with form markup |
| `index.html:2145` | Append contact form JS before closing `</script>` |

---

## Task 1: Add CSS — form card, fields, and state classes

**Files:**
- Modify: `index.html` — insert new CSS block after line 1093 (end of `.cta-buttons {}`)

- [ ] **Step 1: Open index.html and locate the insertion point**

Find this exact block (ends at line 1093):
```css
    .cta-buttons {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
    }
```
Insert the following CSS **immediately after** the closing `}` of `.cta-buttons`, before the `/* ─── FOOTER */` comment.

- [ ] **Step 2: Insert the contact form CSS**

```css
    /* ─── CONTACT FORM ─────────────────────────────────────── */
    .contact-card {
      width: 100%;
      max-width: 520px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }
    .contact-card-header {
      background: var(--cobalt);
      padding: 24px 28px;
    }
    .contact-card-title {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 700;
      font-size: 17px;
      color: #fff;
      margin-bottom: 4px;
    }
    .contact-card-sub {
      font-size: 12px;
      color: rgba(255,255,255,0.75);
    }
    .contact-card-body {
      background: var(--bg);
      padding: 24px 28px;
      position: relative;
    }
    .contact-field-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 14px;
    }
    .contact-field-full {
      margin-bottom: 14px;
    }
    .contact-label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--text-2);
      margin-bottom: 5px;
    }
    .contact-label .required {
      color: #ef4444;
      margin-left: 2px;
    }
    .contact-input,
    .contact-select,
    .contact-textarea {
      width: 100%;
      background: var(--bg);
      border: 1.5px solid var(--border);
      border-radius: 7px;
      padding: 9px 12px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: var(--text);
      outline: none;
      transition: border-color 0.2s ease;
      appearance: none;
      -webkit-appearance: none;
    }
    .contact-input:focus,
    .contact-select:focus,
    .contact-textarea:focus {
      border-color: var(--cobalt);
    }
    .contact-select {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%234A5468' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 10px center;
      padding-right: 28px;
    }
    .contact-textarea {
      resize: vertical;
      min-height: 80px;
    }
    .contact-field-wrap {
      position: relative;
    }
    .contact-field-wrap.is-error .contact-input,
    .contact-field-wrap.is-error .contact-select,
    .contact-field-wrap.is-error .contact-textarea {
      border-color: #ef4444;
      background: #fff9f9;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .contact-field-wrap.is-valid .contact-input,
    .contact-field-wrap.is-valid .contact-select,
    .contact-field-wrap.is-valid .contact-textarea {
      border-color: #22c55e;
      background: #f9fff9;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .contact-field-msg {
      font-size: 11px;
      margin-top: 4px;
      min-height: 16px;
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .contact-field-wrap.is-error .contact-field-msg { color: #ef4444; }
    .contact-field-wrap.is-valid .contact-field-msg { color: #22c55e; }
    [data-theme="dark"] .contact-field-wrap.is-error .contact-input,
    [data-theme="dark"] .contact-field-wrap.is-error .contact-select,
    [data-theme="dark"] .contact-field-wrap.is-error .contact-textarea { background: #2d0a0a; }
    [data-theme="dark"] .contact-field-wrap.is-valid .contact-input,
    [data-theme="dark"] .contact-field-wrap.is-valid .contact-select,
    [data-theme="dark"] .contact-field-wrap.is-valid .contact-textarea { background: #0a2d0f; }
    .contact-error-banner {
      display: none;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 7px;
      padding: 12px 14px;
      margin-bottom: 12px;
      gap: 10px;
      align-items: flex-start;
    }
    .contact-error-banner.visible { display: flex; }
    [data-theme="dark"] .contact-error-banner { background: #2d0a0a; border-color: #7f1d1d; }
    .contact-error-banner-icon { color: #ef4444; font-size: 16px; line-height: 1; flex-shrink: 0; margin-top: 1px; }
    .contact-error-banner-title { font-weight: 600; font-size: 13px; color: #dc2626; }
    .contact-error-banner-sub { font-size: 11px; color: var(--text-2); margin-top: 3px; }
    .contact-error-banner-sub a { color: var(--cobalt); }
    .contact-submit {
      width: 100%;
      margin-top: 4px;
    }
    /* Loading overlay — shown inside .contact-card-body while submitting */
    .contact-loading {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      padding: 48px 0;
    }
    .contact-loading.visible { display: flex; }
    .contact-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--cobalt-light);
      border-top-color: var(--cobalt);
      border-radius: 50%;
      animation: contact-spin 0.8s linear infinite;
    }
    @keyframes contact-spin { to { transform: rotate(360deg); } }
    .contact-loading-text { font-size: 13px; color: var(--text-2); }
    /* Success state — replaces form content */
    .contact-success {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 40px 0;
      text-align: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .contact-success.visible { display: flex; }
    .contact-success.fade-in { opacity: 1; }
    .contact-success-icon {
      width: 52px;
      height: 52px;
      background: #dcfce7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
    }
    .contact-success-title {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 700;
      font-size: 18px;
      color: var(--text);
    }
    .contact-success-body {
      font-size: 13px;
      color: var(--text-2);
      line-height: 1.7;
    }
    /* Form fields opacity fade during loading */
    .contact-form-fields {
      transition: opacity 0.25s ease;
    }
    .contact-form-fields.loading {
      opacity: 0.15;
      pointer-events: none;
    }
    @media (max-width: 540px) {
      .contact-card-header { padding: 18px 20px; }
      .contact-card-body { padding: 18px 20px; }
      .contact-field-grid { grid-template-columns: 1fr; }
    }
```

- [ ] **Step 3: Verify the CSS was added correctly**

Open `index.html` in a text editor and confirm:
- The new `/* ─── CONTACT FORM */` comment block appears after `.cta-buttons {}` and before `/* ─── FOOTER */`
- No existing CSS was removed or displaced
- The file still ends with `</script></body></html>`

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "style: add contact form card and field state CSS"
```

---

## Task 2: Replace HTML — swap CTA buttons for form markup

**Files:**
- Modify: `index.html:1939–1948` — replace `.cta-buttons` div with form

- [ ] **Step 1: Locate and replace the `.cta-buttons` div**

Find this exact block (lines 1939–1948):
```html
      <div class="cta-buttons">
        <a href="mailto:info@elitecompoundingagency.com" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4L8 9L14 4M2 4H14V12H2V4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
          Email Us Now
        </a>
        <a href="tel:0000000000" class="btn btn-ghost">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 2H7L8.5 5.5L6.5 6.5C7.3 8.1 8 8.8 9.5 9.5L10.5 7.5L14 9V11.5C14 12.5 13 13.5 12 13.5C7 13.5 2.5 9 2.5 4C2.5 3 3.5 2 4.5 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
          (000) 000-0000
        </a>
      </div>
```

Replace it with:
```html
      <form
        id="contact-form"
        class="contact-card"
        novalidate
        aria-label="Request a free assessment"
      >
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
        <input type="hidden" name="subject" value="New Assessment Request — Elite Compounding Agency">
        <input type="hidden" name="from_name" id="hidden-from-name" value="">
        <input type="hidden" name="replyto" id="hidden-replyto" value="">
        <input type="checkbox" name="botcheck" style="display:none">

        <div class="contact-card-header">
          <div class="contact-card-title">Request a Free Assessment</div>
          <div class="contact-card-sub">USP compliance specialists · 24hr response guarantee</div>
        </div>

        <div class="contact-card-body" aria-live="polite">

          <!-- Form fields (faded during loading) -->
          <div class="contact-form-fields" id="contact-form-fields">

            <!-- Row 1: Name + Email -->
            <div class="contact-field-grid">
              <div class="contact-field-wrap" id="wrap-name">
                <label class="contact-label" for="contact-name">
                  Full Name <span class="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  class="contact-input"
                  placeholder="Jane Smith"
                  autocomplete="name"
                  aria-required="true"
                  aria-describedby="msg-name"
                >
                <div class="contact-field-msg" id="msg-name" role="alert"></div>
              </div>
              <div class="contact-field-wrap" id="wrap-email">
                <label class="contact-label" for="contact-email">
                  Email <span class="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  class="contact-input"
                  placeholder="jane@pharmacy.com"
                  autocomplete="email"
                  aria-required="true"
                  aria-describedby="msg-email"
                >
                <div class="contact-field-msg" id="msg-email" role="alert"></div>
              </div>
            </div>

            <!-- Row 2: Phone + Facility Type -->
            <div class="contact-field-grid">
              <div class="contact-field-wrap" id="wrap-phone">
                <label class="contact-label" for="contact-phone">Phone</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  class="contact-input"
                  placeholder="(555) 000-0000"
                  autocomplete="tel"
                  aria-describedby="msg-phone"
                >
                <div class="contact-field-msg" id="msg-phone" role="alert"></div>
              </div>
              <div class="contact-field-wrap" id="wrap-facility">
                <label class="contact-label" for="contact-facility">Facility Type</label>
                <select
                  id="contact-facility"
                  name="facility_type"
                  class="contact-select"
                >
                  <option value="">Select type…</option>
                  <option value="503A Pharmacy">503A Pharmacy</option>
                  <option value="503B Outsourcing Facility">503B Outsourcing Facility</option>
                  <option value="Hospital IV Room">Hospital IV Room</option>
                  <option value="Oncology Clinic">Oncology Clinic</option>
                  <option value="Nuclear Pharmacy">Nuclear Pharmacy</option>
                  <option value="Other">Other</option>
                </select>
                <div class="contact-field-msg" id="msg-facility"></div>
              </div>
            </div>

            <!-- Row 3: Message (full width) -->
            <div class="contact-field-full">
              <div class="contact-field-wrap" id="wrap-message">
                <label class="contact-label" for="contact-message">
                  Message <span class="required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  class="contact-textarea"
                  rows="3"
                  placeholder="Tell us about your compliance challenge…"
                  aria-required="true"
                  aria-describedby="msg-message"
                ></textarea>
                <div class="contact-field-msg" id="msg-message" role="alert"></div>
              </div>
            </div>

            <!-- Error banner (shown on API failure) -->
            <div class="contact-error-banner" id="contact-error-banner" role="alert">
              <span class="contact-error-banner-icon" aria-hidden="true">⚠</span>
              <div>
                <div class="contact-error-banner-title">Couldn't send your message</div>
                <div class="contact-error-banner-sub">
                  Please try again, or email us at
                  <a href="mailto:info@elitecompoundingagency.com">info@elitecompoundingagency.com</a>
                </div>
              </div>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              id="contact-submit"
              class="btn btn-primary contact-submit"
              aria-label="Send message"
            >
              Send Message →
            </button>

          </div><!-- /contact-form-fields -->

          <!-- Loading state -->
          <div class="contact-loading" id="contact-loading" aria-live="polite" aria-label="Sending message">
            <div class="contact-spinner" aria-hidden="true"></div>
            <div class="contact-loading-text">Sending your message…</div>
          </div>

          <!-- Success state -->
          <div class="contact-success" id="contact-success">
            <div class="contact-success-icon" aria-hidden="true">✓</div>
            <div class="contact-success-title">Message sent!</div>
            <div class="contact-success-body">
              We'll be in touch within 24 hours.<br>
              Check your inbox for a confirmation copy.
            </div>
          </div>

        </div><!-- /contact-card-body -->
      </form>
```

- [ ] **Step 2: Verify the HTML structure**

Open `index.html` and confirm:
- The `<form id="contact-form">` is now inside `.cta-box`, replacing the old `.cta-buttons` div
- The `.cta-box` still contains the `.cta-headline` and `.cta-sub` elements above the form
- The file still has `</section>` closing the `#contact` section after the form
- The hidden `botcheck` checkbox is present (Web3Forms spam protection)

- [ ] **Step 3: Also update the `.cta-box` CSS to support the new layout**

The existing `.cta-box` uses `grid-template-columns: 1fr auto` — this was designed for the headline+copy on the left and buttons on the right. Now the form sits below the headline, so change `.cta-box` to a single-column flex layout.

Find this CSS:
```css
    .cta-box {
      background: var(--bg);
      border: 1px solid var(--border);
      border-left: 5px solid var(--cobalt);
      border-radius: var(--radius-lg);
      padding: 64px 72px;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 48px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
```

Replace with:
```css
    .cta-box {
      background: var(--bg);
      border: 1px solid var(--border);
      border-left: 5px solid var(--cobalt);
      border-radius: var(--radius-lg);
      padding: 64px 72px;
      display: flex;
      flex-direction: column;
      gap: 36px;
      align-items: flex-start;
      position: relative;
      overflow: hidden;
    }
```

- [ ] **Step 4: Start the dev server and visually verify the form renders**

```bash
node serve.mjs
```

Open `http://localhost:3000` in a browser, scroll to the `#contact` section. Confirm:
- Card with cobalt header is visible
- Five fields render in the 2-column grid
- "Send Message →" button is present
- No layout breakage elsewhere on the page
- Dark mode toggle still works and fields adapt correctly

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add contact form markup to #contact section"
```

---

## Task 3: Add JS — validation, submission, and state transitions

**Files:**
- Modify: `index.html` — append JS before the closing `</script>` tag (currently at line 2146)

- [ ] **Step 1: Locate the JS insertion point**

Find the closing `</script>` tag at the bottom of `index.html`. Insert the following block **immediately before** `</script>`.

- [ ] **Step 2: Insert the contact form JavaScript**

```js
  // ── Contact form
  (function () {
    const form        = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
      name:     { el: document.getElementById('contact-name'),     wrap: document.getElementById('wrap-name'),     msg: document.getElementById('msg-name') },
      email:    { el: document.getElementById('contact-email'),    wrap: document.getElementById('wrap-email'),    msg: document.getElementById('msg-email') },
      phone:    { el: document.getElementById('contact-phone'),    wrap: document.getElementById('wrap-phone'),    msg: document.getElementById('msg-phone') },
      message:  { el: document.getElementById('contact-message'), wrap: document.getElementById('wrap-message'), msg: document.getElementById('msg-message') },
    };
    const submitBtn     = document.getElementById('contact-submit');
    const formFields    = document.getElementById('contact-form-fields');
    const loadingEl     = document.getElementById('contact-loading');
    const successEl     = document.getElementById('contact-success');
    const errorBanner   = document.getElementById('contact-error-banner');
    const hiddenName    = document.getElementById('hidden-from-name');
    const hiddenReplyTo = document.getElementById('hidden-replyto');

    // Validation rules — return error string or '' if valid
    function validate(key, value) {
      if (key === 'name') {
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      }
      if (key === 'email') {
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address';
        return '';
      }
      if (key === 'phone') {
        if (value.trim() && !/^[\d\s\-\+\(\)]{7,}$/.test(value.trim())) return 'Enter a valid phone number';
        return '';
      }
      if (key === 'message') {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      }
      return '';
    }

    function setFieldState(key, error) {
      const { wrap, msg } = fields[key];
      wrap.classList.remove('is-error', 'is-valid');
      if (error) {
        wrap.classList.add('is-error');
        msg.textContent = '⚠ ' + error;
      } else if (fields[key].el.value.trim() !== '') {
        wrap.classList.add('is-valid');
        msg.textContent = '✓ Looks good';
      } else {
        msg.textContent = '';
      }
    }

    function clearFieldState(key) {
      fields[key].wrap.classList.remove('is-error', 'is-valid');
      fields[key].msg.textContent = '';
    }

    // Attach blur handlers
    Object.keys(fields).forEach(key => {
      fields[key].el.addEventListener('blur', () => {
        const error = validate(key, fields[key].el.value);
        setFieldState(key, error);
      });
      // Clear error state as soon as user starts typing after an error
      fields[key].el.addEventListener('input', () => {
        if (fields[key].wrap.classList.contains('is-error')) {
          const error = validate(key, fields[key].el.value);
          setFieldState(key, error);
        }
      });
    });

    function showLoading() {
      formFields.classList.add('loading');
      loadingEl.classList.add('visible');
    }

    function hideLoading() {
      formFields.classList.remove('loading');
      loadingEl.classList.remove('visible');
    }

    function showSuccess() {
      formFields.style.display = 'none';
      loadingEl.classList.remove('visible');
      successEl.classList.add('visible');
      // Trigger fade-in on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => successEl.classList.add('fade-in'));
      });
    }

    function showError() {
      hideLoading();
      errorBanner.classList.add('visible');
      submitBtn.textContent = 'Try Again →';
      submitBtn.setAttribute('aria-label', 'Try again');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Re-validate all required fields
      let hasError = false;
      ['name', 'email', 'phone', 'message'].forEach(key => {
        const error = validate(key, fields[key].el.value);
        setFieldState(key, error);
        if (error) hasError = true;
      });
      if (hasError) return;

      // Dismiss any previous error banner
      errorBanner.classList.remove('visible');
      submitBtn.textContent = 'Send Message →';
      submitBtn.setAttribute('aria-label', 'Send message');

      // Sync hidden fields
      hiddenName.value    = fields.name.el.value.trim();
      hiddenReplyTo.value = fields.email.el.value.trim();

      showLoading();

      const payload = {
        access_key:    form.querySelector('[name="access_key"]').value,
        subject:       'New Assessment Request — Elite Compounding Agency',
        from_name:     fields.name.el.value.trim(),
        replyto:       fields.email.el.value.trim(),
        name:          fields.name.el.value.trim(),
        email:         fields.email.el.value.trim(),
        phone:         fields.phone.el.value.trim(),
        facility_type: form.querySelector('[name="facility_type"]').value,
        message:       fields.message.el.value.trim(),
        botcheck:      '',
      };

      try {
        const res  = await fetch('https://api.web3forms.com/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body:    JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showSuccess();
        } else {
          showError();
        }
      } catch (_) {
        showError();
      }
    });
  })();
```

- [ ] **Step 3: Verify the JS was added correctly**

Confirm the new IIFE block appears immediately before `</script>` with no syntax errors. The existing JS above it is untouched.

- [ ] **Step 4: Start the dev server and test each state manually**

```bash
node serve.mjs
```

Open `http://localhost:3000`, scroll to `#contact` and run these checks:

**Blur validation:**
- Click into the Name field, then click away without typing → error "Full name is required" appears
- Type a single character → error "Name must be at least 2 characters"
- Type "Jane Smith" → field turns green with "✓ Looks good"
- Type an invalid email like `jane@` then blur → error "Enter a valid email address"
- Type a valid email → turns green
- Leave phone blank → no error (optional field)
- Type `abc` into phone → error "Enter a valid phone number"
- Click into message, type 5 characters, blur → error "Message must be at least 10 characters"

**Submit validation:**
- Leave all fields blank, click "Send Message →" → all three required fields show errors simultaneously

**Loading state:**
- Fill all required fields with valid data, click Submit
- Form fields should fade to ~15% opacity; spinner and "Sending your message…" text should appear in the card body

**Note on testing success/error states:** Web3Forms requires a real access key. With `YOUR_WEB3FORMS_ACCESS_KEY` placeholder, the API will return `{ success: false }` — this is expected and lets you verify the error banner appears. To test the success state, temporarily replace the fetch with:
```js
// TEST ONLY — remove before committing
await new Promise(r => setTimeout(r, 1000));
showSuccess();
return;
```

**Dark mode check:**
- Toggle dark mode — verify card background, field borders, label text, and error tint all adapt

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: contact form validation, submission, and state transitions"
```

---

## Task 4: Screenshot and visual QA

**Files:**
- No code changes — visual verification only

- [ ] **Step 1: Take a screenshot of the contact section**

```bash
node screenshot.mjs http://localhost:3000/#contact contact-form
```

Screenshot saves to `temporary screenshots/screenshot-N-contact-form.png`. Read it with the Read tool and verify:
- Card has cobalt header band with correct title and subtitle
- Two-column field grid renders correctly
- "Send Message →" button is full-width, cobalt blue
- Section headline "Ready to get compliant?" is still visible above the card
- No layout overflow or clipping

- [ ] **Step 2: Take a screenshot in dark mode**

In the browser, toggle dark mode, then:
```bash
node screenshot.mjs http://localhost:3000/#contact contact-form-dark
```

Read the screenshot and verify:
- Card body background is dark (`var(--bg)` in dark mode = `#0E1525`)
- Field borders are visible against the dark background
- Label text is readable

- [ ] **Step 3: Take a mobile screenshot**

Edit `screenshot.mjs` temporarily — or use the browser's DevTools to simulate 375px width — and verify:
- Fields stack to single column on narrow viewports
- Card padding reduces (18px/20px on ≤540px)
- Submit button remains full width

- [ ] **Step 4: Final commit if any fixes were made**

If visual QA required any tweaks to CSS:
```bash
git add index.html
git commit -m "fix: contact form visual QA adjustments"
```

---

## Task 5: Web3Forms access key — go-live checklist

**Files:**
- Modify: `index.html` — replace the placeholder access key (do NOT commit the real key to git; treat it like a config value)

- [ ] **Step 1: Get your Web3Forms access key**

1. Go to `https://web3forms.com`
2. Enter `info@elitecompoundingagency.com` and click "Create Access Key"
3. Copy the key from the confirmation email

- [ ] **Step 2: Replace the placeholder in index.html**

Find:
```html
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
```

Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key (it looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

- [ ] **Step 3: Test a real end-to-end submission**

Fill out the form with real data and submit. Within a minute, check the inbox at `info@elitecompoundingagency.com` — you should receive an email with:
- Subject: "New Assessment Request — Elite Compounding Agency"
- From name matching what you typed
- Reply-to set to the email you entered
- All field values in the body

- [ ] **Step 4: Confirm success state appears**

After the real submission succeeds, the card body should swap to the green checkmark success state with "Message sent!"

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: set Web3Forms access key for live form submission"
```

---

## Self-Review Checklist

- [x] **Layout** — Card with cobalt header, max-width 520px, cobalt-tinted shadow → Task 1 CSS (`.contact-card`, `.contact-card-header`)
- [x] **Fields** — Name*, Email*, Phone, Facility Type dropdown, Message* in 2-col grid → Task 2 HTML
- [x] **Facility Type options** — All 6 options present in the `<select>` → Task 2
- [x] **Validation on blur** — blur handlers + `setFieldState()` → Task 3 JS
- [x] **Validation on submit** — re-validates all fields before fetch → Task 3 JS
- [x] **Error state** — red border, `#fff9f9` bg, `⚠` message → Task 1 CSS `.is-error`
- [x] **Valid state** — green border, `#f9fff9` bg, `✓ Looks good` → Task 1 CSS `.is-valid`
- [x] **Submit disabled on errors** — `hasError` check prevents fetch → Task 3 JS
- [x] **Loading state** — fields fade to 0.15 opacity, spinner appears → Task 1 CSS + Task 3 `showLoading()`
- [x] **Success state** — form fields hidden, checkmark + message fades in → Task 1 CSS + Task 3 `showSuccess()`
- [x] **Error banner** — red banner below message field, "Try Again" button → Task 1 CSS + Task 3 `showError()`
- [x] **Web3Forms integration** — fetch POST with correct payload, `subject`/`from_name`/`replyto` → Task 3 JS
- [x] **Botcheck** — hidden `botcheck` checkbox for spam protection → Task 2 HTML
- [x] **Dark mode** — all elements use CSS vars; error/success tints have dark overrides → Task 1 CSS
- [x] **Accessibility** — `<label for>`, `aria-required`, `role="alert"` on error msgs, `aria-live="polite"` on card body, `aria-label` on submit updates per state → Task 2 HTML
- [x] **No `transition-all`** — all transitions use `opacity`, `border-color`, `background`, `transform` explicitly → Task 1 CSS
- [x] **`.cta-box` layout fix** — grid changed to flex column so form sits below headline → Task 2 Step 3
- [x] **Access key placeholder** — `YOUR_WEB3FORMS_ACCESS_KEY` present; go-live step documented → Task 5
