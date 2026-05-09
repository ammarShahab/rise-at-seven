// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import LogoMarquee from "../components/LogoMarquee/LogoMarquee";
import DemandSection from "../components/DemandSection/DemandSection";
import OurServices from "../components/OurServices/OurServices";
import FeaturedWork from "../components/FeaturedWork/FeaturedWork";
import PioneersCard from "../components/LegacySection/PioneersCard";
import Footer from "../components/Footer/Footer";
import MarqueeSection from "../components/MarqueeSection/MarqueeSection";
import WhatsNewSection from "../components/WhatsNewSection/WhatsNewSection";

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
      <DemandSection />
      <FeaturedWork />
      <OurServices />
      <MarqueeSection />
      <PioneersCard />
      <WhatsNewSection />
      <Footer />
    </>
  );
}

export default HomePage;
