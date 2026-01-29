import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-cms ${isScrolled ? "is-active" : ""}`}>
      <div className="header-top">
        <p>Implantée à Oyonnax</p>
      </div>
      <div className="container">
        <div className="header-logo">
          <Link to="/">
            <img src="/logo_cms.webp" alt="CMS Lunettes et Plastiques" fetchPriority="high" decoding="async" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <a href="#story">Notre histoire</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
