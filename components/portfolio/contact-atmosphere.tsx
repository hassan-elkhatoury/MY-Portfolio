"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { useMotionPreferences } from "./motion-preferences"
import "./contact-atmosphere.css"

export function ContactAtmosphere() {
  const scene = useRef<HTMLDivElement>(null)
  const visible = useInView(scene, { margin: "100px" })
  const { paused } = useMotionPreferences()
  return <div ref={scene} className="contact-atmosphere" aria-hidden="true" data-running={visible && !paused}>
    <picture className="contact-sky-art contact-sky-day"><source srcSet="/images/atmosphere/day-420.webp 420w, /images/atmosphere/day-840.webp 840w, /images/atmosphere/day-1672.webp 1672w" sizes="(max-width: 700px) 840px, 1672px" /><img src="/images/atmosphere/day-1672.webp" width={1672} height={941} alt="" loading="lazy" decoding="async" /></picture>
    <picture className="contact-sky-art contact-sky-night"><source srcSet="/images/atmosphere/night-420.webp 420w, /images/atmosphere/night-840.webp 840w, /images/atmosphere/night-1672.webp 1672w" sizes="(max-width: 700px) 840px, 1672px" /><img src="/images/atmosphere/night-1672.webp" width={1672} height={941} alt="" loading="lazy" decoding="async" /></picture>
    <div className="contact-night-stars"><i /><i /><i /><i /><i /></div>
    <div className="contact-sky-veil" /><div className="contact-sky-haze" />
  </div>
}
