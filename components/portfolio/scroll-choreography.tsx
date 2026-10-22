"use client"

import { useEffect } from "react"
import { useMotionPreferences } from "./motion-preferences"
import "./scroll-choreography.css"

/** Native scrolling owns the timeline. Only visible chapters are sampled, in one frame. */
export function ScrollChoreography() {
  const { paused } = useMotionPreferences()

  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>("#journey, .portfolio-section"))
    if (paused) {
      chapters.forEach(chapter => chapter.style.setProperty("--scene-in", "1"))
      return
    }
    const visible = new Set<HTMLElement>()
    let frame = 0
    const update = () => {
      frame = 0
      const height = window.innerHeight
      // Read every rectangle before writing styles; transforms never affect these section bounds.
      const positions = Array.from(visible).map(chapter => ({ chapter, top: chapter.getBoundingClientRect().top }))
      positions.forEach(({ chapter, top }) => {
        const progress = Math.max(0, Math.min(1, (height - top) / (height * .78)))
        chapter.style.setProperty("--scene-in", String(1 - Math.pow(1 - progress, 3)))
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const chapter = entry.target as HTMLElement
        if (entry.isIntersecting) visible.add(chapter)
        else {
          visible.delete(chapter)
          chapter.style.setProperty("--scene-in", entry.boundingClientRect.top < 0 ? "1" : "0")
        }
      })
      schedule()
    }, { rootMargin: "100px 0px" })
    chapters.forEach(chapter => observer.observe(chapter))
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      chapters.forEach(chapter => chapter.style.removeProperty("--scene-in"))
    }
  }, [paused])

  return null
}
