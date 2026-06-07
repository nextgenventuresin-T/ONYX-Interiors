import { useEffect, useState } from "react";
import { useReveal } from "../lib/useReveal";
import { apiUrl } from "../lib/api";

const fallback = [
  { no: "01", title: "Interior Design", body: "End-to-end interiors — concept, spatial planning, material palettes and bespoke detailing tailored to how you live." },
  { no: "02", title: "Architecture", body: "From massing to façade, we shape buildings that hold light beautifully and age with grace." },
  { no: "03", title: "Turnkey Execution", body: "A single accountable team from drawing to handover — civil, joinery, lighting and styling." },
  { no: "04", title: "Styling & Art Curation", body: "The final layer — furniture, objects, textiles and art chosen to give a space its soul." },
];

export default function Services() {
  const [services, setServices] = useState(fallback);
  const scope = useReveal([services]);

  useEffect(() => {
    fetch(apiUrl("/api/services"))
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && d.length && setServices(d))
      .catch(() => {});
  }, []);

  return (
    <section className="services" id="services" ref={scope}>
      <div className="services__head">
        <span className="eyebrow" data-reveal>What we do</span>
        <h2 data-reveal>A complete craft, under one roof.</h2>
      </div>
      <ul className="services__list">
        {services.map((s) => (
          <li className="service" key={s.no} data-reveal>
            <span className="service__no">{s.no}</span>
            <h3 className="service__title">{s.title}</h3>
            <p className="service__body">{s.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
