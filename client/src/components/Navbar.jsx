import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const links = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Buildings", to: "/project/onyx-residences" }, // construction showcase
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ lenis }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { offset: 0 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Logo → always home. If already home, smooth-scroll to top.
  const onLogo = (e) => {
    setOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  // Section links. On home → smooth-scroll. Elsewhere → go home, then scroll.
  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href); // Home scrolls to the hash on arrival
      return;
    }
    const target = document.querySelector(href);
    if (target && lenis) lenis.scrollTo(target, { offset: -20 });
    else target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <Link to="/" className="nav__logo" onClick={onLogo}>
        ONYX<span>®</span>
      </Link>

      <nav className={`nav__links ${open ? "is-open" : ""}`}>
        {links.map((l) =>
          l.to ? (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ) : (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          )
        )}
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
