/**
 * Footer Component
 * 
 * Simple footer with:
 * - Designer/builder credit
 * - Copyright notice with dynamic year
 */
import './Footer.css';

/** Get current year for copyright */
const CURRENT_YEAR = new Date().getFullYear();

/** Author name for credits */
const AUTHOR_NAME = 'Sakhile Twala';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <p className="footer-text">
          Designed & Built by{' '}
          <span className="footer-name">{AUTHOR_NAME}</span>
        </p>
        <p className="footer-copyright">
          <small>© {CURRENT_YEAR} All rights reserved.</small>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
