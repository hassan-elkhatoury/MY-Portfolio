"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useClientReady } from "@/hooks/use-client-ready"
import { useMotionPreferences } from "./motion-preferences"
import "./theme-toggle.css"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useClientReady()
  const { paused } = useMotionPreferences()
  const [switching, setSwitching] = useState(false)
  const cleanup = useRef<(() => void) | null>(null)
  const alive = useRef(false)
  const dark = mounted && resolvedTheme === "dark"

  useEffect(() => {
    alive.current = true
    return () => { alive.current = false; cleanup.current?.() }
  }, [])
  useEffect(() => {
    if (paused && cleanup.current) {
      cleanup.current()
    }
  }, [paused])

  async function changeTheme(event: MouseEvent<HTMLButtonElement>) {
    if (cleanup.current) return
    const next = dark ? "light" : "dark"
    if (paused || typeof document.startViewTransition !== "function" || !("registerProperty" in CSS)) {
      setTheme(next)
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const root = document.documentElement
    const feather = Math.min(180, Math.max(80, innerWidth * .1))
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + feather + 8
    root.style.setProperty("--theme-origin-x", `${x}px`)
    root.style.setProperty("--theme-origin-y", `${y}px`)
    root.style.setProperty("--theme-reveal-end", `${radius}px`)
    root.style.setProperty("--theme-feather", `${feather}px`)
    root.dataset.themeReveal = "true"
    setSwitching(true)

    let transition: ViewTransition | undefined
    const skip = () => transition?.skipTransition()
    // Lock synchronously so repeated clicks cannot start overlapping snapshots.
    cleanup.current = skip
    window.addEventListener("resize", skip, { once: true })
    window.addEventListener("pagehide", skip, { once: true })
    try {
      // next-themes changes the root class outside a React transition boundary.
      // Capture the actual old/new pages, then feather the new snapshot in CSS.
      transition = document.startViewTransition(async () => {
        flushSync(() => setTheme(next))
        // Allow theme-dependent canvases to draw before capturing the new page.
        await new Promise<void>(resolve => {
          let frame = 0
          const timeout = window.setTimeout(() => { cancelAnimationFrame(frame); resolve() }, 100)
          frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => { clearTimeout(timeout); resolve() })
          })
        })
      })
      await Promise.all([transition.ready, transition.finished])
    } catch {
      // A hidden tab or resize may skip the animation; the theme still changes.
      if (transition) await transition.updateCallbackDone.catch(() => setTheme(next))
      else setTheme(next)
    } finally {
      window.removeEventListener("resize", skip)
      window.removeEventListener("pagehide", skip)
      delete root.dataset.themeReveal
      for (const name of ["--theme-origin-x", "--theme-origin-y", "--theme-reveal-end", "--theme-feather"]) root.style.removeProperty(name)
      cleanup.current = null
      if (alive.current) setSwitching(false)
    }
  }

  return <button type="button" className="portfolio-theme" onClick={changeTheme} disabled={!mounted} aria-disabled={switching} aria-busy={switching} aria-label={`Switch to ${dark ? "day" : "night"} mode`}>
    {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}<span>{dark ? "Day" : "Night"}</span>
  </button>
}
