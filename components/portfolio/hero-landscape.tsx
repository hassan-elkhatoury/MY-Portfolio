"use client"

import Image from "next/image"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { SceneDepth } from "./scene-depth"
import { useMotionPreferences } from "./motion-preferences"
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

function Place({ href, className, icon, name, year, journeyStop }: { href: string; className: string; icon?: string; name: string; year: string; journeyStop?: string }) {
  return <a href={href} className={`valley-place ${className}`} aria-label={`${name}, ${year}. Explore ${name}`}
    onClick={journeyStop ? event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      window.dispatchEvent(new CustomEvent("portfolio:journey-select", { detail: journeyStop }))
    } : undefined}>
    <span className="valley-place-chip">{icon ? <img src={icon} alt="" width="26" height="26" /> : <span className="valley-place-initials" aria-hidden="true">{name.slice(0, 3)}</span>}<strong>{name}</strong><small>{year}</small></span>
    <span className="valley-place-stem" aria-hidden="true" /><span className="valley-place-dot" aria-hidden="true" />
  </a>
}

export function HeroLandscape() {
  const root = useRef<HTMLElement>(null)
  const visible = useInView(root)
  const { paused: reduceMotion } = useMotionPreferences()
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
  const copyOpacity = useTransform(scrollYProgress, [0, .55, 1], [1, .55, 0])
  const sceneBlur = useTransform(scrollYProgress, [0, .7, 1], [0, .5, 4])
  const sceneFilter = useTransform(sceneBlur, value => `blur(${value.toFixed(2)}px) saturate(${(1 - value * .017).toFixed(3)})`)
  // A soft light that follows the cursor across the landscape.
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(40)
  const glareSmoothX = useSpring(glareX, { stiffness: 90, damping: 24 })
  const glareSmoothY = useSpring(glareY, { stiffness: 90, damping: 24 })
  const glareBackground = useTransform([glareSmoothX, glareSmoothY], ([gx, gy]: number[]) => `radial-gradient(680px 420px at ${gx}% ${gy}%, rgba(255,239,190,.34), transparent 62%)`)
  useEffect(() => {
    if (!reduceMotion) return
    mouseX.set(0)
    mouseY.set(0)
    x.jump(0)
    y.jump(0)
  }, [reduceMotion, mouseX, mouseY, x, y])
  return <section ref={root} id="home" className="valley-hero" data-running={visible && !reduceMotion} aria-label={`Welcome to ${profile.name.split(" ")[0]}'s world`}
    onPointerMove={event => {
      if (reduceMotion || event.pointerType !== "mouse") return
      const bounds = event.currentTarget.getBoundingClientRect()
      glareX.set(((event.clientX - bounds.left) / bounds.width) * 100)
      glareY.set(((event.clientY - bounds.top) / bounds.height) * 100)
      if (bounds.width <= 700) { mouseX.set(0); mouseY.set(0); return }
      mouseX.set(Math.max(-1, Math.min(1, 1 - (event.clientX - bounds.left) / bounds.width * 2)))
      mouseY.set(Math.max(-1, Math.min(1, 1 - (event.clientY - bounds.top) / bounds.height * 2)))
    }}
    onPointerLeave={() => { if (!reduceMotion) { mouseX.set(0); mouseY.set(0); glareX.set(50); glareY.set(40) } }}>
    <motion.div className="valley-camera" style={reduceMotion ? {} : { scale, rotateX, rotateY, filter: sceneFilter }}>
      <div className="valley-scene" aria-hidden="true">
        <SceneDepth {...depthProps} distance={4} name="clean-valley" className="valley-terrain"><img className="valley-base" src={`${scenery}landscape-clean.webp`} alt="" fetchPriority="high" /></SceneDepth>
        <SceneDepth {...depthProps} distance={3} name="sky"><div className="valley-night-sky" /><img className="valley-day-sky" src={`${scenery}sky.webp`} alt="" /><div className="valley-stars" /><div className="valley-moon" /></SceneDepth>
        <SceneDepth {...depthProps} distance={8} name="cloud-near"><img className="valley-cloud valley-cloud-one" src={`${scenery}cloud_s.webp`} alt="" /></SceneDepth>
        <SceneDepth {...depthProps} distance={5} name="cloud-far"><img className="valley-cloud valley-cloud-two" src={`${scenery}cloud_s.webp`} alt="" /></SceneDepth>
        {layers.map(layer => <SceneDepth key={layer.file} {...depthProps} distance={layer.distance} name={layer.file.replace(".webp", "")} className="valley-terrain"><img src={`${scenery}${layer.file}`} alt="" style={{left: layer.left, top: layer.top, width: layer.width, height: layer.height}} /></SceneDepth>)}
      </div>
      <div className="valley-landmarks">
        <SceneDepth {...depthProps} distance={26} name="college-label"><Place className="valley-college-pin" href="#journey" journeyStop="The beginning" icon="/images/logos/ensah.webp" name="ENSAH" year="2022" /></SceneDepth>
        <SceneDepth {...depthProps} distance={30} name="bistro-label"><Place className="valley-work-pin" href="#journey" journeyStop="MEF internship" name="MEF" year="2026" /></SceneDepth>
        <SceneDepth {...depthProps} distance={24} name="tower-label"><Place className="valley-java-pin" href="#certifications" icon="/images/logos/oracle.png" name="Java OCP" year="2026" /></SceneDepth>
        <SceneDepth {...depthProps} distance={18} name="hotel-label"><Place className="valley-cloud-pin" href="#certifications" icon="/images/logos/oracle.png" name="Oracle Cloud" year="2025" /></SceneDepth>
        <SceneDepth {...depthProps} distance={52} name="hasan"><a className="valley-person" href="#about" aria-label={`Meet ${profile.name}`}><span className="valley-person-label"><Image src={profile.photo} width={24} height={24} sizes="24px" alt="" /> That&apos;s me <ArrowUpRight size={12} /></span><img className="valley-person-figure" src="/images/hasan-illustration.webp" alt={`Painted illustration of ${profile.name.split(" ")[0]} waving hello`} width="600" height="900" /></a></SceneDepth>
      </div>
    </motion.div>
    <motion.div className="valley-glare" aria-hidden="true" style={reduceMotion ? undefined : { background: glareBackground }} />
    <div className="valley-shade" aria-hidden="true" />
    <motion.div className="valley-copy" style={reduceMotion ? {} : { y: copyY, opacity: copyOpacity }}>
      <motion.p className="valley-greeting" initial={{ y: reduceMotion ? 0 : 14 }} animate={{ y: 0 }} transition={{ duration: .7 }}><span className="valley-hand" aria-hidden="true">✋</span> hey, I&apos;m {profile.name.split(" ")[0]}</motion.p>
      <motion.h1 initial={{ y: reduceMotion ? 0 : 25 }} animate={{ y: 0 }} transition={{ duration: .8, delay: .08 }}>Building systems<br />that <span className="valley-marker">just work.<svg viewBox="0 0 400 22" preserveAspectRatio="none" aria-hidden="true"><path d="M5 16C95 2 149 20 211 10S324 17 395 6" /></svg></span></motion.h1>
      <motion.p className="valley-description" initial={{ y: reduceMotion ? 0 : 20 }} animate={{ y: 0 }} transition={{ duration: .8, delay: .16 }}>Computer engineering student.<br className="valley-mobile-break" /> Java &amp; Spring Boot backends.</motion.p>
      <div className="valley-actions">
        <motion.a
          className="valley-primary-action"
          href="#selected-work"
        >View my work <ArrowDown size={16} aria-hidden="true" /></motion.a>
        <span className="valley-availability" title={`${profile.availability} · ${profile.pfeTarget}`}><span aria-hidden="true" />Seeking PFE {profile.graduationYear}</span>
      </div>
    </motion.div>
    <div className="valley-banner" aria-hidden="true">
      <div className="valley-flight">
        <span className="valley-banner-cloth">Welcome to my little world</span>
        <span className="valley-tow-line" />
        <svg className="valley-aircraft" viewBox="0 0 64 32"><path d="m3 15 22-3 8-10 6 1-2 9 18 1c7 1 7 7-1 8l-17-1 2 8-6-1-8-8-21-2Z" fill="#efeee7" /><path d="m20 12 3 7m20-5 5 1" stroke="#d96b50" strokeWidth="3" /><ellipse className="valley-propeller" cx="60" cy="16" rx="1.1" ry="7" fill="#f5f2e8" /></svg>
      </div>
    </div>
    <div className="valley-click-note" aria-hidden="true">click a place <svg viewBox="0 0 70 35"><path d="M2 20C20-1 42 6 58 22m-12-1 13 3-1-13" /></svg></div>
    <a className="valley-explore" href="#journey" onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      window.dispatchEvent(new CustomEvent("portfolio:journey-select", { detail: "The beginning" }))
    }}><span className="valley-scroll-mouse" aria-hidden="true" /> Explore my journey <ArrowDown size={14} /></a>
    <div className="valley-tear" aria-hidden="true" />
  </section>
}
