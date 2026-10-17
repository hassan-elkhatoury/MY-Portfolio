"use client"

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowLeft, ArrowRight, Building2, GraduationCap, MapPin, Compass } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { certifications, education, experiences } from "@/lib/portfolio-data"
import { useMotionPreferences } from "./motion-preferences"
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
    logo: undefined, x: 14, y: 76,
  },
  {
    year: "2024", period: "2024 – 2027", label: "Engineering cycle", title: "Going deeper into systems.",
    organization: education[0].institution, location: education[0].location,
    description: education[0].details![0], details: education[0].focus!,
    logo: education[0].logo, x: 14, y: 36,
  },
  {
    year: "2025", period: codsoft?.period ?? "Feb 2025 – Mar 2025", label: "First internship", title: "Building with a real team.",
    organization: codsoft?.company ?? "CodSoft", location: codsoft?.location ?? "Remote",
    description: codsoft?.title ?? "Web Development Intern", details: codsoft?.responsibilities ?? [],
    logo: codsoft?.logo, x: 37, y: 24,
  },
  {
    year: "2025", period: certifications[2].issued!, label: "Into the cloud", title: "A new view from the cloud.",
    organization: certifications[2].issuer, location: "Oracle Cloud Infrastructure",
    description: certifications[2].title,
    details: ["Credential ID: " + certifications[2].credentialId, "Expires " + certifications[2].expires],
    logo: certifications[2].logo, x: 61, y: 24,
  },
  {
    year: "2026", period: certifications[0].issued!, label: "Java certified", title: "Making Java my specialty.",
    organization: "Oracle", location: "Java SE 11 & Java SE 17",
    description: "Oracle Certified Professional",
    details: [certifications[0].title, certifications[1].title],
    logo: certifications[0].logo, x: 84, y: 36,
  },
  {
    year: "2026", mapLabel: "Mar 2026", period: modeya?.period ?? "Mar 2026 – Jun 2026", label: "MODEYA freelance", title: "Building a storefront end to end.",
    organization: modeya?.company ?? "MODEYA", location: modeya?.location ?? "",
    description: modeya?.title ?? "Freelance Full-Stack Developer", details: modeya?.responsibilities ?? [],
    logo: modeya?.logo, x: 84, y: 76,
  },
  {
    year: "2026", mapLabel: "Jul 2026", period: mef?.period ?? "Jul 2026 – Sep 2026", label: "MEF internship", title: "Engineering with purpose.",
    organization: mef?.company ?? "MEF", location: mef?.location ?? "",
    description: mef?.title ?? "Internship", details: mef?.responsibilities ?? [],
    logo: mef?.logo, x: 60, y: 79,
  },
  {
    year: "2027", period: "2027 (Expected)", label: "The next chapter", title: "Still plenty of road ahead.",
    organization: education[0].institution, location: education[0].location,
    description: education[0].degree,
    details: ["Expected graduation: 2027", "Engineering Cycle: 2024 – 2027", "Seeking a 2027 PFE internship in Java backend engineering."],
    logo: education[0].logo, x: 36, y: 79,
  },
]

function OrganizationLogo({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false)
  return src && !failed
    ? <Image src={src} width={40} height={40} alt="" onError={() => setFailed(true)} />
    : <span className="journey-organization-fallback" aria-hidden="true"><Building2 size={19} strokeWidth={1.5} /></span>
}

function RouteMap({ active, onSelect, charge, charged }: { active: number; onSelect: (index: number) => void; charge?: import("framer-motion").MotionValue<number>; charged: number }) {
  return (
    <div className="journey-map" aria-label="Interactive career route">
      <div className="journey-map-note"><span /> A work in progress. Always.</div>
      <svg className="journey-terrain" viewBox="0 0 700 540" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="journey-grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M 42 0 L 0 0 0 42" fill="none" stroke="#ddd8ba" strokeWidth=".6" /></pattern>
        </defs>
        <rect width="700" height="540" fill="url(#journey-grid)" />
        <g fill="none" stroke="#e1dcc2" strokeWidth="1.4">
          <path d="M-40 160C140 125 88 36 201 15S395 61 461 5M-20 181C110 166 126 75 221 56S401 87 487 25M-13 204C128 184 124 111 225 101S394 107 505 64M-15 226C162 232 148 138 246 141S410 148 519 107" />
          <path d="M465 545C399 412 589 442 652 333S715 222 769 216M442 555C364 417 528 415 622 317S700 214 754 186M418 553C338 422 499 373 583 300S672 199 738 162M390 568C305 408 472 354 548 272S636 185 728 138" />
          <path d="M-40 410C37 323 142 489 245 431S320 401 339 542M-29 442C44 370 128 528 221 476S285 451 296 560M-19 470C30 416 121 560 200 515S245 502 263 580" />
        </g>
        <path className="journey-road-shadow" d="M98 410C70 335 65 265 98 194S171 130 259 130S350 130 427 130S570 128 588 194S626 333 588 410S482 448 420 427S316 420 252 427" />
        <path className="journey-road" d="M98 410C70 335 65 265 98 194S171 130 259 130S350 130 427 130S570 128 588 194S626 333 588 410S482 448 420 427S316 420 252 427" />
        {/* The charge line follows the same route and fills with the reader's scroll. */}
        {charge && <motion.path className="journey-road-charge" style={{ pathLength: charge }} d="M98 410C70 335 65 265 98 194S171 130 259 130S350 130 427 130S570 128 588 194S626 333 588 410S482 448 420 427S316 420 252 427" />}
        <g className="journey-mountains" transform="translate(326 365)">
          <path d="M0 61L41 0L79 61Z" fill="#b9c5ad" /><path d="M42 61L77 14L112 61Z" fill="#d0d8bf" /><path d="M28 20L41 0L54 20L44 15L38 22Z" fill="#fffef4" />
          <path d="M60 37L77 14L89 33L78 30L73 37Z" fill="#fffef4" />
        </g>
        <g transform="translate(56 58)" fill="none" stroke="#b2ad91" strokeWidth="1.4"><circle cx="0" cy="0" r="24" /><path d="M0-18V18M-18 0H18" /><path d="M0-16L5 4L0 0L-5 4Z" fill="#ef856b" stroke="none" /><text x="-5" y="-33" fill="#938e75" stroke="none" fontSize="12">N</text></g>
        <text x="306" y="457" className="journey-map-caption">THE LEARNING NEVER STOPS</text>
      </svg>
      {stops.map((stop, index) => (
        <button
          key={stop.label}
          className={`journey-map-stop${active === index ? " is-active" : ""}${index === stops.length - 1 ? " is-future" : ""}${index <= charged ? " is-charged" : ""}`}
          style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
          onClick={() => onSelect(index)}
          aria-label={`${stop.period}: ${stop.label}`}
          aria-pressed={active === index}
          aria-controls="journey-detail"
        >
          <span className="journey-pin-shadow" />
          <span className="journey-pin"><span /></span>
          <span className="journey-pin-label">{stop.mapLabel ?? stop.year}</span>
        </button>
      ))}
      <div className="journey-map-legend"><span /> A few stops along the way</div>
    </div>
  )
}

