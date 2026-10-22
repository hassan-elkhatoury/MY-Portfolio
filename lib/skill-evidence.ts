import { projects, skillGroups } from "./portfolio-data"
import { caseStudies } from "./case-studies"
import { projectSlug } from "./project-presentation"

const descriptions: Record<string, string> = {
  Java: "The foundation of my backend and desktop work, including Spring Boot services and the InterviewAI application.",
  "Spring Boot": "Application and REST API development in the MEF fleet-management backend.",
  "Spring Data JPA": "Repository boundaries for the relational fleet data in the MEF backend.",
  Hibernate: "Object-relational persistence alongside Spring Data JPA in the fleet-management backend.",
  "REST APIs": "HTTP interfaces that connect application workflows with backend services.",
  PostgreSQL: "Relational persistence for fleet records and the Supabase-backed commerce projects.",
  MongoDB: "Distributed data exploration in MongoShardLab, including sharding and replica sets.",
  Docker: "Container-based deployment in the MongoShardLab cluster laboratory.",
  Git: "Version control, collaboration, and Agile development workflows documented in my internships.",
  Linux: "A documented platform skill and part of my computer science engineering coursework.",
  Python: "Prediction services and machine learning work in the CAN-2025 project.",
  "C++": "Desktop messaging with Qt, TCP sockets, and asynchronous networking.",
  SQL: "Querying and modeling relational data across MySQL and PostgreSQL projects.",
  "Oracle Cloud Infrastructure (OCI)": "Cloud foundations backed by the Oracle Cloud Infrastructure certification in my credentials.",
}
const normalize = (value: string) => value.toLowerCase().replace(/\s*\d[\d.]*$/, "").trim()
function matches(skill: string, tech: string) {
  const a = normalize(skill), b = normalize(tech)
  return a === b || (a === "sql" && ["postgresql", "mysql", "sqlite"].includes(b)) || (a === "google gemini" && b === "gemini")
}
export function skillEvidence(skill: string, group: number) {
  const related = projects.filter(project => project.tech.some(tech => matches(skill, tech))).map(project => ({ title: project.title, href: `/projects/${projectSlug(project.title)}` }))
  const mef = caseStudies[0]
  if (mef.stack.some(tech => matches(skill, tech))) related.unshift({ title: mef.projectTitle, href: `/work/${mef.slug}` })
  return { description: descriptions[skill] ?? `Part of my documented ${skillGroups[group].title.toLowerCase()} toolkit. The related work below is matched against the technologies listed in my portfolio.`, related, concepts: skillGroups[group].skills.filter(item => item !== skill).slice(0, 5) }
}
