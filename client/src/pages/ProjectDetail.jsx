import { useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { getProject, getNextProject } from "../data/content";
import SmartImage from "../components/SmartImage";
import AutoSlider from "../components/AutoSlider";
import { useReveal } from "../lib/useReveal";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProject(id);
  const next = getNextProject(id);
  const heroRef = useRef(null);
  const scope = useReveal([id]);

  useEffect(() => {
    if (!project) {
      navigate("/", { replace: true });
      return;
    }
    const ctx = gsap.context(() => {
      // Hero reveals, timed to land as the CSS curtain lifts (~0.5s in)
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(".pd-hero__media .smart-image, .pd-hero__media video", { scale: 1.25, duration: 1.6, ease: "power3.out" })
        .from(".pd-hero__title span", { yPercent: 110, duration: 1, ease: "power4.out" }, "<0.3")
        .from(".pd-hero__meta > *", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, "<0.2")
        .from(".pd-back", { opacity: 0, duration: 0.5 }, "<");

      // Parallax on the hero media
      gsap.to(".pd-hero__media", {
        yPercent: 16, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, [project, navigate, id]);

  if (!project) return null;

  const [g1, g2, g3, g4, g5] = project.gallery;

  return (
    <article className="pd" ref={scope} key={id}>
      {/* Intro curtain */}
      <div className="pd-curtain">
        <span className="pd-curtain__title">{project.title}</span>
      </div>

      {/* Hero */}
      <header className="pd-hero" ref={heroRef}>
        <div className="pd-hero__media">
          {project.heroVideo ? (
            <video autoPlay muted loop playsInline poster={project.cover}>
              <source src={project.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <SmartImage src={project.cover} alt={project.title} label={project.title} />
          )}
          <div className="pd-hero__overlay" />
        </div>
        <div className="pd-hero__inner">
          <Link to="/" className="pd-back">← Back to work</Link>
          <h1 className="pd-hero__title">
            <span>{project.title}</span>
          </h1>
          <div className="pd-hero__meta">
            <span><i>Location</i>{project.location}</span>
            <span><i>Year</i>{project.year}</span>
            <span><i>Category</i>{project.category}</span>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="pd-intro">
        <div className="pd-intro__services" data-reveal>
          <h4>Services</h4>
          <ul>{project.services.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <p className="pd-intro__lead" data-reveal>{project.intro}</p>
      </section>

      {/* First two images */}
      <section className="pd-duo">
        <figure data-reveal><SmartImage src={g1} alt={`${project.title} 1`} label={project.title} /></figure>
        <figure data-reveal><SmartImage src={g2} alt={`${project.title} 2`} label={project.title} /></figure>
      </section>

      {/* Body copy + tall image */}
      <section className="pd-feature">
        <figure className="pd-feature__media" data-reveal>
          <SmartImage src={g3} alt={`${project.title} 3`} label={project.title} />
        </figure>
        <div className="pd-feature__text" data-reveal>
          <span className="eyebrow">The detail</span>
          <p>{project.body}</p>
        </div>
      </section>

      {/* Auto-sliding gallery */}
      <section className="pd-slider-wrap">
        <div className="pd-slider-head" data-reveal>
          <span className="eyebrow">More from this project</span>
        </div>
        <AutoSlider images={[g1, g2, g3, g4, g5]} label={project.title} />
      </section>

      {/* Wide closing image */}
      <section className="pd-wide">
        <figure data-reveal><SmartImage src={g4} alt={`${project.title} 4`} label={project.title} /></figure>
      </section>

      {/* Next project */}
      <Link to={`/project/${next.id}`} className="pd-next">
        <div className="pd-next__media">
          <SmartImage src={next.cover} alt={next.title} label={next.title} />
          <div className="pd-next__overlay" />
        </div>
        <div className="pd-next__inner">
          <span className="eyebrow">Next project</span>
          <h2>{next.title}</h2>
          <span className="pd-next__cta">View project →</span>
        </div>
      </Link>
    </article>
  );
}
