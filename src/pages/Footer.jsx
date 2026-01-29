import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import "./Footer.scss";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "Linkedin", href: "#" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="simple-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="simple-footer__socials">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <social.icon size={22} />
          </motion.a>
        ))}
      </div>

      <motion.p
        className="simple-footer__copyright"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        &copy; {currentYear} CMS Lunettes et Plastiques - Fabriquant de lunettes français
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
