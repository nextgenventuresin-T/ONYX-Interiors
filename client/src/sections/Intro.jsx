import { useReveal } from "../lib/useReveal";

export default function Intro() {
  const scope = useReveal();
  return (
    <section className="intro" id="studio" ref={scope}>
      <span className="eyebrow" data-reveal>The Studio</span>
      <p className="intro__statement">
        <span data-reveal>We design interiors that are quietly extraordinary —</span>{" "}
        <span data-reveal>rooted in how you live, refined through material,</span>{" "}
        <span data-reveal>light and proportion into spaces that endure.</span>
      </p>
      <div className="intro__foot" data-reveal>
        <p>
          A multidisciplinary studio of architects, designers and craftspeople
          delivering residential and commercial projects from first sketch to
          final styling.
        </p>
        <a href="#work" className="link-underline">View selected work →</a>
      </div>
    </section>
  );
}
