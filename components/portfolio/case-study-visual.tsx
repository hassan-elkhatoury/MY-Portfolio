"use client"

import { useId, useRef, useState, type CSSProperties } from "react"
import { useInView } from "framer-motion"
import type { CaseStudy } from "@/lib/case-studies"
import { useMotionPreferences } from "./motion-preferences"
import "./architecture-atlas.css"
const accents: Record<string, string> = {
  "mef-fleet-management": "#6f8f6a",
  "interview-ai": "#5b7fa6",
  modeya: "#a9745e",
}

const glyphs: { match: string[]; path: React.ReactNode }[] = [
  { match: ["controller", "rest", "endpoint", "http"], path: <path d="m8 5-5 7 5 7M16 5l5 7-5 7M13.5 4l-3 16" /> },
  { match: ["service", "domain", "business", "application"], path: <><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="8.5" y="14" width="7" height="7" rx="1.6" /><path d="M6.5 10v2.5h11V10M12 12.5V14" /></> },
  { match: ["auth", "security", "access"], path: <><path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></> },
  { match: ["repository", "jpa", "dao", "data access", "hibernate"], path: <><ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" /><path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" /></> },
  { match: ["postgres", "sql", "database", "storage", "persistence", "records"], path: <><ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13" /><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" /></> },
  { match: ["commerce", "storefront", "customer", "admin", "account", "interface"], path: <><rect x="3" y="4.5" width="18" height="15" rx="2" /><path d="M3 9h18M7 6.7h.01M10 6.7h.01" /><path d="M7 13h4M7 16.2h6" /></> },
  { match: ["provider", "phone", "javafx", "gemini", "openrouter"], path: <><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10.5 5.5h3M11 18.5h2" /></> },
]

/** A small schematic glyph chosen from the layer's own name. Purely decorative. */
function LayerGlyph({ label }: { label: string }) {
  const value = label.toLowerCase()
  const glyph = glyphs.find(item => item.match.some(term => value.includes(term)))
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {glyph?.path ?? <><path d="M12 3v6M12 21v-6M3 12h6M21 12h-6" /><circle cx="12" cy="12" r="3.2" /></>}
    </svg>
  )
}

export function CaseStudyVisual({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  const id = useId()
  const root = useRef<HTMLElement>(null)
  const visible = useInView(root)
  const { paused } = useMotionPreferences()
  const [selected, setSelected] = useState(0)
  const branched = study.slug === "interview-ai"
  const style = { "--map-accent": accents[study.slug] ?? "#7f9b6d" } as CSSProperties
  const positions = branched ? [[80, 140], [250, 140], [470, 65], [470, 215]] : [[75, 130], [225, 130], [375, 130], [525, 130]]
  const paths = branched ? ["M80 140H250", "M250 140H340Q355 140 355 125V80Q355 65 370 65H470", "M250 140H340Q355 140 355 155V200Q355 215 370 215H470"] : ["M75 130H225", "M225 130H375", "M375 130H525"]

  return (
    <figure ref={root} className={`architecture-atlas${compact ? " is-compact" : ""}${visible && !paused ? " is-running" : ""}`} style={style}>
      <div className="architecture-heading">
        <span>ENGINEERING ATLAS / {branched ? "BRANCHES" : "LAYERS"}</span>
        <span>{study.projectTitle}</span>
      </div>
      <div className={`architecture-drawing${branched ? " is-branched" : ""}`} role="group" aria-label={`${study.projectTitle} architecture. Select a layer to learn more.`}>
        <svg viewBox="0 0 600 280" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M20 25h16m-8-8v16M564 255h16m-8-8v16" className="architecture-register" />
          {paths.map((path, index) => <g key={path} className={index < selected || (branched && selected > 1 && index === selected - 1) ? "is-traced" : ""}>
            <path d={path} className="architecture-wire" />
            <path d={path} className="architecture-signal" />
          </g>)}
        </svg>
        {study.architecture.map((layer, index) => <button
          key={layer.label} type="button" className={`architecture-node${selected === index ? " is-selected" : ""}`}
          style={{ left: `${positions[index][0] / 6}%`, top: `${positions[index][1] / 2.8}%` }}
          aria-pressed={selected === index} aria-controls={`${id}-explanation`} aria-label={`Explain ${layer.label}`}
          onClick={() => setSelected(index)} onFocus={() => setSelected(index)}
        >
          <span className="architecture-node-symbol"><LayerGlyph label={layer.label} /></span>
          <span className="architecture-node-label"><small>{String(index + 1).padStart(2, "0")}</small>{layer.label}</span>
        </button>)}
      </div>
      <div id={`${id}-explanation`} className="architecture-explanation" aria-live="polite" aria-atomic="true">
        <span aria-hidden="true">{String(selected + 1).padStart(2, "0")}</span>
        <div><strong>{study.architecture[selected].label}</strong><p>{study.architecture[selected].detail}</p></div>
      </div>
      <figcaption className="architecture-caption">
        {branched ? "Persistence and AI providers connect independently to application logic." : "A simplified view of the documented application layers."}
        <span>Illustrated architecture · select a node</span>
      </figcaption>
    </figure>
  )
}
