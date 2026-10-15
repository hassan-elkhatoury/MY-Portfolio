"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Moon, Sun, ArrowUpRight } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import "./floating-nav.css"

const links = [{name: "Home", id: "home"}, {name: "Journey", id: "journey"}, {name: "Work", id: "projects"}, {name: "About", id: "about"}, {name: "Contact", id: "contact"}]

export function FloatingNav() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState("home")
  const themeTransition = useRef(false)
  const [changingTheme, setChangingTheme] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id) }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 })
    links.forEach(({id}) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  const dark = mounted && resolvedTheme === "dark"
  async function changeTheme(event: MouseEvent<HTMLButtonElement>) {
    if (!mounted || themeTransition.current) return
    const nextTheme = dark ? "light" : "dark"
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
    <a className="portfolio-avatar" href="#home" aria-label={`${profile.name}, back to top`}><img src="/images/hasan-portrait.png" width="34" height="34" alt={profile.name} /></a>
    <div className="portfolio-header-controls"><span className="portfolio-location"><span aria-hidden="true" />Based in {profile.location.split(",")[0]}</span><button className="portfolio-theme" onClick={changeTheme} disabled={!mounted} aria-disabled={changingTheme} aria-busy={changingTheme} aria-label={`Switch to ${dark ? "day" : "night"} mode`}>{dark ? <Sun size={17} /> : <Moon size={17} />}<span>{dark ? "Day" : "Night"}</span></button></div>
    <nav className="portfolio-dock" aria-label="Main navigation">{links.map(({name,id}) => <a key={id} aria-label={name} className={`portfolio-dock-link ${active === id ? "is-active" : ""} ${id === "about" ? "dock-about" : ""}`} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)}>{id === "home" && <img src="/images/hasan-portrait.png" width="22" height="22" alt="" />}<span>{name}</span></a>)}<a className="portfolio-dock-resume" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={14} /></a></nav>
  </header>
}
