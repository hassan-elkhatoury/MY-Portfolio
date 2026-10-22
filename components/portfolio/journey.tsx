"use client"

import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { ArrowDown, ArrowLeft, ArrowRight, Building2, MapPin, Compass, Maximize2, LocateFixed } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { certifications, education, experiences } from "@/lib/portfolio-data"
import { useMotionPreferences } from "./motion-preferences"
import { JourneyTerrain } from "./journey-terrain"
import "./journey.css"

const codsoft = experiences.find(item => item.company.toLowerCase().includes("codsoft"))
const modeya = experiences.find(item => item.company.toLowerCase().includes("modeya"))
const mef = experiences.find(item => item.company.toLowerCase().includes("mef"))

const stops = [
  {
    year: "2022", period: "2022", label: "The beginning", title: "A foundation in curiosity.",
    organization: education[1].institution, location: education[1].location,
    description: education[1].degree,
    details: ["ENSAH — " + education[0].details![1], "Started the Engineering Degree in Computer Science at ENSAH."],
    logo: undefined, x: 230, y: 610,
  },
  {
    year: "2024", period: "2024 – 2027", label: "Engineering cycle", title: "Going deeper into systems.",
    organization: education[0].institution, location: education[0].location,
    description: education[0].details![0], details: education[0].focus!,
    logo: education[0].logo, x: 400, y: 400,
  },
  {
    year: "2025", period: codsoft?.period ?? "Feb 2025 – Mar 2025", label: "First internship", title: "Building with a real team.",
    organization: codsoft?.company ?? "CodSoft", location: codsoft?.location ?? "Remote",
    description: codsoft?.title ?? "Web Development Intern", details: codsoft?.responsibilities ?? [],
    logo: codsoft?.logo, x: 650, y: 320,
  },
  {
    year: "2025", period: certifications[2].issued!, label: "Into the cloud", title: "A new view from the cloud.",
    organization: certifications[2].issuer, location: "Oracle Cloud Infrastructure",
    description: certifications[2].title,
    details: ["Credential ID: " + certifications[2].credentialId, "Expires " + certifications[2].expires],
    logo: certifications[2].logo, x: 900, y: 430,
  },
  {
    year: "2026", period: certifications[0].issued!, label: "Java certified", title: "Making Java my specialty.",
    organization: "Oracle", location: "Java SE 11 & Java SE 17",
    description: "Oracle Certified Professional",
    details: [certifications[0].title, certifications[1].title],
    logo: certifications[0].logo, x: 1100, y: 270,
  },
  {
    year: "2026", mapLabel: "Mar 2026", period: modeya?.period ?? "Mar 2026 – Jun 2026", label: "MODEYA freelance", title: "Building a storefront end to end.",
    organization: modeya?.company ?? "MODEYA", location: modeya?.location ?? "",
    description: modeya?.title ?? "Freelance Full-Stack Developer", details: modeya?.responsibilities ?? [],
    logo: modeya?.logo, x: 1320, y: 430,
  },
  {
    year: "2026", mapLabel: "Jul 2026", period: mef?.period ?? "Jul 2026 – Sep 2026", label: "MEF internship", title: "Engineering with purpose.",
    organization: mef?.company ?? "MEF", location: mef?.location ?? "",
    description: mef?.title ?? "Internship", details: mef?.responsibilities ?? [],
    logo: mef?.logo, x: 1430, y: 650,
  },
  {
    year: "2027", period: "2027 (Expected)", label: "The next chapter", title: "Still plenty of road ahead.",
    organization: education[0].institution, location: education[0].location,
    description: education[0].degree,
    details: ["Expected graduation: 2027", "Engineering Cycle: 2024 – 2027", "Seeking a 2027 PFE internship in Java backend engineering."],
    logo: education[0].logo, x: 1670, y: 520,
  },
]

function OrganizationLogo({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false)
  return src && !failed
    ? <Image src={src} width={40} height={40} alt="" onError={() => setFailed(true)} />
    : <span className="journey-organization-fallback" aria-hidden="true"><Building2 size={19} strokeWidth={1.5} /></span>
}

const routeSegments = [
  "M230 610C155 505 290 510 400 400",
  "M400 400C490 310 525 250 650 320",
  "M650 320C755 385 765 500 900 430",
  "M900 430C1010 365 950 215 1100 270",
  "M1100 270C1240 310 1180 430 1320 430",
  "M1320 430C1480 425 1290 620 1430 650",
  "M1430 650C1560 690 1545 505 1670 520",
]
const route = routeSegments.map((segment, index) => index ? segment.replace(/^M[\d ]+C/, "C") : segment).join(" ")
const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value))
// Leave a little room at both ends to settle into and out of the journey.
const journeyProgress = (value: number) => clamp((value - .06) / .88)
const progressForStop = (index: number) => .06 + index / (stops.length - 1) * .88

