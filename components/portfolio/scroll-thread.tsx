"use client"

import { pageSections, useActiveSection } from "@/hooks/use-active-section"
import { motion, useScroll, useSpring } from "framer-motion"
import { useMotionPreferences } from "./motion-preferences"
import "./scroll-thread.css"

const stops = pageSections

/** A single thread beside the page: it fills with scroll and names the section in view. */
export function ScrollThread() {
  const { paused } = useMotionPreferences()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const active = useActiveSection()

  return (
    <nav className="scroll-thread" data-section={active} aria-label="Page sections and reading progress">
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
