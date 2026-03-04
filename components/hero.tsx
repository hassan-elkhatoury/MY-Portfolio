"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowDown, FileText, Terminal, Database, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import DisplayCards from "@/components/ui/display-cards"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

const heroDisplayCards = [
  {
    icon: <Server className="size-4 text-indigo-300" />,
    title: "Backend",
    description: "Scalable microservices",
    date: "Spring · Java",
    iconClassName: "text-indigo-500",
    titleClassName: "text-indigo-400",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Database className="size-4 text-emerald-300" />,
    title: "Distributed",
    description: "MongoDB · Docker clusters",
    date: "High availability",
    iconClassName: "text-emerald-500",
    titleClassName: "text-emerald-400",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Terminal className="size-4 text-amber-300" />,
    title: "Cloud-Native",
    description: "OCI certified engineer",
    date: "Infrastructure",
    iconClassName: "text-amber-500",
    titleClassName: "text-amber-400",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      {/* Spotlight effect */}
      <Spotlight className="dark:from-primary/20 dark:via-primary/10 dark:to-transparent" size={350} />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      {/* Faint dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 0.5px, transparent 0.5px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl w-full flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center lg:items-start text-center lg:text-left"
        >


          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Hasan El Khatoury
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base font-medium text-primary sm:text-lg"
          >
            Java Backend Engineer
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-1 text-sm text-muted-foreground"
          >
            Distributed Systems · Microservices · Cloud-Native
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground"
          >
            Building scalable, reliable backend systems with clean architecture and production-grade quality.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
            >
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 border-border/80 px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card/80"
            >
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="mt-10 flex items-center gap-1">
            {[
              { href: "https://github.com/hassan-elkhatoury", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/hassan-elkhatoury", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:hassanelkhatoury@gmail.com", icon: Mail, label: "Email" },
            ].map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" ? "_blank" : undefined}
                  rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="rounded-lg p-2.5 text-muted-foreground transition-colors duration-200 hover:bg-card/80 hover:text-foreground"
                  aria-label={social.label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Right side — Interactive 3D + Display Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:flex flex-1 items-center justify-center"
        >
          <div className="relative w-full max-w-md">
            {/* Spline 3D Robot */}
            <div className="relative h-[420px] w-full rounded-[1.25rem] border-[0.75px] border-border/50 p-2 md:rounded-[1.5rem] md:p-2.5">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border-[0.75px] border-border/30 dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
              {/* Gradient fade at edges */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile: Display Cards instead of 3D */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex lg:hidden w-full max-w-sm mx-auto pt-4"
        >
          <DisplayCards cards={heroDisplayCards} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-7 w-4 items-start justify-center rounded-full border border-border/50 p-1"
        >
          <div className="h-1 w-0.5 rounded-full bg-muted-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
