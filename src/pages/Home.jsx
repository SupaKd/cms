import { Suspense, lazy, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.scss";
import CounterAnimations from "../components/CounterAnimations";

const GlassesScene = lazy(() => import("../components/GlassesScene"));

// Animations legeres - opacity + translateY uniquement (GPU composited)
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Home = () => {
  const videoRef = useRef(null);

  // Force le play sur mobile (Safari iOS bloque parfois l'autoplay au mount)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // Si le navigateur bloque quand meme, on retente au premier touch
        const onTouch = () => {
          video.play();
          document.removeEventListener("touchstart", onTouch);
        };
        document.addEventListener("touchstart", onTouch, { once: true });
      });
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }
  }, []);

  return (
    <main className="home-page">
      {/* SECTION HERO */}
      <section className="hero-section">
        
        <div className="hero-overlay" />
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h1>
              Fabrication de <span>lunettes acétate</span>
            </h1>
            <p>
              Des lunettes en acétate, conçues avec précision pour allier style,
              confort et durabilité.
            </p>
            <div className="hero-btns">
              <a href="#animation3d" className="btn-secondary">
                Découvrir le concept
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3D */}
      <section id="animation3d" className="animation3d">
        <div className="animation3d__content">
          <h2>
            L'excellence en <span>3D</span>
          </h2>
          <p>
            Interagissez avec notre monture — faites glisser pour explorer
            chaque détail.
          </p>
        </div>
        <motion.div
          className="animation3d__canvas"
          data-lenis-prevent
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Suspense
            fallback={
              <div className="animation3d__loader">
                <span>Chargement du modèle 3D...</span>
              </div>
            }
          >
            <GlassesScene />
          </Suspense>
        </motion.div>
      </section>

      {/* SECTION COUNTERS */}
      <section className="counteranimations">
        <CounterAnimations />
      </section>

      {/* SECTION ACETATE 1 */}
      <section className="acetate-section">
        <motion.div
          className="acetate-section__content"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2>La passion et le savoir-faire de lunetier</h2>
          <p>
            À partir de 2017, Optical Store entre dans une phase de
            développement significative, marquée par l’acquisition de machines
            modernes. Cette évolution se poursuit dès 2021 avec l’intégration
            d’équipements automatisés et performants, portée par une équipe de
            professionnels passionnés et hautement qualifiés.
          </p>
        </motion.div>

        <motion.div
          className="acetate-section__image"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <img
            src="/un.webp"
            alt="Savoir-faire lunetier"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </section>

      {/* SECTION ACETATE 2 (reverse) */}
      <section className="acetate-section-reverse">
        <motion.div
          className="acetate-section-reverse__content"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2>Fabrication française d’exception</h2>
          <p>
            En 2024, Optical Store franchit une étape majeure de son
            développement en devenant fabricant de lunettes à part entière.
            Forte d’un savoir-faire maîtrisé et d’exigences élevées, la maison
            conçoit et fabrique des montures en acétate de A à Z, au cœur de ses
            ateliers français. Cette évolution s’inscrit dans la continuité de
            son activité historique de sous-traitance, menée avec le même niveau
            d’excellence auprès de partenaires français de renom.
          </p>
        </motion.div>

        <motion.div
          className="acetate-section-reverse__image"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <img
            src="/deux.webp"
            alt="Fabrication lunettes acétate"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </section>

      {/* SECTION NOTRE HISTOIRE */}
      <section id="story">
        <motion.div
          className="story-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="story-header__content">
            <h1>Optical Store</h1>
            <h2>
              Une histoire familiale au cœur du savoir-faire lunetier français
            </h2>
          </div>
          <div className="story-header__image">
            <img
              src="/trois.webp"
              alt="Notre histoire"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <p>
            Implantée dans le bassin oyonnaxien, berceau historique de la
            plasturgie et de la lunetterie française, Optical Store s’inscrit
            dans une tradition familiale portée par plus de quarante années de
            savoir-faire et de passion pour le métier de lunetier.
          </p>
          <p>
            L’histoire débute dans les années 1980, lorsque M. Mao se forme aux
            métiers de la lunetterie à Oyonnax. Dans les années 1990, il fonde
            avec son épouse une activité de sous-traitance spécialisée dans
            plusieurs étapes clés de la fabrication de montures, réalisées
            majoritairement à la main. Malgré les mutations du secteur et les
            délocalisations du début des années 2000, l’entreprise préserve ses
            compétences, son exigence de qualité et son ancrage local.
          </p>
          <p>
            En 2015, la nouvelle génération reprend le flambeau et insuffle une
            dynamique nouvelle, portée par une vision stratégique et des
            compétences en management. Optical Store engage alors une
            modernisation progressive de ses outils de production, tout en
            conservant l’importance du geste artisanal, soutenu par des
            équipements semi-industriels performants.
          </p>
          <p>
            En 2024, Optical Store franchit une étape majeure de son
            développement en devenant fabricant de lunettes en acétate à part
            entière, capable de produire des montures de A à Z. Le rachat de la
            société Eyebrowear, également implantée à Oyonnax, vient renforcer
            les expertises internes et accompagner la montée en puissance de
            l’entreprise.
          </p>
          <p>
            Aujourd’hui, Optical Store revendique avec fierté une fabrication
            française d’excellence, alliant savoir-faire artisanal, maîtrise
            technique et exigence de qualité, au service de marques et de
            créateurs en quête d’authenticité et de précision.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
