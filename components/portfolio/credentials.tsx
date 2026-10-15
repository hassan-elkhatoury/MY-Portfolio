"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUp, ArrowUpRight, Check, FileDown, BadgeCheck } from "lucide-react"
import Image from "next/image"
import { useState, type CSSProperties } from "react"
import { certifications, profile, type Certification } from "@/lib/portfolio-data"
import "./credentials.css"

const featuredCredentials = certifications.filter(certification => certification.featured)
const furtherCredentials = certifications.filter(certification => !certification.featured)

function CredentialLinks({ certificate, compact = false }: { certificate: Certification; compact?: boolean }) {
  return (
    <div className={`credential-links${compact ? " credential-links-compact" : ""}`}>
      {certificate.verifyUrl && <a href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${certificate.title}`}>Verify credential <ArrowUpRight size={15} aria-hidden="true" /></a>}
      {certificate.pdfFile && <a className="credential-pdf" href={certificate.pdfFile} target="_blank" rel="noopener noreferrer" aria-label={`Open PDF: ${certificate.title}`}><FileDown size={14} aria-hidden="true" /><span>PDF</span></a>}
    </div>
  )
}

function CredentialPaper({ certificate, index }: { certificate: Certification; index: number }) {
  const reducedMotion = useReducedMotion()
  const styles = { "--credential-rotation": `${[-3, 1.5, -1][index]}deg` } as CSSProperties
  const title = certificate.title.replace("Oracle Certified Professional: ", "").replace("Oracle Cloud Infrastructure 2025 Certified ", "Cloud Infrastructure 2025 ")
  return (
    <motion.article className={`credential-paper credential-paper-${index + 1}`} style={styles} initial={false} whileInView={reducedMotion ? {} : { opacity: [.5, 1], y: [34, 0] }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: reducedMotion ? 0 : index * .12 }}>
      <span className="credential-tape" aria-hidden="true" />
      <div className="credential-paper-content">
        <div className="credential-paper-top"><Image src={certificate.logo} width={68} height={29} alt={certificate.issuer} /><span>{certificate.issued}</span></div>
        <div className="credential-rule" aria-hidden="true" />
        <p className="credential-designation">{index === 2 ? "CERTIFIED FOUNDATIONS ASSOCIATE" : "CERTIFIED PROFESSIONAL"}</p>
        <h3>{title}</h3>
        <div className="credential-recipient"><small>AWARDED TO</small><strong>{profile.name}</strong></div>
        <div className="credential-paper-footer">
          <div><span className="credential-id-label">CREDENTIAL ID</span><span className="credential-id">{certificate.credentialId}</span>{certificate.expires && <span className="credential-expiry">Valid through {certificate.expires}</span>}</div>
          <div className="credential-seal" aria-hidden="true"><Check size={23} strokeWidth={1.7} /></div>
        </div>
        <CredentialLinks certificate={certificate} />
      </div>
    </motion.article>
  )
}

export function Credentials() {
  const [expanded, setExpanded] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <section id="certifications" className="portfolio-section credential-section" aria-labelledby="credential-heading">
      <div className="section-inner">
        <motion.header className="credential-header" initial={false} whileInView={reducedMotion ? {} : { opacity: [.5, 1], y: [20, 0] }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }}>
          <span className="section-label"><BadgeCheck size={18} aria-hidden="true" /> ALWAYS A STUDENT</span>
          <h2 id="credential-heading" className="section-heading">A little curiosity.<br />A lot of <span className="highlight">commitment.</span></h2>
          <p className="section-copy">Learning is part of the craft. Here are the credentials collected along the way.</p>
        </motion.header>
        <div className="credential-papers">
          {featuredCredentials.map((certificate, index) => <CredentialPaper key={certificate.title} certificate={certificate} index={index} />)}
        </div>
        <div className="credential-further">
          <button className="credential-expand" aria-expanded={expanded} aria-controls="credential-further-list" onClick={() => setExpanded(!expanded)}>
            <span><span className="credential-count">+{furtherCredentials.length}</span><span>There’s more in the notebook.<small>IBM, Udemy, Coursera & more</small></span></span>
            <span className="credential-expand-action">{expanded ? "Close the notebook" : "Explore all credentials"}{expanded ? <ArrowUp size={17} /> : <ArrowDown size={17} />}</span>
          </button>
          <div id="credential-further-list">
            <AnimatePresence initial={false}>
            {expanded && <motion.div initial={{ height: reducedMotion ? "auto" : 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: reducedMotion ? "auto" : 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .35, ease: "easeInOut" }} className="credential-list-wrap">
              <ol className="credential-list">
                {furtherCredentials.map((certificate, index) => (
                  <li key={certificate.title} className="credential-list-row">
                    <span className="credential-list-number">{String(index + 4).padStart(2, "0")}</span>
                    <Image className="credential-list-logo" src={certificate.logo} width={36} height={36} alt="" />
                    <div className="credential-list-title"><h3>{certificate.title}</h3><p>{certificate.issuer}{certificate.issued && <span> / {certificate.issued}</span>}</p></div>
                    <CredentialLinks certificate={certificate} compact />
                  </li>
                ))}
              </ol>
            </motion.div>}
            </AnimatePresence>
          </div>
        </div>
        <p className="credential-footnote">{certifications.length} credentials. One ongoing journey.</p>
      </div>
    </section>
  )
}
