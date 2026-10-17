import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CodeXml } from "lucide-react"
import { CaseStudyVisual } from "@/components/portfolio/case-study-visual"
import { CaseProgress } from "@/components/portfolio/case-progress"
import { caseStudies, getCaseStudy } from "@/lib/case-studies"
import { profile } from "@/lib/portfolio-data"
import "@/components/portfolio/case-study.css"

type CaseStudyPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return caseStudies.map(study => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()
  const socialImage = study.image?.src ?? "/api/og"

  return {
    title: `${study.projectTitle} | Case Study | ${profile.name}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: `${study.projectTitle} | ${profile.name}`, description: study.summary, url: `/work/${study.slug}`, type: "article", images: [{ url: socialImage, alt: `${study.projectTitle} case study by ${profile.name}` }] },
    twitter: { card: "summary_large_image", title: `${study.projectTitle} | ${profile.name}`, description: study.summary, images: [socialImage] },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()
  const otherStudies = caseStudies.filter(item => item.slug !== study.slug)

  return (
    <main id="about" className="case-page" tabIndex={-1} aria-labelledby="case-title">
      <CaseProgress />
      <div className="case-page-inner">
        <header className="case-topbar">
          <Link href="/#selected-work" className="case-back"><span aria-hidden="true">←</span> Back to selected work</Link>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="case-cv">Java backend CV <span aria-hidden="true">↗</span></a>
        </header>

        <article>
          <header className="case-hero">
            <p className="case-eyebrow"><CodeXml size={18} aria-hidden="true" /> {study.eyebrow}</p>
            <h1 id="case-title">{study.title}</h1>
            <p className="case-summary">{study.summary}</p>
            <dl className="case-context">
              <div><dt>CONTEXT</dt><dd>{study.organization}</dd></div>
              <div><dt>CONTRIBUTION</dt><dd>{study.role}</dd></div>
              {study.period && <div><dt>PERIOD</dt><dd>{study.period}</dd></div>}
            </dl>
            <ul className="case-stack" aria-label="Project technologies">{study.stack.map(item => <li key={item}>{item}</li>)}</ul>
          </header>

          <div className="case-evidence" aria-label="Documented project scope">
            {study.evidence.map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </div>

          {study.image && <figure className="case-screenshot"><Image src={study.image.src} alt={study.image.alt} width={study.image.width ?? 1600} height={study.image.height ?? 1000} sizes="(max-width: 700px) 92vw, 1120px" priority /><figcaption>{study.image.caption}</figcaption></figure>}

          <section className="case-chapter" aria-labelledby="case-challenge">
            <div className="case-chapter-label">THE PROBLEM</div>
            <div className="case-chapter-content"><h2 id="case-challenge">The system behind the interface.</h2><p>{study.challenge}</p></div>
          </section>

          <section className="case-chapter" aria-labelledby="case-contributions">
            <div className="case-chapter-label">CONTRIBUTIONS</div>
            <div className="case-chapter-content"><h2 id="case-contributions">What I worked on.</h2><ul className="case-contribution-list">{study.contributions.map(item => <li key={item}>{item}</li>)}</ul></div>
          </section>

          <section className="case-architecture" aria-labelledby="case-architecture-heading">
            <div className="case-section-heading"><h2 id="case-architecture-heading">How the pieces connect.</h2><p>An original diagram of the documented stack and application boundaries.</p></div>
            <CaseStudyVisual study={study} />
          </section>

          <section className="case-chapter" aria-labelledby="case-decisions">
            <div className="case-chapter-label">ENGINEERING CHOICES</div>
            <div className="case-chapter-content"><h2 id="case-decisions">Decisions and their tradeoffs.</h2><div className="case-decision-list">{study.decisions.map((item, index) => <div key={item.title}><span className="case-decision-number">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div></div>
          </section>

          <section className="case-chapter" aria-labelledby="case-verification">
            <div className="case-chapter-label">VALIDATION</div>
            <div className="case-chapter-content"><h2 id="case-verification">{study.slug === "mef-fleet-management" ? "Testing and validation scope." : "A clear review checklist."}</h2><ul className="case-verification-list">{study.verification.map(item => <li key={item}>{item}</li>)}</ul></div>
          </section>

          <section className="case-chapter case-reflections" aria-labelledby="case-reflections">
            <div className="case-chapter-label">TAKEAWAYS</div>
            <div className="case-chapter-content"><h2 id="case-reflections">What the project demonstrates.</h2>{study.reflections.map(item => <p key={item}>{item}</p>)}
              <div className="case-resource-links">{study.sourceUrl && <a href={study.sourceUrl} target="_blank" rel="noopener noreferrer">Explore the source <span aria-hidden="true">↗</span></a>}{study.demoUrl && <a href={study.demoUrl} target="_blank" rel="noopener noreferrer">Open the project <span aria-hidden="true">↗</span></a>}<a href={`mailto:${profile.email}`}>Let&apos;s talk about the work <span aria-hidden="true">↗</span></a></div>
            </div>
          </section>
        </article>

        <nav className="case-next" aria-label="More case studies"><p>KEEP EXPLORING</p><div>{otherStudies.map(item => <Link key={item.slug} href={`/work/${item.slug}`}><span>{item.eyebrow}</span><strong>{item.projectTitle}</strong><span aria-hidden="true">↗</span></Link>)}</div></nav>
        <footer className="case-footer"><Link href="/">{profile.name}</Link><span>Java backend engineering · {profile.location}</span><Link href="/#selected-work">All selected work <span aria-hidden="true">↑</span></Link></footer>
      </div>
    </main>
  )
}
