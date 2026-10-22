import { FloatingNav } from "@/components/portfolio/floating-nav"
import { WorkspaceHero } from "@/components/portfolio/workspace-hero"
import { PersonalStory } from "@/components/portfolio/personal-story"
import { Journey } from "@/components/portfolio/journey"
import { ProjectBox } from "@/components/portfolio/project-box"
import { Credentials } from "@/components/portfolio/credentials"
import { Toolkit } from "@/components/portfolio/toolkit"
import { ContactDesk } from "@/components/portfolio/contact-desk"
import { SelectedWork } from "@/components/portfolio/selected-work"
import { ScrollThread } from "@/components/portfolio/scroll-thread"
import { ScrollChoreography } from "@/components/portfolio/scroll-choreography"

export default function Home() {
  return (
    <>
      <FloatingNav />
      <ScrollThread />
      <ScrollChoreography />
      <main id="main-content" className="portfolio-main" tabIndex={-1}>
        <WorkspaceHero />
        <Journey />
        <SelectedWork />
        <ProjectBox />
        <PersonalStory />
        <Credentials />
        <Toolkit />
        <ContactDesk />
      </main>
    </>
  )
}
