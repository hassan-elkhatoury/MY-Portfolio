import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-0.5 sm:items-start">
          <span className="font-serif text-sm font-semibold text-foreground">Hasan El Khatoury</span>
          <p className="text-[11px] text-muted-foreground/60">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
        <div className="flex items-center gap-3">
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
                className="text-muted-foreground/60 transition-colors hover:text-foreground"
                aria-label={social.label}
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            )
          })}
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-6xl text-center text-[11px] text-muted-foreground/40">
        &copy; {new Date().getFullYear()} Hasan El Khatoury
      </p>
    </footer>
  )
}
