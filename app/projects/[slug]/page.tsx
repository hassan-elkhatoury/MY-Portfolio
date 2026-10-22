import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projects, profile } from "@/lib/portfolio-data"
import { getProject, projectSlug, projectSlugs } from "@/lib/project-presentation"
import { ProjectPresentation } from "@/components/portfolio/project-presentation"
import { CaseProgress } from "@/components/portfolio/case-progress"
import "@/components/portfolio/case-study.css"

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return projectSlugs.map(slug => ({ slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  return { title: `${project.title} | ${profile.name}`, description: project.description, alternates: { canonical: `/projects/${slug}` }, openGraph: { title: project.title, description: project.description, url: `/projects/${slug}`, images: project.image ? [{ url: project.image, alt: project.title }] : undefined } }
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return <main id="main-content" tabIndex={-1} className="case-page project-page">
    <CaseProgress />
    <div className="case-page-inner">
      <header className="case-topbar"><Link href={`/#project/${slug}`} className="case-back">← Return to the project box</Link><a href={profile.resume} className="case-cv" target="_blank" rel="noopener noreferrer">Java backend CV ↗</a></header>
      <article>
        <header className="project-full-hero"><p className="case-eyebrow">PROJECT ARCHIVE / {project.category.toUpperCase()}</p><h1>{project.title}</h1><p>{project.description}</p></header>
        <ProjectPresentation project={project} fullPage />
      </article>
      <nav className="case-next" aria-label="Next project"><p>KEEP EXPLORING</p><Link href={`/projects/${projectSlug(next.title)}`}><strong>{next.title}</strong> ↗</Link></nav>
      <footer className="case-footer"><Link href="/#projects">All eight projects</Link><span>{profile.name}</span></footer>
    </div>
  </main>
}
