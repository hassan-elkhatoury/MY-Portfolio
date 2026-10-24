"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { profile } from "@/lib/portfolio-data"
import { pageSections, useActiveSection } from "@/hooks/use-active-section"
import { useMotionPreferences } from "./motion-preferences"
import { ThemeToggle } from "./theme-toggle"
import "./floating-nav.css"

const links = [{ name: "Home", id: "home" }, { name: "Journey", id: "journey" }, { name: "Work", id: "selected-work" }, { name: "About", id: "about" }, { name: "Contact", id: "contact" }]

export function FloatingNav() {
  const { paused } = useMotionPreferences()
  const section = useActiveSection()
  const active = pageSections.find(item => item.id === section)?.tab ?? "home"
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: .001 })
  return <header className="portfolio-header" data-section={section}>
    <motion.span className="portfolio-progress" aria-hidden="true" style={{ scaleX: paused ? scrollYProgress : progress }} />
    <a className="portfolio-avatar" href="#home" aria-label={`${profile.name}, back to top`}><Image src={profile.photo} width={38} height={38} sizes="38px" alt={profile.name} /></a>
    <div className="portfolio-header-controls">
      <ThemeToggle />
    </div>
    <nav className="portfolio-dock" aria-label="Main navigation"><div className="portfolio-dock-links">{links.map(({ name, id }) => <a key={id} className={`portfolio-dock-link${active === id ? " is-active" : ""}`} href={`#${id}`} aria-label={name} aria-current={active === id ? "location" : undefined}>
      {active === id && <motion.span layoutId="dock-active-pill" className="portfolio-dock-pill" aria-hidden="true" transition={paused ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }} />}
      <span className="portfolio-dock-content">{id === "home" && <Image src={profile.photo} width={22} height={22} sizes="22px" alt="" />}<span>{name}</span></span>
    </a>)}</div><a className="portfolio-dock-resume" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={14} aria-hidden="true" /></a></nav>
  </header>
}
