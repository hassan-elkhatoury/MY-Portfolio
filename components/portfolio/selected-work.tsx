"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, FolderOpen } from "lucide-react"
import { caseStudies, type CaseStudy } from "@/lib/case-studies"
import { CaseStudyVisual } from "./case-study-visual"
import { useMotionPreferences } from "./motion-preferences"
import "./selected-work.css"

type RowProps = { study: CaseStudy; index: number }

function SelectedRow({ study, index }: RowProps) {
  const row = useRef<HTMLElement>(null)
  const { paused } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: row, offset: ["start end", "start 32%"] })
  // Move the complete row together so its text and visual keep their alignment.
  const lift = useTransform(scrollYProgress, [0, 1], [18, 0])
  const [first, second] = study.evidence

  return (
    <motion.article
      ref={row}
      className="selected-work-row"
      style={paused ? undefined : { y: lift }}
    >
      <div className="selected-work-content">
        <p className="selected-work-category"><span className="selected-work-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{study.eyebrow}</p>
        <h3><Link href={`/work/${study.slug}`}>{study.title}</Link></h3>
        <p className="selected-work-role">{study.role}{study.period ? ` · ${study.period}` : ""}</p>
        <p className="selected-work-summary">{study.summary}</p>
        <dl className="selected-work-evidence">
          {[first, second].filter(Boolean).map(item => <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}
        </dl>
        <Link className="selected-work-read" href={`/work/${study.slug}`}>Read the case study <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
      <div className="selected-work-visual-wrap">
        {study.image ? <Link className="selected-work-visual" href={`/work/${study.slug}`} aria-label={`Read the ${study.organization} case study`}>
          <figure className="selected-work-screenshot"><div><Image src={study.image.src} alt={study.image.alt} width={study.image.width ?? 1600} height={study.image.height ?? 1000} sizes="(max-width: 960px) 90vw, 600px" /></div><figcaption>{study.image.caption}</figcaption></figure>
        </Link> : <CaseStudyVisual study={study} compact />}
        <div className="selected-work-stack">
          <p>Documented system layers</p>
          <ul className="selected-work-flow" aria-label="Documented system layers">
            {study.architecture.map((layer, layerIndex) => (
              <li key={layer.label}><span aria-hidden="true">{String(layerIndex + 1).padStart(2, "0")}</span>{layer.label}</li>
            ))}
          </ul>
        </div>
      </div>
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
          {caseStudies.map((study, index) => <SelectedRow key={study.slug} study={study} index={index} />)}
        </div>
        <a className="selected-work-more" href="#projects">There&apos;s more in the project box <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  )
}
