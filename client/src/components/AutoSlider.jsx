import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SmartImage from "./SmartImage";

/**
 * Continuous, auto-scrolling horizontal image strip. The track is duplicated
 * so the loop is seamless; it eases to a pause on hover. Smooth + premium.
 */
export default function AutoSlider({ images = [], label = "Gallery", speed = 36 }) {
  const track = useRef(null);
  const tween = useRef(null);

  useEffect(() => {
    if (!track.current) return;
    const ctx = gsap.context(() => {
      tween.current = gsap.to(track.current, {
        xPercent: -50,
        repeat: -1,
        duration: speed,
        ease: "none",
      });
    }, track);
    return () => ctx.revert();
  }, [speed, images.length]);

  const slow = () => tween.current && gsap.to(tween.current, { timeScale: 0, duration: 0.6 });
  const go = () => tween.current && gsap.to(tween.current, { timeScale: 1, duration: 0.6 });

  const loop = [...images, ...images];

  return (
    <div className="aslider" onMouseEnter={slow} onMouseLeave={go}>
      <div className="aslider__track" ref={track}>
        {loop.map((src, i) => (
          <figure className="aslider__item" key={i}>
            <SmartImage src={src} alt={`${label} ${(i % images.length) + 1}`} label={label} />
          </figure>
        ))}
      </div>
    </div>
  );
}
