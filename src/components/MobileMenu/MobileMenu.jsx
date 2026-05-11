import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MobileMenu.css";
import SlideButton from "../SlideButton/SlideButton";

const menuItems = [
  { label: "Services", hasDropdown: true },
  { label: "Industries", hasDropdown: true },
  { label: "International", hasDropdown: true },
  { label: "About", hasDropdown: true },
  { label: "Work", hasDropdown: false },
  { label: "Careers", hasDropdown: false },
  { label: "Blog & Resources", hasDropdown: true },
  { label: "Webinar", hasDropdown: false },
];

function MobileMenu({ isOpen, onClose }) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className="mobile-menu__header">
            <button
              className="mobile-menu__close"
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-menu__nav" role="navigation">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={`#${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="mobile-menu__link"
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <span className="mobile-menu__link-text">{item.label}</span>
                {item.hasDropdown && (
                  <span className="mobile-menu__link-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                )}
              </motion.a>
            ))}
          </nav>

          {/* Bottom CTA */}
          <motion.div
            className="mobile-menu__footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <SlideButton
              className="mobile-menu__cta"
              text="Get in touch"
              href="#contact"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
