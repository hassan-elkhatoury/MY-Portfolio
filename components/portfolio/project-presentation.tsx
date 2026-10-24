import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, FileText, Github } from "lucide-react"
import type { Project } from "@/lib/portfolio-data"
import { projectSlug, projectNotes } from "@/lib/project-presentation"
import { projectCaseStudyPath } from "@/lib/project-case-links"
import { getCaseStudy } from "@/lib/case-studies"
import { CaseStudyVisual } from "./case-study-visual"
import "./project-presentation.css"

export function ProjectPresentation({ project, fullPage = false }: { project: Project; fullPage?: boolean }) {
  const slug = projectSlug(project.title)
  const notes = projectNotes[slug]
  const study = getCaseStudy(slug)
  const caseStudyPath = projectCaseStudyPath(project.title)
  const hasResources = caseStudyPath || (fullPage && project.githubUrl) || project.demoUrl || project.reportUrl
  return <div className="project-presentation">
    {project.image && <figure className="project-proof"><Image src={project.image} alt={`${project.title} application screenshot`} width={1600} height={1000} loading="eager" sizes="(max-width: 700px) 92vw, 1000px" /><figcaption><span>PROJECT PREVIEW</span><span>{project.title}</span></figcaption></figure>}
    <section className="project-editorial-row"><span>THE ENGINEERING FOCUS</span><div><h2>{notes.focus}</h2><ul>{notes.scope.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    {study && <CaseStudyVisual study={study} />}
    <section className="project-editorial-row"><span>BUILT WITH</span><ul className="project-stack-list">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul></section>
    {hasResources && <div className="project-resource-links">
      {caseStudyPath && <Link href={caseStudyPath}><FileText size={16} /> Engineering case study <ArrowUpRight size={16} /></Link>}
      {fullPage && project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> Explore the code <ArrowUpRight size={16} /></a>}
      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Live project <ArrowUpRight size={16} /></a>}
      {project.reportUrl && <a href={project.reportUrl} target="_blank" rel="noopener noreferrer"><FileText size={16} /> Project report <ArrowUpRight size={16} /></a>}
    </div>}
  </div>
}
