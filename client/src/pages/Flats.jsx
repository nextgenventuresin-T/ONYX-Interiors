import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import { useReveal } from "../lib/useReveal";
import { apiUrl } from "../lib/api";
import { flatsFallback } from "../data/flats";

export default function Flats() {
  const [flats, setFlats] = useState(flatsFallback);
  const scope = useReveal([flats]);

  useEffect(() => {
    fetch(apiUrl("/api/flats"))
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        if (Array.isArray(d) && d.length) setFlats(d);
      })
      .catch(() => {});
  }, []);

  return (
    <article className="flats" ref={scope}>
      {/* Header */}
      <header className="flats-hero">
        <span className="eyebrow" data-reveal>Flats &amp; Apartments</span>
        <h1 className="flats-hero__title" data-reveal>
          2, 3 &amp; 4 BHK <em>Flats</em>.
        </h1>
        <p className="flats-hero__lead" data-reveal>
          Turnkey interiors for apartments — living halls, bedrooms, modular
          kitchens and baths, designed and delivered move-in ready.
        </p>
      </header>

      {/* Cards */}
      <section className="flat-grid">
        {flats.map((f) => (
          <article className="flat-card" key={f.id} data-reveal>
            <div className="flat-card__media">
              <SmartImage src={f.image} alt={f.title} label={f.title} />
              <span className="flat-card__type">{f.type}</span>
              {f.status && f.status !== "Available" && (
                <span className="flat-card__status">{f.status}</span>
              )}
            </div>
            <div className="flat-card__body">
              <h3>{f.title}</h3>
              {f.location && <span className="flat-card__loc">{f.location}</span>}
              <p>{f.description}</p>
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="flats-cta" data-reveal>
        <h2>Planning a 2, 3 or 4 BHK?</h2>
        <p>Tell us about your flat and we'll design it end to end.</p>
        <Link to="/#contact" className="flats-cta__btn">Start a project →</Link>
      </section>
    </article>
  );
}
