import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Precharge la video hero pendant le loading screen
    const video = document.createElement('video')
    video.src = '/video1.mp4'
    video.preload = 'auto'
    video.muted = true

    let minTimerDone = false
    let videoReady = false

    const tryFinish = () => {
      if (minTimerDone && videoReady) {
        setReady(true)
        // Petit delai pour que le fade-out se joue
        setTimeout(onLoadingComplete, 400)
      }
    }

    // Duree minimale d'affichage (800ms)
    const timer = setTimeout(() => {
      minTimerDone = true
      tryFinish()
    }, 800)

    // Quand la video a assez de donnees pour demarrer
    const onCanPlay = () => {
      videoReady = true
      tryFinish()
    }

    video.addEventListener('canplaythrough', onCanPlay)

    // Fallback si la video prend trop de temps (3s max)
    const fallback = setTimeout(() => {
      videoReady = true
      tryFinish()
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallback)
      video.removeEventListener('canplaythrough', onCanPlay)
    }
  }, [onLoadingComplete])

  return (
    <motion.div
      className="loading-screen"
      animate={{ opacity: ready ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="loading-content">
        <img
          className="loading-logo"
          src="/logo_cms.webp"
          alt="CMS"
          width={80}
          height={80}
        />
        <div className="loading-text">
          <h2>CMS Lunettes et Plastiques</h2>
          <div className="loading-bar-track">
            <motion.div
              className="loading-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: ready ? 1 : 0.7 }}
              transition={{ duration: ready ? 0.3 : 2, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
