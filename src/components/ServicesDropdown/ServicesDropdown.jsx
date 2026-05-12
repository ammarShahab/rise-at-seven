import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./ServicesDropdown.css";

const servicesData = {
  coreServices: [
    { label: "Search & Growth Strategy", href: "#search-growth" },
    { label: "Onsite SEO", href: "#onsite-seo" },
    { label: "Content Experience", href: "#content-experience" },
    { label: "B2B Marketing", href: "#b2b-marketing" },
  ],
  additionalServices: [
    { label: "Digital PR", href: "#digital-pr" },
    { label: "Social Media & Campaigns", href: "#social-media" },
    { label: "Data & Insights", href: "#data-insights" },
    { label: "Social SEO/Search", href: "#social-seo" },
  ],
};

function ServicesDropdown({ isOpen }) {
  const dropdownRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!dropdownRef.current || !contentRef.current) return;

    if (isOpen) {
      gsap.to(dropdownRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        pointerEvents: "auto",
      });
      gsap.fromTo(
        contentRef.current.querySelectorAll(".dropdown__item"),
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.15,
        },
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="services-dropdown"
      style={{
        opacity: 0,
        pointerEvents: "none",
        transform: "translateY(-10px)",
      }}
    >
      <div ref={contentRef} className="dropdown__content">
        <div className="dropdown__main">
          <span className="dropdown__label">Core Services</span>
          <div className="dropdown__columns">
            <ul className="dropdown__list">
              {servicesData.coreServices.map((service) => (
                <li key={service.href} className="dropdown__item">
                  <a href={service.href} className="dropdown__link">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="dropdown__list">
              {servicesData.additionalServices.map((service) => (
                <li key={service.href} className="dropdown__item">
                  <a href={service.href} className="dropdown__link">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dropdown__image-section">
          <div className="dropdown__image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
              alt="Team collaboration"
              className="dropdown__image"
            />
            <a href="#services" className="dropdown__cta-button">
              View All Services
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesDropdown;
