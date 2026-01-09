/**
 * Navbar Component
 * 
 * Responsive navigation with:
 * - Smooth scrolling to sections
 * - Mobile hamburger menu with focus trap
 * - Scroll-aware background styling
 * - Full keyboard navigation support
 * - Dark/Light theme toggle
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

/** Navigation link configuration */
const NAV_LINKS = Object.freeze([
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]);

/** Scroll threshold for navbar background change */
const SCROLL_THRESHOLD = 50;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();

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

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

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