export function Journey() {
  const [active, setActive] = useState(() => stops.findIndex(stop => stop.label === "MEF internship"))
  const reducedMotion = useReducedMotion()
  const { paused } = useMotionPreferences()
  const map = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: map, offset: ["start 88%", "end 42%"] })
  const charge = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: .001 })
  const [charged, setCharged] = useState(0)
  const chargePct = useTransform(charge, value => Math.round(value * (stops.length - 1) + 1))

  useEffect(() => {
    if (paused) return
    const unsubscribe = chargePct.on("change", value => setCharged(Math.max(0, Math.min(stops.length - 1, value - 1))))
    return unsubscribe
  }, [chargePct, paused])

  const stop = stops[active]
  useEffect(() => {
    const selectStop = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof event.detail !== "string") return
      const index = stops.findIndex(item => item.label === event.detail)
      if (index >= 0) setActive(index)
    }
    window.addEventListener("portfolio:journey-select", selectStop)
    return () => window.removeEventListener("portfolio:journey-select", selectStop)
  }, [])

  return (
    <section id="journey" className="portfolio-section journey-section" aria-labelledby="journey-heading">
      <div className="section-inner">
        <motion.header className="journey-header" initial={false} whileInView={reducedMotion ? {} : { opacity: [.5, 1], y: [22, 0] }} viewport={{ once: true, amount: .3 }} transition={{ duration: .6 }}>
          <span className="section-label"><Compass size={18} aria-hidden="true" /> THE JOURNEY</span>
          <h2 id="journey-heading" className="section-heading">Engineer by degree,<br />builder by <span className="journey-highlight">curiosity.</span></h2>
          <p className="section-copy">A few milestones, a lot of learning, and a love for figuring things out.</p>
        </motion.header>
        <motion.div className="journey-layout" initial={false} whileInView={reducedMotion ? {} : { opacity: [.5, 1], y: [26, 0] }} viewport={{ once: true, amount: .15 }} transition={{ duration: .7 }}>
          <div ref={map}>
            <RouteMap active={active} onSelect={setActive} charge={paused ? undefined : charge} charged={paused ? stops.length - 1 : charged} />
          </div>
          <div className="journey-story-wrap">
            <div className="journey-paper-tape" aria-hidden="true" />
            <div className="journey-story" id="journey-detail" aria-live="polite" aria-atomic="true">
              <div className="journey-story-top"><span>STOP {String(active + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}</span><GraduationCap size={21} strokeWidth={1.5} aria-hidden="true" /></div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active} initial={false} animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: [.5, 1], y: [10, 0] }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : .2 }}>
                  <p className="journey-story-period">{stop.period}</p>
                  <h3>{stop.title}</h3>
                  <div className="journey-organization">
                    <OrganizationLogo src={stop.logo} />
                    <div><strong>{stop.organization}</strong>{stop.location && <span><MapPin size={12} aria-hidden="true" />{stop.location}</span>}</div>
                  </div>
                  <p className="journey-story-description">{stop.description}</p>
                  <ul className="journey-story-details">{stop.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                </motion.div>
              </AnimatePresence>
              <div className="journey-story-navigation">
                <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous milestone"><ArrowLeft size={19} /></button>
                <span>{stop.label}</span>
                <button onClick={() => setActive(Math.min(stops.length - 1, active + 1))} disabled={active === stops.length - 1} aria-label="Next milestone"><ArrowRight size={19} /></button>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="journey-year-navigation" aria-label="Choose a milestone">
          {stops.map((item, index) => <button key={item.label} aria-pressed={active === index} aria-controls="journey-detail" className={active === index ? "is-active" : ""} onClick={() => setActive(index)}><span>{item.year}</span><small>{item.label}</small></button>)}
        </div>
      </div>
    </section>
  )
}
