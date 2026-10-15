"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { AmbientPlayer } from "./ambient-player"
import { SceneDepth } from "./scene-depth"
import { profile } from "@/lib/portfolio-data"
import "./hero-landscape.css"

const scenery = "/images/valley/"
const layers = [
  { file: "hillL.webp", distance: 10, left: "0%", top: "48.305%", width: "55.238%", height: "26.483%" },
  { file: "hillR.webp", distance: 14, left: "44.167%", top: "22.881%", width: "55.833%", height: "51.589%" },
  { file: "hotelL.webp", distance: 18, left: "79.107%", top: "16.631%", width: "13.393%", height: "17.903%" },
  { file: "tower.webp", distance: 24, left: "63.095%", top: "11.864%", width: "9.524%", height: "42.797%" },
  { file: "college.webp", distance: 26, left: "7.5%", top: "33.051%", width: "15%", height: "38.559%" },
  { file: "bistro.webp", distance: 30, left: "32.976%", top: "56.038%", width: "25.357%", height: "25.212%" },
  { file: "fgL.webp", distance: 42, left: "0%", top: "40.572%", width: "30.595%", height: "59.428%" },
  { file: "fgR.webp", distance: 48, left: "48.095%", top: "39.513%", width: "51.905%", height: "60.487%" },
  { file: "fgB.webp", distance: 54, left: "23.869%", top: "72.775%", width: "31.31%", height: "27.225%" },
]

function Place({ href, className, icon, name, year }: { href: string; className: string; icon?: string; name: string; year: string }) {
  return <a href={href} className={`valley-place ${className}`} aria-label={`${name}, ${year}. Explore ${name}`}>
    <span className="valley-place-chip">{icon ? <img src={icon} alt="" width="26" height="26" /> : <span className="valley-place-initials" aria-hidden="true">{name.slice(0, 3)}</span>}<strong>{name}</strong><small>{year}</small></span>
    <span className="valley-place-stem" aria-hidden="true" /><span className="valley-place-dot" aria-hidden="true" />
  </a>
}

