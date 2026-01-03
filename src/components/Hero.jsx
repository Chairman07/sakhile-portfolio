/**
 * Hero Component
 * 
 * Main landing section featuring:
 * - Animated name and professional tagline
 * - Typing effect on tagline
 * - Call-to-action buttons with hover effects
 * - Floating decorative elements
 * - Particle animations
 * - Scroll indicator
 */
import { useCallback, useState, useEffect } from 'react';
import './Hero.css';

/** Hero section content - easily customizable */
const HERO_CONTENT = {
  greeting: 'Hi, my name is',
  name: 'Sakhile Twala',
  tagline: 'I build things for the web & cloud.',
  description: `I'm a passionate Full Stack Developer based in South Africa, 
    specializing in creating exceptional digital experiences. 
    Currently focused on building accessible, cloud-native applications.`,
};

/** Roles for typing animation */
const ROLES = [
  'Full Stack Developer',
  'Cloud Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  /**
   * Smoothly scrolls to a section and manages focus for accessibility
   * @param {string} sectionId - The ID of the target section
   */
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="hero"
      aria-labelledby="hero-heading"
    >
      <div className="hero-container">
        {/* Decorative background elements */}
        <div className="hero-bg-decoration" aria-hidden="true">
          <div className="decoration-circle circle-1" />
          <div className="decoration-circle circle-2" />
          <div className="decoration-circle circle-3" />
          {/* Floating particles */}
          <div className="particle particle-1" style={{ top: '20%', left: '10%' }} />
          <div className="particle particle-2" style={{ top: '60%', right: '15%' }} />
          <div className="particle particle-3" style={{ top: '80%', left: '20%' }} />
          <div className="particle particle-1" style={{ top: '30%', right: '25%' }} />
          <div className="particle particle-2" style={{ top: '70%', left: '60%' }} />
          {/* Grid pattern */}
          <div className="grid-pattern" />
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <p className="hero-greeting animate-in" style={{ animationDelay: '0.2s' }}>
            {HERO_CONTENT.greeting}
          </p>
          <h1 id="hero-heading" className="hero-name animate-in" style={{ animationDelay: '0.4s' }}>
            {HERO_CONTENT.name}
            <span className="accent" aria-hidden="true">.</span>
          </h1>
          <p className="hero-tagline animate-in" style={{ animationDelay: '0.6s' }}>
            {HERO_CONTENT.tagline}
          </p>
          
          {/* Animated role text */}
          <div className="hero-role animate-in" style={{ animationDelay: '0.8s' }}>
            <span className="role-label">I'm a </span>
            <span className="role-text">
              {displayText}
              <span className="cursor" aria-hidden="true">|</span>
            </span>
          </div>

          <p className="hero-description animate-in" style={{ animationDelay: '1s' }}>
            {HERO_CONTENT.description}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta animate-in" style={{ animationDelay: '1.2s' }} role="group" aria-label="Call to action">
            <a 
              href="#projects"
              className="btn btn-primary btn-animated"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
            >
              <span>View Projects</span>
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a 
              href="#contact"
              className="btn btn-secondary btn-animated"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="mouse">
            <div className="wheel" />
          </div>
          <span>Scroll down</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
