import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./ReadyToRiseSection.css";

/**
 * ReadyToRiseSection Component
 *
 * A vertical-scroll-driven horizontal text reveal.
 * As the user scrolls down, the text words "Ready to Rise at Seven"
 * slide horizontally from right to left inside a sticky viewport.
 *
 * Architecture:
 * - scroll-container: 300vh tall, provides the scroll distance
 * - sticky-wrapper: sticks to viewport top, acts as the visible window
 * - gallery: motion.div translated horizontally based on scroll progress
 */

export default function ReadyToRiseSection() {
  const containerRef = useRef(null);

  // Track scroll progress through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate total horizontal distance to move
  // From first word centered to last word centered
  const totalDistance = (words.length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <div id="example">
      {/* Main scroll-driven horizontal container */}
      <div ref={containerRef} className="scroll-container">
        <div className="sticky-wrapper">
          <motion.div className="gallery" style={{ x }}>
            {words.map((word) => (
              <div
                key={word.id}
                className="gallery-item"
                style={{
                  "--item-color": word.color,
                }}
              >
                <div className="item-content">
                  {/* <span className="item-number">0{word.id}</span> */}
                  <h2>{word.text}</h2>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/**
 * ==============   Data   ================
 */

const words = [
  { id: 1, text: "Ready" },
  { id: 2, text: "to" },
  { id: 3, text: "Rise" },
  { id: 4, text: "at" },
  { id: 5, text: "Seven" },
];

const ITEM_WIDTH = 400;
const GAP = 30;
