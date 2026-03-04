"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Award } from "lucide-react"
import Image from "next/image"
import { GlowingEffect } from "@/components/ui/glowing-effect"

type Education = {
  degree: string
  institution: string
  location: string
  period: string
  logo?: string
  details?: string[]
  focus?: string[]
  featured?: boolean
}

const education: Education[] = [
  {
    degree: "Engineering Degree in Computer Science",
    institution: "ENSAH — National School of Applied Sciences, Al Hoceima",
    location: "Al Hoceima, Morocco",
    period: "2022 – 2027 (Expected)",
    logo: "/images/logos/ensah.png",
    details: [
      "Engineering Cycle: 2024 – 2027",
      "Preparatory Classes: 2022 – 2024",
    ],
    focus:[
      "Advanced Algorithms, Advanced Java Programming, Software Architecture, Databases, Networks, Linux"
    ],
    featured: true,
  },
  {
    degree: "Baccalauréat in Mathematical Sciences (French Option)",
    institution: "High School",
    location: "Morocco",
    period: "2022",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="education" className="relative px-6 py-10 md:py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/3 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-3 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Education
            </h2>
            <div className="section-line flex-1" />
          </div>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground">
            Academic foundation in computer science and applied engineering.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-5 md:grid-cols-2"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border/50 p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className={`group flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6 ${
                  edu.featured
                    ? "border-primary/25 hover:border-primary/40"
                    : "border-border/40 hover:border-border/70"
                }`}
                >
              {/* Top row */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-secondary/40">
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-sm object-contain"
                    />
                  ) : (
                    <BookOpen className="h-4.5 w-4.5 text-primary" />
                  )}
                </div>
                {edu.featured && (
                  <span className="flex items-center gap-1 rounded-md bg-primary/8 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                    <Award className="h-2.5 w-2.5" />
                    Current
                  </span>
                )}
              </div>

              {/* Degree */}
              <h3 className="mb-1 text-[15px] font-semibold leading-snug text-foreground">
                {edu.degree}
              </h3>

              {/* Institution */}
              <p className="mb-1 text-sm font-medium text-primary/80">
                {edu.institution}
              </p>

              {/* Period */}
              <p className="mb-4 text-xs text-muted-foreground">
                {edu.period}
              </p>

              {/* Details */}
              {edu.details && edu.details.length > 0 && (
                <div className={`${edu.featured ? "grid gap-x-8 gap-y-2.5 sm:grid-cols-2 md:grid-cols-3" : "space-y-2"}`}>
                  {edu.details.map((detail, i) => (
                    <div
                      key={i}
                      className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                      {detail}
                    </div>
                  ))}
                </div>
              )}
                {/* focus */}
                {edu.focus && edu.focus.length > 0 && (
                <div className="mt-4 space-y-2">
                  {edu.focus.map((foc, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                    <span className="flex-1 break-words">{foc}</span>
                  </div>
                  ))}
                </div>
                )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
