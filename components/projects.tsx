"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Github, FileText, Star, ImageIcon, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import Image from "next/image"

type Project = {
  title: string
  category: string
  description: string
  tech: string[]
  image?: string
  githubUrl: string
  demoUrl?: string
  reportUrl?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "InterviewAI",
    category: "Backend",
    description:
      "AI-assisted Java desktop platform that simulates technical interviews with gamification and personalized feedback.",
    tech: ["Java", "JavaFX", "MySQL", "Maven", "BCrypt"],
    image: "/images/projects/interview-ai.png",
    githubUrl: "https://github.com/hassan-elkhatoury/InterviewAI",
    reportUrl: "#project",
    featured: true,
  },
  {
    title: "Qt Messenger",
    category: "Academic",
    description:
      "Multi-client real-time messaging system built with C++ and Qt using TCP sockets and asynchronous networking.",
    image: "/images/projects/qt-messenger.png",
    tech: ["C++17", "Qt", "TCP", "SQLite", "JSON"],
    githubUrl: "https://github.com/hassan-elkhatoury/qt-messenger",
    featured: true,
  },
  {
    title: "MongoShardLab",
    category: "Distributed Systems",
    description:
      "Advanced distributed systems laboratory demonstrating real-world deployment of a highly available, sharded MongoDB cluster across multiple physical machines.",
    image: "/images/projects/MongoShardLab.png",
    tech: ["MongoDB", "Docker", "Docker Compose", "Next.js", "LAN"],
    githubUrl: "https://github.com/hassan-elkhatoury/MongoShardLab",
    demoUrl: "https://mongodb-gi2.vercel.app/",
    featured: true,
  },
  {
    title: "CAN-2025 Predictions",
    category: "Machine Learning",
    description:
      "End-to-end ML pipeline predicting AFCON outcomes using Random Forest and Monte Carlo simulations.",
    image: "/images/projects/can-2025.png",
    tech: ["Python", "scikit-learn", "pandas", "FastAPI"],
    githubUrl: "https://github.com/hassan-elkhatoury/CAN-2025-Predictions",
    reportUrl: "reports/RAPPORT_ML_PROJECT.pdf",
  },
  {
    title: "E-Commerce Website",
    category: "Full Stack",
    description:
      "Laravel-based e-commerce platform with authentication, cart, and admin dashboard.",
    image: "/images/projects/ecommerce.png",
    tech: ["PHP", "Laravel", "MySQL", "Blade"],
    githubUrl: "https://github.com/hassan-elkhatoury/E-Commerce_Website",
  },
  {
    title: "Gestion des Affectations des Enseignements",
    category: "Full Stack",
    description:
      "Web application for managing teaching unit assignments across academic departments. Features role-based access for admins, department heads, coordinators, and professors with preference selection, workload balancing, grade uploads, and Excel import/export.",
    image: "/images/projects/student-management.png",
    tech: ["PHP", "MySQL", "Composer", "XAMPP"],
    githubUrl: "https://github.com/hassan-elkhatoury/e-service",
  },

]

const categories = ["All", "Backend", "Distributed Systems", "Machine Learning", "Full Stack", "Academic"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } },
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="relative px-6 py-8 md:py-12">
      {/* Subtle section glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[140px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Section header */}
          <div className="mb-3 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">Projects</h2>
            <div className="section-line flex-1" />
          </div>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground">
            A collection of projects showcasing backend architecture, distributed systems, and full-stack development.
          </p>

          {/* Filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/50 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <motion.div key={project.title} variants={cardVariants} layout>
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border/50 p-2 md:rounded-[1.5rem] md:p-2.5">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-card shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                  {/* Thumbnail */}
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border/30 bg-secondary/30">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                        <ImageIcon className="h-7 w-7" />
                        <span className="text-[11px] font-medium">Preview</span>
                      </div>
                    )}

                    {/* Featured badge — small, elegant */}
                    {project.featured && (
                      <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-md bg-foreground/90 px-2 py-0.5 text-[10px] font-semibold text-background">
                        <Star className="h-2.5 w-2.5 fill-current" />
                        Featured
                      </div>
                    )}

                    {/* Category */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="rounded-md bg-card/90 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-1.5 font-serif text-base font-semibold text-foreground">
                      {project.title}
                    </h3>

                    <p className="mb-4 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Tech chips */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions — clear hierarchy: GitHub primary, Demo secondary, Report ghost */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-border/30 pt-3.5">
                      <Button
                        asChild
                        size="sm"
                        className="h-7 bg-foreground px-3 text-[12px] font-medium text-background shadow-sm hover:bg-foreground/90"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3 w-3" />
                          Code
                        </a>
                      </Button>
                      {project.demoUrl && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="h-7 px-3 text-[12px] font-medium"
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1.5 h-3 w-3" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.reportUrl && (
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2.5 text-[12px] text-muted-foreground hover:text-foreground"
                        >
                          <a href={project.reportUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-1 h-3 w-3" />
                            Report
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
