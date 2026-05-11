import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import "./FeaturedWork.css";
import SlideButton from "../SlideButton/SlideButton";

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
// Follows mouse with spring physics; toggles visibility over image area
// ---------------------------------------------------------------------------
const CustomCursor = ({ visible }) => {
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const ringX = useSpring(0, { damping: 25, stiffness: 500 });
  const ringY = useSpring(0, { damping: 25, stiffness: 500 });

  useEffect(() => {
    const handleMove = (e) => {
      cursorX.current = e.clientX - 32; // center 64px cursor
      cursorY.current = e.clientY - 32;
      ringX.set(cursorX.current);
      ringY.set(cursorY.current);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [ringX, ringY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Left Column Text Item
// Absolutely positioned and driven by scroll progress distance
// ---------------------------------------------------------------------------
const ProjectTextItem = ({ project, index, progress, total, activeIndex }) => {
  // Distance from this item's "active" slot (0 = centered, 1 = one slot away)
  const distance = useTransform(progress, (v) => v * (total - 1) - index);

  // Vertical parallax: items flow through the viewport center
  const y = useTransform(distance, [-1.5, 0, 1.5], ["-30vh", "0vh", "30vh"]);
  const opacity = useTransform(
    distance,
    [-1.2, -0.5, 0, 0.5, 1.2],
    [0, 0.15, 1, 0.15, 0],
  );
  const scale = useTransform(distance, [-1, 0, 1], [0.92, 1, 0.92]);

  // Active item sits on top
  const zIndex = total - Math.abs(index - activeIndex);

  return (
    <motion.div
      className="project-text-item"
      style={{ y, opacity, scale, zIndex }}
      whileHover={{ x: 16 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      <h3 className="proj-title">{project.title}</h3>
      <span className="proj-year">{project.year}</span>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Right Column Image Card
// Fills the column, reveals color via clip-path driven by scroll
// ---------------------------------------------------------------------------
const ProjectImageCard = ({ project, index, progress, total, activeIndex }) => {
  const distance = useTransform(progress, (v) => v * (total - 1) - index);

  // Parallax: images move slightly less than text for depth
  const y = useTransform(distance, [-1.5, 0, 1.5], ["-30vh", "0vh", "30vh"]);
  const opacity = useTransform(
    distance,
    [-1, -0.3, 0, 0.3, 1],
    [0, 0.4, 1, 0.4, 0],
  );
  const scale = useTransform(distance, [-1, 0, 1], [1.05, 1, 1.05]);

  // Bottom-to-top color reveal as item approaches center
  const clipReveal = useTransform(
    distance,
    [-0.8, 0],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const zIndex = total - Math.abs(index - activeIndex);

  return (
    <motion.div className="image-card" style={{ y, opacity, zIndex }}>
      {/* Grayscale base layer with subtle zoom breathing */}
      <motion.img
        className="img-grayscale"
        src={project.image}
        alt={project.title}
        loading="lazy"
        style={{ scale }}
      />

      {/* Color reveal layer clipped by scroll distance */}
      <motion.div className="img-color-reveal" style={{ clipPath: clipReveal }}>
        <img
          className="img-color"
          src={project.image}
          alt={project.title}
          loading="lazy"
        />
      </motion.div>

      {/* UI Overlay */}
      <div className="card-overlay">
        <span className="card-category">{project.category}</span>

        {project.cardOverlay?.headline && (
          <div
            className="card-text-box"
            style={{ backgroundColor: project.accentColor }}
          >
            <p className="card-headline">{project.cardOverlay.headline}</p>
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

      {/* Mobile-only meta overlay */}
      <div className="mobile-project-meta">
        <h3 className="mobile-title">{project.title}</h3>
        <span className="mobile-year">{project.year}</span>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Main Section
// ---------------------------------------------------------------------------
const FeaturedWork = () => {
  // Tall wrapper creates the scroll distance; inner section is sticky/pinned
  const wrapperRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll progress through the entire wrapper (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value for a weighty, cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Derive active index from smoothed progress (only updates on integer changes)
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const idx = Math.min(
      Math.round(latest * (PROJECTS.length - 1)),
      PROJECTS.length - 1,
    );
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
  });

  return (
    <>
      <CustomCursor visible={cursorVisible} />

      {/* Scroll track: height = n projects * 100vh */}
      <div
        ref={wrapperRef}
        className="featured-work-wrapper"
        style={{ height: `${PROJECTS.length * 100}vh` }}
      >
        {/* Pinned viewport: always 100vh, content animates inside */}
        <section className="featured-work" id="featured-work">
          <div className="featured-work__inner">
            {/* LEFT: Text column */}
            <div className="featured-work__left">
              <h2 className="fw-label">Featured Work</h2>
              <div className="projects-list">
                {PROJECTS.map((p, i) => (
                  <ProjectTextItem
                    key={p.id}
                    project={p}
                    index={i}
                    progress={smoothProgress}
                    total={PROJECTS.length}
                    activeIndex={activeIndex}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Image column */}
            <div
              className="featured-work__right"
              data-cursor-hover
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
            >
              <div className="cards-stack">
                {PROJECTS.map((p, i) => (
                  <ProjectImageCard
                    key={p.id}
                    project={p}
                    index={i}
                    progress={smoothProgress}
                    total={PROJECTS.length}
                    activeIndex={activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <SlideButton text="Explore More Work" href="#work" />
      </div>
    </>
  );
};

export default FeaturedWork;
