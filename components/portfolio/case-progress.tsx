"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useMotionPreferences } from "./motion-preferences"
import "./case-progress.css"

const chapters = [
  { id: "case-challenge", label: "Problem" },
  { id: "case-contributions", label: "Contribution" },
  { id: "case-architecture-heading", label: "Architecture" },
  { id: "case-decisions", label: "Decisions" },
  { id: "case-verification", label: "Validation" },
  { id: "case-reflections", label: "Takeaways" },
]

/** Reading line, chapter rail, and a quiet jump list for long case studies. */
export function CaseProgress() {
  const { paused } = useMotionPreferences()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = chapters
      .map(chapter => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (!elements.length) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.1, 0.5] },
    )
    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.span className="case-reading-line" aria-hidden="true" style={{ scaleX: paused ? scrollYProgress : smooth }} />
      <nav className="case-chapter-rail" aria-label="Case study chapters">
        <ol>
          {chapters.map(chapter => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`} className={active === chapter.id ? "is-active" : ""} aria-current={active === chapter.id ? "location" : undefined}>
                <span className="case-rail-dot" aria-hidden="true" />{chapter.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
