import { useRef, useCallback, useEffect } from "react";
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
 * Props:
 *   text      {string}  Button label
 *   href      {string}  Link destination
 *   variant   {string}  "light" | "dark" | "accent" | "ghost"
 *   ghost     {boolean} If true: transparent bg, no radius morph, slide only
 *   className {string}  Extra CSS classes
 */
function SlideButton({
  text,
  href,
  variant = "light",
  ghost = false,
  className = "",
}) {
  const buttonRef = useRef(null);
  const originalRef = useRef(null);
  const cloneRef = useRef(null);
  const tlRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();

    const button = buttonRef.current;
    const original = originalRef.current;
    const clone = cloneRef.current;

    tlRef.current = gsap.timeline();

    /* ── FILLED-ONLY: Border-radius morph ── */
    if (!ghost) {
      tlRef.current.to(
        button,
        {
          borderRadius: "12px",
          duration: 0.12,
          ease: "power2.out",
        },
        0,
      );
    }

    /* ── SLIDE: Original exits upward ── */
    tlRef.current.to(
      original,
      {
        y: "-100%",
        opacity: 0,
        duration: 0.15,
        ease: "power2.in",
      },
      0,
    );

    /* ── SLIDE: Clone enters from below ── */
    tlRef.current.fromTo(
      clone,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.16,
        ease: "power2.out",
      },
      0.3, // gap before clone appears
    );
  }, [ghost]);

  const handleMouseLeave = useCallback(() => {
    if (!tlRef.current) return;
    tlRef.current.reverse();
  }, []);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  /* Build class list: variant + ghost modifier */
  const variantClass = ghost
    ? `slide-button--ghost slide-button--${variant}`
    : `slide-button--${variant}`;

  return (
    <a
      ref={buttonRef}
      href={href}
      className={`slide-button ${variantClass} ${className}`}
      aria-label={text}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="slide-button__mask">
        <span ref={originalRef} className="slide-button__original">
          <ContentBlock text={text} />
        </span>
        <span ref={cloneRef} className="slide-button__clone">
          <ContentBlock text={text} />
        </span>
      </span>
    </a>
  );
}

export default SlideButton;
