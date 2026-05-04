import { useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomePage from "./pages/HomePage";
import gsap from "gsap";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on load to calculate positions correctly
    ScrollTrigger.refresh();

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <HomePage />;
}

export default App;
