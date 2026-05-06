import { smoothScrollTo } from '../../utils/smoothScroll';

const FOOTER_COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Cleanroom Compliance',  href: '#services' },
      { label: 'Sterile Staffing',      href: '#services' },
      { label: 'Regulatory Consulting', href: '#services' },
      { label: 'SOP Development',       href: '#services' },
      { label: 'Mock Inspections',      href: '#services' },
    ],
  },
  {
    title: 'Who We Serve',
    links: [
      { label: '503A Pharmacies',    href: '#who' },
      { label: '503B Outsourcing',   href: '#who' },
      { label: 'Hospital IV Rooms',  href: '#who' },
      { label: 'Oncology Clinics',   href: '#who' },
      { label: 'Nuclear Pharmacies', href: '#who' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Elite',     href: '#why' },
      { label: 'Why Us',          href: '#why' },
      { label: 'Contact',         href: '#contact' },
      { label: 'Schedule a Call', href: 'tel:0000000000' },
    ],
  },
];

function handleAnchor(href: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  };
}

export function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-mark" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2L14.5 5.5V12.5L9 16L3.5 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 6.5L11.5 8V11L9 12.5L6.5 11V8L9 6.5Z" fill="white" opacity="0.8"/>
                </svg>
              </div>
              <span className="footer-logo-text">Elite Compounding Agency</span>
            </div>
            <p className="footer-tagline">Florida's leading USP compliance consultancy for sterile compounding pharmacies and outsourcing facilities.</p>
            <div className="footer-contact-item">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 3L7 7.5L12 3M2 3H12V11H2V3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              <a href="mailto:info@elitecompoundingagency.com" style={{color:'inherit'}}>info@elitecompoundingagency.com</a>
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3.5 2H5.5L6.5 4.5L5 5.5C5.7 7 6 7.3 7.5 8L8.5 6.5L11 7.5V9.5C11 10.3 10.3 11 9.5 11C5 11 2 7.8 2 4.5C2 2.8 2.8 2 3.5 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              <a href="tel:0000000000" style={{color:'inherit'}}>(000) 000-0000</a>
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 2C4.5 2 2.5 4 2.5 6.5C2.5 9.5 7 13 7 13C7 13 11.5 9.5 11.5 6.5C11.5 4 9.5 2 7 2Z" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="7" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Florida, USA
            </div>
          </div>

          {FOOTER_COLUMNS.map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} onClick={handleAnchor(link.href)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-text">&copy; 2025 Elite Compounding Agency. All rights reserved.</div>
          <div className="footer-usp">
            <span>USP &lt;797&gt; &amp; &lt;800&gt; Compliance Specialists</span>
            <div className="footer-usp-dot" aria-hidden="true" />
            <span>Florida Licensed &amp; Insured</span>
            <div className="footer-usp-dot" aria-hidden="true" />
            <span>503A &amp; 503B Pathways</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
