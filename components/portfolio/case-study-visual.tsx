import type { CaseStudy } from "@/lib/case-studies"
import "./case-study.css"

export function CaseStudyVisual({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  const branched = study.slug === "interview-ai"

  return (
    <figure className={`case-visual case-visual-${study.slug}${compact ? " case-visual-compact" : ""}`}>
      <div className="case-visual-heading"><span>SYSTEM MAP</span><span>{study.projectTitle}</span></div>
      <ol className={`case-visual-flow${branched ? " case-visual-flow-branched" : ""}`} aria-label={`${study.projectTitle} architecture${branched ? ", with separate persistence and AI integrations" : ", from application entry to data"}`}>
        {study.architecture.map((layer, index) => (
          <li key={layer.label} className={`case-visual-node case-visual-node-${index}`}>
            <span className="case-visual-step">{String(index + 1).padStart(2, "0")}</span>
            <strong>{layer.label}</strong>
            {!compact && <p>{layer.detail}</p>}
          </li>
        ))}
      </ol>
      <figcaption>{branched ? "Java application logic connects independently to data storage and AI providers." : "A simplified view of the documented application layers."} <span>Architecture illustration.</span></figcaption>
    </figure>
  )
}
