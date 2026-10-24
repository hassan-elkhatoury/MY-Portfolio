"use client"

import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode, type RefObject } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import type { MotionValue } from "framer-motion"
import {
  BufferGeometry, DoubleSide, Float32BufferAttribute, Group, Mesh, OrthographicCamera,
  ShaderMaterial, Shape, SRGBColorSpace, TextureLoader, Vector3,
} from "three"
import { ATLAS_HEIGHT, ATLAS_WIDTH, makeAtlasRelief, makeSail, sailingRoute } from "@/lib/journey-scene-geometry"

type SceneProps = {
  active: boolean
  tiltX: MotionValue<number>
  tiltY: MotionValue<number>
  onReady: () => void
  onError: () => void
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.failed ? null : this.props.children }
}

const vertexShader = `
  uniform float uTime;
  attribute float aWater;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 surface = position;
    surface.z += aWater * (sin(position.x * .045 + uTime * 1.3)
      + cos(position.y * .07 - uTime * 1.1)) * .8;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(surface, 1.);
  }
`

const fragmentShader = `
  uniform sampler2D uMap;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  float waterMask(vec3 color) {
    return smoothstep(.025, .10, color.g - color.r)
      * smoothstep(.015, .085, color.b - color.r);
  }
  void main() {
    vec4 original = texture2D(uMap, vUv);
    float water = waterMask(original.rgb);
    vec2 drift = vec2(
      sin(vUv.y * 190. + uTime * 1.05) + cos(vUv.x * 65. - uTime * .8),
      cos(vUv.x * 155. + uTime * .9) + sin(vUv.y * 110. - uTime * .7)
    ) * vec2(.0010, .0016) * water;
    vec4 flowing = texture2D(uMap, vUv + drift);
    // The riverbanks, trees, bridge, and buildings stay still.
    vec3 color = mix(original.rgb, flowing.rgb, water * waterMask(flowing.rgb));
    float ripples = sin(vUv.y * 380. + vUv.x * 75. - uTime * 2.2
      + sin(vUv.x * 65. + uTime * .5) * 2.);
    float glints = pow(max(0., ripples), 16.) * .065;
    color += water * (glints + ripples * .009) * vec3(.7, .95, 1.);
    float lighting = .90 + .12 * max(0., dot(normalize(vNormal), normalize(vec3(-.45, .65, 1.))));
    gl_FragColor = vec4(color * lighting, 1.);
    #include <colorspace_fragment>
  }
`

function Atlas({ elapsed }: { elapsed: RefObject<number> }) {
  const surface = useRef<Mesh>(null)
  const source = useLoader(TextureLoader, "/images/journey/curiosity-atlas-terrain.webp")
  const assets = useMemo(() => {
    const map = source.clone()
    map.colorSpace = SRGBColorSpace
    map.needsUpdate = true
    const geometry = makeAtlasRelief(source.image)
    const material = new ShaderMaterial({
      uniforms: { uMap: { value: map }, uTime: { value: 0 } }, vertexShader, fragmentShader,
    })
    return { map, geometry, material }
  }, [source])
  useEffect(() => () => {
    assets.map.dispose()
    assets.geometry.dispose()
    assets.material.dispose()
  }, [assets])
  useFrame(() => {
    if (surface.current) (surface.current.material as ShaderMaterial).uniforms.uTime.value = elapsed.current
  })
  return <mesh ref={surface} geometry={assets.geometry} material={assets.material} dispose={null} />
}

