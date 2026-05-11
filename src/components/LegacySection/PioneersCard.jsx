import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import "./PioneersCard.css";

const cardsData = [
  {
    id: 1,
    title: "Pioneers",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop",
    bgColor: "#0a0a0a",
    textColor: "#ffffff",
    paragraphs: [
      "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
      /* "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.", */
    ],
  },
  {
    id: 2,
    title: "Award\nWinning",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=400&fit=crop",
    bgColor: "#a8f5d9",
    textColor: "#0a0a0a",
    paragraphs: [
      "A roll top bath full of 79 awards. Voted The Drum's best agency outside of London. We are official judges for industry awards including Global Search Awards and Global Content Marketing Awards.",
    ],
  },
  {
    id: 3,
    title: "Speed",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop",
    bgColor: "#ffffff",
    textColor: "#0a0a0a",
    paragraphs: [
      "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? Google is moving fast, but humans are moving faster. We chase consumers, not algorithms. We've created a service which takes ideas to result within 60 minutes.",
    ],
  },
];

const PioneersCard = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="pioneers-section" ref={containerRef}>
      {isMobile ? (
        <MobileSlider />
      ) : (
        <DesktopStack containerRef={containerRef} />
      )}
    </div>
  );
};

// ============================================
// DESKTOP: Scroll-driven card stacking
// ============================================
const DesktopStack = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="pioneers-sticky">
      <h2 className="pioneers-title">Legacy In The Making</h2>
      <div className="pioneers-cards-container">
        {cardsData.map((card, index) => (
          <DesktopCard
            key={card.id}
            card={card}
            index={index}
            totalCards={cardsData.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

const DesktopCard = ({ card, index, totalCards, scrollYProgress }) => {
  // Each card gets an equal slice of the scroll progress
  // Card 0 (Pioneers): 0.00 - 0.33
  // Card 1 (Award):    0.33 - 0.66
  // Card 2 (Speed):    0.66 - 1.00
  const segmentSize = 1 / totalCards;
  const cardStart = index * segmentSize;
  const cardMid = cardStart + segmentSize * 0.4;
  const cardEnd = cardStart + segmentSize * 0.7;
  const cardExit = cardStart + segmentSize;

  // Y position: card starts offset, holds, then exits upward
  const y = useTransform(
    scrollYProgress,
    [0, cardStart, cardMid, cardEnd, cardExit],
    [
      index * 20, // initial stacked offset
      index * 20, // hold
      index * 30, // hold
      -index * 10 - 30, // start moving up
      -800, // exit off screen
    ],
  );

  // Rotation: subtle initial tilt, straightens, then rotates on exit
  const initialRotations = [6, 10, 16]; // card 0, card 1, card 2
  const holdRotations = [5, -2, 12]; // tweak these too if needed

  const rotate = useTransform(
    scrollYProgress,
    [0, cardStart, cardMid, cardEnd, cardExit],
    [
      initialRotations[index], // initial fanned rotation
      holdRotations[index], // hold
      (totalCards - 1 - index) * 2.5, // start straightening
      -index * 1, // more straight
      -15, // rotate on exit
    ],
  );

  // Scale: back cards slightly smaller, scale up when active
  const scale = useTransform(
    scrollYProgress,
    [0, cardStart, cardMid, cardEnd, cardExit],
    [
      1 - index * 0.03, // initial: back cards smaller
      1 - index * 0.03, // hold
      1 - index * 0.015, // start scaling up
      1, // full scale when active
      0.88, // shrink on exit
    ],
  );

  const zIndex = totalCards - index;

  return (
    <motion.div
      className="pioneers-card"
      style={{
        y,
        rotate,
        scale,
        zIndex,
        backgroundColor: card.bgColor,
      }}
    >
      <motion.div>
        <div
          className="pioneers-card-content"
          style={{ color: card.textColor }}
        >
          <div className="pioneers-card-image-wrapper">
            <img
              src={card.image}
              alt={card.title.replace("\n", " ")}
              className="pioneers-card-image"
            />
          </div>

          <h3 className="pioneers-card-heading">
            {card.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < card.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h3>

          <div className="pioneers-card-text">
            {card.paragraphs.map((paragraph, i) => (
              <p key={i} className="pioneers-card-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MOBILE: Horizontal drag slider
// ============================================
const MobileSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const cardWidth = 320;
  const gap = 16;
  const slideAmount = cardWidth + gap;

  const handleDragEnd = (_, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentIndex < cardsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    x.set(-currentIndex * slideAmount);
  }, [currentIndex, x, slideAmount]);

  return (
    <div className="pioneers-mobile">
      <h2 className="pioneers-title">Legacy In The Making</h2>

      <div className="pioneers-mobile-slider-wrapper">
        <motion.div
          ref={containerRef}
          className="pioneers-mobile-slider"
          style={{ x: springX }}
          drag="x"
          dragConstraints={{
            left: -((cardsData.length - 1) * slideAmount),
            right: 0,
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {cardsData.map((card, index) => (
            <motion.div
              key={card.id}
              className="pioneers-mobile-card"
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
              }}
              animate={{
                scale: index === currentIndex ? 1 : 0.92,
                opacity: index === currentIndex ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            >
              <CardContent card={card} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="pioneers-mobile-dots">
        {cardsData.map((_, index) => (
          <button
            key={index}
            className={`pioneers-mobile-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Shared Card Content
// ============================================
const CardContent = ({ card }) => (
  <div className="pioneers-card-content">
    <div className="pioneers-card-image-wrapper">
      <img
        src={card.image}
        alt={card.title.replace("\n", " ")}
        className="pioneers-card-image"
      />
    </div>

    <h3 className="pioneers-card-heading">
      {card.title.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          {i < card.title.split("\n").length - 1 && <br />}
        </span>
      ))}
    </h3>

    <div className="pioneers-card-text">
      {card.paragraphs.map((paragraph, i) => (
        <p key={i} className="pioneers-card-paragraph">
          {paragraph}
        </p>
      ))}
    </div>
  </div>
);

export default PioneersCard;
