"use client"

import { Component, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { gsap } from "gsap"
import { Color, Group, OrthographicCamera, VSMShadowMap } from "three"
import { archiveFace, archivePanel } from "@/lib/project-archive-geometry"
import { makeToolkitFrontPrint, makeToolkitGroundShadow, makeToolkitKraft, makeToolkitSidePrint, makeToolkitTape } from "@/lib/toolkit-box-textures"

export type ToolkitBoxSceneProps = {
  open: boolean
  dark: boolean
  paused: boolean
  hovered: boolean
  onReady: () => void
  onError: () => void
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.failed ? null : this.props.children }
}

function CameraRig({ dark, onReady, onError }: Pick<ToolkitBoxSceneProps, "dark" | "onReady" | "onError">) {
  const { camera, size, gl, invalidate } = useThree()
  const callbacks = useRef({ onReady, onError })
  useLayoutEffect(() => { callbacks.current = { onReady, onError } }, [onReady, onError])
  useLayoutEffect(() => {
    camera.position.set(5.4, 5.5, 14)
    camera.lookAt(0, 1.45, 0)
    Object.assign(camera as OrthographicCamera, { zoom: Math.min(size.width / 9.7, size.height / 5.05) })
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, size.width, size.height, invalidate])
  useEffect(() => {
    gl.setClearColor(new Color(dark ? "#1b2023" : "#fcf9f2"), 0)
    invalidate()
  }, [dark, gl, invalidate])
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); callbacks.current.onError() }
    gl.domElement.addEventListener("webglcontextlost", lost)
    const frame = requestAnimationFrame(() => callbacks.current.onReady())
    return () => { cancelAnimationFrame(frame); gl.domElement.removeEventListener("webglcontextlost", lost) }
  }, [gl])
  return null
}

