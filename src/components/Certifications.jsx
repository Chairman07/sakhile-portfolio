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
  },
  {
    id: 2,
    name: 'Azure Administrator Associate',
    issuer: 'Microsoft',
    credential: 'AZ-104',
    date: '2026',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-administrator/',
  },
  {
    id: 3,
    name: 'Azure Security Engineer Associate',
    issuer: 'Microsoft',
    credential: 'AZ-500',
    date: '2026',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-security-engineer/',
  },
  {
    id: 4,
    name: 'Azure AI Engineer Associate',
    issuer: 'Microsoft',
    credential: 'AI-102',
    date: '2026',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/',
  },
  // Oracle Certification
  {
    id: 5,
    name: 'Multicloud Architect Professional',
    issuer: 'Oracle Cloud Infrastructure',
    credential: 'OCI Certified',
    date: '2025',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=A519F3F95BE2E8E2682BEFE2B21E3487BDC35F9B420348CC55D7AB7C1FD97B5C',
  },
  // GitHub Certification
  {
    id: 6,
    name: 'GitHub Foundations',
    issuer: 'GitHub',
    credential: 'Certified',
    date: '2025',
    url: 'https://www.credly.com/badges/4a490867-043e-4076-ae56-02fe9da748b1/linked_in_profile',
  },
  // Cisco Certifications (Basics/Intro first)
  {
    id: 7,
    name: 'Computer Hardware Basics',
    issuer: 'Cisco',
    credential: 'Hardware',
    date: '2025',
    url: 'https://www.credly.com/badges/50a3f025-118e-4b43-aab3-d45c2526ca67/linked_in_profile',
  },
  {
    id: 8,
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    credential: 'Security',
    date: '2025',
    url: 'https://www.credly.com/badges/b6168c14-707f-446b-92f2-1ba956a874cd/linked_in_profile',
  },
  {
    id: 9,
    name: 'Network Addressing & Troubleshooting',
    issuer: 'Cisco',
    credential: 'Networking',
    date: '2025',
    url: 'https://www.credly.com/badges/b1ecdd7b-4b55-49c7-9594-ad5348cc13f3/linked_in_profile',
  },
  // Fortinet Certifications (Associate first)
  {
    id: 10,
    name: 'Certified Cybersecurity Associate',
    issuer: 'Fortinet',
    credential: 'FCA',
    date: '2025',
    url: 'https://www.credly.com/badges/843794a2-1105-4d65-9a61-2926792c64b5/linked_in_profile',
  },
  {
    id: 11,
    name: 'FortiGate 7.6 Operator',
    issuer: 'Fortinet',
    credential: 'Operator',
    date: '2025',
    url: 'https://www.credly.com/badges/656fad4f-e51a-46a1-934b-37885f64380b/linked_in_profile',
  },
]);

/**
 * CertificationCard Component
 * Renders an individual certification card
 *
 * @param {Object} props
 * @param {Certification} props.certification - Certification data
 */
function CertificationCard({ certification }) {
  const { name, issuer, credential, date, url } = certification;

  return (
    <article className="cert-card">
      <div className="cert-badge" aria-hidden="true">
        <span className="cert-icon">🏆</span>
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
            <span aria-hidden="true"> →</span>
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * Certifications Section Component
 * Displays all professional certifications in a grid
 */
function Certifications() {
  return (
    <section
      id="certifications"
      className="certifications"
      aria-labelledby="certifications-heading"
    >
      <div className="certifications-container">
        {/* Section Header */}
        <header className="section-header">
          <h2 id="certifications-heading" className="section-title">
            <span className="title-number" aria-hidden="true">
              {SECTION_NUMBER}.
            </span>
            Certifications
          </h2>
          <div className="section-line" aria-hidden="true" />
        </header>

        <p className="certifications-intro">
          Professional certifications and credentials I've earned:
        </p>

        {/* Certifications Grid */}
        <div
          className="certifications-grid"
          role="list"
          aria-label="Professional certifications"
        >
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.id} role="listitem">
              <CertificationCard certification={cert} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
