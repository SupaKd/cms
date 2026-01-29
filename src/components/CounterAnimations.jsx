import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const counters = [
  { value: 500000, suffix: "+", label: "Lunettes produites", prefix: "" },
  { value: 40, suffix: "+", label: "Années d'expérience", prefix: "" },
  { value: 50, suffix: "+", label: "Modèles disponibles", prefix: "" },
];

function AnimatedCounter({ value, suffix, prefix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(value);
      }
    }

    requestAnimationFrame(update);
  }, [isInView, value, duration]);

  function formatNumber(n) {
    return n.toLocaleString("fr-FR");
  }

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

const CounterAnimations = () => {
  return (
    <div className="counter-grid">
      {counters.map((item, index) => (
        <motion.div
          key={index}
          className="counter-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        >
          <div className="counter-value">
            <AnimatedCounter
              value={item.value}
              suffix={item.suffix}
              prefix={item.prefix}
            />
          </div>
          <div className="counter-divider" />
          <p className="counter-label">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CounterAnimations;