function Sailboat({ elapsed }: { elapsed: RefObject<number> }) {
  const position = useRef<Group>(null)
  const boat = useRef<Group>(null)
  const sail = useRef<Mesh>(null)
  const assets = useMemo(() => {
    const hull = new Shape()
    hull.moveTo(35, 0)
    hull.bezierCurveTo(13, 15, -19, 14, -29, 8)
    hull.lineTo(-29, -8)
    hull.bezierCurveTo(-19, -14, 13, -15, 35, 0)
    return { hull, main: makeSail(true), jib: makeSail(false), point: new Vector3(), tangent: new Vector3() }
  }, [])
  useEffect(() => () => { assets.main.dispose(); assets.jib.dispose() }, [assets])
  useFrame(() => {
    if (!position.current || !boat.current) return
    const t = elapsed.current
    sailingRoute.getPointAt((t / 100 + .08) % 1, assets.point)
    sailingRoute.getTangentAt((t / 100 + .08) % 1, assets.tangent)
    position.current.position.copy(assets.point)
    position.current.rotation.z = Math.atan2(assets.tangent.y, assets.tangent.x)
    boat.current.rotation.x = Math.PI / 2 + Math.sin(t * 1.5) * .045
    boat.current.rotation.z = Math.sin(t * 1.1) * .025
    boat.current.position.z = 4 + Math.sin(t * 1.7) * 1.3
    if (sail.current) sail.current.rotation.y = Math.sin(t * 1.3) * .045
  })
  return <group ref={position} scale={1.35}>
    <mesh position={[0, -5, .4]} scale={[34, 13, 1]}>
      <circleGeometry args={[1, 40]} /><meshBasicMaterial color="#163e43" transparent opacity={.18} depthWrite={false} />
    </mesh>
    <group ref={boat} rotation={[Math.PI / 2, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <extrudeGeometry args={[assets.hull, { depth: 7, bevelEnabled: true, bevelSize: 2.8, bevelThickness: 2, bevelSegments: 3, steps: 1 }]} />
        <meshStandardMaterial color="#654534" roughness={.75} />
      </mesh>
      <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[assets.hull]} /><meshStandardMaterial color="#cfb886" side={DoubleSide} roughness={.9} />
      </mesh>
      <mesh position={[0, 35, 0]}><cylinderGeometry args={[.8, 1.1, 70, 8]} /><meshStandardMaterial color="#7c5941" /></mesh>
      <mesh ref={sail} geometry={assets.main} dispose={null}>
        <meshStandardMaterial color="#fff7dc" roughness={.92} side={DoubleSide} />
      </mesh>
      <mesh geometry={assets.jib} dispose={null}><meshStandardMaterial color="#e6dfc4" side={DoubleSide} roughness={.9} /></mesh>
      <mesh position={[-5, 4, 0]}><boxGeometry args={[15, 6, 10]} /><meshStandardMaterial color="#e9dbb8" roughness={.8} /></mesh>
      <mesh position={[4, 70, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[2.8, 9, 3]} /><meshStandardMaterial color="#dd7654" side={DoubleSide} /></mesh>
    </group>
  </group>
}

// Two widening ribbons follow past positions, so the wake bends behind the boat.
function Wake({ elapsed }: { elapsed: RefObject<number> }) {
  const assets = useMemo(() => {
    const geometry = new BufferGeometry()
    geometry.setAttribute("position", new Float32BufferAttribute(new Float32Array(42 * 4 * 3), 3))
    const alpha: number[] = []
    const indices: number[] = []
    for (let i = 0; i < 42; i++) {
      for (let j = 0; j < 4; j++) alpha.push((1 - i / 41) * .52)
      if (i < 41) for (let side = 0; side < 2; side++) {
        const a = i * 4 + side * 2
        indices.push(a, a + 1, a + 4, a + 1, a + 5, a + 4)
      }
    }
    geometry.setAttribute("aAlpha", new Float32BufferAttribute(alpha, 1))
    geometry.setIndex(indices)
    const material = new ShaderMaterial({
      transparent: true, depthWrite: false, side: DoubleSide,
      vertexShader: "attribute float aAlpha; varying float vAlpha; void main(){vAlpha=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
      fragmentShader: "varying float vAlpha; void main(){gl_FragColor=vec4(.83,.94,.88,vAlpha);}",
    })
    return { geometry, material, point: new Vector3(), tangent: new Vector3() }
  }, [])
  useEffect(() => () => { assets.geometry.dispose(); assets.material.dispose() }, [assets])
  useFrame(() => {
    const positions = assets.geometry.getAttribute("position")
    const current = (elapsed.current / 100 + .08) % 1
    for (let i = 0; i < 42; i++) {
      const past = (current - .025 - i * .0014 + 1) % 1
      sailingRoute.getPointAt(past, assets.point)
      sailingRoute.getTangentAt(past, assets.tangent)
      const width = 8 + i * .45 + Math.sin(i * .6 - elapsed.current * 2) * 1.2
      for (let side = 0; side < 2; side++) for (let edge = 0; edge < 2; edge++) {
        const offset = (side ? 1 : -1) * (width + edge * 2.2)
        positions.setXYZ(i * 4 + side * 2 + edge,
          assets.point.x - assets.tangent.y * offset,
          assets.point.y + assets.tangent.x * offset, 3.5)
      }
    }
    positions.needsUpdate = true
  })
  return <mesh geometry={assets.geometry} material={assets.material} frustumCulled={false} dispose={null} />
}

function World({ active, tiltX, tiltY, onReady, onError }: SceneProps) {
  const root = useRef<Group>(null)
  const elapsed = useRef(0)
  const { camera, size, gl, invalidate } = useThree()
  useLayoutEffect(() => {
    const orthographic = camera as OrthographicCamera
    Object.assign(orthographic, { zoom: Math.min(size.width / ATLAS_WIDTH, size.height / ATLAS_HEIGHT) })
    orthographic.updateProjectionMatrix()
    invalidate()
  }, [camera, size.width, size.height, invalidate])
  useEffect(() => {
    const unsubscribeX = tiltX.on("change", () => invalidate())
    const unsubscribeY = tiltY.on("change", () => invalidate())
    return () => { unsubscribeX(); unsubscribeY() }
  }, [tiltX, tiltY, invalidate])
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onError() }
    const previousShaderError = gl.debug.onShaderError
    Object.assign(gl.debug, { onShaderError: () => queueMicrotask(onError) })
    gl.domElement.addEventListener("webglcontextlost", lost)
    const frame = requestAnimationFrame(onReady)
    return () => {
      cancelAnimationFrame(frame)
      gl.domElement.removeEventListener("webglcontextlost", lost)
      Object.assign(gl.debug, { onShaderError: previousShaderError })
    }
  }, [gl, onReady, onError])
  useEffect(() => {
    if (!active) { invalidate(); return }
    let frame = 0
    let previous = 0
    const tick = (now: number) => {
      if (now - previous >= 1000 / 30) { previous = now; invalidate() }
      frame = requestAnimationFrame(tick)
    }
    const visibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(tick)
    }
    visibility()
    document.addEventListener("visibilitychange", visibility)
    return () => { cancelAnimationFrame(frame); document.removeEventListener("visibilitychange", visibility) }
  }, [active, invalidate])
  useFrame((_, delta) => {
    if (active && !document.hidden) elapsed.current += Math.min(delta, .06)
    if (root.current) root.current.rotation.set(-tiltX.get() * Math.PI / 180, tiltY.get() * Math.PI / 180, 0)
  }, -1)
  return <group ref={root}>
    <ambientLight intensity={1.7} />
    <directionalLight position={[-500, 600, 900]} intensity={2.4} color="#fff0d6" />
    <Atlas elapsed={elapsed} />
    <Wake elapsed={elapsed} />
    <Sailboat elapsed={elapsed} />
  </group>
}

export default function JourneyScene(props: SceneProps) {
  return <SceneBoundary onError={props.onError}>
    <Canvas orthographic camera={{ position: [0, 0, 1600], near: .1, far: 3000, zoom: 1 }}
      // The parent supplies camera zoom via CSS. Measuring its transformed bounds
      // would apply that zoom a second time to the canvas's inline dimensions.
      resize={{ offsetSize: true, scroll: false }}
      dpr={[1, 1.25]} frameloop="demand" gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}>
      <Suspense fallback={null}><World {...props} /></Suspense>
    </Canvas>
  </SceneBoundary>
}
