export function projectCaseStudyPath(title: string): string | undefined {
  if (title === "InterviewAI") return "/work/interview-ai"
  if (title.startsWith("MODEYA")) return "/work/modeya"
  return undefined
}
