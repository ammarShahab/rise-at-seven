import { useState } from "react";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import NavLink from "../NavLink/NavLink";
import MobileMenu from "../MobileMenu/MobileMenu";
import ServicesDropdown from "../ServicesDropdown/ServicesDropdown";
import "./Navbar.css";
import SlideButton from "../SlideButton/SlideButton";

function Navbar({ onDropdownOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { direction, isPastThreshold, isPastHideThreshold } =
    useScrollDirection();

  const isSolid = isPastThreshold;
  const isHidden =
    isPastHideThreshold && direction === "down" && !isMobileMenuOpen;

  const navLinks = [
    { href: "#services", label: "Services+", hasDropdown: true },
    { href: "#industries", label: "Industries+" },
    { href: "#international", label: "International+" },
    { href: "#about", label: "About+" },
    { href: "#work", label: "Work" },
    { href: "#careers", label: "Careers" },
    { href: "#blogs", label: "Blog & Resources" },
    { href: "#webinar", label: "Webinar" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleServicesEnter = () => {
    setIsServicesOpen(true);
    onDropdownOpen?.(true);
  };

  const handleServicesLeave = () => {
    setIsServicesOpen(false);
    onDropdownOpen?.(false);
  };

  return (
    <>
      <SlideButton
        className={`announcement-bar ${isSolid ? "is-scrolled" : ""}`}
        text="🚨 The Category Leaderboard – Live Now"
        showArrow={false}
      />

      <header
        className={`navbar ${isSolid ? "is-solid" : ""} ${isHidden ? "is-hidden" : ""}`}
        id="navbar"
        role="banner"
      >
        <a href="#" className="navbar__logo" aria-label="Rise at Seven Home">
          Rise at Seven
        </a>

        <nav
          className="navbar__nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="navbar__nav-item"
              onMouseEnter={link.hasDropdown ? handleServicesEnter : undefined}
              onMouseLeave={link.hasDropdown ? handleServicesLeave : undefined}
            >
              <NavLink href={link.href}>{link.label}</NavLink>
              {link.hasDropdown && <ServicesDropdown isOpen={isServicesOpen} />}
            </div>
          ))}
        </nav>

        <div className="navbar__actions">
          <SlideButton
            text="Get in touch"
            href="#contact"
            className={`navbar__cta ${isMobileMenuOpen ? "hidden-mobile" : ""}`}
          />

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

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}

export default Navbar;
