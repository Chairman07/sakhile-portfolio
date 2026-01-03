/**
 * About Component
 * 
 * Professional bio section featuring:
 * - Personal introduction and background
 * - Technical expertise overview
 * - Profile image placeholder
 */
import { useInView } from '../hooks/useScrollAnimation';
import './About.css';

/** About section paragraphs - easy to customize */
const ABOUT_PARAGRAPHS = [
  `Hello! I'm Sakhile, a passionate Full Stack Developer based in 
   South Africa with a keen interest in building digital solutions 
   that make a difference. My journey in tech began with curiosity 
   about how websites work, which has evolved into a full-fledged 
   career in software development.`,
  `I specialize in creating robust, scalable web applications using 
   modern technologies. My approach combines clean code practices 
   with user-centered design, ensuring that every project I work on 
   is both technically sound and provides an excellent user experience.`,
  `Currently, I'm focused on expanding my expertise in cloud 
   technologies and DevOps practices. I believe in continuous 
   learning and staying updated with the ever-evolving tech 
   landscape. When I'm not coding, you'll find me exploring new 
   technologies, contributing to open-source projects, or sharing 
   knowledge with the developer community.`,
  `I'm always excited to take on new challenges and collaborate on 
   innovative projects. Whether it's a web application, cloud 
   infrastructure, or anything in between—I'm ready to bring ideas 
   to life through code.`,
];

function About() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [contentRef, contentInView] = useInView({ threshold: 0.2 });

  return (
    <section 
      id="about" 
      className="about"
      aria-labelledby="about-heading"
    >
      <div className="about-container">
        {/* Section Header */}
        <header
          ref={headerRef}
          className={`section-header animate-fade-up ${headerInView ? 'in-view' : ''}`}
        >
          <h2 id="about-heading" className="section-title">
            <span className="title-number" aria-hidden="true">04.</span>
            About Me
          </h2>
          <div className="section-line" aria-hidden="true" />
        </header>

        {/* About Content */}
        <div
          ref={contentRef}
          className={`about-content ${contentInView ? 'in-view' : ''}`}
        >
          <div className="about-text">
            {ABOUT_PARAGRAPHS.map((paragraph, index) => (
              <p
                key={index}
                className="about-paragraph"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Profile Image Placeholder */}
          <aside className="about-image" aria-label="Profile photo">
            <div className="image-wrapper">
              <div 
                className="image-placeholder"
                role="img"
                aria-label="Sakhile Twala profile placeholder"
              >
                <span className="initials" aria-hidden="true">ST</span>
              </div>
              <div className="image-border" aria-hidden="true" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default About;
