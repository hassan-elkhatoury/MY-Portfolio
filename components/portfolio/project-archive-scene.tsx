"use client"

import { Component, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { Canvas, useThree, type ThreeEvent } from "@react-three/fiber"
import { ContactShadows } from "@react-three/drei/core/ContactShadows"
import { gsap } from "gsap"
import { Box3, Color, Group, MathUtils, OrthographicCamera, Raycaster, Vector2, VSMShadowMap, Vector3 } from "three"
import { archiveFace, archivePanel } from "@/lib/project-archive-geometry"
import { archivePalette, makeArchiveCard, makeArchiveGrain, makeArchiveLabel, makeArchivePaper } from "@/lib/project-archive-textures"

export type ArchiveSceneProps = {
  open: boolean
  active: number | null
  selected: number | null
  paused: boolean
  visible: boolean
  dark: boolean
  onActive: (index: number | null) => void
  onSelect: (index: number, bounds: { x: number; y: number; width: number; height: number }) => void
  onReady?: () => void
  onError?: () => void
}

const CARD_WIDTH = 2.04
const CARD_HEIGHT = 4.12
const CARD_POSITIONS = Array.from({ length: 8 }, (_, index) => {
  const t = (index - 3.5) / 3.5
  return { x: t * 4.7, y: 3.25 + (1 - t * t) * .33, z: .08 + index * .1, angle: -t * .15 }
})

class SceneBoundary extends Component<{ children: ReactNode; onError?: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError?.() }
  render() { return this.state.failed ? null : this.props.children }
}

function CameraRig({ dark, onReady, onError }: Pick<ArchiveSceneProps, "dark" | "onReady" | "onError">) {
  const { camera, size, gl, invalidate } = useThree()
  const callbacks = useRef({ onReady, onError })
  useLayoutEffect(() => { callbacks.current = { onReady, onError } }, [onReady, onError])
  useLayoutEffect(() => {
    const orthographic = camera as OrthographicCamera
    const portrait = size.width / size.height < 1.4
    camera.position.set(portrait ? -5 : -7.5, portrait ? 8 : 8.5, 24)
    camera.lookAt(0, 2.65, 0)
    // Three owns this imperative camera; its zoom must follow the canvas dimensions.
    Object.assign(orthographic, { zoom: Math.min(size.width / (portrait ? 13.8 : 14.35), size.height / 7.65) })
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, size.width, size.height, invalidate])
  useEffect(() => {
    gl.setClearColor(new Color(dark ? "#201e1a" : "#f9f5ec"), 0)
    invalidate()
  }, [dark, gl, invalidate])
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); callbacks.current.onError?.() }
    gl.domElement.addEventListener("webglcontextlost", lost)
    const frame = requestAnimationFrame(() => callbacks.current.onReady?.())
    return () => { cancelAnimationFrame(frame); gl.domElement.removeEventListener("webglcontextlost", lost) }
  }, [gl])
  return null
}

