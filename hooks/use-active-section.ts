"use client"

import { useSyncExternalStore } from "react"

export const pageSections = [
  { id: "home", tab: "home", label: "Workspace" },
  { id: "journey", tab: "journey", label: "Journey" },
  { id: "selected-work", tab: "selected-work", label: "Case studies" },
  { id: "projects", tab: "selected-work", label: "Project box" },
  { id: "about", tab: "about", label: "About" },
  { id: "certifications", tab: "about", label: "Credentials" },
  { id: "skills", tab: "about", label: "Toolkit" },
  { id: "contact", tab: "contact", label: "Contact" },
]
let current = "home"
const listeners = new Set<() => void>()
let stop: (() => void) | undefined

function watchSections() {
  const elements = pageSections.map(section => document.getElementById(section.id)).filter((el): el is HTMLElement => Boolean(el))
  let positions: { id: string; top: number }[] = []
  let dirty = true, frame = 0
  const update = () => {
    frame = 0
    if (dirty) {
      positions = elements.map(element => ({ id: element.id, top: element.getBoundingClientRect().top + window.scrollY }))
      dirty = false
    }
    const readingLine = window.scrollY + Math.min(window.innerHeight * .3, 240)
    let next = "home"
    positions.forEach(section => { if (section.top <= readingLine) next = section.id })
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) next = "contact"
    if (next !== current) { current = next; listeners.forEach(listener => listener()) }
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
  const measure = () => { dirty = true; schedule() }
  const observer = new ResizeObserver(measure)
  elements.forEach(element => observer.observe(element))
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", measure)
  window.addEventListener("hashchange", measure)
  schedule()
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", measure)
    window.removeEventListener("hashchange", measure)
  }
}
function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) stop = watchSections()
  return () => { listeners.delete(listener); if (!listeners.size) { stop?.(); stop = undefined } }
}
export function useActiveSection() { return useSyncExternalStore(subscribe, () => current, () => "home") }
