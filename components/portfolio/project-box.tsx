"use client"

import { useId, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight, X, Github, FileText, ExternalLink, PackageOpen } from "lucide-react"
import { projects, type Project } from "@/lib/portfolio-data"
import { projectCaseStudyPath } from "@/lib/project-case-links"
import "./project-box.css"

const covers = [
  { name: "Interview\nAI", color: "#e76c43", ink: "#fffdf7", motif: "interview", line: "Practice. Learn. Repeat." },
  { name: "Qt\nMessenger", color: "#258dbd", ink: "#fffdf7", motif: "messenger", line: "A little more connected." },
  { name: "Mongo\nShardLab", color: "#db4356", ink: "#fffdf7", motif: "cluster", line: "Made to work together." },
  { name: "CAN 2025\nPredictions", color: "#7661ce", ink: "#fffdf7", motif: "football", line: "The beautiful game, in data." },
  { name: "MODEYA", color: "#bd6785", ink: "#fffdf7", motif: "shop", line: "A storefront, thoughtfully built." },
  { name: "E-commerce", color: "#aa8054", ink: "#fffdf7", motif: "shop", line: "From browse to checkout." },
  { name: "E-service", color: "#429688", ink: "#fffdf7", motif: "assignments", line: "Making room for everyone." },
  { name: "Arabela", color: "#8e526d", ink: "#fffdf7", motif: "shop", line: "Modest fashion, across languages." },
]

