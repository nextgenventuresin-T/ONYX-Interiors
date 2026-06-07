import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

// Each slide is a full-screen clip. Drop your videos at the `video` paths
// (client/public/assets/videos/...). `poster` shows instantly while the
// clip buffers, and a gradient placeholder covers any missing file.
const slides = [
  {
    title: "The Japandi Home",
    location: "Gurugram",
    category: "Residential",
    video: "/assets/videos/video1.mp4",
    poster: "/assets/images/projects/grand-living.jpg",
  },
  {
    title: "Azure Villa",
    location: "New Delhi",
    category: "Residential",
    video: "/assets/videos/video2.mp4",
    poster: "/assets/images/projects/azure-villa.jpg",
  },
  {
    title: "Sunset Penthouse",
    location: "Mumbai",
    category: "Residential",
    video: "/assets/videos/video3.mp4",
    poster: "/assets/images/projects/sunset-penthouse.jpg",
  },
  {
    title: "The Atelier Kitchen",
    location: "Gurugram",
    category: "Kitchen",
    video: "/assets/videos/video4.mp4",
    poster: "/assets/images/projects/atelier-kitchen.jpg",
  },
];

const DURATION = 4000; // ms each slide stays on screen

export default function Hero() {
  const root = useRef(null);
  const captionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const go = useCallback((next) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  // Autoplay
  useEffect(() => {
    timer.current = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(timer.current);
  }, [index, go]);

  // Animate caption + progress bar on each slide change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero__caption [data-anim]",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 }
      );
      gsap.fromTo(
        ".hero__progress-fill",
        { scaleX: 0 },
        { scaleX: 1, duration: DURATION / 1000, ease: "none" }
      );
    }, root);
    return () => ctx.revert();
  }, [index]);

  // Intro reveal once
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero__brandline span", {
        yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.3,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__slides">
        {slides.map((s, i) => (
          <div className={`hero__slide ${i === index ? "is-active" : ""}`} key={i}>
            <div
              className="hero__fallback"
              style={{ backgroundImage: `url(${s.poster})` }}
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={s.poster}
              preload={i === index ? "auto" : "none"}
            >
              <source src={s.video} type="video/mp4" />
            </video>
          </div>
        ))}
        <div className="hero__overlay" />
      </div>

      {/* Standing brand line */}
      <div className="hero__brand">
        <p className="hero__sub">Luxury Interior Design &amp; Architecture — Gurgaon</p>
        <h1 className="hero__brandline">
          <span>Spaces that feel</span>
          <span><em>like you.</em></span>
        </h1>
      </div>

      {/* Per-slide caption */}
      <div className="hero__caption" key={index} ref={captionRef}>
        <span className="hero__loc"><span data-anim>{slides[index].location}</span></span>
        <h2 className="hero__title"><span data-anim>{slides[index].title}</span></h2>
        <span className="hero__cat"><span data-anim>{slides[index].category}</span></span>
      </div>

      {/* Controls */}
      <button className="hero__arrow hero__arrow--prev" onClick={() => go(index - 1)} aria-label="Previous">
        <Arrow dir="left" />
      </button>
      <button className="hero__arrow hero__arrow--next" onClick={() => go(index + 1)} aria-label="Next">
        <Arrow dir="right" />
      </button>

      {/* Progress dots */}
      <div className="hero__progress">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === index ? "is-active" : ""}`}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <span className="hero__progress-track">
              {i === index && <span className="hero__progress-fill" />}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Arrow({ dir }) {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
      <circle cx="23" cy="23" r="22" stroke="currentColor" strokeOpacity="0.5" />
      <path d="M20 16l7 7-7 7" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
