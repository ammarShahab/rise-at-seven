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
import ReadyToRiseSection from "../components/ReadyToRiseSection/ReadyToRiseSection";

/**
 * HomePage Component
 *
 * Assembles all sections with GSAP ScrollTrigger animations
 * for scroll-reveal effects on content sections.
 */
function HomePage() {
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
      <ReadyToRiseSection />
      <Footer />
    </>
  );
}

export default HomePage;
