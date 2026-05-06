import { smoothScrollTo } from '../../utils/smoothScroll';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-headline">
      <div className="hero-grain" aria-hidden="true" />
      <div className="container">
        <div className="hero-inner">

          {/* Left */}
          <div>
            <div className="hero-badge hero-pre-animate">
              <div className="hero-badge-dot" aria-hidden="true">
                <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              USP &lt;797&gt; &amp; &lt;800&gt; Specialists
            </div>

            <h1 className="hero-headline hero-pre-animate" id="hero-headline">
              Your cleanroom.<br />
              Always compliant.<br />
              <span className="accent">Always ready.</span>
            </h1>

            <p className="hero-sub hero-pre-animate">
              Elite Compounding Agency partners with Florida's sterile compounding facilities to achieve full USP compliance, pass regulatory inspections, and maintain audit-ready operations — year-round.
            </p>

            <div className="hero-ctas hero-pre-animate">
              <a href="#contact" className="btn btn-primary" onClick={e => { e.preventDefault(); smoothScrollTo('#contact'); }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5L13.5 5V11L8 14.5L2.5 11V5L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                Request a Free Assessment
              </a>
              <a href="#services" className="btn btn-ghost" onClick={e => { e.preventDefault(); smoothScrollTo('#services'); }}>
                Explore Services
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M7.5 4L11 7L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="hero-trust hero-pre-animate">
              <div className="hero-trust-item">
                <div className="hero-trust-icon" aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L8.5 5.5H13L9.5 8L10.5 13L7 10.5L3.5 13L4.5 8L1 5.5H5.5L7 1Z" fill="currentColor"/>
                  </svg>
                </div>
                5-Star Inspection Record
              </div>
              <div className="hero-trust-item">
                <div className="hero-trust-icon" aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 4V7.5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                24-Hour Response SLA
              </div>
              <div className="hero-trust-item">
                <div className="hero-trust-icon" aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1.5L12.5 4V9.5C12.5 11.5 9.5 13 7 13.5C4.5 13 1.5 11.5 1.5 9.5V4L7 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M4.5 7L6 8.5L9.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Florida Licensed &amp; Insured
              </div>
            </div>
          </div>

          {/* Right / Illustration */}
          <div className="hero-visual reveal reveal-delay-2">
            <div className="hero-svg-wrap">
              <svg viewBox="0 0 460 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Isometric cleanroom illustration" role="img">
                <defs>
                  <linearGradient id="floorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ddeeff"/>
                    <stop offset="100%" stopColor="#c8e0ff"/>
                  </linearGradient>
                  <linearGradient id="wallL" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b8d4f8"/>
                    <stop offset="100%" stopColor="#cce0ff"/>
                  </linearGradient>
                  <linearGradient id="wallR" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a8c8f5"/>
                    <stop offset="100%" stopColor="#bedaff"/>
                  </linearGradient>
                </defs>

                <ellipse cx="230" cy="320" rx="160" ry="28" fill="#0070F3" opacity="0.06"/>

                <path d="M230 300 L390 210 L230 118 L70 210 Z" fill="url(#floorGrad)"/>
                <line x1="150" y1="255" x2="310" y2="165" stroke="white" strokeWidth="1" opacity="0.55"/>
                <line x1="190" y1="232" x2="350" y2="142" stroke="white" strokeWidth="1" opacity="0.45"/>
                <line x1="110" y1="210" x2="390" y2="210" stroke="white" strokeWidth="0.8" opacity="0.35"/>
                <line x1="150" y1="188" x2="310" y2="278" stroke="white" strokeWidth="0.8" opacity="0.25"/>

                <path d="M70 210 L230 118 L230 28 L70 120 Z" fill="url(#wallL)"/>
                <path d="M90 148 L170 102 L170 138 L90 184 Z" fill="white" opacity="0.22"/>
                <path d="M90 148 L170 102" stroke="white" strokeWidth="0.8" opacity="0.4"/>

                <path d="M230 118 L390 210 L390 120 L230 28 Z" fill="url(#wallR)"/>

                <path d="M70 120 L230 28 L390 120" stroke="#0070F3" strokeWidth="2" opacity="0.35"/>

                <path d="M88 228 L88 170 L176 124 L176 182 Z" fill="#8ab4eb"/>
                <path d="M88 170 L176 124 L188 130 L100 178 Z" fill="#aaccf5"/>
                <path d="M100 178 L188 130 L188 168 L100 216 Z" fill="#9bbff0" opacity="0.85"/>
                <path d="M100 178 L154 149 L154 168 L100 197 Z" fill="#c8dfff" opacity="0.55"/>
                <line x1="100" y1="196" x2="188" y2="150" stroke="white" strokeWidth="0.7" opacity="0.5"/>

                <path d="M90 170 L176 124 L176 118 L90 164 Z" fill="#0070F3" opacity="0.18"/>
                <line x1="100" y1="166" x2="176" y2="122" stroke="#0070F3" strokeWidth="0.6" opacity="0.4"/>

                <path d="M322 172 L390 136 L390 202 L322 238 Z" fill="#9bbff0"/>
                <line x1="322" y1="195" x2="390" y2="159" stroke="white" strokeWidth="0.8" opacity="0.5"/>
                <line x1="322" y1="218" x2="390" y2="182" stroke="white" strokeWidth="0.8" opacity="0.5"/>
                <rect width="16" height="10" rx="2" fill="white" opacity="0.5" transform="translate(336,148) rotate(-30) skewX(-12)"/>
                <rect width="16" height="10" rx="2" fill="#EBF3FF" opacity="0.55" transform="translate(352,140) rotate(-30) skewX(-12)"/>
                <rect width="16" height="10" rx="2" fill="white" opacity="0.45" transform="translate(336,171) rotate(-30) skewX(-12)"/>

                <line x1="310" y1="158" x2="310" y2="228" stroke="#6B9FE0" strokeWidth="3.5" strokeLinecap="round"/>
                <line x1="296" y1="228" x2="324" y2="228" stroke="#6B9FE0" strokeWidth="2.5" strokeLinecap="round"/>
                <ellipse cx="302" cy="150" rx="7" ry="11" fill="#c8dfff" stroke="#7aaadf" strokeWidth="1.2"/>
                <ellipse cx="318" cy="148" rx="7" ry="11" fill="#b8d5ff" stroke="#7aaadf" strokeWidth="1.2"/>
                <line x1="310" y1="161" x2="310" y2="170" stroke="#9bbfe8" strokeWidth="1.2"/>

                <circle cx="228" cy="182" r="12" fill="#7aaadf"/>
                <path d="M214 196 Q228 190 242 196 L246 242 L210 242 Z" fill="#6b9fd8" opacity="0.85"/>
                <path d="M214 210 L200 220 M242 210 L256 220" stroke="#7aaadf" strokeWidth="5" strokeLinecap="round"/>
                <path d="M218 242 L214 268 M238 242 L242 268" stroke="#6b9fd8" strokeWidth="4" strokeLinecap="round"/>
                <ellipse cx="228" cy="186" rx="7" ry="5" fill="white" opacity="0.45"/>

                <path d="M144 272 L144 246 L316 154 L316 180 Z" fill="#aac8f0"/>
                <path d="M130 280 L144 272 L144 246 L130 254 Z" fill="#96b8e8"/>

                <rect width="22" height="14" rx="3" fill="white" opacity="0.6" transform="translate(190,228) rotate(-30) skewX(-12)"/>
                <rect width="14" height="20" rx="2" fill="#dceeff" opacity="0.7" transform="translate(240,202) rotate(-30) skewX(-12)"/>

                <path d="M172 86 L230 52 L288 86 L230 120 Z" fill="#d2e8ff" opacity="0.75"/>
                <line x1="188" y1="86" x2="272" y2="86" stroke="white" strokeWidth="1" opacity="0.55"/>
                <line x1="196" y1="76" x2="264" y2="96" stroke="white" strokeWidth="0.7" opacity="0.35"/>
                <line x1="196" y1="96" x2="264" y2="76" stroke="white" strokeWidth="0.7" opacity="0.35"/>
                <circle cx="230" cy="86" r="5" fill="#0070F3" opacity="0.22"/>

                <path d="M70 120 L70 210" stroke="#0070F3" strokeWidth="2" opacity="0.28"/>
                <path d="M390 120 L390 210" stroke="#0070F3" strokeWidth="2" opacity="0.28"/>

                <circle cx="390" cy="175" r="20" fill="white" opacity="0.95" filter="drop-shadow(0 2px 6px rgba(0,112,243,0.15))"/>
                <path d="M382 175L387 180L398 168" stroke="#0070F3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Floating stat cards */}
              <div className="stat-card stat-card-1">
                <div className="stat-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1.5L13.5 4.5V11.5C13.5 13 11 14 8 14.5C5 14 2.5 13 2.5 11.5V4.5L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="stat-card-val">100% Pass Rate</div>
                  <div className="stat-card-lbl">All audits &amp; inspections</div>
                </div>
              </div>

              <div className="stat-card stat-card-2">
                <div className="stat-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 5V8.5L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="stat-card-val">24hr Response</div>
                  <div className="stat-card-lbl">Guaranteed SLA</div>
                </div>
              </div>

              <div className="stat-card stat-card-3">
                <div className="stat-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="stat-card-val">USP &lt;797&gt; Compliant</div>
                  <div className="stat-card-lbl">Certified specialists</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