function PresentationBox({ open, paused, visible }: Pick<ArchiveSceneProps, "open" | "paused" | "visible">) {
  const lid = useRef<Group>(null)
  const { invalidate } = useThree()
  const materials = useMemo(() => ({ grain: makeArchiveGrain(), label: makeArchiveLabel(), paper: makeArchivePaper() }), [])
  const geometry = useMemo(() => ({
    front: archivePanel(12, 1.55, .13),
    side: archivePanel(3.7, 1.55, .13),
    lid: archivePanel(12, 3.7, .13),
    lidLiner: archiveFace(11.76, 3.47, .025),
    floor: archivePanel(11.85, 3.6, .12),
    label: archiveFace(11.7, 1.46, .01),
    tab: archivePanel(.55, .61, .035, .035),
  }), [])
  useEffect(() => () => {
    Object.values(materials).forEach(value => value.dispose())
    Object.values(geometry).forEach(value => value.dispose())
  }, [materials, geometry])
  useLayoutEffect(() => {
    if (!lid.current) return
    const animation = gsap.to(lid.current.rotation, {
      x: open ? -.12 : Math.PI / 2, duration: paused || !visible ? 0 : .8,
      delay: !open && !paused && visible ? .9 : 0,
      ease: "power3.inOut", onUpdate: invalidate, onComplete: invalidate,
    })
    return () => { animation.kill() }
  }, [open, paused, visible, invalidate])
  const paper = <meshStandardMaterial map={materials.paper} roughness={.96} bumpMap={materials.grain} bumpScale={.045} />
  const liner = <meshStandardMaterial color="#6b5035" roughness={1} bumpMap={materials.grain} bumpScale={.028} />
  return <group>
    <mesh geometry={geometry.floor} position={[0, .12, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>{liner}</mesh>
    <mesh geometry={geometry.front} position={[0, .86, -1.83]} receiveShadow castShadow>{paper}</mesh>
    <mesh geometry={geometry.front} position={[0, .86, -1.745]} receiveShadow>{liner}</mesh>
    <mesh geometry={geometry.side} position={[-5.96, .86, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>{paper}</mesh>
    <mesh geometry={geometry.side} position={[5.96, .86, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>{paper}</mesh>
    <mesh geometry={geometry.side} position={[-5.87, .86, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>{liner}</mesh>
    <mesh geometry={geometry.side} position={[5.87, .86, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>{liner}</mesh>
    {/* A thin lined rim and the individual slots make this a constructed object. */}
    {Array.from({ length: 7 }, (_, index) => <mesh key={index} position={[(index - 3) * 1.47, .61, .12]} castShadow receiveShadow>
      <boxGeometry args={[.045, .94, 3.27]} />{liner}
    </mesh>)}
    <mesh geometry={geometry.front} position={[0, .86, 1.76]} receiveShadow castShadow>{liner}</mesh>
    <mesh geometry={geometry.front} position={[0, .86, 1.85]} receiveShadow castShadow>{paper}</mesh>
    <mesh geometry={geometry.label} position={[0, .86, 1.934]} receiveShadow>
      <meshStandardMaterial map={materials.label} transparent roughness={.59} metalness={.12} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
    </mesh>
    <group ref={lid} position={[0, 1.64, -1.85]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={geometry.lid} position={[0, 1.85, -.035]} castShadow receiveShadow>{paper}</mesh>
      <mesh geometry={geometry.lidLiner} position={[0, 1.85, .048]} receiveShadow>{liner}</mesh>
      <mesh position={[0, 3.64, .105]} receiveShadow castShadow><boxGeometry args={[11.86, .09, .2]} />{paper}</mesh>
      <mesh position={[-5.91, 1.85, .105]} receiveShadow castShadow><boxGeometry args={[.09, 3.56, .2]} />{paper}</mesh>
      <mesh position={[5.91, 1.85, .105]} receiveShadow castShadow><boxGeometry args={[.09, 3.56, .2]} />{paper}</mesh>
    </group>
    <group position={[.1, 1.56, 1.93]} rotation={[-.2, 0, 0]}>
      <mesh geometry={geometry.tab} position={[0, -.18, .025]} receiveShadow castShadow>
        <meshStandardMaterial color="#c89a57" roughness={.7} metalness={.23} bumpMap={materials.grain} bumpScale={.035} />
      </mesh>
      {Array.from({ length: 23 }, (_, i) => <mesh key={i} position={[-.25 + i * .0225, -.18, .058]}>
        <boxGeometry args={[.006, .56, .005]} /><meshStandardMaterial color={i % 2 ? "#f0cf8d" : "#936329"} roughness={.76} />
      </mesh>)}
    </group>
  </group>
}

type CardProps = ArchiveSceneProps & { index: number; lifted: number | null; lift: (index: number) => void; interactive: { current: boolean } }

function ProjectCard({ index, open, active, selected, paused, visible, lifted, lift, interactive, onActive, onSelect }: CardProps) {
  const group = useRef<Group>(null)
  const { invalidate, camera, gl } = useThree()
  const base = CARD_POSITIONS[index]
  const isLifted = lifted === index || selected === index
  const hovered = active === index && lifted === null && selected === null
  const clicked = useRef(false)
  const lastOpen = useRef(false)
  const callback = useRef(onSelect)
  useLayoutEffect(() => { callback.current = onSelect }, [onSelect])
  const assets = useMemo(() => ({
    body: archivePanel(CARD_WIDTH, CARD_HEIGHT, .065, .16),
    face: archiveFace(CARD_WIDTH - .012, CARD_HEIGHT - .012, .155),
    texture: makeArchiveCard(index),
  }), [index])
  useEffect(() => () => { assets.body.dispose(); assets.face.dispose(); assets.texture.dispose() }, [assets])
  useLayoutEffect(() => {
    if (!group.current) return
    const object = group.current
    const opening = open && !lastOpen.current
    const closing = !open && lastOpen.current
    lastOpen.current = open
    const duration = paused || !visible ? 0 : isLifted ? .65 : hovered ? .43 : .65
    const target = open ? {
      x: isLifted ? base.x * .27 : base.x,
      y: isLifted ? 4 : base.y + (hovered ? .5 : 0),
      z: isLifted ? 4.1 : base.z + (hovered ? 1 : 0),
      rx: isLifted ? -.18 : -.055 + (hovered ? -.045 : 0),
      ry: isLifted ? -.15 : -.025 + (hovered ? -.07 : 0),
      rz: isLifted ? -.025 : base.angle + (hovered ? MathUtils.degToRad(index % 2 ? -2 : 2) : 0),
      scale: isLifted ? 1.13 : hovered ? 1.035 : 1,
    } : { x: base.x * .82, y: .72 + index * .055, z: -.1, rx: -Math.PI / 2, ry: 0, rz: 0, scale: .75 }
    const timeline = gsap.timeline({ onUpdate: invalidate, onComplete: () => {
      invalidate()
      if (open && isLifted && clicked.current) {
        clicked.current = false
        object.updateWorldMatrix(true, false)
        const rect = gl.domElement.getBoundingClientRect()
        const corners = [[-CARD_WIDTH / 2, -CARD_HEIGHT / 2], [-CARD_WIDTH / 2, CARD_HEIGHT / 2], [CARD_WIDTH / 2, -CARD_HEIGHT / 2], [CARD_WIDTH / 2, CARD_HEIGHT / 2]].map(([x, y]) => {
          const point = new Vector3(x, y, .05).applyMatrix4(object.matrixWorld).project(camera)
          return { x: rect.left + (point.x + 1) * rect.width / 2, y: rect.top + (1 - point.y) * rect.height / 2 }
        })
        const left = Math.min(...corners.map(point => point.x)), top = Math.min(...corners.map(point => point.y))
        callback.current(index, { x: left, y: top, width: Math.max(...corners.map(point => point.x)) - left, height: Math.max(...corners.map(point => point.y)) - top })
      }
    } })
    const pose = (value: typeof target, time: number, length: number) => {
      timeline.to(object.position, { x: value.x, y: value.y, z: value.z, duration: length, ease: "power3.inOut" }, time)
        .to(object.rotation, { x: value.rx, y: value.ry, z: value.rz, duration: length, ease: "power3.inOut" }, time)
        .to(object.scale, { x: value.scale, y: value.scale, z: value.scale, duration: length, ease: "power3.inOut" }, time)
    }
    // First lift the cards as parallel sheets. Fan only after they clear the lid;
    // staggered rotations during the lift would let neighboring cards intersect.
    const aligned = { x: base.x * .82, y: 3.35 + index * .025, z: .2 + index * .12, rx: -.055, ry: -.025, rz: 0, scale: 1 }
    if (opening && duration > 0) {
      pose(aligned, .82, .48)
      pose(target, 1.3 + index * .025, .45)
    } else if (closing && duration > 0) {
      pose(aligned, 0, .28)
      pose(target, .28, .5)
    } else pose(target, 0, duration)
    return () => { timeline.kill() }
  }, [base, camera, gl, hovered, index, invalidate, isLifted, open, paused, visible])

  const enter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    if (!open || !interactive.current || lifted !== null || selected !== null) return
    gl.domElement.style.setProperty("cursor", "pointer")
    onActive(index)
  }
  const leave = () => {
    gl.domElement.style.setProperty("cursor", "auto")
    if (active === index) onActive(null)
  }
  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    if (!open || !interactive.current || lifted !== null || selected !== null) return
    clicked.current = true
    gl.domElement.style.setProperty("cursor", "auto")
    lift(index)
  }
  return <group ref={group} position={[base.x * .82, .72 + index * .055, -.1]} rotation={[-Math.PI / 2, 0, 0]} scale={.75} onPointerOver={enter} onPointerOut={leave} onClick={select}>
    <mesh geometry={assets.body} castShadow receiveShadow>
      <meshPhysicalMaterial color={archivePalette[index]} roughness={.38} metalness={.035} clearcoat={.32} clearcoatRoughness={.36} />
    </mesh>
    <mesh geometry={assets.face} position={[0, 0, .054]} castShadow receiveShadow>
      <meshPhysicalMaterial map={assets.texture} roughness={.52} metalness={0} clearcoat={.25} clearcoatRoughness={.38} />
    </mesh>
  </group>
}

function ClosedBoxHover({ open, paused, visible, children }: Pick<ArchiveSceneProps, "open" | "paused" | "visible"> & { children: ReactNode }) {
  const pivot = useRef<Group>(null)
  const { camera, gl, invalidate } = useThree()
  const hitTest = useMemo(() => ({
    // A stationary hit region keeps hover stable while the rendered box tilts.
    bounds: new Box3(new Vector3(-6.15, 0, -2.1), new Vector3(6.15, 1.95, 2.1)),
    ray: new Raycaster(), pointer: new Vector2(), point: new Vector3(),
  }), [])

  useLayoutEffect(() => {
    const object = pivot.current
    if (!object) return
    const canvas = gl.domElement
    let enabled = false
    let hovering = false
    const duration = paused || !visible ? 0 : .65
    const moveTo = (x: number, y: number, z: number, lift: number) => {
      gsap.to(object.rotation, { x, y, z, duration, ease: "power3.out", overwrite: true, onUpdate: invalidate })
      gsap.to(object.position, { y: .85 + lift, duration, ease: "power3.out", overwrite: true, onUpdate: invalidate })
    }
    const reset = () => { hovering = false; moveTo(0, 0, 0, 0) }
    reset()
    // Finish stowing the cards and closing the lid before moving the whole box.
    const ready = gsap.delayedCall(1.75, () => { enabled = !open && !paused && visible })
    const move = (event: PointerEvent) => {
      if (!enabled || event.pointerType === "touch" || document.hidden) return
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      hitTest.pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2)
      hitTest.ray.setFromCamera(hitTest.pointer, camera)
      if (!hitTest.ray.ray.intersectBox(hitTest.bounds, hitTest.point)) {
        if (hovering) reset()
        return
      }
      hovering = true
      const across = MathUtils.clamp(hitTest.point.x / 6.15, -1, 1)
      const depth = MathUtils.clamp(hitTest.point.z / 2.1, -1, 1)
      moveTo(depth * .045, across * .12, -across * .018, .32)
    }
    const visibility = () => { if (document.hidden) reset() }
    if (!open && !paused && visible) {
      canvas.addEventListener("pointermove", move, { passive: true })
      canvas.addEventListener("pointerleave", reset)
      canvas.addEventListener("pointercancel", reset)
      window.addEventListener("blur", reset)
      document.addEventListener("visibilitychange", visibility)
    }
    return () => {
      ready.kill()
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerleave", reset)
      canvas.removeEventListener("pointercancel", reset)
      window.removeEventListener("blur", reset)
      document.removeEventListener("visibilitychange", visibility)
      gsap.killTweensOf(object.rotation)
      gsap.killTweensOf(object.position)
    }
  }, [open, paused, visible, camera, gl, invalidate, hitTest])

  return <group ref={pivot} position={[0, .85, 0]}><group position={[0, -.85, 0]}>{children}</group></group>
}

function ArchiveWorld(props: ArchiveSceneProps) {
  const [lifted, setLifted] = useState<number | null>(null)
  const interactive = useRef(false)
  const previousSelected = useRef(props.selected)
  useEffect(() => {
    interactive.current = false
    const timer = gsap.delayedCall(!props.open || props.paused || !props.visible ? 0 : 1.95, () => {
      interactive.current = props.open
      if (!props.open) setLifted(null)
    })
    return () => { timer.kill() }
  }, [props.open, props.paused, props.visible])
  useEffect(() => {
    if (previousSelected.current !== null && props.selected === null) setLifted(null)
    previousSelected.current = props.selected
  }, [props.selected])
  return <>
    <CameraRig dark={props.dark} onReady={props.onReady} onError={props.onError} />
    <ambientLight intensity={.3} color="#fff5e7" />
    <hemisphereLight args={["#fff7e9", "#9a7957", .9]} />
    <directionalLight position={[-5, 10, 8]} intensity={1.9} color="#fff0d6" castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} shadow-camera-near={.1} shadow-camera-far={35} shadow-bias={-.0003} shadow-normalBias={.035} shadow-radius={5} shadow-blurSamples={10} />
    <directionalLight position={[7, 5, -1]} intensity={.45} color="#fff5d8" />
    <directionalLight position={[-1, 3, 10]} intensity={.2} color="#ffffff" />
    <ClosedBoxHover open={props.open} paused={props.paused} visible={props.visible}>
      <PresentationBox open={props.open} paused={props.paused} visible={props.visible} />
      {CARD_POSITIONS.map((_, index) => <ProjectCard key={index} {...props} index={index} lifted={lifted} lift={setLifted} interactive={interactive} />)}
    </ClosedBoxHover>
    <ContactShadows position={[0, .025, 0]} opacity={props.dark ? .55 : .45} scale={23} blur={2.8} far={8} resolution={256} color="#4d3a26" frames={Infinity} />
  </>
}

export default function ProjectArchiveScene(props: ArchiveSceneProps) {
  return <SceneBoundary onError={props.onError}>
    <Canvas orthographic camera={{ position: [-7.5, 8.5, 24], zoom: 70, near: .1, far: 100 }} dpr={[1, 1.6]} frameloop="demand" shadows={{ type: VSMShadowMap }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} style={{ width: "100%", height: "100%", touchAction: "pan-y" }} fallback={<span>Explore the project collection below.</span>}>
      <ArchiveWorld {...props} />
    </Canvas>
  </SceneBoundary>
}

