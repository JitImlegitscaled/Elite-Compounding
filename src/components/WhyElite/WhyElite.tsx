import { smoothScrollTo } from '../../utils/smoothScroll';

export function WhyElite() {
  return (
    <section className="why" id="why" aria-labelledby="why-headline">
      <div className="container">
        <div className="why-inner">

          <div className="why-left reveal">
            <span className="section-eyebrow">Why Elite</span>
            <h2 className="why-headline" id="why-headline">Built for pharmacists.<br />Trusted by regulators.</h2>
            <p className="why-sub">We don't just help you pass inspections — we build the operational infrastructure that prevents citations before they happen. Our team has decades of combined sterile compounding experience at the regulatory, operational, and clinical levels.</p>
            <a href="#contact" className="why-link" onClick={e => { e.preventDefault(); smoothScrollTo('#contact'); }}>
              Talk to our compliance team
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 8H13M8.5 4L13 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="why-cards">

            <div className="why-card reveal">
              <div className="why-card-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L17 5.5V10.5C17 13.5 14 15.5 10 16.5C6 15.5 3 13.5 3 10.5V5.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M7 10L9 12L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="why-card-title">USP Expert Consultants</div>
              <div className="why-card-desc">Every engagement is led by pharmacists with direct USP &lt;797&gt;/&lt;800&gt; regulatory experience — not generalist consultants.</div>
            </div>

            <div className="why-card reveal reveal-delay-1">
              <div className="why-card-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6V10.5L12.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="why-card-title">Always-On Availability</div>
              <div className="why-card-desc">Compliance emergencies don't keep business hours. Our on-call team responds to urgent regulatory situations around the clock.</div>
            </div>

            <div className="why-card reveal reveal-delay-2">
              <div className="why-card-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 15V12M7.5 15V8M11 15V10M14.5 15V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M2 17H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="why-card-title">Data-Driven Programs</div>
              <div className="why-card-desc">Trending analysis, automated reminders, and digital recordkeeping turn your compliance program from reactive to predictive.</div>
            </div>

            <div className="why-card reveal reveal-delay-3">
              <div className="why-card-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 4V3M13 4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 9H17" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 13H13M7 11H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="why-card-title">Turnkey Documentation</div>
              <div className="why-card-desc">We produce inspection-ready SOPs, logbooks, training records, and risk assessments — every document formatted for immediate regulator review.</div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
