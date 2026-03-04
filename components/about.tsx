"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { MapPin, Code2, Terminal, Briefcase } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const quickFacts = [
  { icon: MapPin, label: "Location", value: "Morocco" },
  { icon: Code2, label: "Focus", value: "Backend Engineering" },
  { icon: Terminal, label: "Main Language", value: "Java" },
  { icon: Briefcase, label: "Status", value: "Software Engineer" },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="about" className="relative px-6 py-8 md:py-12">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/[0.03] blur-[140px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">About</h2>
          <div className="section-line flex-1" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid items-center gap-12 md:grid-cols-5 md:gap-16"
        >
          {/* Photo */}
          <motion.div variants={itemVariants} className="flex justify-center md:col-span-2">
            <div className="relative">
              <div className="relative rounded-[1.25rem] border-[0.75px] border-border/50 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative aspect-[3/4] w-60 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-card shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] sm:w-68">
                  <Image
                    src="/images/profile.png"
                    alt="Hasan El Khatoury"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <p className="text-[15px] leading-[1.75] text-muted-foreground">
              I am a Computer Science Engineering student with a deep focus on backend development
              and distributed systems. Holding the Oracle Certified Professional credential for both
              Java SE 11 and SE 17, I bring strong foundations in building robust, scalable
              microservices architectures.
            </p>
            <p className="mt-4 text-[15px] leading-[1.75] text-muted-foreground">
              My passion lies in designing cloud-native applications, crafting clean RESTful APIs,
              and exploring the intricacies of distributed computing. I am driven by a commitment
              to production-quality code, thoughtful system design, and continuously pushing the
              boundaries of what I can build.
            </p>

            {/* Quick facts */}
            <motion.div
              variants={containerVariants}
              className="mt-8 grid grid-cols-2 gap-2.5"
            >
              {quickFacts.map((fact) => {
                const Icon = fact.icon
                return (
                  <motion.div
                    key={fact.label}
                    variants={itemVariants}
                    className="relative rounded-[1rem] border-[0.75px] border-border/50 p-1.5"
                  >
                    <GlowingEffect
                      spread={30}
                      glow={true}
                      disabled={false}
                      proximity={48}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                    <div className="flex items-center gap-3 rounded-[0.7rem] border-[0.75px] border-border/30 bg-card/80 p-3 shadow-sm">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {fact.label}
                        </p>
                        <p className="text-sm font-medium text-foreground">{fact.value}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
