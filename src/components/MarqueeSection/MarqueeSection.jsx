/**
 * MarqueeSection.jsx
 *
 * A premium, GSAP-powered marquee section with:
 * - Seamless infinite horizontal loop (no gaps, no snaps)
 * - Scroll-reactive speed (accelerates when scrolling)
 * - DIRECTIONAL REVERSE: scroll up = text moves right; scroll down = text moves left
 * - Fully responsive with clean, bold typography
 *
 * Dependencies: react, gsap
 */

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MarqueeSection.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  CONFIGURATION                                                     */
/* ------------------------------------------------------------------ */

const CONFIG = {
  // Base speed in pixels per second (marquee moves left by default)
  baseSpeed: 60,
  // How much scroll velocity amplifies the speed (multiplier)
  velocityMultiplier: 0.15,
  // Smoothing factor for speed changes (0.0 - 1.0). Lower = smoother/slower return
  lerpFactor: 0.08,
  // Maximum speed multiplier (prevents seizure-like motion)
  maxSpeedMult: 6.0,
  // Decay rate for target speed when scroll stops (per frame, 0-1)
  speedDecay: 0.04,
};

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function MarqueeSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const contentRef = useRef(null);

  // Refs to hold animation state without re-renders
  const speedRef = useRef(CONFIG.baseSpeed); // current signed speed (positive = left, negative = right)
  const targetSpeedRef = useRef(CONFIG.baseSpeed); // target signed speed from scroll
  const xPosRef = useRef(0); // current translateX
  const rafIdRef = useRef(null);
  const lastTimeRef = useRef(0);
  const contentWidthRef = useRef(0); // width of one original content block
  const startOffsetRef = useRef(0); // initial x offset to center original content
  const originalItemsRef = useRef([]); // saved original children for cleanup

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const content = contentRef.current;
    if (!section || !track || !content) return;

    // ----------------------------------------------------------------
    // 1. SAVE ORIGINALS & BUILD BIDIRECTIONAL CLONE STRIP
    // ----------------------------------------------------------------
    // To support seamless movement in BOTH directions (left and right),
    // we must place clones BEFORE and AFTER the original content.
    // This ensures the viewport never reveals empty space regardless
    // of which way the user scrolls.
    const originalItems = Array.from(content.children);
    originalItemsRef.current = originalItems;

    const originalWidth = content.scrollWidth;
    if (originalWidth === 0) {
      console.warn("MarqueeSection: Content has zero width, skipping setup");
      return;
    }
    contentWidthRef.current = originalWidth;

    const viewportW = window.innerWidth;
    // Enough clones to fill viewport on both sides + buffer
    const copiesNeeded = Math.ceil(viewportW / originalWidth) + 2;
    // PREPEND clones (for rightward / reverse movement)
    // We insert in reverse order so the sequence remains correct
    for (let i = copiesNeeded - 1; i >= 0; i--) {
      const fragment = document.createDocumentFragment();
      originalItems.forEach((node) => {
        fragment.appendChild(node.cloneNode(true));
      });
      content.insertBefore(fragment, content.firstChild);
    }

    // APPEND clones (for leftward / forward movement)
    for (let i = 0; i < copiesNeeded; i++) {
      originalItems.forEach((node) => {
        content.appendChild(node.cloneNode(true));
      });
    }

    // Set initial position so the "original" block is in the viewport.
    // Original is now at index `copiesNeeded` in the DOM.
    const startOffset = copiesNeeded * originalWidth;
    startOffsetRef.current = startOffset;
    xPosRef.current = -startOffset;

    // ----------------------------------------------------------------
    // 2. SCROLL VELOCITY TRACKING WITH DIRECTION (ScrollTrigger)
    // ----------------------------------------------------------------
    // getVelocity() returns:
    //   > 0  → user is scrolling DOWN  → marquee moves LEFT  (positive speed)
    //   < 0  → user is scrolling UP    → marquee moves RIGHT (negative speed)
    //   = 0  → user stopped scrolling  → marquee returns to base leftward speed
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity(); // px per second, signed
        const boost = Math.abs(velocity) * CONFIG.velocityMultiplier;

        if (velocity > 0) {
          // Scrolling DOWN → speed up moving LEFT
          targetSpeedRef.current = CONFIG.baseSpeed + boost;
        } else if (velocity < 0) {
          // Scrolling UP → REVERSE direction, move RIGHT
          targetSpeedRef.current = -(CONFIG.baseSpeed + boost);
        }
        // When velocity is exactly 0, the decay in the RAF loop
        // will smoothly pull targetSpeed back to baseSpeed (leftward).
      },
    });

    // ----------------------------------------------------------------
    // 3. MAIN ANIMATION LOOP (requestAnimationFrame)
    // ----------------------------------------------------------------
    // Using a manual RAF loop gives us frame-by-frame precision and
    // lets us wrap positions perfectly without gaps in both directions.
    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = time;

      // Smoothly interpolate current speed toward target speed (lerp).
      // This creates the "premium" feel — no jarring speed jumps.
      speedRef.current +=
        (targetSpeedRef.current - speedRef.current) * CONFIG.lerpFactor;

      // Clamp the magnitude so speed never goes crazy in either direction.
      const clampedSpeed = gsap.utils.clamp(
        -CONFIG.baseSpeed * CONFIG.maxSpeedMult,
        CONFIG.baseSpeed * CONFIG.maxSpeedMult,
        speedRef.current,
      );

      // Apply movement. Signed speed handles direction automatically:
      //   positive speed → move left  (xPos decreases)
      //   negative speed → move right (xPos increases)
      xPosRef.current -= clampedSpeed * delta;

      // ----------------------------------------------------------------
      // SEAMLESS WRAP LOGIC (bidirectional)
      // ----------------------------------------------------------------
      // Because clones exist on BOTH sides of the original content,
      // we can wrap by exactly one original block width in either
      // direction. Since every block is visually identical, the wrap
      // is completely invisible — no gaps, no snaps, no glitches.
      const blockWidth = contentWidthRef.current;
      const startOffset = startOffsetRef.current;

      // If we've moved one full block to the LEFT, wrap forward.
      while (xPosRef.current <= -startOffset - blockWidth) {
        xPosRef.current += blockWidth;
      }
      // If we've moved one full block to the RIGHT, wrap backward.
      while (xPosRef.current >= -startOffset + blockWidth) {
        xPosRef.current -= blockWidth;
      }

      // Apply transform with GSAP for GPU-accelerated rendering
      gsap.set(content, { x: xPosRef.current });

      // Slowly decay target speed back to base leftward speed when
      // scrolling stops. ScrollTrigger onUpdate only fires during
      // active scroll, so this decay runs continuously in the loop.
      targetSpeedRef.current +=
        (CONFIG.baseSpeed - targetSpeedRef.current) * CONFIG.speedDecay;

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // ----------------------------------------------------------------
    // 4. CLEANUP
    // ----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      scrollTrigger.kill();
      // Restore original content (remove all clones)
      content.innerHTML = "";
      originalItemsRef.current.forEach((node) => content.appendChild(node));
    };
  }, []);

  return (
    <section ref={sectionRef} className="marquee-section">
      {/* Marquee Track */}
      <div ref={trackRef} className="marquee-track">
        <div ref={contentRef} className="marquee-content">
          {/* Repeatable Marquee Item Set
              This block is cloned by JS (before & after) to create
              the bidirectional infinite loop. */}
          <MarqueeItem text="Algorithms" />
          <MarqueeImage
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
            alt="Conference stage"
          />
          <MarqueeItem text="Chasing" />
          <MarqueeItem text="Tomorrow" />
          <MarqueeImage
            src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop"
            alt="Speaker"
          />
          <MarqueeItem text="Ideas" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SUB-COMPONENTS                                                    */
/* ------------------------------------------------------------------ */

/**
 * Large bold text node for the marquee.
 * Uses viewport-width scaling so it stays proportional on all devices.
 */
function MarqueeItem({ text }) {
  return <span className="marquee-item">{text}</span>;
}

/**
 * Rounded image node for the marquee.
 * Reference shows a rounded-square stage photo between words.
 */
function MarqueeImage({ src, alt }) {
  return (
    <div className="marquee-image-wrapper">
      <img className="marquee-image" src={src} alt={alt} loading="eager" />
    </div>
  );
}
