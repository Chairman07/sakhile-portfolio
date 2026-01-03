/**
 * Hero Component
 * 
 * Main landing section featuring:
 * - Name and professional tagline
 * - Call-to-action buttons
 * - Decorative background elements
 * - Scroll indicator animation
 */
import { useCallback } from 'react';
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

function Hero() {
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
        {/* Decorative background elements - hidden from screen readers */}
        <div className="hero-bg-decoration" aria-hidden="true">
          <div className="decoration-circle circle-1" />
          <div className="decoration-circle circle-2" />
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <p className="hero-greeting">{HERO_CONTENT.greeting}</p>
          <h1 id="hero-heading" className="hero-name">
            {HERO_CONTENT.name}
            <span className="accent" aria-hidden="true">.</span>
          </h1>
          <p className="hero-tagline">
            {HERO_CONTENT.tagline}
          </p>
          <p className="hero-description">
            {HERO_CONTENT.description}
          </p>

          {/* CTA Buttons - Using anchors for better semantics */}
          <div className="hero-cta" role="group" aria-label="Call to action">
            <a 
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
            >
              View Projects
            </a>
            <a 
              href="#contact"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator - decorative, hidden from screen readers */}
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
