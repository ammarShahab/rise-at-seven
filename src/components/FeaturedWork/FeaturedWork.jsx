import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FeaturedWork.css";
import { useGSAP } from "@gsap/react";

// ---------------------------------------------------------------------------
// Register GSAP plugins
// ---------------------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const PROJECTS = [
  {
    id: "sixt",
    title: "SIXT",
    year: "[2023-2025]",
    category: "Car rental",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=1200&q=80",
    accentColor: "#111111",
  },
  {
    id: "dojo",
    title: "Dojo - B2B",
    year: "[2021-2025]",
    category: "Card readers",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    accentColor: "#4ecdc4",
  },
  {
    id: "magnet",
    title: "Magnet Trade - B2B",
    year: "[2023-2024]",
    category: "B2B Platform",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    accentColor: "#d8b4fe",
    cardOverlay: {
      headline: "A full service SEO success story 170%+ increase",
      showArrow: true,
    },
  },
  {
    id: "esim",
    title: "Leading E Sim brand globally",
    year: "[2023-2025]",
    category: "eSIM",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80",
    accentColor: "#1e3a8a",
  },
  {
    id: "jd",
    title: "JD Sports",
    year: "[2025]",
    category: "Retail",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
    accentColor: "#000000",
  },
];

// ---------------------------------------------------------------------------
// Custom Cursor Component
// ---------------------------------------------------------------------------
const CustomCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useGSAP(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // GSAP quickTo provides silky 60fps cursor following with interpolation
    const xRing = gsap.quickTo(ring, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    const yRing = gsap.quickTo(ring, "y", {
      duration: 0.55,
      ease: "power3.out",
    });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const onMove = (e) => {
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    // Hover state: expand ring, hide dot
    const onHoverEnter = () => {
      gsap.to(ring, {
        scale: 2.2,
        borderColor: "rgba(255,255,255,0.4)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.25 });
    };

    const onHoverLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(255,255,255,0.8)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove);

    // Delegate hover detection to elements with [data-cursor-hover]
    const attachHover = () => {
      const targets = document.querySelectorAll("[data-cursor-hover]");
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onHoverEnter);
        el.addEventListener("mouseleave", onHoverLeave);
      });
      return targets;
    };

    // Initial attachment + re-attach on DOM changes (simple mutation observer)
    let targets = attachHover();
    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
      targets = attachHover();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

// ---------------------------------------------------------------------------
// Main Featured Work Section
// ---------------------------------------------------------------------------
const FeaturedWork = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // Active index driven by scroll; hoveredIndex overrides it when user interacts
  const [scrollIndex, setScrollIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const activeIndex = hoveredIndex !== null ? hoveredIndex : scrollIndex;

  // Refs for animation targets
  const projectItemRefs = useRef([]);
  const imageCardRefs = useRef([]);
  const colorRevealRefs = useRef([]);
  const textYearRefs = useRef([]);

  // Hover timelines stored per project for fine-grained control
  const hoverTlRefs = useRef([]);

  // -------------------------------------------------------------------------
  // 1. SCROLL-TRIGGERED SECTION ENTRANCE
  // -------------------------------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Master entrance timeline: triggered when section enters viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse", // play on enter, reverse on leave back
        },
      });

      // Label fades in
      entranceTl.from(".fw-label", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // Left project items stagger in from left with slight rotation for cinematic feel
      entranceTl.from(
        projectItemRefs.current,
        {
          x: -80,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.65",
      );

      // Right image cards slide in from right with stagger
      entranceTl.from(
        imageCardRefs.current,
        {
          x: 100,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.9",
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------------------
  // Scroll-driven active item detection (without pinning)
  // Each project triggers its index when it hits center viewport
  // -------------------------------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers = [];

    projectItemRefs.current.forEach((el, i) => {
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setScrollIndex(i),
        onEnterBack: () => setScrollIndex(i),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  // -------------------------------------------------------------------------
  // 4. AUTO-TRANSITION TO NEXT SECTION
  // As the bottom of this section approaches viewport top, reveal next sibling
  // -------------------------------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    const nextSection = section?.nextElementSibling;
    if (!section || !nextSection) return;

    const tween = gsap.fromTo(
      nextSection,
      { y: 120, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "60% bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(nextSection, { clearProps: "all" });
    };
  }, []);
  // -------------------------------------------------------------------------
  // 2. HOVER-BASED IMAGE COLOR REVEAL + TEXT UPDATES
  // -------------------------------------------------------------------------
  // Build a reusable hover timeline for each project
  const buildHoverTl = useCallback((index) => {
    const card = imageCardRefs.current[index];
    const reveal = colorRevealRefs.current[index];
    const item = projectItemRefs.current[index];
    if (!card || !reveal || !item) return null;

    const tl = gsap.timeline({ paused: true });

    // Image: bottom-to-top color reveal via clip-path
    // Start: inset(0 0 100% 0) clips 100% from bottom (fully hidden)
    // End:   inset(0 0 0% 0)  clips 0% from bottom (fully visible)
    tl.to(
      reveal,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.85,
        ease: "power3.inOut",
      },
      0,
    );

    // Slight scale down on grayscale base to create depth
    tl.to(
      card.querySelector(".img-grayscale"),
      {
        scale: 1.05,
        duration: 1,
        ease: "power2.out",
      },
      0,
    );

    // Text highlight: slide right and brighten
    tl.to(
      item.querySelector(".proj-title"),
      {
        x: 24,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      0,
    );

    tl.to(
      item.querySelector(".proj-year"),
      {
        opacity: 1,
        x: 8,
        duration: 0.4,
        ease: "power2.out",
      },
      0.05,
    );

    return tl;
  }, []);

  // Initialize hover timelines once on mount
  useEffect(() => {
    PROJECTS.forEach((_, i) => {
      hoverTlRefs.current[i] = buildHoverTl(i);
    });

    return () => {
      hoverTlRefs.current.forEach((tl) => tl?.kill());
    };
  }, [buildHoverTl]);

  // Drive hover timelines based on activeIndex changes
  useEffect(() => {
    hoverTlRefs.current.forEach((tl, i) => {
      if (!tl) return;
      if (i === activeIndex) {
        tl.play();
      } else {
        tl.reverse();
      }
    });

    // Global dimming: inactive projects fade to gray
    projectItemRefs.current.forEach((el, i) => {
      if (!el) return;
      const title = el.querySelector(".proj-title");
      const year = el.querySelector(".proj-year");

      if (i === activeIndex) {
        gsap.to(title, { opacity: 1, duration: 0.4 });
        gsap.to(year, { opacity: 1, duration: 0.4 });
      } else {
        gsap.to(title, { opacity: 0.25, duration: 0.4 });
        gsap.to(year, { opacity: 0.25, duration: 0.4 });
      }
    });
  }, [activeIndex]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------
  const handleProjectEnter = (index) => setHoveredIndex(index);
  const handleProjectLeave = () => setHoveredIndex(null);
  const handleCardEnter = (index) => setHoveredIndex(index);
  const handleCardLeave = () => setHoveredIndex(null);

  return (
    <>
      <section ref={sectionRef} className="featured-work" id="featured-work">
        <div className="featured-work__inner">
          {/* --------------------------------------------------------------- */}
          {/* LEFT COLUMN: Project List                                       */}
          {/* --------------------------------------------------------------- */}
          <div ref={leftColRef} className="featured-work__left">
            <h2 className="fw-label">Featured Work</h2>

            <div className="projects-list">
              {PROJECTS.map((project, i) => (
                <div
                  key={project.id}
                  ref={(el) => (projectItemRefs.current[i] = el)}
                  className="project-item"
                  data-cursor-hover
                  onMouseEnter={() => handleProjectEnter(i)}
                  onMouseLeave={handleProjectLeave}
                >
                  <h3 className="proj-title">{project.title}</h3>
                  <span
                    ref={(el) => (textYearRefs.current[i] = el)}
                    className="proj-year"
                  >
                    {project.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Image Cards                                       */}
          {/* --------------------------------------------------------------- */}
          <div ref={rightColRef} className="featured-work__right">
            <div className="cards-stack">
              {PROJECTS.map((project, i) => (
                <div
                  key={project.id}
                  ref={(el) => (imageCardRefs.current[i] = el)}
                  className={`image-card ${i === activeIndex ? "is-active" : ""}`}
                  data-cursor-hover
                  onMouseEnter={() => handleCardEnter(i)}
                  onMouseLeave={handleCardLeave}
                  style={{
                    zIndex: i === activeIndex ? 10 : PROJECTS.length - i,
                  }}
                >
                  {/* Grayscale base layer (always visible underneath) */}
                  <img
                    className="img-grayscale"
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />

                  {/* Color reveal layer: clipped from bottom initially */}
                  <div
                    ref={(el) => (colorRevealRefs.current[i] = el)}
                    className="img-color-reveal"
                    style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  >
                    <img
                      className="img-color"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>

                  {/* Card UI Overlay */}
                  <div className="card-overlay">
                    <span className="card-category">{project.category}</span>

                    {project.cardOverlay?.headline && (
                      <div
                        className="card-text-box"
                        style={{ backgroundColor: project.accentColor }}
                      >
                        <p className="card-headline">
                          {project.cardOverlay.headline}
                        </p>
                        {project.cardOverlay.showArrow && (
                          <div className="card-arrow">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Cursor */}
      <CustomCursor />
    </>
  );
};

export default FeaturedWork;
