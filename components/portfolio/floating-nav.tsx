"use client"

import { useClientReady } from "@/hooks/use-client-ready"
import { useTheme } from "next-themes"
import { motion, useScroll, useSpring } from "framer-motion"
import { Moon, Sun, ArrowUpRight, Pause, Play } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { pageSections, useActiveSection } from "@/hooks/use-active-section"
import { useMotionPreferences } from "./motion-preferences"
import "./floating-nav.css"

const links = [{ name: "Home", id: "home" }, { name: "Journey", id: "journey" }, { name: "Work", id: "selected-work" }, { name: "About", id: "about" }, { name: "Contact", id: "contact" }]

export function FloatingNav() {
  const { resolvedTheme, setTheme } = useTheme()
  const { paused, systemReducedMotion, ready: motionReady, toggleMotion } = useMotionPreferences()
  const mounted = useClientReady()
  const section = useActiveSection()
  const active = pageSections.find(item => item.id === section)?.tab ?? "home"
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: .001 })
  const dark = mounted && resolvedTheme === "dark"
  return <header className="portfolio-header" data-section={section}>
    <motion.span className="portfolio-progress" aria-hidden="true" style={{ scaleX: paused ? scrollYProgress : progress }} />
    <a className="portfolio-avatar" href="#home" aria-label={`${profile.name}, back to top`}><img src="/images/hasan-portrait.webp" width="34" height="34" alt={profile.name} /></a>
    <div className="portfolio-header-controls">
      <span className="portfolio-location"><span aria-hidden="true" />Based in {profile.location.split(",")[0]}</span>
      <button type="button" className="portfolio-motion" onClick={toggleMotion} disabled={!motionReady || systemReducedMotion} aria-pressed={paused} aria-label={!motionReady ? "Animation preferences" : systemReducedMotion ? "Motion reduced: animations follow your system preference" : paused ? "Resume animations" : "Pause animations"} title={systemReducedMotion ? "Animations respect your device’s reduced motion setting." : "Pause or resume decorative animations."}>
        {paused && motionReady ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}<span>{!motionReady ? "Animations" : systemReducedMotion ? "Motion reduced" : paused ? "Resume animations" : "Pause animations"}</span>
      </button>
      <button type="button" className="portfolio-theme" onClick={() => setTheme(dark ? "light" : "dark")} disabled={!mounted} aria-label={`Switch to ${dark ? "day" : "night"} mode`}>{dark ? <Sun size={17} /> : <Moon size={17} />}<span>{dark ? "Day" : "Night"}</span></button>
    </div>
    <nav className="portfolio-dock" aria-label="Main navigation"><div className="portfolio-dock-links">{links.map(({ name, id }) => <a key={id} className={`portfolio-dock-link${active === id ? " is-active" : ""}`} href={`#${id}`} aria-label={name} aria-current={active === id ? "location" : undefined}>
      {active === id && <motion.span layoutId="dock-active-pill" className="portfolio-dock-pill" aria-hidden="true" transition={paused ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }} />}
      <span className="portfolio-dock-content">{id === "home" && <img src="/images/hasan-portrait.webp" width="22" height="22" alt="" />}<span>{name}</span></span>
    </a>)}</div><a className="portfolio-dock-resume" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={14} aria-hidden="true" /></a></nav>
  </header>
}
