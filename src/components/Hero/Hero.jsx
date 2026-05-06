import { useRef } from "react";
import { gsap } from "gsap";
import "./Hero.css";
import { useGSAP } from "@gsap/react";

/* Logo components (same as before) */
function GoogleLogo() {
  return (
    <span
      className="logo-word"
      style={{ fontWeight: 500, letterSpacing: "-0.5px", fontSize: "1.3rem" }}
    >
      Google
    </span>
  );
}

function ChatGPTLogo() {
  return (
    <span className="logo-word">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
        image-rendering="optimizeQuality"
        fill-rule="evenodd"
        clip-rule="evenodd"
        viewBox="0 0 512 509.639"
        width="18"
        height="18"
      >
        <path
          fill="#fff"
          d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.612C52.026 509.64 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"
        />
        <path
          fill-rule="nonzero"
          d="M412.037 221.764a90.834 90.834 0 004.648-28.67 90.79 90.79 0 00-12.443-45.87c-16.37-28.496-46.738-46.089-79.605-46.089-6.466 0-12.943.683-19.264 2.04a90.765 90.765 0 00-67.881-30.515h-.576c-.059.002-.149.002-.216.002-39.807 0-75.108 25.686-87.346 63.554-25.626 5.239-47.748 21.31-60.682 44.03a91.873 91.873 0 00-12.407 46.077 91.833 91.833 0 0023.694 61.553 90.802 90.802 0 00-4.649 28.67 90.804 90.804 0 0012.442 45.87c16.369 28.504 46.74 46.087 79.61 46.087a91.81 91.81 0 0019.253-2.04 90.783 90.783 0 0067.887 30.516h.576l.234-.001c39.829 0 75.119-25.686 87.357-63.588 25.626-5.242 47.748-21.312 60.682-44.033a91.718 91.718 0 0012.383-46.035 91.83 91.83 0 00-23.693-61.553l-.004-.005zM275.102 413.161h-.094a68.146 68.146 0 01-43.611-15.8 56.936 56.936 0 002.155-1.221l72.54-41.901a11.799 11.799 0 005.962-10.251V241.651l30.661 17.704c.326.163.55.479.596.84v84.693c-.042 37.653-30.554 68.198-68.21 68.273h.001zm-146.689-62.649a68.128 68.128 0 01-9.152-34.085c0-3.904.341-7.817 1.005-11.663.539.323 1.48.897 2.155 1.285l72.54 41.901a11.832 11.832 0 0011.918-.002l88.563-51.137v35.408a1.1 1.1 0 01-.438.94l-73.33 42.339a68.43 68.43 0 01-34.11 9.12 68.359 68.359 0 01-59.15-34.11l-.001.004zm-19.083-158.36a68.044 68.044 0 0135.538-29.934c0 .625-.036 1.731-.036 2.5v83.801l-.001.07a11.79 11.79 0 005.954 10.242l88.564 51.13-30.661 17.704a1.096 1.096 0 01-1.034.093l-73.337-42.375a68.36 68.36 0 01-34.095-59.143 68.412 68.412 0 019.112-34.085l-.004-.003zm251.907 58.621l-88.563-51.137 30.661-17.697a1.097 1.097 0 011.034-.094l73.337 42.339c21.109 12.195 34.132 34.746 34.132 59.132 0 28.604-17.849 54.199-44.686 64.078v-86.308c.004-.032.004-.065.004-.096 0-4.219-2.261-8.119-5.919-10.217zm30.518-45.93c-.539-.331-1.48-.898-2.155-1.286l-72.54-41.901a11.842 11.842 0 00-5.958-1.611c-2.092 0-4.15.558-5.957 1.611l-88.564 51.137v-35.408l-.001-.061a1.1 1.1 0 01.44-.88l73.33-42.303a68.301 68.301 0 0134.108-9.129c37.704 0 68.281 30.577 68.281 68.281a68.69 68.69 0 01-.984 11.545v.005zm-191.843 63.109l-30.668-17.704a1.09 1.09 0 01-.596-.84v-84.692c.016-37.685 30.593-68.236 68.281-68.236a68.332 68.332 0 0143.689 15.804 63.09 63.09 0 00-2.155 1.222l-72.54 41.9a11.794 11.794 0 00-5.961 10.248v.068l-.05 102.23zm16.655-35.91l39.445-22.782 39.444 22.767v45.55l-39.444 22.767-39.445-22.767v-45.535z"
        />
      </svg>
      ChatGPT
    </span>
  );
}

function GeminiLogo() {
  return (
    <span className="logo-word">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
      </svg>
      Gemini
    </span>
  );
}

function TikTokLogo() {
  return (
    <span className="logo-word">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
      TikTok
    </span>
  );
}

