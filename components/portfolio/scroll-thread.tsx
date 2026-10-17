"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useMotionPreferences } from "./motion-preferences"
import "./scroll-thread.css"

const stops = [
  { id: "home", label: "Valley" },
  { id: "journey", label: "Journey" },
  { id: "selected-work", label: "Case studies" },
  { id: "projects", label: "Project box" },
  { id: "about", label: "About" },
  { id: "certifications", label: "Credentials" },
  { id: "skills", label: "Toolkit" },
  { id: "contact", label: "Contact" },
]

/** A single thread beside the page: it fills with scroll and names the section in view. */
export function ScrollThread() {
  const { paused } = useMotionPreferences()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = stops
      .map(stop => document.getElementById(stop.id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: [0, 0.08, 0.35, 0.7] },
    )
    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="scroll-thread" aria-label="Page sections and reading progress">
      <span className="scroll-thread-rail" aria-hidden="true">
        <motion.span
          className="scroll-thread-fill"
          style={{ scaleY: paused ? scrollYProgress : smooth }}
        />
      </span>
      <ol>
        {stops.map(stop => (
          <li key={stop.id}>
            <a
              href={`#${stop.id}`}
              className={active === stop.id ? "is-active" : ""}
              aria-current={active === stop.id ? "location" : undefined}
            >
              <span className="scroll-thread-dot" aria-hidden="true" />
              <span className="scroll-thread-label">{stop.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
