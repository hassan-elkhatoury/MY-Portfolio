"use client"

import { useCallback, useId, useRef, useState, type CSSProperties, type RefObject } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { AnimatePresence, motion, useInView, type PanInfo } from "framer-motion"
import { ArrowDown, ArrowUpRight, Box, RotateCcw, Wrench, X } from "lucide-react"
import { skillGroups } from "@/lib/portfolio-data"
import { skillEvidence } from "@/lib/skill-evidence"
import { featuredSkills, skillAppearance, skillSlot, type SkillSlot } from "@/lib/toolkit-skills"
import { useMotionPreferences } from "./motion-preferences"
import { ToolkitSkillIcon } from "./toolkit-skill-icon"
import "./toolkit-workbench.css"

const ToolkitBoxScene = dynamic(() => import("./toolkit-box-scene"), { ssr: false })

type DragEvent = MouseEvent | TouchEvent | PointerEvent
function inside(event: DragEvent, info: PanInfo, box: HTMLDivElement | null) {
  if (!box) return false
  const p = "clientX" in event ? { x: event.clientX, y: event.clientY } : "changedTouches" in event && event.changedTouches[0] ? { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY } : info.point
  const r = box.getBoundingClientRect()
  return p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom
}
function SkillToken({ name, index, focused, muted, slot, stage, drop, select, store, over }: { name: string; index: number; focused: boolean; muted: boolean; slot: SkillSlot; stage: RefObject<HTMLDivElement | null>; drop: RefObject<HTMLDivElement | null>; select: () => void; store: () => void; over: (value: boolean) => void }) {
  const { paused } = useMotionPreferences()
  const dragged = useRef(false)
  const [dragging, setDragging] = useState(false)
  const appearance = skillAppearance(name, index)
  const style = { "--tile-x": `${slot.x}%`, "--tile-y": `${slot.y}%`, "--tile-tilt": `${slot.tilt}deg`, zIndex: dragging ? 20 : focused ? 5 : 3 } as CSSProperties
  return <motion.div className={`tool-tile-anchor${focused ? " is-focused" : ""}${muted ? " is-muted" : ""}${dragging ? " is-dragging" : ""}`} style={style} initial={paused ? false : { y: 130, opacity: 0, scale: .3 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 80, opacity: 0, scale: .3, transition: { duration: paused ? 0 : .2, delay: 0 } }} transition={{ duration: paused ? 0 : .65, delay: paused ? 0 : index * .045, ease: [.22, 1, .36, 1] }}>
    <div className={`tool-tile tool-tone-${appearance.tone}`}>
    <motion.button type="button" className="tool-object" drag dragConstraints={stage} dragElastic={.08} dragSnapToOrigin dragMomentum={false}
      whileDrag={{ scale: 1.09, rotate: -4, zIndex: 12 }} whileHover={paused ? undefined : { y: -7, scale: 1.035 }}
      onDragStart={() => { dragged.current = true; setDragging(true) }} onDrag={(event, info) => over(inside(event, info, drop.current))}
      onDragEnd={(event, info) => { if (inside(event, info, drop.current)) store(); over(false); setDragging(false) }} onPointerDown={() => { dragged.current = false }} onClick={event => { if (!dragged.current || event.detail === 0) select() }}
      aria-pressed={focused} aria-label={`Explore ${name}`} aria-describedby="tool-drag-help" title={name}>
      <span className="tool-object-logo" aria-hidden="true"><ToolkitSkillIcon name={name} /></span>
      <span className="tool-object-name">{appearance.label}</span>
    </motion.button>
    <button type="button" className="tool-store" onClick={store} aria-label={`Put ${name} in the box`}><ArrowDown size={12} /> Store</button>
    </div>
  </motion.div>
}

