import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./IndustriesDropdown.css";

const industriesData = [
  {
    label: "B2B Marketing",
    href: "#b2b",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "E-Commerce",
    href: "#ecommerce",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "SaaS & Technology",
    href: "#saas",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Finance & Fintech",
    href: "#fintech",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Healthcare",
    href: "#healthcare",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Travel & Hospitality",
    href: "#travel",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
];

function IndustriesDropdown({ isOpen }) {
  const dropdownRef = useRef(null);
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle featured industry every 4 seconds while open
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industriesData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

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
        contentRef.current.querySelectorAll(".industries__animate"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
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

  const activeIndustry = industriesData[activeIndex];

  return (
    <div
      ref={dropdownRef}
      className="industries-dropdown"
      style={{
        opacity: 0,
        pointerEvents: "none",
        transform: "translateY(-10px)",
      }}
    >
      <div ref={contentRef} className="industries__content">
        {/* Left: Featured Industry */}
        <div className="industries__left">
          <span className="industries__label industries__animate">
            Industries
          </span>
          <h3 className="industries__featured-name industries__animate">
            {activeIndustry.label}
          </h3>
          <p className="industries__description industries__animate">
            Specialized strategies tailored for{" "}
            {activeIndustry.label.toLowerCase()} brands looking to dominate
            search and social.
          </p>
          <a href="#industries" className="industries__cta industries__animate">
            View All Industries
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

          {/* Mini list */}
          <ul className="industries__mini-list industries__animate">
            {industriesData.slice(0, 4).map((ind) => (
              <li key={ind.href}>
                <a href={ind.href} className="industries__mini-link">
                  {ind.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Image */}
        <div className="industries__right industries__animate">
          <div className="industries__image-wrapper">
            <img
              src={activeIndustry.image}
              alt={activeIndustry.label}
              className="industries__image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustriesDropdown;
