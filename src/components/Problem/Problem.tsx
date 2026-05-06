export function Problem() {
  return (
    <section className="problem" aria-labelledby="problem-headline">
      <div className="container">
        <div className="problem-inner">

          <div className="reveal">
            <h2 className="problem-headline" id="problem-headline">
              The compliance problems<br />
              that cost you<br />
              <span className="accent">time and money.</span>
            </h2>
          </div>

          <ul className="problem-pain-list">

            <li className="pain-item reveal">
              <div className="pain-icon" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3L15.5 6.5V11.5C15.5 13.5 12.5 15 9 15.5C5.5 15 2.5 13.5 2.5 11.5V6.5L9 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 9V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 7V7.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="pain-content">
                <div className="pain-title">Surprise Board of Pharmacy Inspections</div>
                <div className="pain-desc">Unannounced state inspections expose documentation gaps, room pressure failures, and SOP deficiencies that trigger immediate corrective actions.</div>
              </div>
            </li>

            <li className="pain-item reveal reveal-delay-1">
              <div className="pain-icon" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 5.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="9" cy="12" r="0.75" fill="currentColor"/>
                </svg>
              </div>
              <div className="pain-content">
                <div className="pain-title">Outdated SOPs &amp; Policy Gaps</div>
                <div className="pain-desc">USP &lt;797&gt; 2023 revisions introduced sweeping changes. Facilities still running legacy procedures face citation risk with every inspection cycle.</div>
              </div>
            </li>

            <li className="pain-item reveal reveal-delay-2">
              <div className="pain-icon" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 14V10M8 14V6M12 14V8M16 14V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="pain-content">
                <div className="pain-title">Environmental Monitoring Failures</div>
                <div className="pain-desc">Missed viable and non-viable particle counts, inadequate surface sampling, or failed trending analysis invalidates your cleanroom certification.</div>
              </div>
            </li>

            <li className="pain-item reveal reveal-delay-3">
              <div className="pain-icon" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 5V4C6 3 6.5 2 9 2C11.5 2 12 3 12 4V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 9.5V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="pain-content">
                <div className="pain-title">Staff Training &amp; Competency Gaps</div>
                <div className="pain-desc">Unqualified or under-trained compounding personnel are among the top cited violations in Florida Board of Pharmacy inspections.</div>
              </div>
            </li>

            <li className="pain-item reveal reveal-delay-4">
              <div className="pain-icon" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H15M9 3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="pain-content">
                <div className="pain-title">No Clear Path to 503A or 503B Status</div>
                <div className="pain-desc">Navigating FDA outsourcing facility registration, CGMP requirements, and state board licensing simultaneously overwhelms most pharmacy teams.</div>
              </div>
            </li>

          </ul>

        </div>
      </div>
    </section>
  );
}
