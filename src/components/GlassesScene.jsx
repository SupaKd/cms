import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  Html,
  Center,
} from '@react-three/drei'
import GlassesModel from './GlassesModel'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Loader = () => (
  <Html center>
    <div className="scene-loader">
      <span>Chargement 3D...</span>
    </div>
  </Html>
)

const GlassesScene = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 4],
        fov: 35,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.4} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#fff5e6"
        />

        <directionalLight
          position={[-3, 2, -4]}
          intensity={0.6}
          color="#cce0ff"
        />

        <spotLight
          position={[0, -3, 2]}
          intensity={0.5}
          angle={0.4}
          penumbra={0.8}
          color="#d4af37"
        />

        <Environment preset="studio" />

        <Float
          speed={prefersReducedMotion ? 0 : 1.5}
          rotationIntensity={prefersReducedMotion ? 0 : 0.2}
          floatIntensity={prefersReducedMotion ? 0 : 0.3}
          floatingRange={[-0.05, 0.05]}
        >
          <Center>
            <GlassesModel />
          </Center>
        </Float>

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.3}
          scale={5}
          blur={2.5}
          far={4}
          color="#1a1a1a"
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  )
}

export default GlassesScene
