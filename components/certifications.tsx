"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Award, ExternalLink, FileDown, ChevronDown, ChevronUp, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"

type Certification = {
  title: string
  issuer: string
  issued?: string
  expires?: string
  credentialId?: string
  skills?: string[]
  verifyUrl?: string
  pdfFile?: string
  featured?: boolean
}

const certifications: Certification[] = [
  {
    title: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle",
    issued: "Feb 2026",
    credentialId: "103380522OCPJSE17",
    skills: ["Modules", "Generics"],
    pdfFile: "JAVA17_certif.pdf",
    featured: true,
  },
  {
    title: "Oracle Certified Professional: Java SE 11 Developer",
    issuer: "Oracle",
    issued: "Feb 2026",
    credentialId: "103380522OCPJSE11",
    skills: ["Java", "OOP", "Exception Handling", "JDBC"],
    pdfFile: "JAVA11_certif.pdf",
    featured: true,
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    issued: "Dec 2025",
    expires: "Dec 2027",
    credentialId: "103380522OCI25FND",
    skills: ["OCI"],
    pdfFile: "OCI_certif.pdf",
    featured: true,
  },
  {
    title: "Java Programming Fundamentals",
    issuer: "IBM",
    credentialId: "J5AJUMQQ2VWR",
  },
  {
    title: "English for Career Development",
    issuer: "University of Pennsylvania",
    issued: "Nov 2025",
    credentialId: "VZJ8WT1LARVN",
  },
  {
    title: "OCI Foundations",
    issuer: "Oracle via Coursera",
    issued: "Nov 2025",
    credentialId: "YCQ9UV5ESM1D",
  },
  {
    title: "Git, GitLab, GitHub Fundamentals",
    issuer: "Udemy",
    issued: "Feb 2025",
  },
  {
    title: "Complete C Programming Course",
    issuer: "Udemy",
    issued: "Dec 2024",
  },
  {
    title: "CSS, Bootstrap, JavaScript, and PHP Stack",
    issuer: "Udemy",
    issued: "Mar 2025",
  },
  {
    title: "Java App Development Project",
    issuer: "SkillUp Online",
    issued: "Nov 2025",
  },
  {
    title: "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
    issuer: "IBM",
    issued: "Nov 2025",
    verifyUrl: "https://coursera.org/verify/I8OGFV1ECM2J",
  },
  {
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM",
    issued: "Nov 2025",
    verifyUrl: "https://coursera.org/verify/VOYNZ8ZAOPX3",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

function CertCard({ cert }: { cert: Certification }) {
  const card = (
    <motion.div
      variants={cardVariants}
      className={`group flex h-full flex-col rounded-lg border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
        cert.featured
          ? "border-primary/25 hover:border-primary/40"
          : "border-border/40 hover:border-border"
      }`}
    >
      <div className="flex flex-1 flex-col p-5">
        {/* Top row */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          {cert.featured && (
            <span className="flex items-center gap-1 rounded-md bg-primary/8 px-2 py-0.5 text-[10px] font-semibold text-primary">
              <Award className="h-2.5 w-2.5" />
              Professional
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-1 text-[13px] font-semibold leading-snug text-foreground">
          {cert.title}
        </h3>

        {/* Issuer */}
        <p className="mb-2.5 text-xs text-muted-foreground">{cert.issuer}</p>

        {/* Meta */}
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          {cert.issued && <span>Issued {cert.issued}</span>}
          {cert.expires && <span>Expires {cert.expires}</span>}
        </div>

        {cert.credentialId && (
          <p className="mb-2.5 truncate font-mono text-[10px] text-muted-foreground/60">
            ID: {cert.credentialId}
          </p>
        )}

        {/* Skills */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border/30 pt-3">
          {cert.verifyUrl && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-7 border-border/50 px-2.5 text-[11px] font-medium text-foreground hover:border-border hover:bg-secondary/50"
            >
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                Verify
              </a>
            </Button>
          )}
          {cert.pdfFile && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="h-7 px-2.5 text-[11px] text-muted-foreground hover:text-foreground"
            >
              <a href={`/${cert.pdfFile}`} target="_blank" rel="noopener noreferrer">
                <FileDown className="mr-1 h-3 w-3" />
                PDF
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )

  if (cert.featured) {
    return (
      <div className="relative rounded-[1.25rem] border-[0.75px] border-border/50 p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        {card}
      </div>
    )
  }

  return card
}

export function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [showAll, setShowAll] = useState(false)

  const visibleCerts = showAll ? certifications : certifications.slice(0, 6)

  return (
    <section id="certifications" className="relative px-6 py-28 md:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-3 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Certifications
            </h2>
            <div className="section-line flex-1" />
            <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {certifications.length}
            </span>
          </div>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground">
            Professional certifications validating expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleCerts.map((cert) => (
            <CertCard key={cert.title} cert={cert} />
          ))}
        </motion.div>

        {/* Show more / less */}
        {certifications.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="border-border/50 text-sm text-muted-foreground hover:border-border hover:text-foreground"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="ml-1.5 h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Show All {certifications.length}
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
