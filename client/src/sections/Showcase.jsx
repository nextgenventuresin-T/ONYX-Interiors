import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmartImage from "../components/SmartImage";

gsap.registerPlugin(ScrollTrigger);

// A pinned, horizontally-scrolling gallery strip.
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
      const getScrollAmount = () => track.current.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="showcase" ref={root}>
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
    </section>
  );
}
