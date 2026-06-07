import { useState } from "react";
import { useReveal } from "../lib/useReveal";

// Press / partner logos. Drop real logo files (transparent PNG/SVG) at the
// `logo` paths to replace the elegant wordmark fallbacks — no code change.
const partners = [
  { name: "Architectural Digest", logo: "/assets/images/sponsors/ad.png" },
  { name: "Elle Decor", logo: "/assets/images/sponsors/elle-decor.png" },
  { name: "Beautiful Homes", logo: "/assets/images/sponsors/beautiful-homes.png" },
  { name: "Casa Vogue", logo: "/assets/images/sponsors/casa-vogue.png" },
  { name: "Design Trust", logo: "/assets/images/sponsors/design-trust.png" },
  { name: "The Address", logo: "/assets/images/sponsors/the-address.png" },
];

export default function Sponsors() {
  const scope = useReveal();

  return (
    <section className="sponsors" id="sponsors" ref={scope}>
      <div className="sponsors__head">
        <span className="eyebrow" data-reveal>As featured in &amp; trusted by</span>
        <h2 data-reveal>In good company.</h2>
        <p className="sponsors__lead" data-reveal>
          Our work has been recognised by leading design publications and
          delivered for brands who care about craft.
        </p>
      </div>

      <div className="sponsors__grid" data-reveal>
        {partners.map((p) => (
          <div className="sponsor" key={p.name} title={p.name}>
            <Logo name={p.name} logo={p.logo} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* Shows the logo image if present, else a refined serif wordmark. */
function Logo({ name, logo }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="sponsor__wordmark">{name}</span>;
  return (
    <img
      className="sponsor__logo"
      src={logo}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
