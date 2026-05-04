import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Hero.css";

/**
 * Hero Component
 *
 * Features:
 * - Full viewport height with background image
 * - Staggered GSAP entrance animation
 * - Parallax scroll effect on background
 * - Scroll indicator with bounce animation
 */
function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance animation
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      tl.to(".hero__eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        startAt: { y: 30 },
      })
        .to(
          ".hero__title",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            startAt: { y: 50 },
          },
          "-=0.5",
        )
        .to(
          ".hero__subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            startAt: { y: 30 },
          },
          "-=0.6",
        )
        .to(
          ".hero__cta",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            startAt: { y: 20 },
          },
          "-=0.4",
        );

      // Parallax effect on background image
      gsap.to(".hero__media img", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        scale: 1.1,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef} aria-label="Hero banner">
      <div className="hero__media">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Modern creative agency workspace"
          loading="eager"
        />
      </div>

      <div className="hero__content" ref={contentRef}>
        <span className="hero__eyebrow">Award-Winning Digital Agency</span>
        <h1 className="hero__title">
          We Rise Above
          <br />
          Digital Noise
        </h1>
        <p className="hero__subtitle">
          Strategy, creativity, and technology combined to build brands that
          dominate search, social, and culture.
        </p>
        <a href="#work" className="hero__cta">
          View our work
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}

export default Hero;
