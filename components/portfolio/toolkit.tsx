"use client"

import { useId, useRef, useState, type RefObject } from "react"
import Link from "next/link"
import { AnimatePresence, motion, type PanInfo } from "framer-motion"
import { ArrowDown, ArrowUpRight, Box, RotateCcw, Wrench } from "lucide-react"
import { skillGroups } from "@/lib/portfolio-data"
import { skillEvidence } from "@/lib/skill-evidence"
import { useMotionPreferences } from "./motion-preferences"
import "./toolkit-workbench.css"

type DragEvent = MouseEvent | TouchEvent | PointerEvent
function inside(event: DragEvent, info: PanInfo, box: HTMLDivElement | null) {
  if (!box) return false
  const p = "clientX" in event ? { x: event.clientX, y: event.clientY } : "changedTouches" in event && event.changedTouches[0] ? { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY } : info.point
  const r = box.getBoundingClientRect()
  return p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom
}
function SkillToken({ name, index, focused, stage, drop, select, store, over }: { name: string; index: number; focused: boolean; stage: RefObject<HTMLDivElement | null>; drop: RefObject<HTMLDivElement | null>; select: () => void; store: () => void; over: (value: boolean) => void }) {
  const { paused } = useMotionPreferences()
  const dragged = useRef(false)
  const [dragging, setDragging] = useState(false)
  return <motion.div className={`tool-tile${focused ? " is-focused" : ""}`} style={{ zIndex: dragging ? 20 : focused ? 4 : 1 }} layout initial={paused ? false : { y: 100, opacity: 0, scale: .65, rotateX: 25 }} animate={{ y: focused && !paused ? -8 : 0, opacity: 1, scale: focused ? 1.025 : 1, rotateX: 0 }} exit={{ y: 100, opacity: 0, scale: .5 }} transition={{ duration: paused ? 0 : .4, delay: paused ? 0 : index * .025, ease: [.22, 1, .36, 1] }}>
    <motion.button type="button" className="tool-object" drag dragConstraints={stage} dragElastic={.08} dragSnapToOrigin dragMomentum={false}
      whileDrag={{ scale: 1.09, rotate: -4, zIndex: 12, boxShadow: "0 20px 35px #13233733" }} whileHover={paused ? undefined : { y: -4 }}
      onDragStart={() => { dragged.current = true; setDragging(true) }} onDrag={(event, info) => over(inside(event, info, drop.current))}
      onDragEnd={(event, info) => { if (inside(event, info, drop.current)) store(); over(false); setDragging(false) }} onPointerDown={() => { dragged.current = false }} onClick={event => { if (!dragged.current || event.detail === 0) select() }}
      aria-pressed={focused} aria-label={`Explore ${name}`} aria-describedby="tool-drag-help">
      <span className="tool-object-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="tool-object-name">{name}</span><span className="tool-object-mark" aria-hidden="true">↗</span>
    </motion.button>
    <button type="button" className="tool-store" onClick={store} aria-label={`Put ${name} in the box`}><ArrowDown size={12} /> Store</button>
  </motion.div>
}

