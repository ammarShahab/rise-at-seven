/**
 * Footer Component
 *
 * Premium agency-style footer for "Rise at Seven".
 * Matches the reference designs for both desktop and mobile layouts.
 *
 * Structure:
 * - Newsletter section (email signup)
 * - Social media icons
 * - Navigation links (3 columns desktop, stacked mobile)
 * - Large brand mark
 * - Bottom legal bar
 */

import "./Footer.css";

const Footer = () => {
  // Navigation link data — grouped by column for desktop layout
  const linkColumns = [
    {
      links: ["Services", "Work", "About", "Culture", "Meet The Risers"],
    },
    {
      links: ["Testimonials", "Blog & Resources", "Webinars", "Careers"],
    },
    {
      links: ["Sheffield", "Manchester", "London", "New York", "Contact"],
    },
  ];

  // Social media platforms with simple text labels (matching reference pill style)
  const socials = [
    { label: "X", href: "#" },
    { label: "in", href: "#" },
    { label: "YT", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "IG", href: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* ============================================
                    TOP SECTION: Newsletter + Socials
                    ============================================ */}
        <div className="footer-top">
          <div className="footer-top-inner">
            <div className="newsletter">
              <h3 className="newsletter-title">Stay updated with Rise news</h3>
              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  className="newsletter-btn"
                  aria-label="Subscribe"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
              {/* Social icons as small pill buttons */}
              <div className="socials">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-pill"
                  >
                    {social.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="social-arrow"
                    >
                      <path
                        d="M1 9L9 1M9 1H3M9 1V7"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* ============================================
                    MIDDLE SECTION: Navigation Links
                    3 columns on desktop, stacked on mobile
                    ============================================ */}
            <nav className="footer-links" aria-label="Footer navigation">
              {linkColumns.map((column, colIndex) => (
                <ul key={colIndex} className="link-column">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </nav>
          </div>
        </div>

        {/* ============================================
                    BRAND MARK: Large "Rise at Seven®"
                    ============================================ */}
        <div className="footer-brand">
          <span className="brand-text">
            Rise at Seven<p className="brand-reg">®</p>
          </span>
        </div>

        {/* ============================================
                    BOTTOM BAR: Copyright + Legal
                    ============================================ */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© 2025 Rise at Seven Ltd. All rights reserved.</span>
            <span className="dot-separator">•</span>
            <span>Company Number 11855187</span>
            <span className="dot-separator">•</span>
            <span>VAT Registered GB 323402945</span>
            <span className="dot-separator">•</span>
            <a href="#" className="legal-link">
              Privacy Policy
            </a>
            <span className="dot-separator">•</span>
            <a href="#" className="legal-link">
              Terms & conditions
            </a>
          </div>
          <a href="#" className="credit-link">
            Website MadeByShape
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
