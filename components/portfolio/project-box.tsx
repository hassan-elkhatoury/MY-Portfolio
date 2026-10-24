"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Github, X, PackageOpen } from "lucide-react"
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

  const selectedIndex = selected ? projects.indexOf(selected) : -1

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
                style={{ "--project-accent": covers[selectedIndex]?.color ?? "var(--coral)" } as CSSProperties}
                initial={paused ? false : { ...origin, rotateX: 8, borderRadius: 8 }}
                animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1, rotateX: 0, borderRadius: 24 }}
                exit={paused ? { opacity: 0 } : { ...origin, rotateX: 8, opacity: 0, borderRadius: 8 }}
                transition={paused ? { duration: 0 } : { type: "spring", stiffness: 165, damping: 28, mass: .85 }}
                onAnimationComplete={() => { if (open) setPhase("detail") }}>
                <header className="work-dialog-head">
                  <div className="project-detail-identity">
                    <span className="project-detail-number" aria-hidden="true">{String(selectedIndex + 1).padStart(2, "0")}</span>
                    <div><span className="work-dialog-label">THE PROJECT ARCHIVE</span><span className="project-detail-category">{selected.category}</span></div>
                  </div>
                  <Dialog.Close className="work-dialog-close" aria-label="Close project"><X size={20} aria-hidden="true" /></Dialog.Close>
                </header>
                <ScrollArea.Root className="project-detail-scroll" type="auto">
                  <ScrollArea.Viewport className="project-detail-viewport" tabIndex={0} role="region" aria-label={`${selected.title} project details`}>
                    <div className="project-detail-body">
                      <div className="project-detail-intro">
                        <Dialog.Title className="work-dialog-title">{selected.title}</Dialog.Title>
                        <Dialog.Description className="work-dialog-description">{selected.description}</Dialog.Description>
                      </div>
                      <motion.div initial={paused ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : .35, delay: paused ? 0 : .18 }}>
                        <ProjectPresentation project={selected} />
                      </motion.div>
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar orientation="vertical" className="project-detail-scrollbar">
                    <ScrollArea.Thumb className="project-detail-thumb" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
                <footer className="project-detail-footer">
                  <span className="project-detail-file">PROJECT {String(selectedIndex + 1).padStart(2, "0")} <span>/ {String(projects.length).padStart(2, "0")}</span></span>
                  <div className="project-detail-actions">
                    {selected.githubUrl && <a className="project-detail-source" href={selected.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /><span>Source code</span><ArrowUpRight size={14} aria-hidden="true" /></a>}
                    <Link className="project-detail-primary" href={`/projects/${projectSlug(selected.title)}`}>View full project <ArrowUpRight size={17} aria-hidden="true" /></Link>
                  </div>
                </footer>
              </motion.article>
            </Dialog.Content>
          </div>
        </Dialog.Portal>}
      </AnimatePresence>
    </Dialog.Root>
  </section>
}
