/**
 * CinematicText Component
 *
 * Implements a scroll-triggered, staggered letter animation where each character
 * flies in from the top-right corner of the viewport like a train, with each
 * subsequent letter appearing slightly below the previous one before settling
 * into perfect alignment.
 *
 * Animation Logic:
 * - Uses Framer Motion's useScroll + useTransform for scroll-linked progress
 * - Each letter has a unique stagger delay based on its index
 * - Letters start from top-right (viewport coordinates) with rotation
 * - Each subsequent letter starts slightly lower (cascading offset)
 * - Scroll progress 0-1 drives the entire animation forward/backward
 */

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./ReadyToRiseSection.css";

const ReadyToRiseSection = ({
  text = "Ready to Rise at Seven",
  className = "",
}) => {
  // Ref for the section container - used to track scroll position
  const sectionRef = useRef(null);

  /**
   * useScroll tracks scroll progress through the section
   * target: sectionRef - the element we're tracking
   * offset: ["start end", "end start"] means:
   *   - Animation starts when section top hits viewport bottom
   *   - Animation completes when section bottom hits viewport top
   * This gives a generous scroll distance for the animation to play out
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /**
   * useSpring adds natural physics-based smoothing to scroll progress
   * stiffness: 100 - responsive but not snappy
   * damping: 30 - smooth deceleration for premium feel
   * restDelta: 0.001 - precision threshold
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Split text into individual characters for per-letter animation
  const characters = useMemo(() => text.split(""), [text]);

  return (
    <section ref={sectionRef} className={`cinematic-section ${className}`}>
      <div className="cinematic-container">
        {/* 
          Screen-reader accessible text (hidden visually)
          Ensures accessibility while animated spans are aria-hidden
        */}
        <h1 className="sr-only">{text}</h1>

        {/* Animated text container - hidden from screen readers */}
        <div className="text-wrapper" aria-hidden="true">
          {characters.map((char, index) => (
            <AnimatedLetter
              key={`${char}-${index}`}
              char={char}
              index={index}
              totalChars={characters.length}
              progress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * AnimatedLetter Component
 *
 * Each letter is individually animated based on scroll progress.
 * The animation uses useTransform to map scroll progress (0-1) to
 * specific transform values for each letter.
 *
 * Key Animation Features:
 * 1. STAGGER: Each letter has a unique delay window within the scroll range
 * 2. TOP-RIGHT ORIGIN: Letters start from viewport top-right corner
 * 3. CASCADE: Each letter starts slightly lower than the previous
 * 4. ROTATION: Letters rotate in from a tilted angle
 * 5. OPACITY: Fade in during the animation
 */
const AnimatedLetter = ({ char, index, totalChars, progress }) => {
  // Calculate stagger parameters for this specific letter
  const staggerDelay = index * 0.03; // 30ms delay between each letter
  const staggerWindow = 0.4; // Each letter animates over 40% of scroll range
  const letterStart = staggerDelay;
  const letterEnd = letterStart + staggerWindow;

  /**
   * useTransform maps scroll progress to letter-specific values
   * inputRange: [letterStart, letterEnd] - when this letter animates
   * outputRange: [startValue, endValue]
   *
   * The clamp option ensures values stay within range
   */

  // X Position: From viewport right edge (100vw) to final position (0)
  const x = useTransform(progress, [letterStart, letterEnd], ["100vw", "0px"], {
    clamp: true,
  });

  // Y Position: From above viewport with cascading offset
  // Each letter starts 15px lower than the previous for the "train" effect
  const y = useTransform(
    progress,
    [letterStart, letterEnd],
    [`-${20 + index * 15}px`, "0px"],
    { clamp: true },
  );

  // Rotation: From tilted angle to upright
  const rotate = useTransform(
    progress,
    [letterStart, letterEnd],
    [15 - index * 2, 0], // Slight variation per letter
    { clamp: true },
  );

  // Opacity: Fade in during animation
  const opacity = useTransform(
    progress,
    [letterStart, letterStart + 0.1, letterEnd - 0.1, letterEnd],
    [0, 1, 1, 1],
    { clamp: true },
  );

  // Scale: Slight overshoot for dynamic feel
  const scale = useTransform(
    progress,
    [letterStart, letterEnd - 0.05, letterEnd],
    [0.5, 1.05, 1],
    { clamp: true },
  );

  return (
    <motion.span
      className={`animated-letter ${char === " " ? "space" : ""}`}
      style={{
        x,
        y,
        rotate,
        opacity,
        scale,
        display: "inline-block",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export default ReadyToRiseSection;
