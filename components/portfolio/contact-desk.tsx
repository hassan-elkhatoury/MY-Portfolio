"use client"

import { useCallback, useEffect, useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Send } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { AmbientPlayer } from "./ambient-player"
import "./contact-desk.css"
import { ContactAtmosphere } from "./contact-atmosphere"
import { useMotionPreferences } from "./motion-preferences"

const contactKeys = [
  { key: "M", label: "Email", href: `mailto:${profile.email}`, Icon: Mail, color: "red", caption: "Roles, projects, or just hi.", position: "after" },
  { key: "G", label: "GitHub", href: profile.github, Icon: Github, color: "purple", caption: "Where I build in public.", position: "before" },
  { key: "L", label: "LinkedIn", href: profile.linkedin, Icon: Linkedin, color: "blue", caption: "The work, and what I learn doing it.", position: "after" },
  { key: "S", label: "Message", href: "#contact-message-form", Icon: Send, color: "teal", caption: "Prefer a little note? Write right here.", position: "before" },
  { key: "R", label: "Résumé", href: profile.resume, Icon: ArrowDown, color: "yellow", caption: "My résumé, one click away.", position: "after" },
]

/** A live desk readout: availability, local time in Marrakech, and a reply window. */
function DeskStatus() {
  const [clock, setClock] = useState<string | null>(null)

  useEffect(() => {
    const format = () => {
      try {
        setClock(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", hour: "2-digit", minute: "2-digit" }).format(new Date()))
      } catch {
        setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }))
      }
    }
    format()
    const timer = window.setInterval(format, 30000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="contact-desk-status" aria-label="Current availability">
      <span className="contact-desk-status-item contact-desk-status-live">
        <i aria-hidden="true" /><span>Open to PFE {profile.graduationYear}</span>
      </span>
      <span className="contact-desk-status-item">
        <span className="contact-desk-status-label">Marrakech</span>
        <span className="contact-desk-clock" suppressHydrationWarning>{clock ?? "—"}{clock && <small> local</small>}</span>
      </span>
      <span className="contact-desk-status-item">
        <span className="contact-desk-status-label">Replies</span><span>within a day</span>
      </span>
    </div>
  )
}


