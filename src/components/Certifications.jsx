/**
 * Certifications Component
 *
 * Displays professional certifications and credentials
 * in a responsive card grid layout with:
 * - Certificate badge/icon
 * - Name, issuer, and credential code
 * - Issue date and verification link
 *
 * @author Sakhile Twala
 */
import './Certifications.css';

/** Section number for consistent navigation */
const SECTION_NUMBER = '02';

/**
 * Certification data structure
 * @typedef {Object} Certification
 * @property {number} id - Unique identifier
 * @property {string} name - Certification name
 * @property {string} issuer - Issuing organization
 * @property {string} credential - Credential code/identifier
 * @property {string} date - Year obtained
 * @property {string} url - Verification URL
 */

/** @type {ReadonlyArray<Certification>} */
const CERTIFICATIONS = Object.freeze([
  // Microsoft Certifications (Fundamentals first)
  {
    id: 1,
    name: 'Azure Fundamentals',
    issuer: 'Microsoft',
    credential: 'AZ-900',
    date: '2026',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
    logo: 'microsoft',
  },
  {
    id: 2,
    name: 'Azure Administrator Associate',
    issuer: 'Microsoft',
    credential: 'AZ-104',
    date: '2026',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-administrator/',
    logo: 'microsoft',
  },
  {
    id: 3,
    name: 'Azure Security Engineer Associate',
    issuer: 'Microsoft',
    credential: 'AZ-500',
    date: '2026',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-security-engineer/',
    logo: 'microsoft',
  },
  {
    id: 4,
    name: 'Azure AI Engineer Associate',
    issuer: 'Microsoft',
    credential: 'AI-102',
    date: '2026',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/',
    logo: 'microsoft',
  },
  // Oracle Certification
  {
    id: 5,
    name: 'Multicloud Architect Professional',
    issuer: 'Oracle Cloud Infrastructure',
    credential: 'OCI Certified',
    date: '2025',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=A519F3F95BE2E8E2682BEFE2B21E3487BDC35F9B420348CC55D7AB7C1FD97B5C',
    logo: 'oracle',
  },
  // GitHub Certification
  {
    id: 6,
    name: 'GitHub Foundations',
    issuer: 'GitHub',
    credential: 'Certified',
    date: '2025',
    url: 'https://www.credly.com/badges/4a490867-043e-4076-ae56-02fe9da748b1/linked_in_profile',
    logo: 'github',
  },
  // Cisco Certifications (Basics/Intro first)
  {
    id: 7,
    name: 'Computer Hardware Basics',
    issuer: 'Cisco',
    credential: 'Hardware',
    date: '2025',
    url: 'https://www.credly.com/badges/50a3f025-118e-4b43-aab3-d45c2526ca67/linked_in_profile',
    logo: 'cisco',
  },
  {
    id: 8,
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    credential: 'Security',
    date: '2025',
    url: 'https://www.credly.com/badges/b6168c14-707f-446b-92f2-1ba956a874cd/linked_in_profile',
    logo: 'cisco',
  },
  {
    id: 9,
    name: 'Network Addressing & Troubleshooting',
    issuer: 'Cisco',
    credential: 'Networking',
    date: '2025',
    url: 'https://www.credly.com/badges/b1ecdd7b-4b55-49c7-9594-ad5348cc13f3/linked_in_profile',
    logo: 'cisco',
  },
  // Fortinet Certifications (Associate first)
  {
    id: 10,
    name: 'Certified Cybersecurity Associate',
    issuer: 'Fortinet',
    credential: 'FCA',
    date: '2025',
    url: 'https://www.credly.com/badges/843794a2-1105-4d65-9a61-2926792c64b5/linked_in_profile',
    logo: 'fortinet',
  },
  {
    id: 11,
    name: 'FortiGate 7.6 Operator',
    issuer: 'Fortinet',
    credential: 'Operator',
    date: '2025',
    url: 'https://www.credly.com/badges/656fad4f-e51a-46a1-934b-37885f64380b/linked_in_profile',
    logo: 'fortinet',
  },
]);

/**
 * Logo SVG components for each certification issuer
 */
