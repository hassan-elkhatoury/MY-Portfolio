import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, FolderOpen } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"
import { CaseStudyVisual } from "./case-study-visual"
import "./selected-work.css"

export function SelectedWork() {
  return (
    <section id="selected-work" className="portfolio-section selected-work" aria-labelledby="selected-work-heading">
      <div className="section-inner">
        <header className="selected-work-header">
          <div>
            <p className="section-label"><FolderOpen size={18} aria-hidden="true" /> SELECTED CASE STUDIES</p>
            <h2 id="selected-work-heading" className="section-heading">Behind <span className="highlight">the build.</span></h2>
          </div>
          <p className="section-copy">What I built, how it works, and the decisions behind it. A closer look at three projects.</p>
        </header>

        <div className="selected-work-list">
          {caseStudies.map(study => (
            <article className="selected-work-row" key={study.slug}>
              <div className="selected-work-content">
                <span className="selected-work-category">{study.eyebrow}</span>
                <h3><Link href={`/work/${study.slug}`}>{study.title}</Link></h3>
                <p className="selected-work-role">{study.role}{study.period ? ` · ${study.period}` : ""}</p>
                <p className="selected-work-summary">{study.summary}</p>
                <dl className="selected-work-evidence">
                  {study.evidence.slice(0, 2).map(item => <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}
                </dl>
                <Link className="selected-work-read" href={`/work/${study.slug}`}>Read the case study <ArrowUpRight size={18} aria-hidden="true" /></Link>
              </div>
              <Link className="selected-work-visual" href={`/work/${study.slug}`} aria-label={`Read the ${study.organization} case study`}>
                {study.image ? <figure className="selected-work-screenshot"><div><Image src={study.image.src} alt={study.image.alt} width={study.image.width ?? 1600} height={study.image.height ?? 1000} sizes="(max-width: 700px) 90vw, 550px" /></div><figcaption>{study.image.caption}</figcaption></figure> : <CaseStudyVisual study={study} compact />}
              </Link>
            </article>
          ))}
        </div>
        <a className="selected-work-more" href="#projects">There&apos;s more in the project box <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  )
}
