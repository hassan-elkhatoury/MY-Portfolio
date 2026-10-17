"use client"

import { useId, useRef, useState, type CSSProperties } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Coffee, GitBranch, Database, Container, Cloud, Braces, Network, Terminal, Wrench, ArrowUpRight } from "lucide-react"
import { projects, skillGroups, type SkillGroup } from "@/lib/portfolio-data"
import "./toolkit.css"

type Tool = { name: string; group: number; Icon: typeof Coffee | null; className: string; ink: string }

const tools: Tool[] = [
  { name: "Java", group: 1, Icon: Coffee, className: "java", ink: "#de5941" },
  { name: "Python", group: 0, Icon: Braces, className: "python", ink: "#355d8b" },
  { name: "C++", group: 0, Icon: null, className: "cpp", ink: "#ffffff" },
  { name: "Git", group: 3, Icon: GitBranch, className: "git", ink: "#ee593d" },
  { name: "Docker", group: 3, Icon: Container, className: "docker", ink: "#ffffff" },
  { name: "MongoDB", group: 2, Icon: Database, className: "mongo", ink: "#32613c" },
  { name: "SQL", group: 2, Icon: Database, className: "sql", ink: "#755133" },
  { name: "OCI", group: 3, Icon: Cloud, className: "oci", ink: "#c54538" },
  { name: "REST", group: 1, Icon: Network, className: "rest", ink: "#57536e" },
  { name: "Linux", group: 3, Icon: Terminal, className: "linux", ink: "#f8e6ac" },
]

const domainLabels = ["Languages", "Backend", "Databases", "Tools & platforms", "CS fundamentals", "Frontend", "AI / ML"]

/** Match a domain's real skills against the tech actually listed on each project. */
function shippedIn(group: SkillGroup) {
  const terms = group.skills.map(skill => skill.toLowerCase())
  return projects
    .map(project => {
      const hits = project.tech.filter(tech => {
        const value = tech.toLowerCase()
        return terms.some(term => value === term || value.split(/[\s/&.,+-]+/).includes(term))
      })
      return { project, hits }
    })
    .filter(item => item.hits.length)
    .sort((a, b) => b.hits.length - a.hits.length)
    .slice(0, 3)
}

