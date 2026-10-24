"use client"

import { Component, useCallback, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { useInView } from "framer-motion"
import { useTheme } from "next-themes"
import { PackageOpen, RotateCcw } from "lucide-react"
import { projects, type Project } from "@/lib/portfolio-data"
import { useMotionPreferences } from "./motion-preferences"
import type { ArchiveSceneProps } from "./project-archive-scene"
import "./project-crate.css"

export type ProjectCardBounds = { x: number; y: number; width: number; height: number }
type Props = {
  active: number | null
  selected: Project | null
  onActive: (index: number | null) => void
  onSelect: (project: Project, trigger: HTMLButtonElement, bounds?: ProjectCardBounds) => void
}

const ArchiveScene = dynamic<ArchiveSceneProps>(() => import("./project-archive-scene"), { ssr: false })

function SceneFallback() {
  return <div className="archive-fallback" role="status">
    <PackageOpen size={36} strokeWidth={1} aria-hidden="true" />
    <p>The collection is ready below.</p>
    <span>Choose a project to look inside.</span>
  </div>
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children }
}

export function ProjectCrate({ active, selected, onActive, onSelect }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const control = useRef<HTMLButtonElement>(null)
  const nearby = useInView(root, { margin: "400px 0px", once: true })
  const introduced = useInView(root, { amount: .25, once: true })
  const visible = useInView(root, { amount: .05 })
  const { paused } = useMotionPreferences()
  const { resolvedTheme } = useTheme()
  const [override, setOverride] = useState<boolean | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const open = override ?? introduced
  const markReady = useCallback(() => setReady(true), [])
  const markFailed = useCallback(() => setFailed(true), [])
  const selectCard = useCallback((index: number, bounds: ProjectCardBounds) => {
    const trigger = document.getElementById(`archive-project-${index}`) as HTMLButtonElement | null
    if (trigger || control.current) onSelect(projects[index], trigger ?? control.current!, bounds)
  }, [onSelect])

  return <div ref={root} className="project-scene" data-state={open ? "open" : "closed"} data-renderer={failed ? "fallback" : ready ? "webgl" : "loading"}>
    <div className="archive-stage" aria-label="Interactive project archive" aria-describedby="archive-instructions">
      {failed ? <SceneFallback /> : <SceneBoundary onError={markFailed}>
        {nearby && <ArchiveScene open={open} active={active} selected={selected ? projects.indexOf(selected) : null}
          paused={paused} visible={visible} dark={resolvedTheme === "dark"}
          onActive={onActive} onSelect={selectCard} onReady={markReady} onError={markFailed} />}
        {!ready && <div className="archive-loading" role="status"><span>THINGS I BUILT</span><small>Opening the archive…</small></div>}
      </SceneBoundary>}
    </div>
    <div className="archive-controls">
      <p id="archive-instructions">{open ? "Hover to lift. Click to explore." : "Hover to turn the box. Open to explore."}<span>Or choose a project below.</span></p>
      {!failed && <button ref={control} type="button" className="project-crate-control" onClick={() => setOverride(!open)} aria-expanded={open}>
        {open ? <RotateCcw size={15} /> : <PackageOpen size={15} />}{open ? "Close the archive" : "Open the archive"}
      </button>}
    </div>
  </div>
}
