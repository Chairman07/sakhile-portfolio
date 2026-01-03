/**
 * Projects Component
 * 
 * Displays portfolio projects in a responsive grid layout:
 * - Featured projects span full width on larger screens
 * - Regular projects in 2-column grid
 * - GitHub link for viewing more projects
 */
import ProjectCard from './ProjectCard';
import './Projects.css';

/**
 * Sample projects data
 * Replace with your actual projects
 * @type {ReadonlyArray<Object>}
 */
const PROJECTS = Object.freeze([
  {
    id: 1,
    title: 'Cloud Task Manager',
    description:
      'A full-stack task management application with real-time updates, user authentication, and cloud deployment. Features include drag-and-drop functionality, team collaboration, and progress tracking.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Azure', 'Socket.io'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description:
      'A modern e-commerce solution with product catalog, shopping cart, secure checkout, and admin dashboard for inventory management.',
    techStack: ['React', 'Express', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description:
      'A responsive weather application that provides real-time weather data, forecasts, and location-based services using external APIs.',
    techStack: ['JavaScript', 'REST API', 'CSS Grid', 'Chart.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
  },
  {
    id: 4,
    title: 'DevOps Pipeline Tool',
    description:
      'An automation tool for CI/CD pipelines with Docker containerization, automated testing, and deployment monitoring.',
    techStack: ['Python', 'Docker', 'GitHub Actions', 'Kubernetes'],
    githubUrl: 'https://github.com',
    liveUrl: null,
    featured: false,
  },
]);

/** GitHub profile URL */
const GITHUB_PROFILE_URL = 'https://github.com/sakhiletwala';

function Projects() {
  return (
    <section 
      id="projects" 
      className="projects"
      aria-labelledby="projects-heading"
    >
      <div className="projects-container">
        {/* Section Header */}
        <header className="section-header">
          <h2 id="projects-heading" className="section-title">
            <span className="title-number" aria-hidden="true">03.</span>
            Projects
          </h2>
          <div className="section-line" aria-hidden="true" />
        </header>

        <p className="projects-intro">
          Here are some of the projects I've worked on. Each project represents 
          a unique challenge and learning opportunity.
        </p>

        {/* Projects Grid */}
        <div 
          className="projects-grid"
          role="list"
          aria-label="Project showcase"
        >
          {PROJECTS.map((project) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="projects-cta">
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            aria-label="View more projects on GitHub (opens in new tab)"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
