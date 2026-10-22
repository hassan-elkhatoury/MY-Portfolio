"use client"

import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Coffee, GraduationCap, Layers3, Play, X } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { useMotionPreferences } from "./motion-preferences"
import "./workspace-hero.css"

const milestones = [
  { name: "University", date: "2022", x: 46.3, y: 39.6, Icon: GraduationCap, href: "#journey", stop: "The beginning" },
  { name: "MEF internship", date: "2026", x: 59.7, y: 23.8, Icon: BriefcaseBusiness, href: "#journey", stop: "MEF internship" },
  { name: "Java & Spring Boot", date: "Backend engineering", x: 67.8, y: 37.8, Icon: Coffee, href: "#selected-work" },
  { name: "Selected projects", date: "2025–2026", x: 77.8, y: 30, Icon: Layers3, href: "#projects" },
  { name: "The next chapter", date: "PFE 2027", x: 89.3, y: 18.3, Icon: Code2, href: "#contact" },
]

const compactQuery = "(max-width: 900px)"
function subscribeCompact(notify: () => void) {
  const media = window.matchMedia(compactQuery)
  media.addEventListener("change", notify)
  return () => media.removeEventListener("change", notify)
}

function WorkspaceLayer({ x, y, depth, paused, className, children }: { x: MotionValue<number>; y: MotionValue<number>; depth: number; paused: boolean; className: string; children: React.ReactNode }) {
  const moveX = useTransform(x, value => value * depth)
  const moveY = useTransform(y, value => value * depth * .45)
  return <motion.div className={`workspace-layer ${className}`} data-depth={depth} style={paused ? undefined : { x: moveX, y: moveY }}>{children}</motion.div>
}

