/**
 * App Component
 * 
 * Main application container organizing all portfolio sections:
 * - Navbar: Fixed navigation with smooth scrolling
 * - Hero: Landing section with introduction
 * - About: Professional biography
 * - Skills: Technical skills showcase
 * - Certifications: Professional credentials
 * - Projects: Portfolio project cards
 * - Contact: Contact information and social links
 * - Footer: Copyright and credits
 * 
 * @author Sakhile Twala
 * @description Personal portfolio website built with React + Vite
 */
import './App.css';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      {/* Skip link for keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
