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

function SlideButton({ text, href, variant = "light", className = "" }) {
  const buttonRef = useRef(null); // NEW: ref for border-radius animation
  const originalRef = useRef(null);
  const cloneRef = useRef(null);
  const tlRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();

    const button = buttonRef.current;
    const original = originalRef.current;
    const clone = cloneRef.current;

    tlRef.current = gsap.timeline();

    /* Border-radius morph: pill → 20px */
    tlRef.current.to(
      button,
      {
        borderRadius: "12px",
        duration: 0.12,
        ease: "power3.inOut",
      },
      0,
    );

    /* Original exits upward */
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

    /* Clone enters from below */
    tlRef.current.fromTo(
      clone,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.16,
        ease: "power2.out",
      },
      0.3,
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!tlRef.current) return;
    tlRef.current.reverse();
  }, []);

  // Cleanup timeline on unmount
  useEffect(() => {
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);

  return (
    <a
      ref={buttonRef} // NEW: attach ref to button
      href={href}
      className={`slide-button slide-button--${variant} ${className}`}
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
