"use client"

import { useRef, type PointerEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, FolderOpen } from "lucide-react"
import { caseStudies, type CaseStudy } from "@/lib/case-studies"
import { CaseStudyVisual } from "./case-study-visual"
import { useMotionPreferences } from "./motion-preferences"
import "./selected-work.css"

type RowProps = { study: CaseStudy; wide: boolean }

function SelectedRow({ study, wide }: RowProps) {
  const row = useRef<HTMLElement>(null)
  const { paused } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: row, offset: ["start end", "start 32%"] })
  const lift = useTransform(scrollYProgress, [0, 1], [46, 0])
  const fade = useTransform(scrollYProgress, [0, .75], [.25, 1])
  const visualY = useTransform(scrollYProgress, [0, 1], [34, -16])
  const visualRotate = useTransform(scrollYProgress, [0, 1], [wide ? .8 : .5, 0])
  const [first, second] = study.evidence

  // The spotlight is written straight to CSS custom properties, so no React render is involved.
  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (paused || event.pointerType !== "mouse") return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--spot-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    event.currentTarget.style.setProperty("--spot-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }

  return (
    <motion.article
      ref={row}
      className={`selected-work-row${wide ? " is-wide" : ""}`}
      style={paused ? undefined : { y: lift, opacity: fade }}
      onPointerMove={trackPointer}
      data-spotlight
    >
      <div className="selected-work-content">
        <span className="selected-work-category">{study.eyebrow}</span>
        <h3><Link href={`/work/${study.slug}`}>{study.title}</Link></h3>
        <p className="selected-work-role">{study.role}{study.period ? ` · ${study.period}` : ""}</p>
        <p className="selected-work-summary">{study.summary}</p>
        <dl className="selected-work-evidence">
          {[first, second].filter(Boolean).map(item => <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}
        </dl>
        <ul className="selected-work-flow" aria-label="Documented system layers">
          {study.architecture.map((layer, index) => (
            <li key={layer.label}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{layer.label}
            </li>
          ))}
        </ul>
        <Link className="selected-work-read" href={`/work/${study.slug}`}>Read the case study <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
      <motion.div className="selected-work-visual-wrap" style={paused ? undefined : { y: visualY, rotate: visualRotate }}>
        <Link className="selected-work-visual" href={`/work/${study.slug}`} aria-label={`Read the ${study.organization} case study`}>
          {study.image ? <figure className="selected-work-screenshot"><div><Image src={study.image.src} alt={study.image.alt} width={study.image.width ?? 1600} height={study.image.height ?? 1000} sizes="(max-width: 700px) 90vw, 550px" /></div><figcaption>{study.image.caption}</figcaption></figure> : <CaseStudyVisual study={study} compact />}
        </Link>
      </motion.div>
    </motion.article>
  )
}

export function SelectedWork() {
  return (
    <section id="selected-work" className="portfolio-section selected-work" aria-labelledby="selected-work-heading">
      <div className="section-inner">
        <header className="selected-work-header">
          <div>
            <p className="section-label"><FolderOpen size={18} aria-hidden="true" /> SELECTED CASE STUDIES</p>
            <h2 id="selected-work-heading" className="section-heading">Behind <span className="highlight">the build.</span></h2>
          </div>
          <p className="section-copy">What I built, how it works, and the decisions behind it. A closer look at three projects.</p>
        </header>

        <div className="selected-work-list">
          {caseStudies.map((study, index) => <SelectedRow key={study.slug} study={study} wide={index === 0} />)}
        </div>
        <a className="selected-work-more" href="#projects">There&apos;s more in the project box <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  )
}
