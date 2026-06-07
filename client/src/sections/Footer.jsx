export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__big">
        <span>ONYX</span>
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
          <a href="mailto:hello@onyx.design">hello@onyx.design</a>
          <a href="https://wa.me/918207538009" target="_blank" rel="noreferrer">+91 82075 38009</a>
          <span>Gurgaon, India</span>
        </div>
      </div>
      <div className="footer__base">
        <span>© {new Date().getFullYear()} ONYX — Design · Architecture · Construction.</span>
        <span>Crafted with care.</span>
      </div>
    </footer>
  );
}
