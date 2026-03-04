"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Spotlight } from "@/components/ui/spotlight"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:hassanelkhatoury@gmail.com?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${formState.email}`
    window.open(mailtoLink)
  }

  const inputClasses =
    "w-full rounded-lg border border-border/40 bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"

  return (
    <section id="contact" className="relative px-6 py-28 md:py-36">
      {/* Spotlight */}
      <Spotlight className="dark:from-primary/10 dark:via-primary/5 dark:to-transparent" size={300} />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-3 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Get In Touch
            </h2>
            <div className="section-line flex-1" />
          </div>
          <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground">
            Interested in collaborating or have a question? Feel free to reach out.
          </p>

          <div className="grid gap-10 md:grid-cols-5">
            {/* Contact Form — with Glow wrapper */}
            <div className="md:col-span-3">
              <div className="relative rounded-[1.25rem] border-[0.75px] border-border/50 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-card p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-foreground">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className={inputClasses}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-foreground">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className={inputClasses}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-[13px] font-medium text-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className={`${inputClasses} resize-none`}
                        placeholder="Your message..."
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-fit bg-foreground text-background text-sm font-medium transition-colors hover:bg-foreground/90"
                    >
                      <Send className="mr-2 h-3.5 w-3.5" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Quick contact info */}
            <div className="flex flex-col gap-6 md:col-span-2">
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Quick Contact
                </h3>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="mailto:hassanelkhatoury@gmail.com"
                    className="group/link relative rounded-[1rem] border-[0.75px] border-border/50 p-1.5 transition-all"
                  >
                    <GlowingEffect
                      spread={30}
                      glow={true}
                      disabled={false}
                      proximity={48}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                    <div className="flex items-center gap-3 rounded-[0.7rem] border-[0.75px] border-border/30 bg-card p-3 text-muted-foreground shadow-sm transition-colors group-hover/link:text-foreground">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="truncate text-xs">hassanelkhatoury@gmail.com</span>
                    </div>
                  </a>
                  <div className="relative rounded-[1rem] border-[0.75px] border-border/50 p-1.5">
                    <div className="flex items-center gap-3 rounded-[0.7rem] border-[0.75px] border-border/30 bg-card p-3 text-muted-foreground shadow-sm">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="text-xs">Morocco</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Socials
                </h3>
                <div className="flex items-center gap-2">
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
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-card text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:-translate-y-0.5"
                        aria-label={social.label}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
