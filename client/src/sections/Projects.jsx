import { useEffect, useState } from "react";
import SmartImage from "../components/SmartImage";
import { useReveal } from "../lib/useReveal";
import { apiUrl } from "../lib/api";

const fallback = [
  { id: "azure-villa", title: "Azure Villa", category: "Residential", location: "Gurgaon", year: "2025", cover: "/assets/images/projects/azure-villa.jpg" },
  { id: "the-grand-living", title: "The Grand Living", category: "Residential", location: "New Delhi", year: "2025", cover: "/assets/images/projects/grand-living.jpg" },
  { id: "sunset-penthouse", title: "Sunset Penthouse", category: "Residential", location: "Mumbai", year: "2024", cover: "/assets/images/projects/sunset-penthouse.jpg" },
  { id: "stone-kitchen", title: "The Atelier Kitchen", category: "Kitchen", location: "Gurgaon", year: "2024", cover: "/assets/images/projects/atelier-kitchen.jpg" },
  { id: "spa-bath", title: "Spa Sanctuary", category: "Bath", location: "Bengaluru", year: "2024", cover: "/assets/images/projects/spa-bath.jpg" },
  { id: "courtyard-pool", title: "Courtyard Pool House", category: "Outdoor", location: "Goa", year: "2023", cover: "/assets/images/projects/courtyard-pool.jpg" },
];

export default function Projects() {
  const [projects, setProjects] = useState(fallback);
  const scope = useReveal([projects]);

  useEffect(() => {
    fetch(apiUrl("/api/projects"))
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && d.length && setProjects(d))
      .catch(() => {});
  }, []);

  return (
    <section className="work" id="work" ref={scope}>
      <div className="work__head">
        <span className="eyebrow" data-reveal>Selected work</span>
        <h2 data-reveal>Projects we're proud of.</h2>
      </div>

      <div className="work__grid">
        {projects.map((p, i) => (
          <article className={`project ${i % 3 === 1 ? "project--tall" : ""}`} key={p.id} data-reveal>
            <div className="project__media">
              <SmartImage src={p.cover} alt={p.title} label={p.title} />
              <span className="project__cat">{p.category}</span>
            </div>
            <div className="project__info">
              <h3>{p.title}</h3>
              <span>{p.location} · {p.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
