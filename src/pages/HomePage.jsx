import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
/* import ServiceCard from "../components/ServiceCard/ServiceCard"; */

/**
 * HomePage Component
 *
 * Assembles all sections with GSAP ScrollTrigger animations
 * for scroll-reveal effects on content sections.
 */
function HomePage() {
  useEffect(() => {
    // Scroll-triggered section reveals
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
  }, []);

  // Service card data
  /* const services = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      ),
      title: "Search & SEO",
      description:
        "Dominate search rankings with data-driven strategies that deliver sustainable organic growth.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Social Media",
      description:
        "Create thumb-stopping content that builds communities and drives engagement at scale.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
      title: "Creative Campaigns",
      description:
        "Award-winning creative that cuts through the noise and makes your brand unforgettable.",
    },
  ]; */

  return (
    <>
      <Navbar />
      <Hero />

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
