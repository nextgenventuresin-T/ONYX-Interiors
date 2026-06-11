import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "Projects delivered" },
  { value: 14, suffix: "", label: "Years of craft" },
  { value: 32, suffix: "", label: "Cities" },
  { value: 96, suffix: "%", label: "Referral clients" },
];

export default function Stats() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".stat__num").forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: end,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => (el.firstChild.textContent = Math.round(obj.v)),
            }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stats" ref={root}>
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <p className="stat__num" data-value={s.value}>
            <span>0</span>
            {s.suffix}
          </p>
          <p className="stat__label">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
