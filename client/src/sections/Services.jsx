import { Link } from "react-router-dom";
import { useReveal } from "../lib/useReveal";
import { services } from "../data/content";

export default function Services() {
  const scope = useReveal();

  return (
    <section className="services" id="services" ref={scope}>
      <div className="services__head">
        <span className="eyebrow" data-reveal>What we do</span>
        <h2 data-reveal>A complete craft, under one roof.</h2>
      </div>
      <ul className="services__list">
        {services.map((s) => (
          <li className="service" key={s.no} data-reveal>
            <Link className="service__link" to={`/project/${s.link}`}>
              <span className="service__no">{s.no}</span>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__body">{s.body}</p>
              <span className="service__arrow">↗</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
