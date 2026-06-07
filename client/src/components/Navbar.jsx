import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ lenis }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target && lenis) lenis.scrollTo(target, { offset: -20 });
    else target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#top" className="nav__logo" onClick={(e) => go(e, "#top")}>
        ONYX<span>®</span>
      </a>

      <nav className={`nav__links ${open ? "is-open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
            {l.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="nav__cta" onClick={(e) => go(e, "#contact")}>
        Start a project
      </a>

      <button
        className={`nav__burger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        <span />
        <span />
      </button>
    </header>
  );
}
