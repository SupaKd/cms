import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GlassesModel = () => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const frameMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#111'),
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.5,
  }), [])

  const lensMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#88aacc'),
    transmission: 0.9,
    thickness: 0.5,
    roughness: 0.05,
    ior: 1.5,
    envMapIntensity: 1.0,
    transparent: true,
    opacity: 0.3,
  }), [])

  const createRoundedRectShape = (width, height, radius) => {
    const shape = new THREE.Shape()
    const x = -width / 2
    const y = -height / 2
    
    shape.moveTo(x + radius, y)
    shape.lineTo(x + width - radius, y)
    shape.quadraticCurveTo(x + width, y, x + width, y + radius)
    shape.lineTo(x + width, y + height - radius)
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    shape.lineTo(x + radius, y + height)
    shape.quadraticCurveTo(x, y + height, x, y + height - radius)
    shape.lineTo(x, y + radius)
    shape.quadraticCurveTo(x, y, x + radius, y)
    
    return shape
  }

  const createFramePath = (width, height, radius) => {
    const points = []
    const cornerSegments = 12
    
    points.push(new THREE.Vector3(-width / 2 + radius, -height / 2, 0))
    points.push(new THREE.Vector3(width / 2 - radius, -height / 2, 0))
    
    for (let i = 0; i <= cornerSegments; i++) {
      const angle = -Math.PI / 2 + (i / cornerSegments) * (Math.PI / 2)
      points.push(new THREE.Vector3(
        width / 2 - radius + Math.cos(angle) * radius,
        -height / 2 + radius + Math.sin(angle) * radius,
        0
      ))
    }
    
    points.push(new THREE.Vector3(width / 2, height / 2 - radius, 0))
    
    for (let i = 0; i <= cornerSegments; i++) {
      const angle = 0 + (i / cornerSegments) * (Math.PI / 2)
      points.push(new THREE.Vector3(
        width / 2 - radius + Math.cos(angle) * radius,
        height / 2 - radius + Math.sin(angle) * radius,
        0
      ))
    }
    
    points.push(new THREE.Vector3(-width / 2 + radius, height / 2, 0))
    
    for (let i = 0; i <= cornerSegments; i++) {
      const angle = Math.PI / 2 + (i / cornerSegments) * (Math.PI / 2)
      points.push(new THREE.Vector3(
        -width / 2 + radius + Math.cos(angle) * radius,
        height / 2 - radius + Math.sin(angle) * radius,
        0
      ))
    }
    
    points.push(new THREE.Vector3(-width / 2, -height / 2 + radius, 0))
    
    for (let i = 0; i <= cornerSegments; i++) {
      const angle = Math.PI + (i / cornerSegments) * (Math.PI / 2)
      points.push(new THREE.Vector3(
        -width / 2 + radius + Math.cos(angle) * radius,
        -height / 2 + radius + Math.sin(angle) * radius,
        0
      ))
    }
    
    return new THREE.CatmullRomCurve3(points, true)
  }

  const cornerRadius = 0.25
  const lensShape = useMemo(() => createRoundedRectShape(0.9, 0.7, cornerRadius), [])
  const frameCurve = useMemo(() => createFramePath(0.95, 0.75, cornerRadius + 0.02), [])

  // Pont nasal raccourci - verres rapprochés
  const bridgeCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.28, 0.05, 0),
    new THREE.Vector3(-0.14, 0.1, 0),
    new THREE.Vector3(0, 0.12, 0),
    new THREE.Vector3(0.14, 0.1, 0),
    new THREE.Vector3(0.28, 0.05, 0),
  ]), [])

  // Montures rapprochées pour correspondre au pont plus court
  const frameOffset = 0.75

  const leftTempleCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-frameOffset - 0.48, 0.1, 0),
    new THREE.Vector3(-frameOffset - 0.6, 0.05, -0.5),
    new THREE.Vector3(-frameOffset - 0.7, -0.05, -1.5),
    new THREE.Vector3(-frameOffset - 0.65, -0.2, -2.2),
  ]), [])

  const rightTempleCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(frameOffset + 0.48, 0.1, 0),
    new THREE.Vector3(frameOffset + 0.6, 0.05, -0.5),
    new THREE.Vector3(frameOffset + 0.7, -0.05, -1.5),
    new THREE.Vector3(frameOffset + 0.65, -0.2, -2.2),
  ]), [])

  const tubeRadius = 0.055

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Monture gauche */}
      <mesh position={[-frameOffset, 0, 0]} material={frameMaterial}>
        <tubeGeometry args={[frameCurve, 80, tubeRadius, 12, true]} />
      </mesh>
      {/* Verre gauche */}
      <mesh position={[-frameOffset, 0, 0.01]} material={lensMaterial}>
        <shapeGeometry args={[lensShape]} />
      </mesh>

      {/* Monture droite */}
      <mesh position={[frameOffset, 0, 0]} material={frameMaterial}>
        <tubeGeometry args={[frameCurve, 80, tubeRadius, 12, true]} />
      </mesh>
      {/* Verre droit */}
      <mesh position={[frameOffset, 0, 0.01]} material={lensMaterial}>
        <shapeGeometry args={[lensShape]} />
      </mesh>

      {/* Pont nasal court */}
      <mesh material={frameMaterial}>
        <tubeGeometry args={[bridgeCurve, 20, tubeRadius, 8, false]} />
      </mesh>

      {/* Branche gauche */}
      <mesh material={frameMaterial}>
        <tubeGeometry args={[leftTempleCurve, 20, tubeRadius * 0.8, 8, false]} />
      </mesh>

      {/* Branche droite */}
      <mesh material={frameMaterial}>
        <tubeGeometry args={[rightTempleCurve, 20, tubeRadius * 0.8, 8, false]} />
      </mesh>
    </group>
  )
}

export default GlassesModel