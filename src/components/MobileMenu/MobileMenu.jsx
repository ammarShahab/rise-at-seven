import { useEffect } from "react";
import "./MobileMenu.css";

/**
 * MobileMenu Component
 * Full-screen overlay menu with staggered link animations
 */
function MobileMenu({ isOpen, onClose, links }) {
  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`mobile-menu ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}
    >
      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          className="mobile-menu__link"
          style={{ transitionDelay: `${(index + 1) * 0.05}s` }}
          onClick={onClose}
        >
          {link.label}
        </a>
      ))}
      <a
        href="#contact"
        className="mobile-menu__link mobile-menu__link--cta"
        style={{ transitionDelay: `${(links.length + 1) * 0.05}s` }}
        onClick={onClose}
      >
        Get in touch
      </a>
    </div>
  );
}

export default MobileMenu;
