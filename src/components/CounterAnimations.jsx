import { useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const counters = [
  { value: 500000, suffix: "+", label: "Lunettes produites" },
  { value: 40, suffix: "+", label: "Années d'expérience" },
  { value: 50, suffix: "+", label: "Modèles disponibles" },
];

function formatNumber(n) {
  return n.toLocaleString("fr-FR");
}

// Anime le counter directement dans le DOM (pas de setState = pas de re-render)
function AnimatedCounter({ value, suffix, duration = 1.5 }) {
  const spanRef = useRef(null);
  const isInView = useInView(spanRef, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (!spanRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      if (spanRef.current) {
        spanRef.current.textContent = formatNumber(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else if (spanRef.current) {
        spanRef.current.textContent = formatNumber(value) + suffix;
      }
    }

    requestAnimationFrame(update);
  }, [value, suffix, duration]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  return <span ref={spanRef}>0{suffix}</span>;
}

const CounterAnimations = () => {
  return (
    <div className="counter-grid">
      {counters.map((item, index) => (
        <motion.div
          key={index}
          className="counter-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="counter-value">
            <AnimatedCounter value={item.value} suffix={item.suffix} />
          </div>
          <div className="counter-divider" />
          <p className="counter-label">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CounterAnimations;