export function Toolkit() {
  const systemReducedMotion = useReducedMotion()
  const id = useId()
  const boxId = `${id.replace(/:/g, "")}-toolbox`
  const stage = useRef<HTMLDivElement>(null)
  const visible = useInView(stage, { margin: "80px" })
  const [selected, setSelected] = useState(1)
  const [preview, setPreview] = useState<number | null>(null)
  const reduceMotion = Boolean(systemReducedMotion)

  const shown = preview ?? selected
  const group = skillGroups[shown]
  const shipped = shippedIn(group)
  const activeTool = tools.find(tool => tool.group === shown)
  const accent = activeTool?.ink ?? "#c2473a"
  const accentStyle = { "--tool-accent": accent } as CSSProperties

  return (
    <section id="skills" className="portfolio-section portfolio-toolkit" aria-labelledby="toolkit-heading">
      <div className="section-inner">
        <div className="section-label"><Wrench size={18} aria-hidden="true" /> MY EVERYDAY ESSENTIALS</div>
        <h2 id="toolkit-heading" className="section-heading">A peek inside<br />my <span className="highlight">toolbox.</span></h2>
        <p className="section-copy">Pick a tool. The box opens on that part of the stack, and shows where it shipped.</p>

        <div ref={stage} className={`portfolio-toolkit-stage${visible ? " is-visible" : ""}`} style={accentStyle}>
          <div className="portfolio-toolkit-orbit" role="group" aria-label="Explore the tools in my toolkit">
            {tools.map(({ name, group: toolGroup, Icon, className, ink }, index) => (
              <motion.button
                key={name}
                type="button"
                className={`portfolio-tool-token portfolio-tool-${className}${selected === toolGroup ? " is-selected" : ""}${preview === toolGroup ? " is-previewed" : ""}${shown === toolGroup ? " is-lit" : " is-dimmed"}`}
                onClick={() => { setSelected(toolGroup); setPreview(null) }}
                onPointerEnter={event => { if (event.pointerType === "mouse") setPreview(toolGroup) }}
                onPointerLeave={() => setPreview(null)}
                onFocus={() => setPreview(toolGroup)}
                onBlur={() => setPreview(null)}
                aria-pressed={selected === toolGroup}
                aria-controls={`${id}-spotlight`}
                aria-label={`${name}: show ${skillGroups[toolGroup].title}`}
                style={{ "--tool-ink": ink } as CSSProperties}
                initial={false}
                whileInView={reduceMotion ? {} : { opacity: [0, 1], scale: [0.85, 1], y: [12, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.035 }}
                whileHover={reduceMotion ? {} : { y: -6, rotate: index % 2 ? 4 : -4, scale: 1.05 }}
                whileTap={reduceMotion ? {} : { scale: 0.95 }}
              >
                {Icon ? <Icon aria-hidden="true" size={32} strokeWidth={1.8} /> : <b aria-hidden="true">C++</b>}
                <span>{name}</span>
              </motion.button>
            ))}
          </div>

          <div className="portfolio-toolbox" aria-hidden="true">
            <span className="portfolio-toolbox-glow" />
            <svg viewBox="0 0 400 320" fill="none" focusable="false">
              <defs>
                <linearGradient id={`${boxId}-front`} x1="94" y1="145" x2="241" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#DBB185" /><stop offset="1" stopColor="#C7996B" /></linearGradient>
                <linearGradient id={`${boxId}-side`} x1="259" y1="132" x2="311" y2="268" gradientUnits="userSpaceOnUse"><stop stopColor="#B98450" /><stop offset="1" stopColor="#A56F41" /></linearGradient>
                <linearGradient id={`${boxId}-flap`} x1="157" y1="37" x2="267" y2="192" gradientUnits="userSpaceOnUse"><stop stopColor="#E6C49E" /><stop offset="1" stopColor="#CCA174" /></linearGradient>
                <clipPath id={`${boxId}-opening`}><path d="M92 130 160 78 310 111 242 163Z" /></clipPath>
              </defs>
              <ellipse cx="207" cy="293" rx="113" ry="14" fill="#51351C" opacity=".09" />
              {/* Every flap shares its hinge with the same four opening corners. */}
              <path d="M160 78 310 111 327 57 177 24Z" fill={`url(#${boxId}-flap)`} stroke="#BD936A" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M92 130 160 78 117 31 49 83Z" fill="#D5AF85" stroke="#BD936A" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M92 130 242 163 242 283 92 250Z" fill={`url(#${boxId}-front)`} stroke="#B58658" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M242 163 310 111 310 231 242 283Z" fill={`url(#${boxId}-side)`} stroke="#9D6D41" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M92 130 160 78 310 111 242 163Z" fill="#705035" stroke="#9D734D" strokeWidth="1.2" strokeLinejoin="round" />
              <g clipPath={`url(#${boxId}-opening)`}>
                <path d="M92 130 160 78 160 109 110 151Z" fill="#9C744E" />
                <path d="M160 78 310 111 291 138 160 109Z" fill="#A27A52" />
                <path d="M160 109 291 138 220 174 110 151Z" fill="#805B3B" />
              </g>
              <path d="M92 130 242 163 224 184 74 151Z" fill={`url(#${boxId}-flap)`} stroke="#B58B60" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M242 163 310 111 363 132 295 184Z" fill="#DDB88E" stroke="#BD936A" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M160 78 310 111M93 130 242 163" stroke="#ECD0AC" strokeWidth="2" />
              <path d="M219 158 233 161 233 281 219 278Z" fill="#EDD1A7" opacity=".35" />
              <g transform="matrix(1 .22 0 1 92 130)" fill="#4D3827" fontFamily="ui-monospace, monospace">
                <text x="17" y="61" fontSize="10" letterSpacing=".6">HANDLE WITH</text>
                <text x="16" y="80" fontSize="15" fontWeight="700" letterSpacing="-.4">CURIOSITY.</text>
                <text x="17" y="108" fontSize="7" opacity=".72">GOOD IDEAS INSIDE ↑</text>
                <g transform="translate(112 84) rotate(10)">
                  <circle r="22" fill="#F6E496" stroke="#D7BE69" strokeWidth="1" />
                  <text x="0" y="-2" textAnchor="middle" fontSize="8" fontWeight="800" fill="#263549">JAVA</text>
                  <text x="0" y="8" textAnchor="middle" fontSize="7" fontWeight="800" fill="#263549">INSIDE</text>
                </g>
              </g>
            </svg>
          </div>

          {/* The answer appears under the box, where the eye already is. */}
          <div id={`${id}-spotlight`} className="portfolio-toolkit-spotlight" aria-live="polite" aria-atomic="true">
            <div className="portfolio-toolkit-spotlight-head">
              <span className="portfolio-toolkit-spotlight-dot" aria-hidden="true" />
              <span className="portfolio-toolkit-spotlight-label">{group.status} / {group.title}</span>
              <span className="portfolio-toolkit-spotlight-count">{group.skills.length} skills</span>
            </div>
            <ul className="portfolio-toolkit-spotlight-chips">
              {group.skills.slice(0, 8).map(skill => <li key={skill}>{skill}</li>)}
              {group.skills.length > 8 && <li className="is-more">+{group.skills.length - 8}</li>}
            </ul>
            <div className="portfolio-toolkit-spotlight-evidence">
              {shipped.length ? <>
                <span className="portfolio-toolkit-spotlight-caption">Shipped in</span>
                {shipped.map(({ project, hits }) => (
                  <span key={project.title} className="portfolio-toolkit-evidence-pill">
                    <strong>{project.title.startsWith("MODEYA") ? "MODEYA" : project.title.startsWith("Gestion") ? "E-service" : project.title}</strong>
                    <em>{hits.slice(0, 2).join(" · ")}</em>
                  </span>
                ))}
              </> : <span className="portfolio-toolkit-spotlight-caption">The groundwork behind every project on this page.</span>}
            </div>
          </div>
        </div>

        <div className="portfolio-toolkit-tabs" role="tablist" aria-label="Skill categories">
          {skillGroups.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={selected === index}
              aria-controls={`${id}-spotlight`}
              className={selected === index ? "is-selected" : ""}
              onClick={() => setSelected(index)}
              onKeyDown={event => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
                event.preventDefault()
                const next = event.key === "Home" ? 0 : event.key === "End" ? skillGroups.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + skillGroups.length) % skillGroups.length
                setSelected(next)
                document.getElementById(`${id}-tab-${next}`)?.focus()
              }}
              tabIndex={selected === index ? 0 : -1}
            >{domainLabels[index] ?? item.title}</button>
          ))}
        </div>

        <p className="portfolio-toolkit-footnote">
          Always building on the fundamentals. Always making room to learn.
          {" "}<a href="#selected-work" className="text-link">See the work <ArrowUpRight size={13} aria-hidden="true" /></a>
        </p>
      </div>
    </section>
  )
}