export function HeroLandscape() {
  const root = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { stiffness: 65, damping: 22, mass: .7 })
  const y = useSpring(mouseY, { stiffness: 65, damping: 22, mass: .7 })
  const rotateY = useTransform(x, [-1, 1], [-.9, .9])
  const rotateX = useTransform(y, [-1, 1], [.65, -.65])
  const depthProps = { pointerX: x, pointerY: y, disabled: Boolean(reduceMotion) }
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.13])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90])
  return <section ref={root} id="home" className="valley-hero" aria-label={`Welcome to ${profile.name.split(" ")[0]}'s world`}
    onPointerMove={event => { if (reduceMotion || event.pointerType !== "mouse") return; const bounds = event.currentTarget.getBoundingClientRect(); if (bounds.width <= 700) { mouseX.set(0); mouseY.set(0); return } mouseX.set(Math.max(-1, Math.min(1, 1 - (event.clientX - bounds.left) / bounds.width * 2))); mouseY.set(Math.max(-1, Math.min(1, 1 - (event.clientY - bounds.top) / bounds.height * 2))) }}
    onPointerLeave={() => { mouseX.set(0); mouseY.set(0) }}>
    <motion.div className="valley-camera" style={reduceMotion ? {} : { scale, rotateX, rotateY }}>
      <div className="valley-scene" aria-hidden="true">
        <SceneDepth {...depthProps} distance={4} name="clean-valley" className="valley-terrain"><img className="valley-base" src={`${scenery}landscape-clean.webp`} alt="" fetchPriority="high" /></SceneDepth>
        <SceneDepth {...depthProps} distance={3} name="sky"><div className="valley-night-sky" /><img className="valley-day-sky" src={`${scenery}sky.webp`} alt="" /><div className="valley-stars" /><div className="valley-moon" /></SceneDepth>
        <SceneDepth {...depthProps} distance={8} name="cloud-near"><img className="valley-cloud valley-cloud-one" src={`${scenery}cloud_s.webp`} alt="" /></SceneDepth>
        <SceneDepth {...depthProps} distance={5} name="cloud-far"><img className="valley-cloud valley-cloud-two" src={`${scenery}cloud_s.webp`} alt="" /></SceneDepth>
        {layers.map(layer => <SceneDepth key={layer.file} {...depthProps} distance={layer.distance} name={layer.file.replace(".webp", "")} className="valley-terrain"><img src={`${scenery}${layer.file}`} alt="" style={{left: layer.left, top: layer.top, width: layer.width, height: layer.height}} /></SceneDepth>)}
      </div>
      <div className="valley-landmarks">
        <SceneDepth {...depthProps} distance={26} name="college-label"><Place className="valley-college-pin" href="#journey" icon="/images/logos/ensah.png" name="ENSAH" year="2022" /></SceneDepth>
        <SceneDepth {...depthProps} distance={30} name="bistro-label"><Place className="valley-work-pin" href="#journey" name="MEF" year="2026" /></SceneDepth>
        <SceneDepth {...depthProps} distance={24} name="tower-label"><Place className="valley-java-pin" href="#certifications" icon="/images/logos/oracle.png" name="Java OCP" year="2026" /></SceneDepth>
        <SceneDepth {...depthProps} distance={18} name="hotel-label"><Place className="valley-cloud-pin" href="#certifications" icon="/images/logos/oracle.png" name="Oracle Cloud" year="2025" /></SceneDepth>
        <SceneDepth {...depthProps} distance={35} name="record-player"><AmbientPlayer /></SceneDepth>
        <SceneDepth {...depthProps} distance={52} name="hasan"><a className="valley-person" href="#about" aria-label={`Meet ${profile.name}`}><span className="valley-person-label"><img src="/images/hasan-portrait.png" width="24" height="24" alt="" /> That&apos;s me <ArrowUpRight size={12} /></span><img className="valley-person-figure" src="/images/hasan-illustration.webp" alt={`Painted illustration of ${profile.name.split(" ")[0]} waving hello`} width="600" height="900" /></a></SceneDepth>
      </div>
    </motion.div>
    <div className="valley-shade" aria-hidden="true" />
    <motion.div className="valley-copy" style={reduceMotion ? {} : { y: copyY }}>
      <motion.p className="valley-greeting" initial={{ y: reduceMotion ? 0 : 14 }} animate={{ y: 0 }} transition={{ duration: .7 }}><span className="valley-hand" aria-hidden="true">✋</span> hey, I&apos;m {profile.name.split(" ")[0]}</motion.p>
      <motion.h1 initial={{ y: reduceMotion ? 0 : 25 }} animate={{ y: 0 }} transition={{ duration: .8, delay: .08 }}>Building systems<br />that <span className="valley-marker">just work.<svg viewBox="0 0 400 22" preserveAspectRatio="none" aria-hidden="true"><path d="M5 16C95 2 149 20 211 10S324 17 395 6" /></svg></span></motion.h1>
      <motion.p className="valley-description" initial={{ y: reduceMotion ? 0 : 20 }} animate={{ y: 0 }} transition={{ duration: .8, delay: .16 }}>Java &amp; Spring Boot. Oracle-certified.<br className="valley-mobile-break" /> Building reliable systems.</motion.p>
    </motion.div>
    <div className="valley-banner" aria-hidden="true"><span>Welcome to my little world</span><svg viewBox="0 0 60 30"><path d="m3 15 22-3 8-10 6 1-2 9 18 1c7 1 7 7-1 8l-17-1 2 8-6-1-8-8-21-2Z" fill="#efeee7" /><path d="m20 12 3 7m20-5 5 1" stroke="#d96b50" strokeWidth="3" /></svg></div>
    <div className="valley-click-note" aria-hidden="true">click a place <svg viewBox="0 0 70 35"><path d="M2 20C20-1 42 6 58 22m-12-1 13 3-1-13" /></svg></div>
    <a className="valley-explore" href="#about"><span className="valley-scroll-mouse" aria-hidden="true" /> scroll to explore <ArrowDown size={14} /></a>
    <div className="valley-tear" aria-hidden="true" />
  </section>
}
