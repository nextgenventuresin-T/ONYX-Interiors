import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmartImage from "../components/SmartImage";

gsap.registerPlugin(ScrollTrigger);

// A horizontally-scrolling gallery strip. Uses CSS `position: sticky` (NOT
// ScrollTrigger's pin) so it never wraps DOM nodes — that wrapping crashes
// React with a removeChild error on route change.
const shots = [
  { src: "/assets/images/gallery/living.jpg", label: "Living" },
  { src: "/assets/images/gallery/kitchen.jpg", label: "Kitchen" },
  { src: "/assets/images/gallery/stairs.jpg", label: "Staircase" },
  { src: "/assets/images/gallery/bath.jpg", label: "Bath" },
  { src: "/assets/images/gallery/dining.jpg", label: "Dining" },
  { src: "/assets/images/gallery/balcony.jpg", label: "Balcony" },
];

export default function Showcase() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const section = root.current;
      const trackEl = track.current;
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);
      // size the scroll runway so we can scrub the whole track
      const setHeight = () => {
        section.style.height = window.innerHeight + distance() + "px";
      };
      setHeight();

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: setHeight,
        },
      });

      return () => {
        section.style.height = "";
        gsap.set(trackEl, { x: 0 });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="showcase" ref={root}>
      <div className="showcase__sticky">
        <div className="showcase__track" ref={track}>
          <div className="showcase__intro">
            <span className="eyebrow">Inside our spaces</span>
            <h2>Every detail, considered.</h2>
          </div>
          {shots.map((s, i) => (
            <figure className="showcase__item" key={i}>
              <SmartImage src={s.src} alt={s.label} label={s.label} />
              <figcaption>{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
