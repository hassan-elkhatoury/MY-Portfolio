"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import { GlowingEffect } from "@/components/ui/glowing-effect"

type Experience = {
  title: string
  company: string
  logo: string
  location: string
  period: string
  type: string
  responsibilities: string[]
}

const experiences: Experience[] = [
  {
    title: "Web Development Intern",
    company: "CodSoft",
    logo: "/images/logos/codsoft.png",
    location: "Remote",
    period: "Feb 2025 – Mar 2025",
    type: "Internship",
    responsibilities: [
      "Built and delivered 10+ web application features using REST APIs and modern web technologies",
      "Collaborated with a distributed team using Git workflows and pull request reviews",
      "Applied clean architecture principles to improve code maintainability and modularity",
    ],
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

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="experience" className="relative px-6 py-10 md:py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-3 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Experience
            </h2>
            <div className="section-line flex-1" />
          </div>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground">
            Professional experience building software in collaborative, production-oriented environments.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical connector line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border/60 md:left-[23px]" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative pl-12 pb-12 last:pb-0 md:pl-14"
            >
              {/* Timeline dot */}
              <div className="absolute left-2.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary/40 bg-background transition-colors group-hover:border-primary md:left-3 md:h-6 md:w-6">
                <div className="h-2 w-2 rounded-full bg-primary/60 transition-colors group-hover:bg-primary md:h-2.5 md:w-2.5" />
              </div>

              {/* Card */}
              <div className="relative rounded-[1.25rem] border-[0.75px] border-border/50 p-2 md:rounded-[1.5rem] md:p-2.5">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
              <div className="rounded-xl border-[0.75px] border-border/30 bg-card p-5 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border/70 hover:shadow-md sm:p-6">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-secondary/40">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-sm object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-primary/80">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Type badge */}
                <div className="mb-4">
                  <span className="rounded-md bg-primary/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {exp.type}
                  </span>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
