"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { motion, useInView, type MotionValue } from "framer-motion"
import { memo, useCallback, useRef, useState } from "react"

const JourneyScene = dynamic(() => import("./journey-scene"), { ssr: false })

/** Keep the illustration underneath the lazy 3D scene, including on WebGL failure. */
export const JourneyTerrain = memo(function JourneyTerrain({ paused, tiltX, tiltY }: {
  paused: boolean
  tiltX: MotionValue<number>
  tiltY: MotionValue<number>
}) {
  const root = useRef<HTMLDivElement>(null)
  const near = useInView(root, { once: true, margin: "300px 0px" })
  const visible = useInView(root, { amount: .05 })
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  const onError = useCallback(() => { setFailed(true); setReady(false) }, [])

  return <div ref={root} className={`journey-terrain${ready ? " is-rendered" : ""}`} aria-hidden="true">
    <motion.div className="journey-terrain-fallback" style={{ rotateX: tiltX, rotateY: tiltY }}>
    <Image src="/images/journey/curiosity-atlas-terrain.webp" alt="" width={1774} height={887}
      sizes="(max-width: 760px) 1000px, (max-width: 1500px) 1100px, 1400px" className="journey-terrain-art" />
    <svg className="journey-terrain-objects" viewBox="0 0 1800 900">
      <g transform="translate(1200 748) rotate(9)">
        <ellipse cy="14" rx="35" ry="9" fill="#183c42" opacity=".19" />
        <path d="M-46 16Q-2 30 42 16M-53 25Q0 38 51 25" fill="none" stroke="#e2efe3" strokeWidth="2" opacity=".5" />
        <path d="M-27 7 32 7 20 17H-16Z" fill="#5b4834" />
        <path d="M1 7V-58" stroke="#655c45" strokeWidth="2.5" />
        <path d="M-3-53-27 2H-3ZM5-48Q20-24 29 2H5Z" fill="#fffbed" />
      </g>
    </svg>
    </motion.div>
    {near && !failed && <div className="journey-terrain-canvas">
      <JourneyScene active={visible && !paused} tiltX={tiltX} tiltY={tiltY} onReady={onReady} onError={onError} />
    </div>}
  </div>
})
