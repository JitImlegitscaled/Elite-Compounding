export function WhoWeServe() {
  return (
    <section className="who" id="who" aria-labelledby="who-headline">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Who We Serve</span>
          <h2 className="section-headline" id="who-headline" style={{maxWidth:'640px', marginLeft:'auto', marginRight:'auto'}}>Built for every sterile compounding environment.</h2>
        </div>

        <div className="who-grid" role="list">

          <div className="who-card reveal" role="listitem">
            <div className="who-icon" aria-hidden="true">
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 15V7L9 3L15 7V15H11V11H7V15H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="who-name">503A Pharmacies</div>
              <div className="who-type">Compounding &amp; retail</div>
            </div>
          </div>

          <div className="who-card reveal reveal-delay-1" role="listitem">
            <div className="who-icon" aria-hidden="true">
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 5V4C6 3 6.5 2.5 9 2.5C11.5 2.5 12 3 12 4V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6 10H12M9 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="who-name">503B Outsourcing</div>
              <div className="who-type">FDA-registered facilities</div>
            </div>
          </div>

          <div className="who-card reveal reveal-delay-2" role="listitem">
            <div className="who-icon" aria-hidden="true">
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2L15.5 5.5V12.5C15.5 14.5 12.5 16 9 16.5C5.5 16 2.5 14.5 2.5 12.5V5.5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="who-name">Hospital IV Rooms</div>
              <div className="who-type">Inpatient &amp; outpatient</div>
            </div>
          </div>

          <div className="who-card reveal reveal-delay-3" role="listitem">
            <div className="who-icon" aria-hidden="true">
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 15.5C3 13 5.7 11 9 11C12.3 11 15 13 15 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="who-name">Oncology Clinics</div>
              <div className="who-type">Hazardous drug handling</div>
            </div>
          </div>

          <div className="who-card reveal reveal-delay-4" role="listitem">
            <div className="who-icon" aria-hidden="true">
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 9L9 14L4 9L9 4L14 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.4"/>
              </svg>
            </div>
            <div>
              <div className="who-name">Nuclear Pharmacies</div>
              <div className="who-type">Radiopharmaceutical prep</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