const labels = ["Languages", "Backend", "Databases", "Tools", "Fundamentals", "Frontend", "AI / ML"]
export function Toolkit() {
  const id = useId()
  const { paused } = useMotionPreferences()
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [stored, setStored] = useState<string[]>([])
  const [dropOver, setDropOver] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const stage = useRef<HTMLDivElement>(null), drop = useRef<HTMLDivElement>(null), toggle = useRef<HTMLButtonElement>(null)
  const evidence = selected ? skillEvidence(selected, group) : null
  const skills = skillGroups[group].skills.filter(skill => !stored.includes(skill))
  function store(name: string) {
    toggle.current?.focus({ preventScroll: true })
    setStored(current => current.includes(name) ? current : [...current, name])
    if (selected === name) setSelected(null)
    setAnnouncement(`${name} is inside the box. Use Retrieve to bring it back.`)
  }
  function close() { setOpen(false); setGroup(0); setSelected(null); setDropOver(false); setStored([]); setAnnouncement("Toolkit closed and reset."); toggle.current?.focus({ preventScroll: true }) }
  return <section id="skills" className="portfolio-section portfolio-toolkit" aria-labelledby="toolkit-heading">
    <div className="section-inner">
      <p className="section-label"><Wrench size={18} aria-hidden="true" /> MY EVERYDAY ESSENTIALS</p>
      <h2 id="toolkit-heading" className="section-heading">Good tools.<br /><span className="highlight">Better questions.</span></h2>
      <p className="section-copy">A small collection of the languages, systems, and ideas I build with.</p>
      <noscript>{skillGroups.map(item => <section key={item.title}><h3>{item.title}</h3><p>{item.skills.join(" · ")}</p></section>)}</noscript>
      <div className={`tool-workbench${open ? " is-open" : ""}${dropOver ? " is-drop-target" : ""}`} ref={stage} data-state={open ? "open" : "closed"}>
        <AnimatePresence>{open && <motion.div key="inventory" className="tool-inventory" id={`${id}-inventory`} initial={paused ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : .25 }}>
          <div role="tablist" aria-label="Skill categories" className="tool-category-tabs">
            {skillGroups.map((item, index) => <button key={item.title} role="tab" type="button" id={`${id}-tab-${index}`} aria-controls={`${id}-tools`} aria-selected={group === index} tabIndex={group === index ? 0 : -1}
              onClick={() => { setGroup(index); setSelected(null) }} onKeyDown={event => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
                event.preventDefault()
                const next = event.key === "Home" ? 0 : event.key === "End" ? skillGroups.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + skillGroups.length) % skillGroups.length
                setGroup(next); setSelected(null); document.getElementById(`${id}-tab-${next}`)?.focus()
              }}>{labels[index]}<small>{item.skills.length}</small></button>)}
          </div>
          <p id="tool-drag-help" className="tool-help">Pick a tool to explore it. Drag it into the box, or use its Store button.</p>
          <div role="tabpanel" id={`${id}-tools`} aria-labelledby={`${id}-tab-${group}`} className="tool-grid">
            <AnimatePresence mode="popLayout">{skills.map((name, index) => <SkillToken key={`${group}-${name}`} name={name} index={index} focused={selected === name} stage={stage} drop={drop} select={() => setSelected(name)} store={() => store(name)} over={setDropOver} />)}</AnimatePresence>
            {!skills.length && <p className="tool-empty">These tools are packed. Retrieve one below to keep exploring.</p>}
          </div>
        </motion.div>}</AnimatePresence>
        <div ref={drop} className="tool-drop-zone" aria-label={open ? "Drop skills here to store them" : "Closed skills box"}>
          <div className="tool-physical-box" aria-hidden="true"><span className="tool-box-inside" />
            <motion.span className="tool-box-flap tool-box-flap-back" initial={false} animate={{ rotateX: open ? -120 : 0 }} transition={{ duration: paused ? 0 : .6, delay: open ? 0 : .2 }} />
            <motion.span className="tool-box-flap tool-box-flap-front" initial={false} animate={{ rotateX: open ? 120 : 0 }} transition={{ duration: paused ? 0 : .6, delay: open ? .08 : .3 }} />
            <span className="tool-box-face"><small>HANDLE WITH</small><strong>CURIOSITY.</strong><i>H / E</i></span><span className="tool-box-side" />
          </div>
          <button ref={toggle} type="button" className="tool-box-toggle" aria-expanded={open} aria-controls={`${id}-inventory`} onClick={() => { if (open) close(); else { setOpen(true); setAnnouncement("Toolkit opened. Choose a category or a skill.") } }}><Box size={17} /> {open ? "Close & reset toolkit" : "Click to explore my toolkit"}</button>
          {open && <p className="tool-drop-hint">{dropOver ? "Release to put it inside" : `${stored.length} ${stored.length === 1 ? "tool" : "tools"} inside · drop here`}</p>}
        </div>
        {open && stored.length > 0 && <div className="tool-retrieval" aria-label="Tools inside the box"><span>INSIDE THE BOX</span><div>{stored.map(name => <button type="button" key={name} onClick={() => { setStored(current => current.filter(item => item !== name)); setAnnouncement(`${name} retrieved.`) }} aria-label={`Retrieve ${name}`}>{name} <RotateCcw size={13} /></button>)}</div><button type="button" className="text-link" onClick={() => { setStored([]); setAnnouncement("All tools retrieved.") }}>Retrieve all</button></div>}
      </div>
      <AnimatePresence mode="wait">{open && selected && evidence && <motion.aside key={selected} className="tool-information" initial={paused ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : .25 }} aria-label={`${selected} details`}>
        <div><p>{skillGroups[group].title}</p><h3>{selected}</h3><button type="button" className="text-link" onClick={() => store(selected)}>Put back in the box <ArrowDown size={14} /></button></div>
        <div><p>{evidence.description}</p><p className="tool-related-label">RELATED CONCEPTS</p><ul className="tool-concepts">{evidence.concepts.map(concept => <li key={concept}>{concept}</li>)}</ul>
          {evidence.related.length > 0 ? <><p className="tool-related-label">DOCUMENTED IN</p><ul className="tool-project-links">{evidence.related.map(project => <li key={project.href}><Link href={project.href}>{project.title}<ArrowUpRight size={15} /></Link></li>)}</ul></> : <Link href="#certifications" className="text-link">Explore my learning & credentials <ArrowUpRight size={14} /></Link>}
        </div>
      </motion.aside>}</AnimatePresence>
      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    </div>
  </section>
}
