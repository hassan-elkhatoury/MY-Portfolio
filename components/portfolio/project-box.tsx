"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, X, PackageOpen } from "lucide-react"
import { projects, type Project } from "@/lib/portfolio-data"
import { getProject, projectSlug } from "@/lib/project-presentation"
import { ProjectCrate, type ProjectCardBounds } from "./project-crate"
import { ProjectPresentation } from "./project-presentation"
import { covers } from "./project-covers"
import { useMotionPreferences } from "./motion-preferences"
import "./project-box.css"

export function ProjectBox() {
  const { paused } = useMotionPreferences()
  const [active, setActive] = useState<number | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState("idle")
  const [origin, setOrigin] = useState({ x: 0, y: 0, scaleX: .8, scaleY: .8 })
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const restoreFocus = useRef(false)

  useEffect(() => {
    const sync = () => {
      const slug = window.location.hash.startsWith("#project/") ? window.location.hash.slice(9) : ""
      const project = getProject(slug)
      if (project) {
        if (!lastTrigger.current) lastTrigger.current = document.querySelectorAll<HTMLButtonElement>(".work-index-row")[projects.indexOf(project)] ?? null
        restoreFocus.current = true
        setSelected(project); setOpen(true); setPhase("detail")
      }
      else { setOpen(false); setPhase("idle") }
    }
    sync()
    if (window.location.hash.startsWith("#project/")) document.getElementById("projects")?.scrollIntoView({ behavior: "instant" })
    window.addEventListener("popstate", sync)
    window.addEventListener("hashchange", sync)
    return () => { window.removeEventListener("popstate", sync); window.removeEventListener("hashchange", sync) }
  }, [])

  const openProject = useCallback((project: Project, trigger: HTMLButtonElement, cardBounds?: ProjectCardBounds) => {
    if (open || phase === "returning") return
    const bounds = cardBounds ?? trigger.getBoundingClientRect()
    setOrigin({ x: bounds.x + bounds.width / 2 - window.innerWidth / 2, y: bounds.y + bounds.height / 2 - window.innerHeight / 2, scaleX: bounds.width / Math.min(980, window.innerWidth - 32), scaleY: bounds.height / Math.min(850, window.innerHeight - 48) })
    lastTrigger.current = trigger
    restoreFocus.current = true
    window.history.pushState({ ...window.history.state, portfolioProject: true }, "", `#project/${projectSlug(project.title)}`)
    setSelected(project); setOpen(true); setPhase("selecting")
  }, [open, phase])

  function closeProject() {
    setPhase("returning"); setOpen(false)
    if (window.history.state?.portfolioProject) window.history.back()
    else window.history.replaceState(window.history.state, "", "#projects")
  }

  return <section id="projects" className="portfolio-section work-section" aria-labelledby="work-heading" data-project-state={phase}>
    <div className="section-inner">
      <div className="work-intro">
        <p className="section-label"><PackageOpen size={18} aria-hidden="true" /> THE THINGS I BUILD</p>
        <h2 id="work-heading" className="section-heading">A box of <span className="highlight">good work.</span></h2>
        <p className="section-copy">Eight projects. Pull up a card and look inside.</p>
      </div>
      <noscript><ul>{projects.map(project => <li key={project.title}><Link href={`/projects/${projectSlug(project.title)}`}>{project.title}</Link><p>{project.description}</p></li>)}</ul></noscript>
      <ProjectCrate active={active} selected={selected} onActive={setActive} onSelect={openProject} />
      <div className="work-index" aria-label="All projects" style={{ "--project-count": 4 } as CSSProperties}>
        {projects.map((project, index) => <button type="button" key={project.title} id={`archive-project-${index}`} className="work-index-row"
          style={{ "--project-color": covers[index].color } as CSSProperties}
          onClick={event => openProject(project, event.currentTarget)} onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)} onFocus={() => setActive(index)} onBlur={() => setActive(null)}
          aria-haspopup="dialog" aria-label={`Explore ${project.title}`} title={project.title}>
          <span className="work-index-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="work-index-name">{project.title.startsWith("Gestion") ? "E-service" : project.title.startsWith("MODEYA") ? "MODEYA" : project.title}</span>
          <span className="work-index-category">{project.category}</span><ArrowUpRight className="work-index-arrow" size={20} aria-hidden="true" />
        </button>)}
      </div>
    </div>
    <Dialog.Root open={open} onOpenChange={value => { if (!value) closeProject() }}>
      <AnimatePresence onExitComplete={() => {
        setSelected(null); setPhase("idle")
        if (restoreFocus.current) lastTrigger.current?.focus({ preventScroll: true })
      }}>
        {open && selected && <Dialog.Portal forceMount key="project-presentation">
          <Dialog.Overlay forceMount asChild><motion.div className="project-detail-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : .35 }} /></Dialog.Overlay>
          <div className="project-detail-position">
            <Dialog.Content forceMount asChild onCloseAutoFocus={event => event.preventDefault()}>
              <motion.article className="project-detail-sheet"
                initial={paused ? false : { ...origin, rotateX: 8, borderRadius: 8 }}
                animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotateX: 0, borderRadius: 12 }}
                exit={paused ? { opacity: 0 } : { ...origin, rotateX: 8, opacity: 0, borderRadius: 8 }}
                transition={paused ? { duration: 0 } : { type: "spring", stiffness: 165, damping: 28, mass: .85 }}
                onAnimationComplete={() => { if (open) setPhase("detail") }}>
                <div className="work-dialog-head"><span className="work-dialog-label">PROJECT ARCHIVE / {selected.category}</span><Dialog.Close className="work-dialog-close" aria-label="Close project"><X size={21} /></Dialog.Close></div>
                <Dialog.Title className="work-dialog-title">{selected.title}</Dialog.Title>
                <Dialog.Description className="work-dialog-description">{selected.description}</Dialog.Description>
                <motion.div initial={paused ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : .35, delay: paused ? 0 : .18 }}>
                  <ProjectPresentation project={selected} />
                </motion.div>
              </motion.article>
            </Dialog.Content>
          </div>
        </Dialog.Portal>}
      </AnimatePresence>
    </Dialog.Root>
  </section>
}
