import { Link } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import { useReveal } from "../lib/useReveal";
import { projects } from "../data/content";

export default function Projects() {
  const scope = useReveal([projects.length]);

  return (
    <section className="work" id="work" ref={scope}>
      <div className="work__head">
        <span className="eyebrow" data-reveal>Selected work</span>
        <h2 data-reveal>Projects we're proud of.</h2>
      </div>

      <div className="work__grid">
        {projects.map((p) => (
          <Link className="project" to={`/project/${p.id}`} key={p.id} data-reveal>
            <div className="project__media">
              <SmartImage src={p.cover} alt={p.title} label={p.title} />
              <span className="project__cat">{p.category}</span>
              <span className="project__view">View project →</span>
            </div>
            <div className="project__info">
              <h3>{p.title}</h3>
              <span>{p.location} · {p.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
