import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./InternationalDropdown.css";

const internationalData = [
  {
    label: "US Digital PR",
    href: "#us",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Spain Digital PR",
    href: "#spain",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Germany Digital PR",
    href: "#germany",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Netherlands Digital PR",
    href: "#netherlands",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=600&q=80",
  },
];

function InternationalDropdown({ isOpen }) {
  const dropdownRef = useRef(null);
  const contentRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(0);

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
        contentRef.current.querySelectorAll(".intl__animate"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.1,
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

  const activeOffice = internationalData[hoveredIndex];

  return (
    <div
      ref={dropdownRef}
      className="international-dropdown"
      style={{
        opacity: 0,
        pointerEvents: "none",
        transform: "translateY(-10px)",
      }}
    >
      <div ref={contentRef} className="intl__content">
        {/* Left: Country List */}
        <div className="intl__left">
          <span className="intl__label intl__animate">International</span>
          <ul className="intl__list">
            {internationalData.map((office, index) => (
              <li
                key={office.href}
                className="intl__item intl__animate"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <a
                  href={office.href}
                  className={`intl__link ${hoveredIndex === index ? "is-active" : ""}`}
                >
                  {office.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#international" className="intl__cta intl__animate">
            View All Locations
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

        {/* Right: Image */}
        <div className="intl__right intl__animate">
          <div className="intl__image-wrapper">
            <img
              src={activeOffice.image}
              alt={activeOffice.label}
              className="intl__image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternationalDropdown;
