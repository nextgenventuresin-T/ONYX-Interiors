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
          <a href="mailto:sudhirkumargaya198@gmail.com">sudhirkumargaya198@gmail.com</a>
          <a href="https://wa.me/918207538009" target="_blank" rel="noreferrer">+91 82075 38009</a>
          <a href="tel:+918092407475">+91 80924 07475</a>
          <span>Domuhan, Cherki Rd, Parariya,<br />Bihar 824231, India</span>
        </div>
      </div>
      <div className="footer__base">
        <span>© {new Date().getFullYear()} ONYX Interior · Proprietor Sudhir Kumar.</span>
        <span>Crafted with care.</span>
      </div>
    </footer>
  );
}