function RouteMap({ active, onSelect, progress, paused }: {
  active: number
  onSelect: (index: number) => void
  progress: MotionValue<number>
  paused: boolean
}) {
  const viewport = useRef<HTMLDivElement>(null)
  const [overview, setOverview] = useState(false)
  const cameraX = useMotionValue(0)
  const cameraY = useMotionValue(0)
  const cameraScale = useMotionValue(.65)
  const x = useSpring(cameraX, { stiffness: 120, damping: 30 })
  const y = useSpring(cameraY, { stiffness: 120, damping: 30 })
  const scale = useSpring(cameraScale, { stiffness: 120, damping: 30 })
  const travelerX = useMotionValue(stops[0].x)
  const travelerY = useMotionValue(stops[0].y)
  const distance = useMotionValue(0)
  const inverseScale = useTransform(paused ? cameraScale : scale, value => 1 / Math.max(value, .1))

  useEffect(() => {
    const element = viewport.current
    if (!element) return
    // Measure each curve once. Scroll frames update motion values without React renders.
    const curves = routeSegments.map(d => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("d", d)
      return { path, length: path.getTotalLength() }
    })
    const totalLength = curves.reduce((sum, curve) => sum + curve.length, 0)
    let width = element.clientWidth
    let height = element.clientHeight
    const update = (value: number) => {
      const position = journeyProgress(value) * (stops.length - 1)
      const index = Math.min(Math.floor(position), curves.length - 1)
      const curve = curves[index]
      const localDistance = clamp(position - index) * curve.length
      const point = curve.path.getPointAtLength(localDistance)
      travelerX.set(point.x)
      travelerY.set(point.y)
      distance.set((curves.slice(0, index).reduce((sum, item) => sum + item.length, 0) + localDistance) / totalLength)

      const showAll = overview || paused
      const zoom = showAll
        ? Math.min(width / 1840, height / 940)
        : Math.max(width / (width < 600 ? 850 : 1120), height / 820)
      cameraScale.set(zoom)
      cameraX.set(showAll ? (width - 1800 * zoom) / 2 : clamp(width * .48 - point.x * zoom, Math.min(0, width - 1800 * zoom), 0))
      cameraY.set(showAll ? (height - 900 * zoom) / 2 : clamp(height * .56 - point.y * zoom, Math.min(0, height - 900 * zoom), 0))
      if (paused) {
        x.jump(cameraX.get())
        y.jump(cameraY.get())
        scale.jump(zoom)
      }
    }
    const observer = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width
      height = entry.contentRect.height
      update(progress.get())
    })
    observer.observe(element)
    update(progress.get())
    const unsubscribe = progress.on("change", update)
    return () => { observer.disconnect(); unsubscribe() }
  }, [progress, overview, paused, cameraX, cameraY, cameraScale, travelerX, travelerY, distance, x, y, scale])

  return (
    <div ref={viewport} className={`journey-map${overview || paused ? " is-overview" : ""}`} role="group" aria-label="Interactive illustrated career map">
      <motion.div className="journey-world" style={{ x: paused ? cameraX : x, y: paused ? cameraY : y, scale: paused ? cameraScale : scale }}>
        <JourneyTerrain />
        <svg className="journey-route" viewBox="0 0 1800 900" aria-hidden="true">
          <path className="journey-road-shadow" d={route} />
          <path className="journey-road-edge" d={route} />
          <path className="journey-road" d={route} />
          <motion.path className="journey-road-traveled" style={{ pathLength: distance }} d={route} />
        </svg>
        {stops.map((stop, index) => (
          <div className="journey-stop-position" key={stop.label} style={{ left: stop.x, top: stop.y }}>
            <motion.div style={{ scale: inverseScale }}>
              <button
                type="button"
                className={`journey-map-stop${active === index ? " is-active" : ""}${index < active ? " is-visited" : ""}${index === stops.length - 1 ? " is-future" : ""}`}
                onClick={() => onSelect(index)}
                aria-label={`${stop.period}: ${stop.label}`}
                aria-pressed={active === index}
                aria-controls="journey-detail"
                tabIndex={overview || paused || Math.abs(index - active) <= 1 ? 0 : -1}
              >
                <span className="journey-pin">{String(index + 1).padStart(2, "0")}</span>
                <span className="journey-pin-label"><strong>{stop.mapLabel ?? stop.year}</strong><small>{stop.label}</small></span>
              </button>
            </motion.div>
          </div>
        ))}
        <motion.div className="journey-traveler-position" style={{ x: travelerX, y: travelerY }} aria-hidden="true">
          <motion.span className="journey-traveler" style={{ scale: inverseScale }} />
        </motion.div>
      </motion.div>
      <div className="journey-map-heading" aria-hidden="true"><span>THE CURIOSITY ATLAS</span><small>A personal map, still unfolding.</small></div>
      <div className="journey-compass" aria-hidden="true"><span>N</span><Compass size={34} strokeWidth={1} /></div>
      <button type="button" className="journey-map-view" onClick={() => setOverview(value => !value)} aria-pressed={overview || paused} disabled={paused}>
        {overview || paused ? <LocateFixed size={15} /> : <Maximize2 size={15} />}
        {paused ? "Full route" : overview ? "Follow the route" : "View full map"}
      </button>
      <div className="journey-map-key" aria-hidden="true"><span /> {active === stops.length - 1 ? "The road ahead" : "Follow the coral thread"}</div>
    </div>
  )
}

