import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const words = ["Residential", "Architecture", "Turnkey", "Styling", "Lighting", "Bespoke Joinery"];

export default function Marquee() {
  const track = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
      });
      // Skew the strip slightly based on scroll velocity
      let proxy = { skew: 0 };
      const setSkew = gsap.quickSetter(".marquee__word", "skewX", "deg");
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-12, 12, self.getVelocity() / -120);
          if (Math.abs(v) > Math.abs(proxy.skew)) {
            proxy.skew = v;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => setSkew(proxy.skew),
            });
          }
        },
      });
    }, track);
    return () => ctx.revert();
  }, []);

  const items = [...words, ...words];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {items.map((w, i) => (
          <span className="marquee__word" key={i}>
            {w}<i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
