/**
 * Education Component
 *
 * Displays educational background and qualifications
 * in a timeline layout with:
 * - Degree/certification name
 * - Institution name
 * - Duration/graduation year
 * - Description or achievements
 *
 * @author Sakhile Twala
 */
import { useInView, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import './Education.css';

/** Section number for consistent navigation */
const SECTION_NUMBER = '04';

/**
 * Education data structure
 * @typedef {Object} Education
 * @property {number} id - Unique identifier
 * @property {string} degree - Degree or qualification name
 * @property {string} institution - School/University name
 * @property {string} location - City/Country
 * @property {string} duration - Start and end dates
 * @property {string} description - Brief description or achievements
 * @property {string} type - Type of education (university, certification, bootcamp)
 */

/** @type {ReadonlyArray<Education>} */
const EDUCATION_DATA = Object.freeze([
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science and Electronics',
    institution: 'North West University',
    location: 'South Africa',
    duration: '',
    description: 'Final year incomplete.',
    modules: [
      'Introduction to Computing & Programming',
      'Structured Programming (C++)',
      'Object Oriented Programming (Java)',
      'Software Engineering',
      'Data Structures & Algorithms',
      'Artificial Intelligence',
      'Computer Networks',
      'Operating Systems',
    ],
    incompleteModules: ['Databases'],
    type: 'university',
  },
  // Add more education entries as needed
]);

/**
 * Education icons based on type
 */
const EDUCATION_ICONS = {
  university: (
    // NWU (North West University) South Africa Official Logo
    <img 
      src="/nwu-logo.png" 
      alt="NWU Logo" 
      className="education-icon"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ),
  highschool: (
    <svg viewBox="0 0 24 24" className="education-icon" fill="currentColor">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
    </svg>
  ),
  bootcamp: (
    <svg viewBox="0 0 24 24" className="education-icon" fill="currentColor">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  ),
  certification: (
    <svg viewBox="0 0 24 24" className="education-icon" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  ),
};

/**
 * EducationCard Component
 * Renders an individual education entry
 *
 * @param {Object} props
 * @param {Education} props.education - Education data
 * @param {number} props.index - Card index for staggered animation
 */
function EducationCard({ education, index }) {
  const { degree, institution, location, duration, description, type, modules, incompleteModules } = education;

  return (
    <article
      className="education-card"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="education-timeline">
        <div className="timeline-dot" />
        <div className="timeline-line" />
      </div>

      <div className="education-content">
        <div className="education-header">
          <div className="education-icon-wrapper">
            {EDUCATION_ICONS[type] || EDUCATION_ICONS.university}
          </div>
          <div className="education-meta">
            {duration && <span className="education-duration">{duration}</span>}
            <span className="education-location">{location}</span>
          </div>
        </div>

        <h3 className="education-degree">{degree}</h3>
        <p className="education-institution">{institution}</p>
        <p className="education-description">{description}</p>

        {/* Completed Modules */}
        {modules && modules.length > 0 && (
          <div className="education-modules">
            <p className="modules-label">Completed Modules:</p>
            <ul className="modules-list" aria-label="Completed modules">
              {modules.map((module) => (
                <li key={module} className="module-item">
                  {module}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Incomplete Modules */}
        {incompleteModules && incompleteModules.length > 0 && (
          <div className="education-modules incomplete">
            <p className="modules-label">Incomplete:</p>
            <ul className="modules-list" aria-label="Incomplete modules">
              {incompleteModules.map((module) => (
                <li key={module} className="module-item incomplete">
                  {module}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * Education Section Component
 * Displays educational background in a timeline format
 */
function Education() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [gridRef, gridInView] = useStaggeredAnimation({
    threshold: 0.1,
    staggerDelay: 150,
  });

  return (
    <section
      id="education"
      className="education"
      aria-labelledby="education-heading"
    >
      <div className="education-container">
        {/* Section Header */}
        <header
          ref={headerRef}
          className={`section-header animate-fade-up ${headerInView ? 'in-view' : ''}`}
        >
          <h2 id="education-heading" className="section-title">
            <span className="title-number" aria-hidden="true">
              {SECTION_NUMBER}.
            </span>
            Education
          </h2>
          <div className="section-line" aria-hidden="true" />
        </header>

        <p className={`education-intro animate-fade-up ${headerInView ? 'in-view' : ''}`}>
          My academic journey and educational background:
        </p>

        {/* Education Timeline */}
        <div
          ref={gridRef}
          className={`education-timeline-container ${gridInView ? 'in-view' : ''}`}
          role="list"
          aria-label="Educational background"
        >
          {EDUCATION_DATA.map((edu, index) => (
            <EducationCard key={edu.id} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