function CardboardBox({ open, paused, hovered }: Pick<ToolkitBoxSceneProps, "open" | "paused" | "hovered">) {
  const object = useRef<Group>(null)
  const { invalidate } = useThree()
  const assets = useMemo(() => ({ ...makeToolkitKraft(), front: makeToolkitFrontPrint(), side: makeToolkitSidePrint(), tape: makeToolkitTape() }), [])
  const geometry = useMemo(() => ({
    wall: archivePanel(4.7, 2.8, .075, .018),
    side: archivePanel(3.34, 2.8, .075, .018),
    floor: archivePanel(4.57, 3.25, .07, .018),
    longFlap: archivePanel(4.65, 1.66, .045, .025),
    shortFlap: archivePanel(3.25, 2.29, .045, .025),
    frontPrint: archiveFace(4.56, 2.66, .01),
    sidePrint: archiveFace(3.18, 2.66, .01),
    tape: archiveFace(.49, 3.34, .01),
  }), [])
  useEffect(() => () => {
    Object.values(assets).forEach(asset => asset.dispose())
    Object.values(geometry).forEach(item => item.dispose())
  }, [assets, geometry])
  useLayoutEffect(() => {
    if (!object.current) return
    const active = hovered && !paused && !open
    const animation = gsap.timeline({ onUpdate: invalidate })
      .to(object.current.position, { y: active ? .045 : 0, duration: paused ? 0 : .45, ease: "power2.out" }, 0)
      .to(object.current.rotation, { y: active ? -.035 : 0, z: active ? -.006 : 0, duration: paused ? 0 : .45, ease: "power2.out" }, 0)
    return () => { animation.kill() }
  }, [hovered, invalidate, open, paused])

  const kraft = <meshStandardMaterial map={assets.paper} bumpMap={assets.bump} bumpScale={.026} roughness={.95} />
  const inside = <meshStandardMaterial color="#967047" map={assets.paper} roughness={1} />
  const edge = <meshStandardMaterial color="#b98b57" roughness={1} />
  return <group ref={object}>
    <mesh geometry={geometry.floor} position={[0, .105, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>{inside}</mesh>
    <mesh geometry={geometry.wall} position={[0, 1.5, -1.67]} castShadow receiveShadow>{kraft}</mesh>
    <mesh geometry={geometry.wall} position={[0, 1.5, -1.62]} receiveShadow>{inside}</mesh>
    <mesh geometry={geometry.side} position={[-2.35, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>{kraft}</mesh>
    <mesh geometry={geometry.side} position={[2.35, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>{kraft}</mesh>
    <mesh geometry={geometry.side} position={[-2.3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>{inside}</mesh>
    <mesh geometry={geometry.side} position={[2.3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>{inside}</mesh>
    <mesh geometry={geometry.wall} position={[0, 1.5, 1.62]} receiveShadow>{inside}</mesh>
    <mesh geometry={geometry.wall} position={[0, 1.5, 1.67]} castShadow receiveShadow>{kraft}</mesh>
    <mesh geometry={geometry.frontPrint} position={[0, 1.5, 1.725]} receiveShadow>
      <meshStandardMaterial map={assets.front} transparent depthWrite={false} roughness={1} polygonOffset polygonOffsetFactor={-1} />
    </mesh>
    <mesh geometry={geometry.sidePrint} position={[2.406, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
      <meshStandardMaterial map={assets.side} transparent depthWrite={false} roughness={1} polygonOffset polygonOffsetFactor={-1} />
    </mesh>
    {/* All flap meshes are children of their physical hinge, ready for phase B. */}
    <group name="flap-left-hinge" position={[-2.35, 2.88, 0]} rotation={[0, 0, open ? 1.72 : -Math.PI / 2]}>
      <mesh geometry={geometry.shortFlap} position={[0, 1.145, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>{kraft}</mesh>
    </group>
    <group name="flap-right-hinge" position={[2.35, 2.88, 0]} rotation={[0, 0, open ? -1.68 : Math.PI / 2]}>
      <mesh geometry={geometry.shortFlap} position={[0, 1.145, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>{kraft}</mesh>
    </group>
    <group name="flap-back-hinge" position={[0, 2.94, -1.67]} rotation={[open ? -1.56 : Math.PI / 2, 0, 0]}>
      <mesh geometry={geometry.longFlap} position={[0, .83, 0]} castShadow receiveShadow>{kraft}</mesh>
      <mesh position={[0, .025, .025]}><boxGeometry args={[4.58, .018, .008]} />{edge}</mesh>
    </group>
    <group name="flap-front-hinge" position={[0, 2.94, 1.67]} rotation={[open ? 1.69 : -Math.PI / 2, 0, 0]}>
      <mesh geometry={geometry.longFlap} position={[0, .83, 0]} castShadow receiveShadow>{kraft}</mesh>
      <mesh position={[0, .025, .025]}><boxGeometry args={[4.58, .018, .008]} />{edge}</mesh>
    </group>
    {!open && <>
      <mesh geometry={geometry.tape} position={[0, 2.98, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial map={assets.tape} roughness={.84} />
      </mesh>
      <mesh position={[0, 2.77, 1.728]} receiveShadow><planeGeometry args={[.49, .39]} /><meshStandardMaterial color="#ddbb89" roughness={.84} /></mesh>
    </>}
    {/* Narrow seams and exposed layered edges keep the carton from reading as a solid cube. */}
    {[-2.34, 2.34].map(x => <mesh key={x} position={[x, 1.5, 1.711]}><boxGeometry args={[.013, 2.76, .006]} />{edge}</mesh>)}
    <mesh position={[0, .135, 1.714]}><boxGeometry args={[4.64, .016, .006]} />{edge}</mesh>
  </group>
}

function ToolkitWorld(props: ToolkitBoxSceneProps) {
  const groundShadow = useMemo(() => makeToolkitGroundShadow(), [])
  useEffect(() => () => groundShadow.dispose(), [groundShadow])
  return <>
    <CameraRig dark={props.dark} onReady={props.onReady} onError={props.onError} />
    <ambientLight intensity={.6} color="#fff5e5" />
    <hemisphereLight args={["#fff8ed", "#846c52", 1]} />
    <directionalLight position={[-3, 11, 6]} intensity={1.65} color="#ffe8c7" castShadow
      shadow-mapSize={[1024, 1024]} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-6} shadow-camera-near={.1} shadow-camera-far={30} shadow-bias={-.0003} shadow-normalBias={.025} shadow-radius={10} shadow-blurSamples={12} />
    <directionalLight position={[6, 4, -3]} intensity={props.dark ? 1.4 : 1.2} color={props.dark ? "#b6c9e4" : "#fff7e8"} />
    <directionalLight position={[0, 2, 8]} intensity={.55} color="#ffffff" />
    {props.open && <pointLight position={[0, 3.2, 0]} color="#ffd49a" intensity={5} distance={5} decay={2} />}
    <CardboardBox open={props.open} hovered={props.hovered} paused={props.paused} />
    {/* Broad contact shading keeps the ground soft while the carton retains self shadows. */}
    <mesh position={[0, .025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[9, 7]} /><meshBasicMaterial map={groundShadow} transparent opacity={props.dark ? .65 : .42} depthWrite={false} />
    </mesh>
  </>
}

export default function ToolkitBoxScene(props: ToolkitBoxSceneProps) {
  return <SceneBoundary onError={props.onError}>
    <Canvas orthographic camera={{ position: [5.4, 5.5, 14], near: .1, far: 50, zoom: 65 }} dpr={[1, 1.5]} frameloop="demand" shadows={{ type: VSMShadowMap }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} style={{ width: "100%", height: "100%", pointerEvents: "none" }} fallback={null}>
      <ToolkitWorld {...props} />
    </Canvas>
  </SceneBoundary>
}
