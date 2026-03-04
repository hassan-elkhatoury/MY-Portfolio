"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code2, Award, FolderGit2, Briefcase } from "lucide-react"

type Stat = {
  label: string
  value: number
  suffix: string
  icon: React.ElementType
}

const stats: Stat[] = [
  { label: "Projects Built", value: 12, suffix: "+", icon: FolderGit2 },
  { label: "Certifications", value: 12, suffix: "", icon: Award },
  { label: "Oracle Certs", value: 3, suffix: "", icon: Code2 },
  { label: "Experience", value: 2, suffix: "+ yr", icon: Briefcase },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayed, setDisplayed] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  const spring = useSpring(0, { stiffness: 60, damping: 20 })
  const rounded = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) spring.set(value)
  }, [isInView, spring, value])

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayed(latest))
  }, [rounded])

  return (
    <span ref={ref} className="tabular-nums">
      {displayed}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <section className="relative px-6 py-8 md:py-12">
      <div ref={ref} className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-card/60 px-4 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border/70 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <span className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