const labels = ["Featured", "Languages", "Backend", "Databases", "Tools", "Fundamentals", "Frontend", "AI / ML"]
export function Toolkit() {
  const id = useId()
  const { paused } = useMotionPreferences()
  const { resolvedTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState(-1)
  const [selected, setSelected] = useState<string | null>(null)
  const [stored, setStored] = useState<string[]>([])
  const [dropOver, setDropOver] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const [boxReady, setBoxReady] = useState(false)
  const [boxFailed, setBoxFailed] = useState(false)
  const [boxHovered, setBoxHovered] = useState(false)
  const stage = useRef<HTMLDivElement>(null), drop = useRef<HTMLDivElement>(null), toggle = useRef<HTMLButtonElement>(null), information = useRef<HTMLElement>(null)
  const nearStage = useInView(stage, { once: true, margin: "350px 0px" })
  const stageVisible = useInView(stage, { amount: .1 })
  const sceneReady = useCallback(() => setBoxReady(true), [])
  const sceneFailed = useCallback(() => setBoxFailed(true), [])
  const selectedGroup = selected ? skillGroups.findIndex(item => item.skills.includes(selected)) : 0
  const evidence = selected ? skillEvidence(selected, Math.max(0, selectedGroup)) : null
  const allSkills = group === -1 ? featuredSkills.map(skill => skill.name) : skillGroups[group].skills
  const skills = allSkills.filter(skill => !stored.includes(skill))
  function chooseGroup(next: number) {
    setGroup(next)
    setSelected(null)
    setDropOver(false)
    setAnnouncement(`${labels[next + 1]} tools selected. Pick a logo to explore.`)
  }
  function store(name: string) {
    toggle.current?.focus({ preventScroll: true })
    setStored(current => current.includes(name) ? current : [...current, name])
    if (selected === name) setSelected(null)
    setAnnouncement(`${name} is inside the box. Use Retrieve to bring it back.`)
  }
  function close() { setOpen(false); setGroup(-1); setSelected(null); setDropOver(false); setStored([]); setAnnouncement("Toolkit closed and reset."); toggle.current?.focus({ preventScroll: true }) }
  function toggleBox() {
    setBoxHovered(false)
    if (open) close()
    else { setOpen(true); setAnnouncement("Toolkit opened. Explore the floating logo tiles or choose a category.") }
  }
  return <section id="skills" className="portfolio-section portfolio-toolkit" aria-labelledby="toolkit-heading">
    <div className="section-inner">
      <p className="section-label"><Wrench size={18} aria-hidden="true" /> MY EVERYDAY ESSENTIALS</p>
      <h2 id="toolkit-heading" className="section-heading">Good tools. <span className="highlight">Better questions.</span></h2>
      <p className="section-copy">A small collection of the languages, systems, and ideas I build with.</p>
      <noscript>{skillGroups.map(item => <section key={item.title}><h3>{item.title}</h3><p>{item.skills.join(" · ")}</p></section>)}</noscript>
      <div className={`tool-workbench${open ? " is-open" : ""}${dropOver ? " is-drop-target" : ""}${stageVisible ? " is-visible" : ""}`} ref={stage} data-state={open ? "open" : "closed"}>
        {open && <div className="tool-inventory" id={`${id}-inventory`}>
          <div role="tablist" aria-label="Skill categories" className="tool-category-tabs">
            {labels.map((label, index) => <button key={label} role="tab" type="button" id={`${id}-tab-${index}`} aria-controls={`${id}-tools`} aria-selected={group === index - 1} tabIndex={group === index - 1 ? 0 : -1}
              onClick={() => chooseGroup(index - 1)} onKeyDown={event => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
                event.preventDefault()
                const next = event.key === "Home" ? 0 : event.key === "End" ? labels.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + labels.length) % labels.length
                chooseGroup(next - 1); document.getElementById(`${id}-tab-${next}`)?.focus()
              }}>{label}</button>)}
          </div>
          <p id="tool-drag-help" className="tool-help">Pick a logo to explore. Drag a tool into the box, or choose Store.</p>
        </div>}
        <div className={`tool-stage${open ? " is-open" : ""}${group !== -1 && allSkills.length > 10 ? " is-dense" : ""}`}>
          {open && <div className="tool-orbit-decoration" aria-hidden="true"><svg viewBox="0 0 1000 620" preserveAspectRatio="none"><path d="M490 440C240 310 260 65 130 200M510 440C870 450 900 210 860 185M500 440C570 260 450 180 500 85M480 440C240 470 110 250 80 390M520 440C740 580 790 340 930 405" /></svg><span className="tool-symbol tool-symbol-code">&lt;/&gt;</span><span className="tool-symbol tool-symbol-terminal">&gt;_</span><span className="tool-symbol tool-symbol-braces">&#123; &#125;</span><span className="tool-interior-light" /></div>}
          <div role={open ? "tabpanel" : undefined} id={`${id}-tools`} aria-labelledby={open ? `${id}-tab-${group + 1}` : undefined} className="tool-panel">
            <AnimatePresence mode="wait">
              {open && <motion.div className="tool-grid" key={group} initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : .18 }}>
                <AnimatePresence>{skills.map(name => {
                  const index = allSkills.indexOf(name)
                  return <SkillToken key={name} name={name} index={index} slot={skillSlot(name, index, allSkills.length, group === -1)} focused={selected === name} muted={selected !== null && selected !== name} stage={stage} drop={drop} select={() => { setSelected(current => current === name ? null : name); setAnnouncement(`${name} selected. Details are below the toolkit.`) }} store={() => store(name)} over={setDropOver} />
                })}</AnimatePresence>
                {!skills.length && <p className="tool-empty">These tools are packed. Retrieve one below to keep exploring.</p>}
              </motion.div>}
            </AnimatePresence>
          </div>
        <div className="tool-drop-zone">
          <div className="tool-box-presentation" ref={drop} aria-label={open ? "Drop skills here to store them" : "Closed skills box"}>
            <div className={`tool-box-render${boxReady && !boxFailed ? " is-ready" : ""}`} aria-hidden="true">
              <div className="tool-box-fallback"><span className="tool-box-fallback-top" /><span className="tool-box-fallback-front"><strong>MY<br />SKILLS</strong><small>TOOLS · TECHNOLOGIES<br />THINGS I USE</small></span><span className="tool-box-fallback-side" /></div>
              {nearStage && !boxFailed && <ToolkitBoxScene open={open} dark={resolvedTheme === "dark"} paused={paused} hovered={boxHovered} onReady={sceneReady} onError={sceneFailed} />}
            </div>
            <button type="button" className="tool-box-hitarea" aria-label={open ? "Close skills box" : "Open skills box"} aria-expanded={open} aria-controls={`${id}-inventory`} onClick={toggleBox}
              onPointerEnter={event => { if (event.pointerType === "mouse") setBoxHovered(true) }} onPointerLeave={() => setBoxHovered(false)} onFocus={() => setBoxHovered(true)} onBlur={() => setBoxHovered(false)} />
          </div>
          <button ref={toggle} type="button" className="tool-box-toggle" aria-expanded={open} aria-controls={`${id}-inventory`} onClick={toggleBox}><span className="tool-invitation-cue" aria-hidden="true"><Box size={17} /></span> {open ? "Close & reset toolkit" : "Click to explore my toolkit"}</button>
          {!open && <p className="tool-box-caption">A few good tools. Endless possibilities.</p>}
          {open && <p className="tool-drop-hint">{dropOver ? "Release to put it inside" : `${stored.length} ${stored.length === 1 ? "tool" : "tools"} inside · drop here`}</p>}
        </div>
        </div>
        {open && stored.length > 0 && <div className="tool-retrieval" aria-label="Tools inside the box"><span>INSIDE THE BOX</span><div>{stored.map(name => <button type="button" key={name} onClick={() => { setStored(current => current.filter(item => item !== name)); setAnnouncement(`${name} retrieved.`) }} aria-label={`Retrieve ${name}`}>{name} <RotateCcw size={13} /></button>)}</div><button type="button" className="text-link" onClick={() => { setStored([]); setAnnouncement("All tools retrieved.") }}>Retrieve all</button></div>}
      </div>
      <AnimatePresence mode="wait">{open && selected && evidence && <motion.aside ref={information} key={selected} className="tool-information" initial={paused ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : .25 }} aria-label={`${selected} details`}>
        <button type="button" className="tool-detail-close" aria-label="Close skill details" onClick={() => setSelected(null)}><X size={18} /></button>
        <div><span className="tool-detail-logo" aria-hidden="true"><ToolkitSkillIcon name={selected} /></span><p>{skillGroups[Math.max(0, selectedGroup)].title}</p><h3>{selected}</h3><button type="button" className="text-link" onClick={() => store(selected)}>Put back in the box <ArrowDown size={14} /></button></div>
        <div><p>{evidence.description}</p><p className="tool-related-label">RELATED CONCEPTS</p><ul className="tool-concepts">{evidence.concepts.map(concept => <li key={concept}>{concept}</li>)}</ul>
          {evidence.related.length > 0 ? <><p className="tool-related-label">DOCUMENTED IN</p><ul className="tool-project-links">{evidence.related.map(project => <li key={project.href}><Link href={project.href}>{project.title}<ArrowUpRight size={15} /></Link></li>)}</ul></> : <Link href="#certifications" className="text-link">Explore my learning & credentials <ArrowUpRight size={14} /></Link>}
        </div>
      </motion.aside>}</AnimatePresence>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    </div>
  </section>
}
