import { useEffect } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Durée minimale pour que le logo soit visible
    const timer = setTimeout(() => {
      onLoadingComplete()
    }, 1500)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img src="/logo_cms.webp" alt="CMS" width={80} height={80} />
        </motion.div>
        <div className="loading-text">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            CMS Lunettes et Plastiques
          </motion.h2>
          <motion.div
            className="loading-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
