import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Header from './pages/Header'
import Home from './pages/Home'
import Footer from './pages/Footer'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Initialize Lenis smooth scroll after loading
  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [isLoading])

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <div key="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </Router>
  )
}

export default App
