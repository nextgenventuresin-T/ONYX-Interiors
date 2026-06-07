export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__big">
        <span>Atelier</span>
      </div>
      <div className="footer__row">
        <div className="footer__col">
          <h4>Studio</h4>
          <a href="#work">Work</a>
          <a href="#studio">About</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
        </div>
        <div className="footer__col">
          <h4>Social</h4>
          <a href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noreferrer">Pinterest</a>
          <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <a href="mailto:hello@atelier.design">hello@atelier.design</a>
          <a href="tel:+910000000000">+91 00000 00000</a>
          <span>Sector 44, Gurgaon</span>
        </div>
      </div>
      <div className="footer__base">
        <span>© {new Date().getFullYear()} Atelier Interior Design Studio.</span>
        <span>Crafted with care.</span>
      </div>
    </footer>
  );
}
