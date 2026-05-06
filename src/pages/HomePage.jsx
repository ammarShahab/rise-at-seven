// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import LogoMarquee from "../components/LogoMarquee/LogoMarquee";
// import { useGSAP } from "@gsap/react";

/**
 * HomePage Component
 *
 * Assembles all sections with GSAP ScrollTrigger animations
 * for scroll-reveal effects on content sections.
 */
function HomePage() {
  /* useGSAP(() => {
    const sections = gsap.utils.toArray(".section");

    sections.forEach((section) => {
      const elements = section.querySelectorAll(
        ".section__title, .section__text, .service-card",
      );

      gsap.from(elements, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []); */

  return (
    <>
      <Navbar />
      <Hero />
      <LogoMarquee />

      {/* Footer */}
      <footer className="site-footer">
        <div className="site-footer__logo">Rise at Seven</div>
        <p className="site-footer__copy">
          © 2025 Rise at Seven Ltd. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default HomePage;