export function WorkspaceHero() {
  const root = useRef<HTMLElement>(null)
  const { paused } = useMotionPreferences()
  const compact = useSyncExternalStore(subscribeCompact, () => window.matchMedia(compactQuery).matches, () => false)
  const visible = useInView(root)
  const pointerX = useMotionValue(0), pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 70, damping: 23, mass: .75 })
  const y = useSpring(pointerY, { stiffness: 70, damping: 23, mass: .75 })
  const rotateY = useTransform(x, [-1, 1], [-.65, .65])
  const rotateX = useTransform(y, [-1, 1], [.35, -.35])
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] })
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 75])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -45])
  useEffect(() => { if (paused) { pointerX.set(0); pointerY.set(0); x.jump(0); y.jump(0) } }, [paused, pointerX, pointerY, x, y])

  return <section ref={root} id="home" className="workspace-hero" data-running={visible && !paused} aria-label="Hassan's interactive engineering workspace"
    onPointerMove={event => {
      if (paused || event.pointerType !== "mouse" || window.innerWidth < 1000) return
      const bounds = event.currentTarget.getBoundingClientRect()
      pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 2)
      pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 2)
    }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
    <motion.div className="workspace-stage" style={paused ? undefined : { y: sceneY, rotateX, rotateY }}>
      <div className="workspace-world">
        <WorkspaceLayer x={x} y={y} depth={4} paused={paused} className="workspace-city">
          <img className="workspace-art workspace-day" src="/images/workspace/city-day.webp" width={1670} height={941} alt="" fetchPriority="high" />
          <img className="workspace-art workspace-night" src="/images/workspace/city-night.webp" width={1672} height={941} alt="" />
        </WorkspaceLayer>
        <WorkspaceLayer x={x} y={y} depth={6} paused={paused} className="workspace-journey">
          <svg className="workspace-route" viewBox="0 0 1672 941" aria-hidden="true"><path d="M774 373C830 365 911 359 946 350S998 325 998 280V224M998 280C998 337 1040 370 1134 356S1247 346 1280 310S1287 287 1301 282L1473 250Q1493 246 1493 223V172" /><path className="workspace-route-signal" d="M774 373C930 350 1040 380 1134 356S1247 346 1280 310S1287 287 1301 282L1473 250Q1493 246 1493 223V172" /></svg>
          {milestones.map(({ name, date, x: left, y: top, Icon, href, stop }) => <a key={name} className="workspace-milestone" href={href} style={{ left: `${left}%`, top: `${top}%` } as CSSProperties} aria-label={`${name}, ${date}${stop ? ". Explore my journey" : ""}`} onClick={stop ? event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); window.dispatchEvent(new CustomEvent("portfolio:journey-select", { detail: stop })) } : undefined}>
            <span className="workspace-milestone-label"><Icon size={19} /><span><strong>{name}</strong><small>{date}</small></span></span><i aria-hidden="true" />
          </a>)}
        </WorkspaceLayer>
        <WorkspaceLayer x={x} y={y} depth={13} paused={paused} className="workspace-desk">
          <img className="workspace-art workspace-day" src="/images/workspace/desk-day-integrated.webp" width={1672} height={941} alt="" />
          <img className="workspace-art workspace-night" src="/images/workspace/desk-night-integrated.webp" width={1672} height={941} alt="" />
          <Link href="/projects/interview-ai" className="workspace-screen workspace-laptop" tabIndex={compact ? -1 : undefined} aria-hidden={compact || undefined} aria-label="Explore InterviewAI on the laptop"></Link>
          <Link href="/work/mef-fleet-management" className="workspace-screen workspace-code" tabIndex={compact ? -1 : undefined} aria-hidden={compact || undefined} aria-label="Explore the Java and Spring Boot backend case study"></Link>
          <Link href="/work/mef-fleet-management" className="workspace-screen workspace-system" tabIndex={compact ? -1 : undefined} aria-hidden={compact || undefined} aria-label="Explore the MEF fleet-management architecture"></Link>
        </WorkspaceLayer>
        <WorkspaceLayer x={x} y={y} depth={23} paused={paused} className="workspace-foreground"><img className="workspace-art" src="/images/workspace/foreground.webp" width={1671} height={941} alt="" /></WorkspaceLayer>
      </div>
    </motion.div>
    <div className="workspace-copy-shade" aria-hidden="true" />
    <motion.div className="workspace-copy" style={paused ? undefined : { y: copyY }}>
      <p className="workspace-greeting"><span aria-hidden="true">👋</span> hey, I’m Hassan</p>
      <h1>I build backend<br />systems that<br />solve <span>real problems.<svg viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden="true"><path d="M3 19 96 5 59 22 145 7 116 22 201 8 185 19 397 4" /></svg></span></h1>
      <p className="workspace-description">Computer engineering student · Java &amp; Spring Boot<small>Turning ideas into scalable, real-world applications.</small></p>
      <div className="workspace-actions"><a className="workspace-primary" href="#selected-work">Explore my work <ArrowRight size={17} /></a>
        <Dialog.Root><Dialog.Trigger className="workspace-intro"><span><Play size={16} fill="currentColor" /></span>A quick intro</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="workspace-intro-overlay" /><Dialog.Content className="workspace-intro-dialog"><Dialog.Close className="workspace-intro-close" aria-label="Close introduction"><X size={22} /></Dialog.Close><img src="/images/hasan-portrait.webp" width={140} height={160} alt={profile.name} /><p className="section-label">A LITTLE ABOUT ME</p><Dialog.Title>Hi, I’m Hassan.</Dialog.Title><Dialog.Description>Computer engineering student at ENSAH, graduating in 2027. I build Java and Spring Boot backends, explore distributed systems, and bring ideas to life through software.</Dialog.Description><p>My work includes the MEF fleet-management backend, InterviewAI, and full-stack commerce projects. I’m looking for a PFE internship in 2027.</p><Dialog.Close asChild><a href="#about" className="workspace-primary">More about me <ArrowRight size={17} /></a></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      </div>
      <dl className="workspace-facts"><div><Code2 size={25} /><span><dt>8</dt><dd>Projects</dd></span></div><div><BriefcaseBusiness size={24} /><span><dt>Java &amp; Spring</dt><dd>Backend focus</dd></span></div><div><GraduationCap size={26} /><span><dt>PFE 2027</dt><dd>Looking for opportunity</dd></span></div></dl>
      <div className="workspace-mobile-projects"><Link href="/projects/interview-ai">InterviewAI <ArrowUpRight size={13} /></Link><Link href="/work/mef-fleet-management">Java backend <ArrowUpRight size={13} /></Link><a href="#projects">All projects <ArrowUpRight size={13} /></a></div>
    </motion.div>
    <a className="workspace-explore" href="#journey" onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); window.dispatchEvent(new CustomEvent("portfolio:journey-select", { detail: "The beginning" })) }}><ArrowDown size={16} /> Explore my journey</a>
    <span className="workspace-scene-note">Explore the projects behind the scene.</span>
  </section>
}


