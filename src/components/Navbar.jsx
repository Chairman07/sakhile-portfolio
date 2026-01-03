/**
 * Navbar Component
 * 
 * Responsive navigation with:
 * - Smooth scrolling to sections
 * - Mobile hamburger menu with focus trap
 * - Scroll-aware background styling
 * - Full keyboard navigation support
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import './Navbar.css';

/** Navigation link configuration */
const NAV_LINKS = Object.freeze([
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]);

/** Scroll threshold for navbar background change */
const SCROLL_THRESHOLD = 50;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Smooth scroll to section with keyboard support
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Set focus for accessibility
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
      setIsMenuOpen(false);
    }
  }, []);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Handle keyboard navigation in nav links
  const handleKeyDown = useCallback((event, sectionId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  }, [scrollToSection]);

  return (
    <header>
      <nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          {/* Logo/Brand - Using anchor for semantic correctness */}
          <a 
            href="#hero"
            className="navbar-brand" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            aria-label="Sakhile Twala - Go to home section"
          >
            ST<span className="accent" aria-hidden="true">.</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-links" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.id} role="none">
                <a
                  href={`#${link.id}`}
                  className="nav-link"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            ref={hamburgerRef}
            type="button"
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="bar" aria-hidden="true" />
            <span className="bar" aria-hidden="true" />
            <span className="bar" aria-hidden="true" />
          </button>

          {/* Mobile Navigation */}
          <div 
            id="mobile-menu"
            ref={mobileMenuRef}
            className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
            aria-hidden={!isMenuOpen}
          >
            <nav aria-label="Mobile navigation">
              <ul className="mobile-nav-links" role="menu">
                {NAV_LINKS.map((link) => (
                  <li key={link.id} role="none">
                    <a
                      href={`#${link.id}`}
                      className="mobile-nav-link"
                      role="menuitem"
                      tabIndex={isMenuOpen ? 0 : -1}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, link.id)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
