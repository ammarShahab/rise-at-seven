import { useState } from "react";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import NavLink from "../NavLink/NavLink";
import MobileMenu from "../MobileMenu/MobileMenu";
import ServicesDropdown from "../ServicesDropdown/ServicesDropdown";
import IndustriesDropdown from "../IndustriesDropdown/IndustriesDropdown";
import InternationalDropdown from "../InternationalDropdown/InternationalDropdown";
import "./Navbar.css";
import SlideButton from "../SlideButton/SlideButton";

function Navbar({ onDropdownOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'industries' | 'international' | null

  const { direction, isPastThreshold, isPastHideThreshold } =
    useScrollDirection();

  const isSolid = isPastThreshold;
  const isHidden =
    isPastHideThreshold && direction === "down" && !isMobileMenuOpen;
  // const isAnyDropdownOpen = activeDropdown !== null;

  const navLinks = [
    { href: "#services", label: "Services+", dropdown: "services" },
    { href: "#industries", label: "Industries+", dropdown: "industries" },
    {
      href: "#international",
      label: "International+",
      dropdown: "international",
    },
    { href: "#about", label: "About+" },
    { href: "#work", label: "Work" },
    { href: "#careers", label: "Careers" },
    { href: "#blogs", label: "Blog & Resources" },
    { href: "#webinar", label: "Webinar" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMouseEnter = (dropdownType) => {
    setActiveDropdown(dropdownType);
    onDropdownOpen?.(true);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
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
              onMouseEnter={
                link.dropdown
                  ? () => handleMouseEnter(link.dropdown)
                  : undefined
              }
              onMouseLeave={link.dropdown ? handleMouseLeave : undefined}
            >
              <NavLink href={link.href}>{link.label}</NavLink>
              {link.dropdown === "services" && (
                <ServicesDropdown isOpen={activeDropdown === "services"} />
              )}
              {link.dropdown === "industries" && (
                <IndustriesDropdown isOpen={activeDropdown === "industries"} />
              )}
              {link.dropdown === "international" && (
                <InternationalDropdown
                  isOpen={activeDropdown === "international"}
                />
              )}
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
