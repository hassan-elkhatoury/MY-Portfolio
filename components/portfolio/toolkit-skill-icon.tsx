import Image from "next/image"
import { ArrowLeftRight, Braces, BrainCircuit, Cloud, Cpu, GitBranch, Layers3, ListTree, Network, Puzzle, Route, ShieldCheck, Timer, Workflow } from "lucide-react"
import { skillAppearance } from "@/lib/toolkit-skills"

const conceptIcons = {
  "Data Structures": ListTree,
  Algorithms: Route,
  "Problem Solving": Puzzle,
  "Complexity Analysis": Timer,
  "Systems Programming": Cpu,
  "Networking Fundamentals": Network,
  "Random Forest": GitBranch,
  "Machine Learning Pipelines": Workflow,
  "LLM API Integration": BrainCircuit,
  AJAX: ArrowLeftRight,
}

/** Product logos stay as independent SVGs; concepts use pictograms instead of invented brands. */
export function ToolkitSkillIcon({ name }: { name: string }) {
  const { logo } = skillAppearance(name)
  if (logo) return <Image src={logo} width={88} height={88} alt="" draggable={false} unoptimized className="tool-brand-logo" />
  if (name === "REST APIs") return <span className="tool-rest-logo"><Cloud size={52} strokeWidth={1.7} /></span>
  if (name === "SQL" || name === "Database Design") return <svg className="tool-sql-logo" viewBox="0 0 80 88" fill="none" aria-hidden="true"><ellipse cx="40" cy="18" rx="26" ry="12" fill="#4269a0" /><path d="M14 22v15c0 16 52 16 52 0V22c-10 13-42 13-52 0Z" fill="#4269a0" /><path d="M14 43v15c0 16 52 16 52 0V43c-10 13-42 13-52 0Z" fill="#355787" /><path d="M14 64v6c0 16 52 16 52 0v-6c-10 13-42 13-52 0Z" fill="#2d4b75" /></svg>
  const Icon = conceptIcons[name as keyof typeof conceptIcons] ?? (/Security|Authentication|Testing/.test(name) ? ShieldCheck
    : /Architecture|OOP|Design Patterns/.test(name) ? Layers3
    : /Machine|Random Forest|Gemini|LLM|OpenRouter/.test(name) ? BrainCircuit
    : /Network|Microservices/.test(name) ? Network
    : /Algorithm|Problem Solving|Complexity/.test(name) ? Route
    : /Agile|Pipelines/.test(name) ? Workflow : Braces)
  return <span className="tool-concept-icon"><Icon size={62} strokeWidth={1.5} /></span>
}
