import { useState } from 'react';
import { useNavScroll } from '../../hooks/useNavScroll';
import { NAV_LINKS } from '../../constants/navigation';
import { smoothScrollTo } from '../../utils/smoothScroll';

interface NavbarProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = useNavScroll();

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`nav${isScrolled ? ' scrolled' : ''}`} id="nav" role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-inner">

            <a href="#" className="nav-logo" aria-label="Elite Compounding Agency home" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="nav-logo-mark" aria-hidden="true">
                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2L14.5 5.5V12.5L9 16L3.5 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 6.5L11.5 8V11L9 12.5L6.5 11V8L9 6.5Z" fill="white" opacity="0.8"/>
                </svg>
              </div>
              <div className="nav-logo-text">
                Elite Compounding
                <span>Agency</span>
              </div>
            </a>

            <nav className="nav-links" aria-label="Site sections">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} onClick={handleNavClick(link.href)}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="nav-ctas">
              <button
                id="theme-toggle"
                className="theme-toggle"
                onClick={onThemeToggle}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? '☀' : '☾'}
              </button>
              <a href="tel:0000000000" className="btn btn-ghost btn-sm">Schedule a Call</a>
              <a href="#contact" className="btn btn-primary btn-sm" onClick={handleNavClick('#contact')}>Request a Quote</a>
            </div>

            <button
              className={`nav-hamburger${menuOpen ? ' open' : ''}`}
              id="hamburger"
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <span />
              <span />
              <span />
            </button>

          </div>
        </div>
      </nav>

      <div
        className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
        id="mobileMenu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} onClick={handleNavClick(link.href)}>
            {link.label}
          </a>
        ))}
        <div className="nav-mobile-btns">
          <a href="tel:0000000000" className="btn btn-ghost">Schedule a Call</a>
          <a href="#contact" className="btn btn-primary" onClick={handleNavClick('#contact')}>Request a Quote</a>
        </div>
      </div>
    </>
  );
}
