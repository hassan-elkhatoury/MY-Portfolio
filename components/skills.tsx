"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Server, Database, Cloud, GraduationCap } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const skillGroups = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Java", "Python", "C", "C++", "SQL", "JavaScript"],
    status: "Core",
    colSpan: 3,
    hasPersistentHover: true,
  },
  {
    title: "Backend & Software Engineering",
    icon: Server,
    skills: ["REST APIs", "MVC Architecture", "Layered Architecture", "OOP", "Design Patterns", "Authentication & Security", "Microservices"],
    status: "Specialty",
    colSpan: 3,
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "Oracle Database", "MongoDB", "JDBC", "Database Design"],
    status: "Data",
    colSpan: 2,
  },
  {
    title: "Tools & Platforms",
    icon: Cloud,
    skills: ["Git", "GitHub", "Linux", "Docker", "Oracle Cloud Infrastructure (OCI)", "Maven", "CMake"],
    status: "DevOps",
    colSpan: 2,
  },
  {
    title: "CS Fundamentals",
    icon: GraduationCap,
    skills: ["Data Structures", "Algorithms", "Problem Solving", "Complexity Analysis", "Systems Programming", "Networking Fundamentals"],
    status: "Foundation",
    colSpan: 2,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="skills" className="relative px-6 py-8 md:py-12">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/3 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-3 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">Skills</h2>
            <div className="section-line flex-1" />
          </div>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground">
            Technologies and tools I work with to build reliable backend systems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          {skillGroups.map((group) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.title}
                variants={cardVariants}
                className={`${group.colSpan === 3 ? "md:col-span-3" : "md:col-span-2"}`}
              >
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border/50 p-2 md:rounded-[1.5rem] md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-card p-5 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border-[0.75px] border-border bg-muted">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-serif text-sm font-semibold text-foreground">
                          {group.title}
                        </h3>
                      </div>
                      <span className="rounded-lg bg-secondary px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {group.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-secondary/80 px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
