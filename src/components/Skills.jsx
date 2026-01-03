/**
 * Skills Component
 * 
 * Displays technical skills organized by category:
 * - Programming languages
 * - Web development technologies
 * - Cloud & DevOps tools
 * - Other tools and methodologies
 * 
 * Features scroll-triggered animations
 */
import { useInView, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import './Skills.css';

/**
 * Skills data organized by category
 * @type {ReadonlyArray<{id: string, title: string, icon: string, skills: string[]}>}
 */
const SKILL_CATEGORIES = Object.freeze([
  {
    id: 'programming',
    title: 'Programming',
    icon: '💻',
    skills: ['JavaScript', 'Python', 'Java', 'TypeScript', 'SQL', 'HTML/CSS'],
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: '🌐',
    skills: ['React', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'PostgreSQL'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
  },
  {
    id: 'tools',
    title: 'Tools & Others',
    icon: '🛠️',
    skills: ['VS Code', 'Linux', 'Agile/Scrum', 'Jira', 'Figma', 'Testing'],
  },
]);

/**
 * SkillCard Component
 * Renders an individual skill category card with hover effects
 */
function SkillCard({ category, delay }) {
  const { id, title, icon, skills } = category;
  
  return (
    <article 
      className="skill-card"
      aria-labelledby={`skill-title-${id}`}
      style={{ transitionDelay: delay }}
    >
      <header className="skill-card-header">
        <span className="skill-icon" role="img" aria-hidden="true">
          {icon}
        </span>
        <h3 id={`skill-title-${id}`} className="skill-category">
          {title}
        </h3>
      </header>
      <ul className="skill-list" aria-label={`${title} skills`}>
        {skills.map((skill, index) => (
          <li key={skill} className="skill-item" style={{ transitionDelay: `${index * 50}ms` }}>
            <span className="skill-bullet" aria-hidden="true">▹</span>
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Skills() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView, getDelay } = useStaggeredAnimation(
    SKILL_CATEGORIES.length,
    { threshold: 0.1, staggerDelay: 150 }
  );

  return (
    <section 
      id="skills" 
      className="skills"
      aria-labelledby="skills-heading"
    >
      <div className="skills-container">
        {/* Section Header */}
        <header 
          ref={headerRef}
          className={`section-header animate-fade-up ${headerInView ? 'in-view' : ''}`}
        >
          <h2 id="skills-heading" className="section-title">
            <span className="title-number" aria-hidden="true">01.</span>
            Skills & Technologies
          </h2>
          <div className="section-line" aria-hidden="true" />
        </header>

        <p className={`skills-intro animate-fade-up ${headerInView ? 'in-view' : ''}`} style={{ transitionDelay: '200ms' }}>
          Here are the technologies and tools I've been working with:
        </p>

        {/* Skills Grid */}
        <div 
          ref={gridRef}
          className={`skills-grid ${gridInView ? 'in-view' : ''}`}
        >
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard 
              key={category.id} 
              category={category} 
              delay={getDelay(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
