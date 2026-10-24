/** Local Devicon and Simple Icons SVGs. Provenance and licenses live beside the assets. */
const logos: Record<string, string> = {
  Java: "java", Python: "python", C: "c", "C++": "cplusplus", JavaScript: "javascript", TypeScript: "typescript", PHP: "php",
  "Spring Boot": "spring", "Spring Data JPA": "spring", Hibernate: "hibernate",
  MySQL: "mysql", MariaDB: "mariadb", PostgreSQL: "postgresql", Supabase: "supabase", "Oracle Database": "oracle",
  MongoDB: "mongodb", "MongoDB Sharding": "mongodb", JDBC: "java", "JPA Entity Relationships": "hibernate",
  Git: "git", GitHub: "github", GitLab: "gitlab", Linux: "linux", Docker: "docker-plain",
  "Oracle Cloud Infrastructure (OCI)": "oracle", Maven: "maven", CMake: "cmake", Composer: "composer", "Node.js": "nodejs", Vercel: "vercel",
  React: "react", "Next.js": "nextjs", HTML: "html5", CSS: "css3", "Tailwind CSS": "tailwindcss", Bootstrap: "bootstrap", Laravel: "laravel",
  "Framer Motion": "framermotion", Zustand: "zustand", "scikit-learn": "scikitlearn", FastAPI: "fastapi",
  XAMPP: "xampp", Zod: "zod", "Google Gemini": "googlegemini", OpenRouter: "openrouter",
}

export type SkillTone = "rose" | "blue" | "lilac" | "green" | "peach" | "ink"
const tones: Record<string, SkillTone> = {
  Java: "rose", Python: "blue", "C++": "lilac", JavaScript: "green", "REST APIs": "peach",
  Docker: "lilac", Linux: "ink", Git: "rose", MongoDB: "green", SQL: "blue", PHP: "lilac",
  "Spring Boot": "green", "Spring Data JPA": "green", TypeScript: "blue", PostgreSQL: "blue",
  XAMPP: "peach", Zod: "blue", "Google Gemini": "lilac", OpenRouter: "blue",
}

// Coordinates are centers, in percentages of the desktop stage. Java opens first.
export const featuredSkills = [
  { name: "Java", x: 50, y: 12, tilt: -2 },
  { name: "Python", x: 34, y: 19, tilt: -16 },
  { name: "C++", x: 66, y: 20, tilt: 13 },
  { name: "REST APIs", x: 16, y: 26, tilt: -22 },
  { name: "JavaScript", x: 85, y: 25, tilt: 24 },
  { name: "Git", x: 47, y: 43, tilt: -10 },
  { name: "Linux", x: 29, y: 46, tilt: -22 },
  { name: "MongoDB", x: 63, y: 49, tilt: 15 },
  { name: "SQL", x: 78, y: 43, tilt: 23 },
  { name: "Docker", x: 11, y: 55, tilt: -26 },
  { name: "PHP", x: 90, y: 59, tilt: 25 },
] as const

export type SkillSlot = { x: number; y: number; tilt: number }

/** Keep every category above and around the box, including the larger collections. */
export function skillSlot(name: string, index: number, count: number, featured: boolean): SkillSlot {
  const featuredSlot = featured ? featuredSkills.find(skill => skill.name === name) : undefined
  if (featuredSlot) return featuredSlot

  const upperCount = Math.ceil(count / 2)
  const upper = index < upperCount
  const rowCount = upper ? upperCount : count - upperCount
  const rowIndex = upper ? index : index - upperCount
  const spread = count > 10 ? 42 : count > 8 ? 39 : count > 6 ? 35 : 29
  const offset = rowCount <= 1 ? 0 : (rowIndex / (rowCount - 1)) * 2 - 1
  return {
    x: 50 + offset * (upper ? spread : Math.min(40, spread + 2)),
    y: (upper ? 13 : 43) + offset * offset * (upper ? 12 : 11),
    tilt: offset * (count > 10 ? 8 : 16) + (upper ? -2 : 2),
  }
}

const shortLabels: Record<string, string> = {
  "REST APIs": "REST",
  "Spring Data JPA": "Spring JPA",
  "Clean Architecture": "Clean arch.",
  "MVC Architecture": "MVC",
  "Layered Architecture": "Layered arch.",
  "Oracle Cloud Infrastructure (OCI)": "Oracle Cloud",
  "Authentication & Security": "Auth & security",
  "JPA Entity Relationships": "JPA relations",
  "Networking Fundamentals": "Networking",
  "Machine Learning Pipelines": "ML pipelines",
  "LLM API Integration": "LLM APIs",
  "Google Gemini": "Gemini",
}

export function skillAppearance(name: string, index = 0) {
  const palette: SkillTone[] = ["blue", "green", "rose", "lilac", "peach"]
  return {
    logo: logos[name] ? `/images/skills/${logos[name]}.svg` : null,
    tone: tones[name] ?? palette[index % palette.length],
    label: shortLabels[name] ?? name,
  }
}
