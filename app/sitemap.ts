import type { MetadataRoute } from "next"
import { caseStudies } from "@/lib/case-studies"
import { projectSlugs } from "@/lib/project-presentation"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hassanelkhatoury.vercel.app"

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map(study => ({
      url: `${baseUrl}/work/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projectSlugs.map(slug => ({ url: `${baseUrl}/projects/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ]
}
