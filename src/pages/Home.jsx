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
        <video
          ref={videoRef}
          className="hero-video"
          src="/video1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
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
          <h2>La passion et les savoirs faire de lunetier</h2>
          <p>
            À partir de 2017, CMS Lunettes et Plastiques entre dans une phase de
            développement significative, marquée par l'acquisition de machines
            modernes, puis, entre 2021, par l'intégration d'équipements
            automatisés et performants avec un personnel passionné et qualifié
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
          <h2>Fabrication française</h2>
          <p>
            En 2024, la société franchit une étape déterminante en devenant
            fabricant de lunettes à part entière, capable de produire des
            montures en acétate de A à Z, tout en conservant son activité
            historique de sous-traitance pour des partenaires français
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
            <h1>CMS Lunettes et Plastiques</h1>
            <h2>Notre Histoire</h2>
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
            Une histoire familiale au cœur du savoir-faire lunetier française
            Implantée dans le bassin oyonnaxien, berceau historique de la
            plasturgie et de la lunetterie,{" "}
            <span>CMS Lunettes et Plastiques</span> est une entreprise familiale
            qui s'appuie sur plus de quarante ans de savoir-faire.
          </p>
          <p>
            L'histoire commence dans les années 1980, lorsque M. Mao se forme au
            métier de la lunetterie à Oyonnax. Dans les années 1990, avec son
            épouse, il crée une activité de sous-traitance spécialisée dans
            plusieurs étapes de fabrication, réalisées majoritairement à la
            main. Malgré la baisse d'activité liée aux délocalisations au début
            des années 2000, l'entreprise conserve ses compétences et son
            ancrage local.
          </p>
          <p>
            En 2015, le fils reprend l'aventure familiale et apporte une
            nouvelle dynamique grâce à ses compétences en management et à une
            vision tournée vers l'avenir. L'entreprise se modernise
            progressivement, tout en préservant l'importance du geste artisanal,
            soutenu par des équipements semi-industriels.
          </p>
          <p>
            En plus de son activité historique de sous-traitance,{" "}
            <span>CMS Lunettes et Plastiques</span> devient en 2024 fabricant de
            lunettes en acétate, capable de produire des montures de A à Z. Le
            rachat de la société Eyebrowear à Oyonnax en 2024 permet d'enrichir
            les compétences et d'accompagner le développement de l'entreprise.
          </p>
          <p>
            Aujourd'hui, CMS Lunettes et Plastique revendique la production
            <span> française</span>, alliant savoir-faire artisanal, maîtrise
            technique et exigence de qualité, au service de marques et de
            créateurs.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
