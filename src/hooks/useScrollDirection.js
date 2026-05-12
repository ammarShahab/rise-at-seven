import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to detect scroll direction and position
 * Returns: { scrollY, direction, isAtTop, isPastThreshold }
 */
export function useScrollDirection(threshold = 100, hideThreshold = 100) {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    direction: "up",
    isAtTop: true,
    isPastThreshold: false,
    isPastHideThreshold: false,
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";

      setScrollState({
        scrollY: currentScrollY,
        direction,
        isAtTop: currentScrollY < threshold,
        isPastThreshold: currentScrollY > threshold,
        isPastHideThreshold: currentScrollY > hideThreshold,
      });

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial check
    updateScrollState();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, hideThreshold]);

  return scrollState;
}
