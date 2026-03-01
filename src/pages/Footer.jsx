import { Facebook, Instagram, Linkedin } from "lucide-react";
import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="simple-footer">
      <div className="simple-footer__socials">
        <a href="#" aria-label="Facebook">
          <Facebook size={22} />
        </a>
        <a href="#" aria-label="Instagram">
          <Instagram size={22} />
        </a>
        <a href="#" aria-label="Linkedin">
          <Linkedin size={22} />
        </a>
      </div>

      <p className="simple-footer__copyright">
        &copy; {currentYear} Optical store - Fabriquant de lunettes français
      </p>
    </footer>
  );
};

export default Footer;
