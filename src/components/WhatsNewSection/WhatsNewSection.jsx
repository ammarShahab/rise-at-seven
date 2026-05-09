/**
 * WhatsNewSection.jsx
 *
 * A premium "What's New" news grid section featuring:
 * - Image hover blur effect (GSAP-powered)
 * - Card lift effect on hover
 * - Custom floating cursor icon that follows mouse within card
 * - Fully responsive
 *
 * Dependencies: react, gsap
 */

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "./WhatsNewSection.css";
import SlideButton from "../SlideButton/SlideButton";

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const ARTICLES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    tag: null,
    author: {
      name: "Ray Saddiq",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    },
    readTime: "3 mins",
    title: "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    tag: null,
    author: {
      name: "Ray Saddiq",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    },
    readTime: "2 mins",
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    tag: "News",
    author: {
      name: "Carrie Rose",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
    readTime: "2 mins",
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
  },
];

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function WhatsNewSection() {
  return (
    <section className="whats-new">
      <div className="whats-new__inner">
        {/* Header */}
        <div className="whats-new__header">
          <h2 className="whats-new__title">
            <span>What's</span>
            <span className="whats-new__title-icon">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=200&auto=format&fit=crop"
                alt=""
              />
            </span>
            <span>New</span>
          </h2>
          <SlideButton text="Explore More Thoughts" />
        </div>

        {/* Grid */}
        <div className="whats-new__grid">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ARTICLE CARD (with GSAP hover animations)                         */
/* ------------------------------------------------------------------ */

function ArticleCard({ article }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const cursorRef = useRef(null);

  // Store GSAP tweens so we can kill / overwrite them cleanly
  const tweensRef = useRef({
    cardLift: null,
    imageBlur: null,
    cursorShow: null,
    cursorMove: null,
  });

  useLayoutEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const cursor = cursorRef.current;
    if (!card || !image || !cursor) return;

    // ----------------------------------------------------------------
    // MOUSE ENTER — trigger hover animations
    // ----------------------------------------------------------------
    const onEnter = () => {
      // 1. Lift the entire card upward (subtle, premium feel)
      tweensRef.current.cardLift = gsap.to(card, {
        y: -10,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });

      // 2. Blur the image smoothly
      tweensRef.current.imageBlur = gsap.to(image, {
        filter: "blur(12px)",
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
      });

      // 3. Reveal the custom cursor icon
      tweensRef.current.cursorShow = gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        overwrite: true,
      });
    };

    // ----------------------------------------------------------------
    // MOUSE LEAVE — reverse all hover animations
    // ----------------------------------------------------------------
    const onLeave = () => {
      // 1. Return card to original position
      tweensRef.current.cardLift = gsap.to(card, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });

      // 2. Remove image blur
      tweensRef.current.imageBlur = gsap.to(image, {
        filter: "blur(0px)",
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
      });

      // 3. Hide custom cursor
      tweensRef.current.cursorShow = gsap.to(cursor, {
        opacity: 0,
        scale: 0.6,
        duration: 0.3,
        ease: "power2.in",
        overwrite: true,
      });
    };

    // ----------------------------------------------------------------
    // MOUSE MOVE — custom cursor follows pointer inside card
    // ----------------------------------------------------------------
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Use quickTo for performant, smooth cursor tracking
      // (falls back to gsap.set if quickTo unavailable in this GSAP version)
      if (gsap.quickTo) {
        tweensRef.current.cursorMoveX = gsap.quickTo(cursor, "x", {
          duration: 0.3,
          ease: "power3.out",
        });
        tweensRef.current.cursorMoveY = gsap.quickTo(cursor, "y", {
          duration: 0.3,
          ease: "power3.out",
        });
        tweensRef.current.cursorMoveX(x);
        tweensRef.current.cursorMoveY(y);
      } else {
        gsap.to(cursor, {
          x,
          y,
          duration: 0.3,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("mousemove", onMove);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mousemove", onMove);
      // Kill any running tweens on unmount
      Object.values(tweensRef.current).forEach((t) => t?.kill?.());
    };
  }, []);

  return (
    <article ref={cardRef} className="whats-new__card">
      {/* Image wrapper with custom cursor */}
      <div className="whats-new__media">
        <img
          ref={imageRef}
          src={article.image}
          alt={article.title}
          loading="lazy"
        />

        {/* Tag pill (optional) */}
        {article.tag && <span className="whats-new__tag">{article.tag}</span>}

        {/* Custom hover cursor — mint circle with arrow */}
        <div ref={cursorRef} className="whats-new__cursor" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* Meta row */}
      <div className="whats-new__meta">
        <span className="whats-new__author">
          <img
            className="whats-new__author-avatar"
            src={article.author.avatar}
            alt={article.author.name}
          />
          <span>{article.author.name}</span>
        </span>
        <span className="whats-new__read-time">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{article.readTime}</span>
        </span>
      </div>

      {/* Title */}
      <h3 className="whats-new__heading">{article.title}</h3>
    </article>
  );
}
