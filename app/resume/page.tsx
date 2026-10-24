import { redirect } from "next/navigation"
import { profile } from "@/lib/portfolio-data"

export default function ResumePage() {
  redirect(profile.resume)
}
