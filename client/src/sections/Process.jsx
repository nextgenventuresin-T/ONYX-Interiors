import { useReveal } from "../lib/useReveal";

const steps = [
  { no: "01", title: "Discover", body: "We listen — to your life, your rituals, your taste. A brief becomes a vision." },
  { no: "02", title: "Design", body: "Concepts, layouts, 3D walkthroughs and curated material palettes you can touch." },
  { no: "03", title: "Develop", body: "Detailed drawings, joinery, lighting plans and a transparent budget locked in." },
  { no: "04", title: "Deliver", body: "On-site execution and styling by our own team — handed over, move-in ready." },
];

export default function Process() {
  const scope = useReveal();
  return (
    <section className="process" id="process" ref={scope}>
      <div className="process__head">
        <span className="eyebrow" data-reveal>How we work</span>
        <h2 data-reveal>A process built on clarity.</h2>
      </div>
      <div className="process__steps">
        {steps.map((s) => (
          <div className="step" key={s.no} data-reveal>
            <span className="step__no">{s.no}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
