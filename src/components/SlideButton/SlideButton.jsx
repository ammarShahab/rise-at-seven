import { useRef, useCallback } from "react";
import gsap from "gsap";
import "./SlideButton.css";

/* ============================================
   STANDALONE HELPER COMPONENTS
   ============================================ */

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="slide-button__arrow-icon"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ContentBlock({ text }) {
  return (
    <span className="slide-button__content">
      <span className="slide-button__text">{text}</span>
      <span className="slide-button__arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </span>
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * SlideButton — Reusable hover slide animation
 *
 * On hover:
 *   - Original content slides UP and fades out
 *   - Clone content slides UP from below and fades in
 * On mouse leave:
 *   - Timeline reverses, restoring original content
 *
 * Props:
 *   text      {string}  Button label
 *   href      {string}  Link destination
 *   variant   {string}  "light" | "dark" | "accent"
 *   className {string}  Extra CSS classes
 */
function SlideButton({ text, href, variant = "light", className = "" }) {
  const originalRef = useRef(null);
  const cloneRef = useRef(null);
  const tlRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();

    const original = originalRef.current;
    const clone = cloneRef.current;

    tlRef.current = gsap.timeline();

    /* Original exits upward */
    tlRef.current.to(
      original,
      {
        y: "-100%",
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      },
      0,
    );

    /* Clone enters from below */
    tlRef.current.fromTo(
      clone,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      0.05,
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!tlRef.current) return;
    tlRef.current.reverse();
  }, []);

  return (
    <a
      href={href}
      className={`slide-button slide-button--${variant} ${className}`}
      aria-label={text}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mask clips overflow during slide */}
      <span className="slide-button__mask">
        {/* Original stays in normal flow so button can size itself */}
        <span ref={originalRef} className="slide-button__original">
          <ContentBlock text={text} />
        </span>

        {/* Clone is absolutely positioned, starts below */}
        <span ref={cloneRef} className="slide-button__clone">
          <ContentBlock text={text} />
        </span>
      </span>
    </a>
  );
}

export default SlideButton;
