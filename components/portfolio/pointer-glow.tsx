"use client"

import { motion, useSpring } from "framer-motion"
import { useEffect } from "react"
import { useMotionPreferences } from "./motion-preferences"
import "./pointer-glow.css"

export function PointerGlow() {
  const { paused } = useMotionPreferences()
  const x = useSpring(-1000, { stiffness: 190, damping: 30, mass: .55 })
  const y = useSpring(-1000, { stiffness: 190, damping: 30, mass: .55 })
  const opacity = useSpring(0, { stiffness: 90, damping: 24 })

  useEffect(() => {
    if (paused) return
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    let following = false

    const hide = () => { following = false; opacity.set(0) }
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== "mouse") { hide(); return }
      // Re-enter at the pointer, without sweeping in from its previous location.
      if (!following) {
        x.jump(event.clientX)
        y.jump(event.clientY + 16)
        following = true
        opacity.set(1)
      } else {
        x.set(event.clientX)
        y.set(event.clientY + 16)
      }
    }
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide() }
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") hide() }
    const visibility = () => { if (document.hidden) hide() }
    const capability = () => { if (!finePointer.matches) hide() }

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerout", leave)
    window.addEventListener("blur", hide)
    window.addEventListener("keydown", keyboard)
    document.addEventListener("visibilitychange", visibility)
    finePointer.addEventListener("change", capability)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerout", leave)
      window.removeEventListener("blur", hide)
      window.removeEventListener("keydown", keyboard)
      document.removeEventListener("visibilitychange", visibility)
      finePointer.removeEventListener("change", capability)
      opacity.jump(0)
    }
  }, [paused, x, y, opacity])

  return <motion.div className="portfolio-pointer-glow" style={{ x, y, opacity }} aria-hidden="true" />
}
