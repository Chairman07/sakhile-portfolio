/**
 * Contact Component
 * 
 * Contact section featuring:
 * - Call-to-action for reaching out
 * - Email button
 * - Social media links (GitHub, LinkedIn, Email)
 */
import { useInView } from '../hooks/useScrollAnimation';
import './Contact.css';

/**
 * Contact information - easy to update
 * Replace with your actual contact details
 */
const CONTACT_INFO = Object.freeze({
  email: 'sakhile.twala@example.com',
  github: 'https://github.com/sakhiletwala',
  linkedin: 'https://www.linkedin.com/in/sakhile-twala-b05386247/',
});

/** SVG Icons as components for maintainability */
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/** Social links configuration */
const SOCIAL_LINKS = [
  {
    id: 'github',
    href: CONTACT_INFO.github,
    label: 'View GitHub profile (opens in new tab)',
    icon: GitHubIcon,
    external: true,
  },
  {
    id: 'linkedin',
    href: CONTACT_INFO.linkedin,
    label: 'View LinkedIn profile (opens in new tab)',
    icon: LinkedInIcon,
    external: true,
  },
  {
    id: 'email',
    href: `mailto:${CONTACT_INFO.email}`,
    label: 'Send an email',
    icon: EmailIcon,
    external: false,
  },
];

function Contact() {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.2 });

  return (
    <section 
      id="contact" 
      className="contact"
      aria-labelledby="contact-heading"
    >
      <div
        ref={sectionRef}
        className={`contact-container ${sectionInView ? 'in-view' : ''}`}
      >
        {/* Section Header */}
        <header className="section-header centered">
          <p className="section-label animate-item">
            <span className="title-number" aria-hidden="true">06.</span>
            What's Next?
          </p>
          <h2 id="contact-heading" className="contact-title animate-item">
            Get In Touch
          </h2>
        </header>

        {/* Contact Content */}
        <div className="contact-content">
          <p className="contact-description animate-item">
            I'm currently open to new opportunities and would love to hear from 
            you. Whether you have a question, a project idea, or just want to 
            say hi, my inbox is always open. I'll try my best to get back to you!
          </p>

          {/* Email CTA */}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="btn btn-primary contact-btn animate-item"
            aria-label="Send me an email"
          >
            Say Hello
          </a>

          {/* Social Links */}
          <nav aria-label="Social media links" className="animate-item">
            <ul className="social-links">
              {SOCIAL_LINKS.map(({ id, href, label, icon: Icon, external }, index) => (
                <li key={id} style={{ transitionDelay: `${index * 100}ms` }}>
                  <a
                    href={href}
                    className="social-link"
                    aria-label={label}
                    {...(external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Contact;
