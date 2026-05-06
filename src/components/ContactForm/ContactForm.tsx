import { useEffect, useRef } from 'react';
import { useContactForm } from '../../hooks/useContactForm';
import { FACILITY_TYPES } from '../../constants/contact';
import { smoothScrollTo } from '../../utils/smoothScroll';

export function ContactForm() {
  const { fields, statuses, formStatus, handleChange, handleBlur, handleSubmit } = useContactForm();
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formStatus === 'success' && successRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => successRef.current?.classList.add('fade-in'));
      });
    }
  }, [formStatus]);

  const wrapClass = (key: 'name' | 'email' | 'phone' | 'message') => {
    const s = statuses[key].state;
    return `contact-field-wrap${s === 'error' ? ' is-error' : s === 'valid' ? ' is-valid' : ''}`;
  };

  return (
    <section className="cta-section" id="contact" aria-labelledby="cta-headline">
      <div className="container">
        <div className="cta-box reveal">
          <div>
            <h2 className="cta-headline" id="cta-headline">Ready to get compliant?</h2>
            <p className="cta-sub">Schedule a free 30-minute assessment with one of our USP compliance specialists.</p>
          </div>

          <form
            className="contact-card"
            noValidate
            aria-label="Request a free assessment"
            onSubmit={handleSubmit}
          >
            <div className="contact-card-header">
              <div className="contact-card-title">Request a Free Assessment</div>
              <div className="contact-card-sub">USP compliance specialists · 24hr response guarantee</div>
            </div>

            <div className="contact-card-body">

              <div
                className={`contact-form-fields${formStatus === 'loading' ? ' loading' : ''}`}
                style={formStatus === 'success' ? { display: 'none' } : undefined}
              >
                {/* Row 1: Name + Email */}
                <div className="contact-field-grid">
                  <div className={wrapClass('name')}>
                    <label className="contact-label" htmlFor="contact-name">
                      Full Name <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="contact-input"
                      placeholder="Jane Smith"
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby="msg-name"
                      value={fields.name}
                      onChange={e => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                    />
                    <div className="contact-field-msg" id="msg-name" aria-live="polite">
                      {statuses.name.message}
                    </div>
                  </div>
                  <div className={wrapClass('email')}>
                    <label className="contact-label" htmlFor="contact-email">
                      Email <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="contact-input"
                      placeholder="jane@pharmacy.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby="msg-email"
                      value={fields.email}
                      onChange={e => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                    />
                    <div className="contact-field-msg" id="msg-email" aria-live="polite">
                      {statuses.email.message}
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone + Facility Type */}
                <div className="contact-field-grid">
                  <div className={wrapClass('phone')}>
                    <label className="contact-label" htmlFor="contact-phone">Phone</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      className="contact-input"
                      placeholder="(555) 000-0000"
                      autoComplete="tel"
                      aria-describedby="msg-phone"
                      value={fields.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                    />
                    <div className="contact-field-msg" id="msg-phone" aria-live="polite">
                      {statuses.phone.message}
                    </div>
                  </div>
                  <div className="contact-field-wrap">
                    <label className="contact-label" htmlFor="contact-facility">Facility Type</label>
                    <select
                      id="contact-facility"
                      name="facility_type"
                      className="contact-select"
                      aria-describedby="msg-facility"
                      value={fields.facility}
                      onChange={e => handleChange('facility', e.target.value)}
                    >
                      <option value="">Select type…</option>
                      {FACILITY_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="contact-field-msg" id="msg-facility" aria-live="polite" />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="contact-field-full">
                  <div className={wrapClass('message')}>
                    <label className="contact-label" htmlFor="contact-message">
                      Message <span className="required" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="contact-textarea"
                      rows={3}
                      placeholder="Tell us about your compliance challenge…"
                      aria-required="true"
                      aria-describedby="msg-message"
                      value={fields.message}
                      onChange={e => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                    />
                    <div className="contact-field-msg" id="msg-message" aria-live="polite">
                      {statuses.message.message}
                    </div>
                  </div>
                </div>

                {/* Error banner */}
                <div
                  className={`contact-error-banner${formStatus === 'error' ? ' visible' : ''}`}
                  role="alert"
                >
                  <span className="contact-error-banner-icon" aria-hidden="true">⚠</span>
                  <div>
                    <div className="contact-error-banner-title">Couldn't send your message</div>
                    <div className="contact-error-banner-sub">
                      Please try again, or email us at{' '}
                      <a href="mailto:info@elitecompoundingagency.com">info@elitecompoundingagency.com</a>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                  aria-label={formStatus === 'error' ? 'Try again' : 'Send message'}
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'error' ? 'Try Again →' : 'Send Message →'}
                </button>
              </div>

              {/* Loading state */}
              <div
                className={`contact-loading${formStatus === 'loading' ? ' visible' : ''}`}
                aria-live="polite"
                aria-label="Sending message"
              >
                <div className="contact-spinner" aria-hidden="true" />
                <div className="contact-loading-text">Sending your message…</div>
              </div>

              {/* Success state */}
              <div
                ref={successRef}
                className={`contact-success${formStatus === 'success' ? ' visible' : ''}`}
                role="status"
              >
                <div className="contact-success-icon" aria-hidden="true">✓</div>
                <div className="contact-success-title">Message sent!</div>
                <div className="contact-success-body">
                  We'll be in touch within 24 hours.<br />
                  Check your inbox for a confirmation copy.
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// suppress unused import warning — smoothScrollTo used in onClick if needed
void smoothScrollTo;
