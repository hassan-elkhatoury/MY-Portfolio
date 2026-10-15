"use client"

import type { ReactNode } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"
import { useMotionPreferences } from "./motion-preferences"

/** Separate cutouts share a pointer, but travel at their own distance from the camera. */
export function SceneDepth({ pointerX, pointerY, distance, disabled, className = "", children, name }: {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  distance: number
  disabled: boolean
  className?: string
  children: ReactNode
  name: string
}) {
  const { paused } = useMotionPreferences()
  const x = useTransform(pointerX, value => value * distance)
  const y = useTransform(pointerY, value => value * distance * .55)

  return <motion.div className={`valley-depth ${className}`} data-scene-layer={name}
    style={disabled || paused ? undefined : { x, y }}>{children}</motion.div>
}