const LOGOS = {
  microsoft: (
    <svg viewBox="0 0 23 23" className="cert-logo">
      <path fill="#f35325" d="M1 1h10v10H1z"/>
      <path fill="#81bc06" d="M12 1h10v10H12z"/>
      <path fill="#05a6f0" d="M1 12h10v10H1z"/>
      <path fill="#ffba08" d="M12 12h10v10H12z"/>
    </svg>
  ),
  oracle: (
    <svg viewBox="0 0 100 30" className="cert-logo">
      <path fill="#C74634" d="M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15h70c8.3 0 15-6.7 15-15S93.3 0 85 0H15zm0 5h70c5.5 0 10 4.5 10 10s-4.5 10-10 10H15C9.5 25 5 20.5 5 15S9.5 5 15 5z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="cert-logo">
      <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  cisco: (
    <svg viewBox="0 0 100 50" className="cert-logo">
      <g fill="#049fd9">
        <rect x="0" y="20" width="6" height="20" rx="2"/>
        <rect x="12" y="10" width="6" height="30" rx="2"/>
        <rect x="24" y="0" width="6" height="50" rx="2"/>
        <rect x="36" y="10" width="6" height="30" rx="2"/>
        <rect x="48" y="20" width="6" height="20" rx="2"/>
        <rect x="60" y="10" width="6" height="30" rx="2"/>
        <rect x="72" y="0" width="6" height="50" rx="2"/>
        <rect x="84" y="10" width="6" height="30" rx="2"/>
        <rect x="94" y="20" width="6" height="20" rx="2"/>
      </g>
    </svg>
  ),
  fortinet: (
    <svg viewBox="0 0 100 100" className="cert-logo">
      <path fill="#DA291C" d="M50 0L0 25v50l50 25 50-25V25L50 0zm30 65L50 80 20 65V35l30-15 30 15v30z"/>
      <path fill="#DA291C" d="M50 30L30 40v20l20 10 20-10V40L50 30z"/>
    </svg>
  ),
};

/**
 * CertificationCard Component
 * Renders an individual certification card
 *
 * @param {Object} props
 * @param {Certification} props.certification - Certification data
 * @param {string} props.delay - Animation delay
 */
function CertificationCard({ certification, delay }) {
  const { name, issuer, credential, date, url, logo } = certification;

  return (
    <article className="cert-card" style={{ transitionDelay: delay }}>
      <div className="cert-badge" aria-hidden="true">
        {LOGOS[logo] || <span className="cert-icon">🏆</span>}
      </div>

      <div className="cert-content">
        <h3 className="cert-name">{name}</h3>
        <p className="cert-issuer">{issuer}</p>

        <div className="cert-meta">
          <span className="cert-credential">{credential}</span>
          <span className="cert-date">{date}</span>
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-link"
            aria-label={`Verify ${name} credential (opens in new tab)`}
          >
            Verify Credential
            <span className="cert-arrow" aria-hidden="true"> →</span>
          </a>
        )}
      </div>
    </article>
  );
}

import { useInView, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { useState, useEffect } from 'react';

/**
 * Certifications Section Component
 * Displays all professional certifications in a grid
 * Cards shift smoothly one at a time like a snake slithering
 * Last 3 slots are empty, cards move forward then reverse
 */
function Certifications() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
  const [gridRef, gridInView] = useStaggeredAnimation({
    threshold: 0.1,
    staggerDelay: 100,
  });

  const totalCerts = CERTIFICATIONS.length;
  const emptySlots = 1;
  
  // Track position offset and direction
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Smooth snake animation - offset changes trigger CSS transitions
  useEffect(() => {
    if (!gridInView) return;

    const interval = setInterval(() => {
      setOffset(prev => {
        const newOffset = prev + direction;
        
        // Reverse direction at boundaries
        if (newOffset >= emptySlots) {
          setDirection(-1);
          return emptySlots;
        }
        if (newOffset <= 0) {
          setDirection(1);
          return 0;
        }
        return newOffset;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [gridInView, direction]);

  return (
    <section
      id="certifications"
      className="certifications"
      aria-labelledby="certifications-heading"
    >
      <div className="certifications-container">
        {/* Section Header */}
        <header
          ref={headerRef}
          className={`section-header animate-fade-up ${headerInView ? 'in-view' : ''}`}
        >
          <h2 id="certifications-heading" className="section-title">
            <span className="title-number" aria-hidden="true">
              {SECTION_NUMBER}.
            </span>
            Certifications
          </h2>
          <div className="section-line" aria-hidden="true" />
        </header>

        <p className={`certifications-intro animate-fade-up ${headerInView ? 'in-view' : ''}`}>
          Professional certifications and credentials I've earned:
        </p>

        {/* Certifications Grid with Smooth Snake Animation */}
        <div
          ref={gridRef}
          className={`certifications-grid ${gridInView ? 'in-view' : ''}`}
          role="list"
          aria-label="Professional certifications"
          style={{ '--offset': offset, '--empty-slots': emptySlots }}
        >
          {/* Empty placeholder slots */}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <div 
              key={`empty-${i}`}
              className="cert-slot empty-slot"
              aria-hidden="true"
            />
          ))}
          
          {/* Certification cards with smooth position transitions */}
          {CERTIFICATIONS.map((cert, index) => (
            <div 
              key={cert.id}
              role="listitem"
              className="cert-slot cert-slot-animated"
              style={{ 
                '--card-index': index,
                '--stagger': `${index * 0.08}s`
              }}
            >
              <CertificationCard
                certification={cert}
                delay={`${index * 80}ms`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