function YouTubeLogo() {
  return (
    <span className="logo-word">
      <svg width="18" height="14" viewBox="0 0 159 110" fill="currentColor">
        <path d="M154 17.5c-1.8-6.7-7.1-12-13.8-13.8C128.1.5 79.5.5 79.5.5S30.9.5 18.8 3.7C12.1 5.5 6.8 10.8 5 17.5 1.8 29.6 1.8 55 1.8 55s0 25.4 3.2 37.5c1.8 6.7 7.1 12 13.8 13.8C30.9 109.5 79.5 109.5 79.5 109.5s48.6 0 60.7-3.2c6.7-1.8 12-7.1 13.8-13.8 3.2-12.1 3.2-37.5 3.2-37.5s0-25.4-3.2-37.5zM63.8 78.8V31.2L104.6 55 63.8 78.8z" />
      </svg>
      YouTube
    </span>
  );
}

function PinterestLogo() {
  return (
    <span className="logo-word">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.5 7.6 11.3-.1-1-.2-2.5.1-3.6.2-.8 1.2-5.2 1.2-5.2s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .8-.5 2.1-.8 3.2-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.5 2.1-4.5 4.3 0 .9.3 1.8.7 2.3.1.1.1.2.1.3l-.3 1c0 .2-.1.2-.3.1-1.2-.6-2-2.4-2-3.8 0-3.1 2.3-6 6.5-6 3.4 0 6.1 2.4 6.1 5.7 0 3.4-2.1 6.1-5.1 6.1-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.8 1.9-1.2 2.5.9.3 1.8.4 2.8.4 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
      </svg>
      Pinterest
    </span>
  );
}

function GiphyLogo() {
  return (
    <span
      className="logo-word"
      style={{ fontWeight: 700, letterSpacing: "1px", fontSize: "0.95rem" }}
    >
      GIPHY
    </span>
  );
}

function RedditLogo() {
  return (
    <span className="logo-word">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 1.25-1.25zm-10.02 0c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 1.25-1.25zM12 5.5c3.56 0 6.72 1.86 8.44 4.64.35-.25.78-.4 1.24-.4 1.17 0 2.13.96 2.13 2.13 0 .88-.54 1.64-1.31 1.97.04.22.06.44.06.66 0 4.14-4.39 7.5-9.8 7.5-5.42 0-9.8-3.36-9.8-7.5 0-.22.02-.44.06-.66a2.126 2.126 0 0 1-1.31-1.97c0-1.17.96-2.13 2.13-2.13.46 0 .89.15 1.24.4C5.28 7.36 8.44 5.5 12 5.5zm-4.5 8.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm9 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-4.97 3.12c-1.37 0-2.59-.55-3.37-1.4-.2.63-.32 1.3-.32 2.03 0 2.07 1.65 3.75 3.69 3.75s3.69-1.68 3.69-3.75c0-.73-.12-1.4-.32-2.03-.78.85-2 1.4-3.37 1.4z" />
      </svg>
      reddit
    </span>
  );
}

function AmazonLogo() {
  return (
    <span
      className="logo-word"
      style={{ fontWeight: 700, fontSize: "1.05rem", position: "relative" }}
    >
      amazon
      <span
        style={{
          position: "absolute",
          bottom: "-2px",
          left: "2px",
          right: "2px",
          height: "2px",
          background: "currentColor",
          borderRadius: "2px",
        }}
      ></span>
    </span>
  );
}

const logos = [
  { name: "Google", component: GoogleLogo },
  { name: "ChatGPT", component: ChatGPTLogo },
  { name: "Gemini", component: GeminiLogo },
  { name: "TikTok", component: TikTokLogo },
  { name: "YouTube", component: YouTubeLogo },
  { name: "Pinterest", component: PinterestLogo },
  { name: "GIPHY", component: GiphyLogo },
  { name: "reddit", component: RedditLogo },
  { name: "amazon", component: AmazonLogo },
];

function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      tl.to(".hero__eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        startAt: { y: 30 },
      })
        .to(
          ".hero__title",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            startAt: { y: 50 },
          },
          "-=0.5",
        )
        .to(
          ".hero__subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            startAt: { y: 30 },
          },
          "-=0.6",
        )
        .from(
          ".hero__logo-item",
          {
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.03,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero__bottom-left",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hero__bottom-right",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5",
        );

      gsap.to(".hero__media img", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        scale: 1,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef} aria-label="Hero banner">
      <div className="hero__media">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Modern creative agency workspace"
          loading="eager"
        />
      </div>

      <div className="hero__content">
        <span className="hero__eyebrow">
          #1 Most recommended
          <br />
          content marketing agency
        </span>
        <h1 className="hero__title">
          We Create
          <br />
          Category Leaders
        </h1>
        <p className="hero__subtitle">on every searchable platform</p>

        <div className="hero__logos">
          {logos.map((logo) => {
            const LogoComponent = logo.component;
            return (
              <div
                key={logo.name}
                className="hero__logo-item"
                title={logo.name}
              >
                <LogoComponent />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom text blocks */}
      <div className="hero__bottom">
        <div className="hero__bottom-left">
          <p>
            Organic media planners creating, distributing &amp; optimising
            search-first content for SEO, Social, PR, AI and LLM search
          </p>
        </div>
        <div className="hero__bottom-right">
          <p>
            4 Global Offices serving
            <br />
            UK, USA (New York) &amp; EU
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
