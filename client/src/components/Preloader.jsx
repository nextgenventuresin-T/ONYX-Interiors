import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onDone?.(),
    });

    const obj = { v: 0 };
    tl.to(obj, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(obj.v)).padStart(3, "0");
      },
    })
      .to(".pre-line span", { yPercent: -100, stagger: 0.08, duration: 0.6, ease: "power3.inOut" }, "-=0.4")
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.1");
  }, [onDone]);

  return (
    <div className="preloader" ref={root}>
      <div className="pre-line">
        <span>ATELIER</span>
      </div>
      <div className="pre-line">
        <span>INTERIOR&nbsp;DESIGN&nbsp;STUDIO</span>
      </div>
      <div className="pre-count" ref={count}>000</div>
    </div>
  );
}
