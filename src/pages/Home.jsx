import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import "./Home.scss";
import CounterAnimations from "../components/CounterAnimations";

const GlassesScene = lazy(() => import("../components/GlassesScene"));

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const Home = () => {
  return (
    <main className="home-page">
      {/* SECTION HERO */}
      <section className="hero-section">
        <video
          className="hero-video"
          src="/video1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="hero-overlay" />
        <div className="container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} custom={0.2}>
              Fabrication de <span>lunettes acétate</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.4}>
              Des lunettes en acétate, conçues avec précision pour allier style,
              confort et durabilité.
            </motion.p>
            <motion.div className="hero-btns" variants={fadeUp} custom={0.6}>
              <a href="#concept" className="btn-secondary">
                Découvrir le concept
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3D */}
      <section className="animation3d">
        <motion.div
          className="animation3d__content"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>L'excellence en <span>3D</span></h2>
          <p>
            Interagissez avec notre monture — faites glisser pour explorer
            chaque détail.
          </p>
        </motion.div>
        <motion.div
          className="animation3d__canvas"
          data-lenis-prevent
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.3}
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
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <img src="/un.webp" alt="Savoir-faire lunetier" loading="lazy" decoding="async" />
        </motion.div>
      </section>

      {/* SECTION ACETATE 2 (reverse) */}
      <section className="acetate-section-reverse">
        <motion.div
          className="acetate-section-reverse__content"
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <img src="/deux.webp" alt="Fabrication lunettes acétate" loading="lazy" decoding="async" />
        </motion.div>
      </section>

      {/* SECTION NOTRE HISTOIRE */}
      <motion.section
        id="story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="story-header">
          <motion.div className="story-header__content" variants={slideInLeft}>
            <h1>CMS Lunettes et Plastiques</h1>
            <h2>Notre Histoire</h2>
          </motion.div>
          <motion.div className="story-header__image" variants={scaleIn}>
            <img src="/trois.webp" alt="Notre histoire" loading="lazy" decoding="async" />
          </motion.div>
        </div>
        <motion.p variants={fadeUp} custom={0}>
          Une histoire familiale au cœur du savoir-faire lunetier française
          Implantée dans le bassin oyonnaxien, berceau historique de la
          plasturgie et de la lunetterie, <span>CMS Lunettes et Plastiques</span> est une
          entreprise familiale qui s'appuie sur plus de quarante ans de
          savoir-faire.
        </motion.p>
        <motion.p variants={fadeUp} custom={0.1}>
          L'histoire commence dans les années 1980, lorsque M. Mao se forme au
          métier de la lunetterie à Oyonnax. Dans les années 1990, avec son
          épouse, il crée une activité de sous-traitance spécialisée dans
          plusieurs étapes de fabrication, réalisées majoritairement à la main.
          Malgré la baisse d'activité liée aux délocalisations au début des
          années 2000, l'entreprise conserve ses compétences et son ancrage
          local.
        </motion.p>
        <motion.p variants={fadeUp} custom={0.2}>
          En 2015, le fils reprend l'aventure familiale et apporte une nouvelle
          dynamique grâce à ses compétences en management et à une vision
          tournée vers l'avenir. L'entreprise se modernise progressivement, tout
          en préservant l'importance du geste artisanal, soutenu par des
          équipements semi-industriels.
        </motion.p>
        <motion.p variants={fadeUp} custom={0.3}>
          En plus de son activité historique de sous-traitance, <span>CMS Lunettes et
          Plastiques</span> devient en 2024 fabricant de lunettes en acétate, capable
          de produire des montures de A à Z. Le rachat de la société Eyebrowear
          à Oyonnax en 2024 permet d'enrichir les compétences et d'accompagner
          le développement de l'entreprise.
        </motion.p>
        <motion.p variants={fadeUp} custom={0.4}>
          Aujourd'hui, CMS Lunettes et Plastique revendique la production
          <span> française</span>, alliant savoir-faire artisanal, maîtrise technique et
          exigence de qualité, au service de marques et de créateurs.
        </motion.p>
      </motion.section>
    </main>
  );
};

export default Home;
