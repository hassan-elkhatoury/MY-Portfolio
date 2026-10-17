import type { CSSProperties } from "react"
import type { CaseStudy } from "@/lib/case-studies"
import "./case-study.css"
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
  const branched = study.slug === "interview-ai"
  const style = { "--map-accent": accents[study.slug] ?? "#7f9b6d" } as CSSProperties

  return (
    <figure className={`case-visual case-visual-${study.slug}${compact ? " case-visual-compact" : ""}`} style={style}>
      <div className="case-visual-heading">
        <span className="case-visual-tag"><i aria-hidden="true" /> SYSTEM MAP</span>
        <span className="case-visual-project">{study.projectTitle}</span>
      </div>
      <ol className={`case-visual-flow${branched ? " case-visual-flow-branched" : ""}`} aria-label={`${study.projectTitle} architecture${branched ? ", with separate persistence and AI integrations" : ", from application entry to data"}`}>
        {study.architecture.map((layer, index) => (
          <li key={layer.label} className={`case-visual-node case-visual-node-${index}`}>
            <span className="case-visual-step">{String(index + 1).padStart(2, "0")}</span>
            <span className="case-visual-glyph"><LayerGlyph label={layer.label} /></span>
            <strong>{layer.label}</strong>
            {!compact && <p>{layer.detail}</p>}
          </li>
        ))}
      </ol>
      <figcaption>
        <span>{branched ? "Java application logic connects independently to data storage and AI providers." : "A simplified view of the documented application layers."}</span>
        <span className="case-visual-note">Architecture illustration.</span>
      </figcaption>
    </figure>
  )
}
