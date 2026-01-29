import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.header
      className={`header-cms ${isScrolled ? "is-active" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            className="header-top"
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>Implantée à Oyonnax 🇫🇷</p>
          </motion.div>
        )}
      </AnimatePresence>
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
    </motion.header>
  );
};

export default Header;
