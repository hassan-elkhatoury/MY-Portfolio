"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion"
import { Moon, Sun, ArrowUpRight, Pause, Play } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import "./floating-nav.css"
import { useMotionPreferences } from "./motion-preferences"

const links = [{name: "Home", id: "home"}, {name: "Journey", id: "journey"}, {name: "Work", id: "selected-work"}, {name: "About", id: "about"}, {name: "Contact", id: "contact"}]
const sections = [
  { id: "home", tab: "home" },
  { id: "journey", tab: "journey" },
  { id: "selected-work", tab: "selected-work" },
  { id: "projects", tab: "selected-work" },
  { id: "about", tab: "about" },
  { id: "certifications", tab: "about" },
  { id: "skills", tab: "about" },
  { id: "contact", tab: "contact" },
]

/** A dock link that leans a few pixels toward the cursor. */
function MagneticLink({ id, name, active, onSelect, reduceMotion }: { id: string; name: string; active: boolean; onSelect: () => void; reduceMotion: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const leanX = useSpring(x, { stiffness: 340, damping: 22, mass: .35 })
  const leanY = useSpring(y, { stiffness: 340, damping: 22, mass: .35 })

  return (
    <motion.a
      aria-label={name}
      className={`portfolio-dock-link ${active ? "is-active" : ""}`}
      href={`#${id}`}
      aria-current={active ? "location" : undefined}
      onClick={onSelect}
      style={reduceMotion ? undefined : { x: leanX, y: leanY }}
      onPointerMove={event => {
        if (reduceMotion || event.pointerType !== "mouse") return
        const bounds = event.currentTarget.getBoundingClientRect()
        x.set(((event.clientX - bounds.left) / bounds.width - .5) * 8)
        y.set(((event.clientY - bounds.top) / bounds.height - .5) * 6)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {active && <motion.span layoutId="dock-active-pill" className="portfolio-dock-pill" aria-hidden="true" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
      <span className="portfolio-dock-content">
        {id === "home" && <img src="/images/hassan-profile-photo.jpg" width="22" height="22" alt="" />}
        <span>{name}</span>
      </span>
    </motion.a>
  )
}

export function FloatingNav() {
  const { resolvedTheme, setTheme } = useTheme()
  const { paused, systemReducedMotion, ready: motionReady, toggleMotion } = useMotionPreferences()
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState("home")
  const themeTransition = useRef(false)
  const [changingTheme, setChangingTheme] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: .001 })
  const reduceMotion = paused || systemReducedMotion
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    let frame = 0
    const updateActive = () => {
      frame = 0
      const readingLine = Math.min(window.innerHeight * .3, 240)
      let current = "home"
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= readingLine) current = section.tab
      }
      // Contact may be shorter than the viewport on wide screens.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = "contact"
      setActive(current)
    }
    const scheduleUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateActive) }
    const observer = new ResizeObserver(scheduleUpdate)
    const main = document.querySelector(".portfolio-main")
    if (main) observer.observe(main)
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    window.addEventListener("hashchange", scheduleUpdate)
    scheduleUpdate()
    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      window.removeEventListener("hashchange", scheduleUpdate)
    }
  }, [])
  const dark = mounted && resolvedTheme === "dark"
  async function changeTheme(event: MouseEvent<HTMLButtonElement>) {
    if (!mounted || themeTransition.current) return
    const nextTheme = dark ? "light" : "dark"
    if (paused || !document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme)
      return
    }

    // Use the button center for mouse, touch, and keyboard activation alike.
    const bounds = event.currentTarget.getBoundingClientRect()
    const originX = bounds.left + bounds.width / 2
    const originY = bounds.top + bounds.height / 2
    const radius = Math.ceil(Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    )) + 2
    const page = document.documentElement
    page.style.setProperty("--theme-origin-x", `${originX}px`)
    page.style.setProperty("--theme-origin-y", `${originY}px`)
    page.style.setProperty("--theme-reveal-radius", `${radius}px`)
    page.dataset.themeReveal = "true"
    themeTransition.current = true
    setChangingTheme(true)

    try {
      const transition = document.startViewTransition(() => {
        // next-themes applies its document class in an effect. Flush that update
        // before the browser captures the new, fully themed page snapshot.
        flushSync(() => setTheme(nextTheme))
      })
      // A resize or hidden tab may skip the visual reveal; the theme still applies.
      void transition.ready.catch(() => {})
      await transition.finished
    } catch {
      setTheme(nextTheme)
    } finally {
      delete page.dataset.themeReveal
      page.style.removeProperty("--theme-origin-x")
      page.style.removeProperty("--theme-origin-y")
      page.style.removeProperty("--theme-reveal-radius")
      themeTransition.current = false
      setChangingTheme(false)
    }
  }
  return <header className="portfolio-header">
    <motion.span className="portfolio-progress" aria-hidden="true" style={{ scaleX: paused ? scrollYProgress : progress }} />
    <a className="portfolio-avatar" href="#home" aria-label={`${profile.name}, back to top`}><img src="/images/hassan-profile-photo.jpg" width="34" height="34" alt={profile.name} /></a>
    <div className="portfolio-header-controls">
      <span className="portfolio-location"><span aria-hidden="true" />Based in {profile.location.split(",")[0]}</span>
      <button type="button" className="portfolio-motion" onClick={toggleMotion} disabled={!motionReady || systemReducedMotion} aria-pressed={paused} aria-label={!motionReady ? "Animation preferences" : systemReducedMotion ? "Motion reduced: animations follow your system preference" : paused ? "Resume animations" : "Pause animations"} title={systemReducedMotion ? "Animations respect your device’s reduced motion setting." : "Pause or resume decorative animations."}>
        {paused && motionReady ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}<span>{!motionReady ? "Animations" : systemReducedMotion ? "Motion reduced" : paused ? "Resume animations" : "Pause animations"}</span>
      </button>
      <button type="button" className="portfolio-theme" onClick={changeTheme} disabled={!mounted} aria-disabled={changingTheme} aria-busy={changingTheme} aria-label={`Switch to ${dark ? "day" : "night"} mode`}>{dark ? <Sun size={17} /> : <Moon size={17} />}<span>{dark ? "Day" : "Night"}</span></button>
    </div>
    <nav className="portfolio-dock" aria-label="Main navigation"><div className="portfolio-dock-links">{links.map(({name,id}) => <MagneticLink key={id} id={id} name={name} active={active === id} onSelect={() => setActive(id)} reduceMotion={reduceMotion} />)}</div><a className="portfolio-dock-resume" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={14} aria-hidden="true" /></a></nav>
  </header>
}