export function ContactDesk() {
  const { paused: reduceMotion } = useMotionPreferences()
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle")
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const openMessage = useCallback(() => {
    const details = document.getElementById("contact-message-form") as HTMLDetailsElement | null
    if (!details) return
    details.open = true
    details.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" })
    document.getElementById("contact-name")?.focus({ preventScroll: true })
  }, [reduceMotion])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.defaultPrevented) return
      const target = event.target
      if (!(target instanceof Element) || !target.closest("[data-contact-keyboard]")) return
      if (target.closest("input, textarea, select, button, form, [contenteditable], [role='dialog'], dialog")) return
      if (document.querySelector("dialog[open], [role='dialog'][aria-modal='true']")) return
      const item = contactKeys.find(item => item.key.toLowerCase() === event.key.toLowerCase())
      if (!item) return
      event.preventDefault()
      setActiveKey(item.key)
      if (item.key === "S") openMessage()
      else if (item.key === "M") window.location.href = item.href
      else window.open(item.href, "_blank", "noopener,noreferrer")
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [openMessage])

  useEffect(() => {
    if (!activeKey) return
    const timer = window.setTimeout(() => setActiveKey(null), 300)
    return () => window.clearTimeout(timer)
  }, [activeKey])

  useEffect(() => {
    if (copied === "idle") return
    const timer = window.setTimeout(() => setCopied("idle"), 4000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied("copied")
    } catch {
      setCopied("failed")
    }
  }

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (formStatus === "submitting") return
    const form = event.currentTarget
    setFormStatus("submitting")
    setError("")
    try {
      const response = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
      if (!response.ok) {
        const result = await response.json().catch(() => null)
        const message = Array.isArray(result?.errors)
          ? result.errors.map((item: { message?: string }) => item.message).filter(Boolean).join(" ")
          : ""
        throw new Error(message || "Your message couldn’t be sent. Please try again or send me an email.")
      }
      form.reset()
      setFormStatus("success")
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : "Your message couldn’t be sent. Please try again or send me an email.")
      setFormStatus("error")
    }
  }

  return (
    <div className="contact-sky">
      <ContactAtmosphere />
      <section id="contact" className="portfolio-section contact-desk" aria-labelledby="contact-desk-heading">
        <div className="section-inner">
          <div className="section-label"><Mail size={18} aria-hidden="true" /> GREAT THINGS START WITH A HELLO</div>
          <h2 id="contact-desk-heading" className="section-heading">Let&apos;s make<br /><span className="highlight">something great.</span></h2>
          <p className="section-copy">{profile.availability} in Java backend development.<br className="contact-desk-desktop-break" /> Have an opportunity, a project, or a question? My inbox is open.</p>

          <DeskStatus />

          <div className="contact-desk-panel">
          <AmbientPlayer />
          <div className="contact-desk-keyboard" data-contact-keyboard tabIndex={0} role="region" aria-label="Contact keyboard. Press M for email, G for GitHub, L for LinkedIn, S to write a message, or R for résumé." aria-describedby="contact-keyboard-hint">
            <p id="contact-keyboard-hint" className="contact-desk-keyboard-hint">psst, these work on your keyboard too: {contactKeys.map(({ key }) => <kbd key={key}>{key}</kbd>)}<small>Click a key, or focus this panel and press its letter.</small></p>
            <div className="contact-desk-keyboard-base">
              {contactKeys.map(({ key, label, href, Icon, color, caption, position }, index) => (
                <div key={key} className={`contact-desk-key-item contact-desk-caption-${position}`}>
                  <div className="contact-desk-key-caption"><span>{caption}</span><svg viewBox="0 0 38 44" fill="none" aria-hidden="true"><path d="M10 4C15 13 17 24 25 36m-10-7 10 7 3-12" /></svg></div>
                  <motion.a href={href} target={key === "M" || key === "S" ? undefined : "_blank"} rel={key === "M" || key === "S" ? undefined : "noopener noreferrer"} onClick={key === "S" ? (event) => { event.preventDefault(); openMessage() } : undefined} className={`contact-desk-key contact-desk-key-${color}${activeKey === key ? " is-pressed" : ""}`} aria-label={key === "R" ? "Open my résumé PDF" : key === "S" ? "Write me a message" : `${label}: ${key === "M" ? profile.email : profile.name}`} aria-keyshortcuts={key} initial={false} whileInView={reduceMotion ? {} : { y: [18, 0] }} viewport={{ once: true }} transition={{ delay: index * 0.07, duration: 0.45 }} whileHover={reduceMotion ? {} : { y: -4 }} whileTap={reduceMotion ? {} : { y: 4 }}>
                    <span className="contact-desk-key-top"><span className="contact-desk-key-letter">{key}</span><Icon size={48} strokeWidth={key === "R" ? 2.7 : 2} aria-hidden="true" /><span className="contact-desk-key-label">{label}</span></span>
                  </motion.a>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-desk-email"><a href={`mailto:${profile.email}`}>{profile.email}</a><button type="button" onClick={copyEmail} aria-label="Copy email address">{copied === "copied" ? <Check size={17} /> : <Copy size={17} />}</button></div>
          <p className="contact-desk-copy-status" aria-live="polite">{copied === "copied" ? "Email address copied." : copied === "failed" ? "Copy didn’t work. You can select the address above." : ""}</p>

          <details id="contact-message-form" className="contact-desk-message">
            <summary>Prefer to write right here? <span>Send a message <ArrowUpRight size={17} /></span></summary>
            <form onSubmit={submitMessage} action={`https://formspree.io/f/${profile.formspreeId}`} method="POST" className="contact-desk-form">
              <div className="contact-desk-form-row">
                <label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="What should I call you?" required disabled={formStatus === "submitting"} /></label>
                <label htmlFor="contact-email">Email address<input id="contact-email" type="email" name="email" autoComplete="email" placeholder="you@example.com" required disabled={formStatus === "submitting"} /></label>
              </div>
              <label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" placeholder="Tell me a little about it…" rows={5} required disabled={formStatus === "submitting"} /></label>
              <button className="contact-desk-send" type="submit" disabled={formStatus === "submitting"}>{formStatus === "submitting" ? "Sending…" : "Send message"}<Send size={16} /></button>
              <div className={`contact-desk-form-status${formStatus === "error" ? " is-error" : ""}`} role={formStatus === "error" ? "alert" : "status"}>{formStatus === "success" ? "Your message is on its way. Thanks for reaching out!" : formStatus === "error" ? error : ""}</div>
            </form>
          </details>
          </div>
        </div>
      </section>
      <footer className="contact-desk-footer">
        <div className="section-inner"><a href="#home" className="contact-desk-footer-name">{profile.name}<span>{profile.status} · {profile.location}</span></a><p>Built with care &amp; a little curiosity.</p><a href="#home" className="contact-desk-back-top" aria-label="Back to the top"><ArrowUp size={21} /></a></div>
      </footer>
    </div>
  )
}
