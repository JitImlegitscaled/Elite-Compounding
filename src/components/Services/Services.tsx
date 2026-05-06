export function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-headline">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-headline" id="services-headline">Compliance services built for sterile compounding.</h2>
          <p className="section-sub">Comprehensive programs designed to achieve, maintain, and document USP compliance at every level of your operation.</p>
        </div>

        <div className="services-grid" data-stagger-children="">

          <div className="service-card featured reveal">
            <div className="service-badge">⭐ Core Service</div>
            <div className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L20 6.5V17.5C20 19.5 16.5 21 12 21.5C7.5 21 4 19.5 4 17.5V6.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="service-title">Cleanroom Compliance</h3>
            <p className="service-desc">Full-scope USP &lt;797&gt; and &lt;800&gt; compliance program for ISO-classified cleanrooms. We audit, remediate, certify, and maintain your facility's compliance posture year-round.</p>
            <ul className="service-deliverables">
              <li className="service-deliverable">ISO room certification &amp; recertification</li>
              <li className="service-deliverable">USP &lt;797&gt; / &lt;800&gt; gap assessment</li>
              <li className="service-deliverable">SOP development &amp; annual review</li>
              <li className="service-deliverable">Environmental monitoring program setup</li>
              <li className="service-deliverable">Pre-inspection mock audit &amp; report</li>
            </ul>
          </div>

          <div className="service-card reveal">
            <div className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9 16.1 17 15 17H9C7.9 17 7 17.9 7 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="11" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M21 7L19 5L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="service-title">Sterile Staffing Solutions</h3>
            <p className="service-desc">Credentialed sterile compounding pharmacists and pharmacy technicians placed on-demand. Short-term coverage, long-term contracts, or urgent gap-filling — all pre-vetted for USP competency.</p>
            <ul className="service-deliverables">
              <li className="service-deliverable">Aseptic technique-verified technicians</li>
              <li className="service-deliverable">Licensed pharmacist placement</li>
              <li className="service-deliverable">Rapid 48-72hr deployment</li>
              <li className="service-deliverable">Contract &amp; per-diem staffing models</li>
            </ul>
          </div>

          <div className="service-card reveal">
            <div className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="9" y="3" width="6" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 12H15M9 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="service-title">Regulatory Consulting</h3>
            <p className="service-desc">Strategic guidance through Florida Board of Pharmacy interactions, 503A/503B designation pathways, FDA CGMP readiness, and DSCSA compliance for outsourcing facilities.</p>
            <ul className="service-deliverables">
              <li className="service-deliverable">503A &amp; 503B registration guidance</li>
              <li className="service-deliverable">FDA CGMP readiness assessment</li>
              <li className="service-deliverable">Corrective Action (CAPA) plans</li>
              <li className="service-deliverable">Board response &amp; citation resolution</li>
            </ul>
          </div>

        </div>

        <div className="services-banner">
          <span>All services include inspection-ready documentation as standard</span> — binders, digital records, and audit trails formatted for immediate regulatory use.
        </div>
      </div>
    </section>
  );
}
