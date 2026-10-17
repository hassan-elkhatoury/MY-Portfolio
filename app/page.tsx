import { FloatingNav } from "@/components/portfolio/floating-nav"
import { HeroLandscape } from "@/components/portfolio/hero-landscape"
import { PersonalStory } from "@/components/portfolio/personal-story"
import { Journey } from "@/components/portfolio/journey"
import { ProjectBox } from "@/components/portfolio/project-box"
import { Credentials } from "@/components/portfolio/credentials"
import { Toolkit } from "@/components/portfolio/toolkit"
import { ContactDesk } from "@/components/portfolio/contact-desk"
import { SelectedWork } from "@/components/portfolio/selected-work"
import { ScrollThread } from "@/components/portfolio/scroll-thread"

export default function Home() {
  return (
    <main className="portfolio-main">
      <FloatingNav />
      <ScrollThread />
      <HeroLandscape />
      <Journey />
      <SelectedWork />
      <ProjectBox />
      <PersonalStory />
      <Credentials />
      <Toolkit />
      <ContactDesk />
    </main>
  )
}