function CoverArt({ motif }: { motif: string }) {
  // Small, original illustrations keep the physical project cards crisp at every size.
  return (
    <svg viewBox="0 0 140 105" fill="none" className="work-cover-art" aria-hidden="true">
      {motif === "interview" && <>
        <rect x="19" y="15" width="103" height="68" rx="9" stroke="currentColor" strokeWidth="2.5" />
        <path d="M49 83v12m43-12v12M38 95h65M55 42l-12 9 12 9m29-18 12 9-12 9m-15-23-7 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m110 6 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" fill="currentColor" />
      </>}
      {motif === "messenger" && <>
        <path d="M16 23a10 10 0 0 1 10-10h64a10 10 0 0 1 10 10v37a10 10 0 0 1-10 10H45L27 83V70h-1a10 10 0 0 1-10-10V23Z" fill="currentColor" opacity=".12" />
        <path d="M16 23a10 10 0 0 1 10-10h64a10 10 0 0 1 10 10v37a10 10 0 0 1-10 10H45L27 83V70h-1a10 10 0 0 1-10-10V23Z" stroke="currentColor" strokeWidth="2.5" />
        <path d="M101 42h13a10 10 0 0 1 10 10v25a10 10 0 0 1-10 10h-1v13L96 87H73a10 10 0 0 1-10-10v-7" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="38" cy="42" r="4" fill="currentColor" /><circle cx="58" cy="42" r="4" fill="currentColor" /><circle cx="78" cy="42" r="4" fill="currentColor" />
      </>}
      {motif === "cluster" && <>
        <path d="M70 33v23m-37 6 37-6 37 6" stroke="currentColor" strokeWidth="2.5" />
        {[{ x: 53, y: 6 }, { x: 15, y: 60 }, { x: 54, y: 64 }, { x: 94, y: 60 }].map(({ x, y }) => <g key={`${x}-${y}`}>
          <path d={`M${x} ${y + 8}v22c0 9 33 9 33 0V${y + 8}`} fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="2.2" />
          <ellipse cx={x + 16.5} cy={y + 8} rx="16.5" ry="7" stroke="currentColor" strokeWidth="2.2" />
          <path d={`M${x} ${y + 20}c0 9 33 9 33 0`} stroke="currentColor" strokeWidth="2.2" />
        </g>)}
      </>}
      {motif === "football" && <>
        <circle cx="67" cy="52" r="40" fill="currentColor" opacity=".08" />
        <circle cx="67" cy="52" r="40" stroke="currentColor" strokeWidth="2.5" />
        <path d="m67 35 16 12-6 19H57l-6-19 16-12ZM67 35V12m16 35 22-7M77 66l12 19M57 66 44 85M51 47l-22-7" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="m112 17 9-9m-1 20 11-1M106 8l1-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </>}
      {motif === "shop" && <>
        <path d="M28 29h84l-7 62H35l-7-62Z" fill="currentColor" fillOpacity=".09" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M49 37V24a21 21 0 0 1 42 0v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="m70 49 4 12 13 1-10 8 3 13-10-8-11 8 4-13-10-8 13-1 4-12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </>}
      {motif === "assignments" && <>
        <path d="M30 13h81v82H30V13Z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="2.5" />
        <path d="M45 6v14m19-14v14m19-14v14m19-14v14M30 33h81M61 33v62m25-62v62M30 55h81M30 76h81" stroke="currentColor" strokeWidth="2" />
        <path d="m38 44 5 5 8-9m18 25 5 5 8-9m11-17 5 5 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </>}
    </svg>
  )
}

export function ProjectBox() {
  const boxId = useId().replace(/:/g, "")
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)

  function openProject(project: Project, trigger: HTMLButtonElement) {
    lastTrigger.current = trigger
    setSelected(project)
  }

  return (
    <section id="projects" className="portfolio-section work-section" aria-labelledby="work-heading">
      <div className="section-inner">
        <div className="work-intro">
          <p className="section-label"><PackageOpen size={18} aria-hidden="true" /> THE THINGS I BUILD</p>
          <h2 id="work-heading" className="section-heading">A box of <span className="highlight">good work.</span></h2>
          <p className="section-copy">Pick a card from the box.</p>
        </div>

        <motion.div
          className="work-stage"
          initial={false}
          whileInView={reducedMotion ? undefined : { y: [24, 0], rotate: [-1, 0] }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onPointerLeave={() => setActive(null)}
        >
          <div className="work-box-model">
            <svg className="work-box-shell work-box-shell-back" viewBox="0 0 500 420" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id={`${boxId}-lid`} x1="90" y1="20" x2="450" y2="260" gradientUnits="userSpaceOnUse"><stop stopColor="#f4e3bd" /><stop offset="1" stopColor="#dfc18e" /></linearGradient>
                <linearGradient id={`${boxId}-floor`} x1="80" y1="170" x2="360" y2="350" gradientUnits="userSpaceOnUse"><stop stopColor="#ddbf89" /><stop offset="1" stopColor="#eddbb1" /></linearGradient>
              </defs>
              <path d="M120 7 478 96 442 256 91 166Z" fill={`url(#${boxId}-lid)`} stroke="#c9a571" strokeWidth="3" />
              <path d="M132 26 458 107 428 236 106 155Z" stroke="#b99b6d" strokeOpacity=".62" strokeWidth=".7" strokeDasharray="1 2" />
              <path d="M91 166 442 256 363 337 12 216Z" fill={`url(#${boxId}-floor)`} stroke="#f6e6c4" strokeWidth="2.5" />
              <path d="M91 166 91 185 26 230 12 216Z" fill="#d9ba85" />
              <path d="M91 166 442 256" stroke="#c0a071" strokeWidth="2" />
            </svg>
            <div className="work-card-shelf" aria-label="Project collection">
              {projects.map((project, index) => {
                const cover = covers[index % covers.length]
                const style = {
                  "--card-color": cover.color,
                  "--card-ink": cover.ink,
                  "--card-x": `${62 + index * (250 / Math.max(1, projects.length - 1))}px`,
                  "--card-y": `${110 + index * (80 / Math.max(1, projects.length - 1))}px`,
                  "--card-order": index + 2,
                } as CSSProperties
                return (
                  <button
                    key={project.title}
                    type="button"
                    className={`work-project-card${active === index ? " is-active" : ""}`}
                    style={style}
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(null)}
                    onClick={(event) => openProject(project, event.currentTarget)}
                    aria-label={`Explore ${project.title}`}
                    aria-haspopup="dialog"
                  >
                    <span className="work-card-edition">PROJECT {String(index + 1).padStart(2, "0")} <ArrowUpRight size={15} /></span>
                    <CoverArt motif={cover.motif} />
                    <span className="work-card-title">{cover.name.split("\n").map((line, i) => <span key={i}>{line}</span>)}</span>
                    <span className="work-card-line">{cover.line}</span>
                    <span className="work-card-tech">{project.tech.slice(0, 2).join(" / ")}</span>
                  </button>
                )
              })}
            </div>
            <svg className="work-box-shell work-box-shell-front" viewBox="0 0 500 420" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id={`${boxId}-front`} x1="12" y1="216" x2="367" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#dfc393" /><stop offset="1" stopColor="#caa16b" /></linearGradient>
                <linearGradient id={`${boxId}-side`} x1="360" y1="335" x2="446" y2="264" gradientUnits="userSpaceOnUse"><stop stopColor="#caa16b" /><stop offset="1" stopColor="#e3c796" /></linearGradient>
              </defs>
              <path d="M363 337 442 256 438 308 367 389Z" fill={`url(#${boxId}-side)`} />
              <path d="M12 216 363 337 367 389 16 268Z" fill={`url(#${boxId}-front)`} />
              <path d="M12 216 363 337 442 256" stroke="#fff0ce" strokeWidth="2.5" />
              <path d="M363 337 367 389" stroke="#c39d66" strokeWidth="1" />
              <g transform="matrix(1 .345 .075 1 113 273)"><text className="work-box-emboss-shadow" x="0" y="1">Things I built</text><text className="work-box-emboss" x="0" y="0">Things I built</text></g>
            </svg>
          </div>
          <span className="work-shelf-hint"><ArrowDown size={14} aria-hidden="true" /> Tap a card to take a closer look</span>
        </motion.div>

        <div className="work-index" aria-label="All projects" style={{ "--project-count": Math.min(4, projects.length) } as CSSProperties}>
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.title}
              className="work-index-row"
              style={{ "--project-color": covers[index % covers.length].color } as CSSProperties}
              onClick={(event) => openProject(project, event.currentTarget)}
              onPointerEnter={() => setActive(index)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              aria-haspopup="dialog"
              aria-label={`Explore ${project.title}`}
              title={project.title}
            >
              <span className="work-index-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="work-index-name">{project.title.startsWith("Gestion") ? "E-service" : project.title.startsWith("MODEYA") ? "MODEYA" : project.title}</span>
              <span className="work-index-category">{project.category}</span>
              <ArrowUpRight className="work-index-arrow" size={20} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <Dialog.Portal>
          <Dialog.Overlay className="work-dialog-overlay" />
          <Dialog.Content
            className="work-dialog"
            onCloseAutoFocus={(event) => { event.preventDefault(); lastTrigger.current?.focus() }}
          >
            {selected && <>
              <div className="work-dialog-head">
                <span className="work-dialog-label">FROM THE PROJECT BOX / {selected.category}</span>
                <Dialog.Close className="work-dialog-close" aria-label="Close project"><X size={21} /></Dialog.Close>
              </div>
              <Dialog.Title className="work-dialog-title">{selected.title}</Dialog.Title>
              <Dialog.Description className="work-dialog-description">{selected.description}</Dialog.Description>
              {selected.image && <div className="work-dialog-image"><Image src={selected.image} alt={`${selected.title} project screenshot`} width={1200} height={740} sizes="(max-width: 800px) 90vw, 760px" style={{ width: "100%", height: "auto" }} /></div>}
              <div className="work-dialog-detail">
                <span className="work-dialog-detail-label">BUILT WITH</span>
                <ul className="work-dialog-tech">{selected.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
              </div>
              {(projectCaseStudyPath(selected.title) || selected.githubUrl || selected.demoUrl || selected.reportUrl) && <div className="work-dialog-links">
                {projectCaseStudyPath(selected.title) && <Link href={projectCaseStudyPath(selected.title)!} className="work-project-link"><FileText size={17} aria-hidden="true" /> Read the case study <ArrowUpRight size={17} aria-hidden="true" /></Link>}
                {selected.githubUrl && <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="work-project-link"><Github size={17} /> Explore the code <ArrowUpRight size={17} /></a>}
                {selected.demoUrl && <a href={selected.demoUrl} target="_blank" rel="noopener noreferrer" className="work-project-link work-project-link-secondary"><ExternalLink size={17} /> Live project <ArrowUpRight size={17} /></a>}
                {selected.reportUrl && <a href={selected.reportUrl} target="_blank" rel="noopener noreferrer" className="work-project-link work-project-link-secondary"><FileText size={17} /> Read the report <ArrowUpRight size={17} /></a>}
              </div>}
            </>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
