import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OurServices.css";
import { useGSAP } from "@gsap/react";
import SlideButton from "../SlideButton/SlideButton";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "digital-pr",
    title: "Digital PR",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    column: "left", // ← ADD THIS
  },
  {
    id: "search-growth",
    title: "Search & Growth Strategy",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    column: "left", // ← ADD THIS
  },
  {
    id: "data-insights",
    title: "Data & Insights",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    column: "left", // ← ADD THIS
  },
  {
    id: "organic-social",
    title: "Organic Social & Content",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    column: "right", // ← ADD THIS
  },
  {
    id: "content-experience",
    title: "Content Experience",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
    column: "right", // ← ADD THIS
  },
  {
    id: "onsite-seo",
    title: "Onsite SEO",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    column: "right", // ← ADD THIS
  },
];

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);

  const serviceRefs = useRef([]);
  const imageRefs = useRef([]);
  const arrowRefs = useRef([]);
  const titleRefs = useRef([]);

  // Entrance animation
  useGSAP(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      // Header entrance - animate from below
      gsap.from(header, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Stagger in service rows
      gsap.from(serviceRefs.current.filter(Boolean), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Hover animation timelines
  const hoverTlRefs = useRef([]);

  const buildHoverTl = useCallback((index) => {
    const row = serviceRefs.current[index];
    const image = imageRefs.current[index];
    const arrow = arrowRefs.current[index];
    const title = titleRefs.current[index];
    if (!row || !image || !arrow || !title) return null;

    const tl = gsap.timeline({ paused: true });

    // Image reveal: clip-path from left to right with slight scale
    tl.fromTo(
      image,
      { clipPath: "inset(0 100% 0 0)", scale: 1.15 },
      {
        clipPath: "inset(0 0% 0 0)",
        scale: 1.05,
        duration: 0.1,
        ease: "power3.inOut",
      },
      0,
    );

    // Arrow reveal: scale + rotate in from top-right
    tl.fromTo(
      arrow,
      { scale: 0, rotation: -45, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.1,
        ease: "back.out(1.7)",
      },
      0.15,
    );

    // Title shifts slightly right for depth
    tl.to(title, { x: 12, duration: 0.1, ease: "power2.out" }, 0);

    return tl;
  }, []);

  useEffect(() => {
    SERVICES.forEach((_, i) => {
      hoverTlRefs.current[i] = buildHoverTl(i);
    });

    return () => {
      hoverTlRefs.current.forEach((tl) => tl?.kill());
    };
  }, [buildHoverTl]);

  useEffect(() => {
    if (hoveredIndex !== null && hoverTlRefs.current[hoveredIndex]) {
      hoverTlRefs.current[hoveredIndex].play();
    }

    if (
      prevIndex !== null &&
      prevIndex !== hoveredIndex &&
      hoverTlRefs.current[prevIndex]
    ) {
      hoverTlRefs.current[prevIndex].reverse();
    }

    titleRefs.current.forEach((el, i) => {
      if (!el) return;
      if (hoveredIndex === null) {
        gsap.to(el, { opacity: 1, x: 0, duration: 0.1, ease: "power2.out" });
      } else if (i === hoveredIndex) {
        gsap.to(el, { opacity: 1, duration: 0.1 });
      } else {
        gsap.to(el, { opacity: 0.35, x: 0, duration: 0.1, ease: "power2.out" });
      }
    });
  }, [hoveredIndex, prevIndex]);

  const handleEnter = (index) => {
    setPrevIndex(hoveredIndex);
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setPrevIndex(hoveredIndex);
    setHoveredIndex(null);
  };

  return (
    <section ref={sectionRef} className="services-section" id="services">
      {/* Header */}
      <div ref={headerRef} className="services-header">
        <h2 className="services-title">
          <span className="title-word">Our</span>
          <span className="title-image">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80"
              alt="Team"
              loading="lazy"
            />
          </span>
          <span className="title-word">Services</span>
        </h2>
        <SlideButton text="View All Services" href="#contact" />
      </div>

      {/* Divider */}
      <div className="section-divider" />

      {/* Services List */}
      {/* Services List - 2 Column Layout */}
      <div className="services-list">
        <div className="services-column services-column--left">
          {SERVICES.filter((s) => s.column === "left").map((service) => {
            const globalIndex = SERVICES.findIndex((s) => s.id === service.id);
            return (
              <div
                key={service.id}
                ref={(el) => {
                  serviceRefs.current[globalIndex] = el;
                }}
                className={`service-row ${hoveredIndex === globalIndex ? "is-hovered" : ""}`}
                onMouseEnter={() => handleEnter(globalIndex)}
                onMouseLeave={handleLeave}
              >
                {/* Background image layer */}
                <div
                  ref={(el) => {
                    imageRefs.current[globalIndex] = el;
                  }}
                  className="service-image-bg"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="image-overlay" />
                </div>

                {/* Content layer */}
                <div className="service-content">
                  <div className="service-title-wrap">
                    <span
                      ref={(el) => {
                        arrowRefs.current[globalIndex] = el;
                      }}
                      className="service-arrow"
                    >
                      <ArrowIcon />
                    </span>
                    <h3
                      ref={(el) => {
                        titleRefs.current[globalIndex] = el;
                      }}
                      className="service-title"
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom divider */}
                <div className="row-divider" />
              </div>
            );
          })}
        </div>

        <div className="services-column services-column--right">
          {SERVICES.filter((s) => s.column === "right").map((service) => {
            const globalIndex = SERVICES.findIndex((s) => s.id === service.id);
            return (
              <div
                key={service.id}
                ref={(el) => {
                  serviceRefs.current[globalIndex] = el;
                }}
                className={`service-row ${hoveredIndex === globalIndex ? "is-hovered" : ""}`}
                onMouseEnter={() => handleEnter(globalIndex)}
                onMouseLeave={handleLeave}
              >
                {/* Background image layer */}
                <div
                  ref={(el) => {
                    imageRefs.current[globalIndex] = el;
                  }}
                  className="service-image-bg"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="image-overlay" />
                </div>

                {/* Content layer */}
                <div className="service-content">
                  <div className="service-title-wrap">
                    <span
                      ref={(el) => {
                        arrowRefs.current[globalIndex] = el;
                      }}
                      className="service-arrow"
                    >
                      <ArrowIcon />
                    </span>
                    <h3
                      ref={(el) => {
                        titleRefs.current[globalIndex] = el;
                      }}
                      className="service-title"
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom divider */}
                <div className="row-divider" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