export function Journey() {
  const [active, setActive] = useState(0)
  const { paused } = useMotionPreferences()
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: .0001 })
  const progress = paused ? scrollYProgress : smoothProgress
  const completion = useTransform(progress, journeyProgress)

  useEffect(() => {
    let previous = -1
    const update = (value: number) => {
      const next = Math.round(journeyProgress(value) * (stops.length - 1))
      if (next !== previous) { previous = next; setActive(next) }
    }
    update(progress.get())
    return progress.on("change", update)
  }, [progress])

  const selectStop = useCallback((index: number) => {
    const element = section.current
    if (!element) return
    const target = clamp(index, 0, stops.length - 1)
    // Navigation and manual scrolling share one timeline, so neither can desync the story.
    const start = element.getBoundingClientRect().top + window.scrollY
    const distance = element.offsetHeight - window.innerHeight
    window.scrollTo({ top: start + distance * progressForStop(target), behavior: paused ? "instant" : "smooth" })
  }, [paused])

  useEffect(() => {
    const navigate = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof event.detail !== "string") return
      const index = stops.findIndex(item => item.label === event.detail)
      if (index >= 0) {
        selectStop(index)
        stage.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener("portfolio:journey-select", navigate)
    return () => window.removeEventListener("portfolio:journey-select", navigate)
  }, [selectStop])

  const stop = stops[active]
  return (
    <section ref={section} id="journey" className="journey-section" aria-labelledby="journey-heading">
      <div ref={stage} className="journey-stage" tabIndex={-1}>
        <header className="journey-header">
          <div>
            <span className="journey-eyebrow"><Compass size={15} aria-hidden="true" /> A LITTLE CURIOSITY. A LONG WAY.</span>
            <h2 id="journey-heading">Every turn, <span>a new chapter.</span></h2>
          </div>
          <p>From the first line of code to what comes next.<br /><span><ArrowDown size={13} aria-hidden="true" /> Scroll to travel. Pick a stop to linger.</span></p>
        </header>
        <div className="journey-layout">
          <RouteMap active={active} onSelect={selectStop} progress={progress} paused={paused} />
          <article className="journey-story" id="journey-detail" aria-label="Milestone details">
            <div className="journey-story-top"><span>FIELD NOTES</span><span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} <i>/ {String(stops.length).padStart(2, "0")}</i><span className="sr-only">: {stop.label}</span></span></div>
            <div className="journey-story-content">
              <motion.div key={active} initial={paused ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : .35, ease: [.22, 1, .36, 1] }}>
                <p className="journey-story-period">{stop.period}</p>
                <h3>{stop.title}</h3>
                <div className="journey-organization">
                  <OrganizationLogo src={stop.logo} />
                  <div><strong>{stop.organization}</strong>{stop.location && <span><MapPin size={12} aria-hidden="true" />{stop.location}</span>}</div>
                </div>
                <p className="journey-story-description">{stop.description}</p>
                <ul className="journey-story-details journey-desktop-notes">{stop.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                <details className="journey-field-notes" key={active}>
                  <summary>The details <span>+</span></summary>
                  <ul className="journey-story-details">{stop.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                </details>
              </motion.div>
            </div>
            <div className="journey-story-navigation">
              <button type="button" onClick={() => selectStop(active - 1)} disabled={active === 0} aria-label="Previous milestone"><ArrowLeft size={18} /></button>
              <span>{stop.label}</span>
              <button type="button" onClick={() => selectStop(active + 1)} disabled={active === stops.length - 1} aria-label="Next milestone"><ArrowRight size={18} /></button>
            </div>
          </article>
        </div>
        <nav className="journey-year-navigation" aria-label="Choose a milestone">
          <div className="journey-timeline-track" aria-hidden="true"><motion.span style={{ scaleX: completion }} /></div>
          {stops.map((item, index) => (
            <button type="button" key={item.label} aria-label={`${item.mapLabel ?? item.year} ${item.label}`} title={`${item.period}: ${item.label}`} aria-current={active === index ? "step" : undefined} aria-controls="journey-detail" className={`${active === index ? "is-active" : ""} ${index < active ? "is-visited" : ""}`} onClick={() => selectStop(index)}>
              <span className="journey-timeline-dot" aria-hidden="true" /><strong>{item.year}</strong><small>{item.label}</small>
            </button>
          ))}
        </nav>
        <a className="journey-skip" href="#selected-work">{active === stops.length - 1 ? "On to the things I've built" : "Skip ahead to my work"} <ArrowRight size={13} /></a>
      </div>
    </section>
  )
}
