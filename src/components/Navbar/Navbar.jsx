import { useState } from "react";
import { gsap } from "gsap";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import NavLink from "../NavLink/NavLink";
import FlipButton from "../FlipButton/FlipButton";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./Navbar.css";
import { useGSAP } from "@gsap/react";

/**
 * Navbar Component
 *
 * Behavior:
 * - Initial: Transparent over hero image
 * - Scroll down > 100px: Becomes solid with blur backdrop
 * - Scroll down > 400px: Hides (slides up)
 * - Scroll up: Reappears
 * - At top: Returns to transparent
 */
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { direction, isPastThreshold, isPastHideThreshold } =
    useScrollDirection();

  // Determine navbar state classes
  const isSolid = isPastThreshold;
  const isHidden =
    isPastHideThreshold && direction === "down" && !isMobileMenuOpen;

  // Navigation links data
  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#international", label: "International" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#careers", label: "Careers" },
    { href: "#blogs", label: "Blogs" },
    { href: "#webinar", label: "Webinar" },
  ];

  // GSAP entrance animation on mount

  useGSAP(() => {
    gsap.from(".navbar", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.1, // Add a delay of 0.1 seconds
    });
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`navbar ${isSolid ? "is-solid" : ""} ${isHidden ? "is-hidden" : ""}`}
        id="navbar"
        role="banner"
      >
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="Rise at Seven Home">
          Rise at Seven
        </a>

        {/* Desktop Navigation */}
        <nav
          className="navbar__nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="navbar__actions">
          <FlipButton
            text="Get in touch"
            href="#contact"
            className="navbar__cta"
          />

          {/* Mobile Menu Toggle */}
          <button
            className={`menu-toggle ${isMobileMenuOpen ? "is-active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="menu-toggle__bar"></span>
            <span className="menu-toggle__bar"></span>
            <span className="menu-toggle__bar"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}

export default Navbar;
