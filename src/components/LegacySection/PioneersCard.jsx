import "./PioneersCard.css";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import ReactLenis from "lenis/react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PioneersCard = () => {
  const lenisRef = useRef();
  const containerRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(
    () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section, index) => {
        const container = section.querySelector(".card-inner");
        gsap.to(container, {
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });

        if (index === sections.length - 1) return;

        /* ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        }); */
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div className="pioneers-section">
        <div className="pioneers-content">
          <p className="pioneers-heading">Legacy In The Making</p>
        </div>

        <div ref={containerRef} className="card-stack">
          {/* Main black card */}
          <section className="card one container" id="card-1">
            <div className="card-inner">
              <div className="card-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80"
                  alt="Team member holding sign"
                  loading="lazy"
                />
              </div>

              <h2 className="card-title">Pioneers</h2>

              <div className="card-text">
                <p>
                  We're dedicated to creating the industry narrative that others
                  follow 3 years from now. We paved the path for creative SEO,
                  multi-channel search with Digital PR, and Social Search and we
                  will continue to do it.
                </p>
                <p>
                  We're on a mission to be the first search-first agency to win
                  a Cannes Lion disrupting the status quo.
                </p>
              </div>
            </div>
          </section>
          <section className="card two container" id="card-2">
            <div className="card-inner">
              <div className="card-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80"
                  alt="Team member holding sign"
                  loading="lazy"
                />
              </div>

              <h2 className="card-title">Award Winning</h2>

              <div className="card-text">
                <p>
                  A roll top bath full of 79 awards. Voted The Drum's best
                  agency outside of London. We are official judges for industry
                  awards including Global Search Awards and Global Content
                  Marketing Awards.
                </p>
                {/* <p>
                We're on a mission to be the first search-first agency to win a
                Cannes Lion disrupting the status quo.
              </p> */}
              </div>
            </div>
          </section>
          <section className="card three container" id="card-3">
            <div className="card-inner">
              <div className="card-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80"
                  alt="Team member holding sign"
                  loading="lazy"
                />
              </div>

              <h2 className="card-title">Speed</h2>

              <div className="card-text">
                <p>
                  People ask us why we are called Rise at Seven? Ever heard the
                  saying Early Bird catches the worm? Google is moving fast, but
                  humans are moving faster. We chase consumers, not algorithms.
                  We’ve created a service which takes ideas to result within 60
                  minutes.
                </p>
                {/* <p>
                We're on a mission to be the first search-first agency to win a
                Cannes Lion disrupting the status quo.
              </p> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PioneersCard;
