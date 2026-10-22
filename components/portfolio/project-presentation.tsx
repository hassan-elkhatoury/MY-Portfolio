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
  return <div className="project-presentation">
    {project.image && <figure className="project-proof"><Image src={project.image} alt={`${project.title} application screenshot`} width={1600} height={1000} loading="eager" sizes="(max-width: 700px) 92vw, 1000px" /><figcaption>Application screenshot from the project portfolio.</figcaption></figure>}
    <section className="project-editorial-row"><span>THE ENGINEERING FOCUS</span><div><h2>{notes.focus}</h2><ul>{notes.scope.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    {study && <CaseStudyVisual study={study} />}
    <section className="project-editorial-row"><span>BUILT WITH</span><ul className="project-stack-list">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul></section>
    <div className="project-resource-links">
      {!fullPage && <Link href={`/projects/${slug}`}><FileText size={16} /> Open full project <ArrowUpRight size={16} /></Link>}
      {projectCaseStudyPath(project.title) && <Link href={projectCaseStudyPath(project.title)!}><FileText size={16} /> Engineering case study <ArrowUpRight size={16} /></Link>}
      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> Explore the code <ArrowUpRight size={16} /></a>}
      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Live project <ArrowUpRight size={16} /></a>}
      {project.reportUrl && <a href={project.reportUrl} target="_blank" rel="noopener noreferrer"><FileText size={16} /> Project report <ArrowUpRight size={16} /></a>}
    </div>
  </div>
}
