"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Move, UserRound } from "lucide-react"
import { education, experiences, certifications, profile } from "@/lib/portfolio-data"
import { useMotionPreferences } from "./motion-preferences"
import "./personal-story.css"

export function PersonalStory() {
  const desk = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { paused } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: desk, offset: ["start end", "end start"] })
  // The desk items drift at different rates, like papers lifted by a passing breeze.
  const driftLeft = useTransform(scrollYProgress, [0, 1], [34, -26])
  const driftCenter = useTransform(scrollYProgress, [0, 1], [14, -12])
  const driftRight = useTransform(scrollYProgress, [0, 1], [42, -34])
  const still = paused || reduceMotion
  const school = education[0]
  const internship = experiences.find(item => item.company.includes("Ministry")) ?? experiences[0]
  const java = certifications[0]

  return (
    <section id="about" className="portfolio-section personal-story" aria-labelledby="personal-story-heading">
      <div className="section-inner">
        <div className="section-label"><UserRound size={18} aria-hidden="true" /> A LITTLE ABOUT ME</div>
        <motion.div className="personal-story-intro" initial={false} whileInView={reduceMotion ? {} : { opacity: [0.5, 1], y: [25, 0] }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 id="personal-story-heading">Behind the code,<br />there&apos;s <span className="highlight">a curious mind.</span></h2>
          <p>I&apos;m {profile.name.split(" ")[0]}, a computer science engineering student at ENSAH, graduating in {profile.graduationYear}. I build <strong>Java and Spring Boot backends</strong>, from enterprise fleet management at MEF to AI coaching and distributed database projects.</p>
          <p className="personal-story-small">{profile.availability} in Java backend development or software engineering. <a href="#contact">Let&apos;s talk <ArrowUpRight size={14} /></a></p>
          <dl className="personal-story-profile-details"><div><dt>Based in</dt><dd>{profile.location}</dd></div><div><dt>Specialization</dt><dd>{profile.specialization}</dd></div><div><dt>Languages</dt><dd>{profile.languages.map(item => `${item.language} (${item.level})`).join(" · ")}</dd></div></dl>
        </motion.div>

        <div className="personal-story-desk" ref={desk}>
          <motion.article
            className="personal-story-note personal-story-school"
            style={still ? undefined : { y: driftLeft }}
            {...(still ? {} : { drag: true })}
            dragConstraints={desk} dragElastic={0.12} dragMomentum={false} whileDrag={{ scale: 1.04, zIndex: 5 }} initial={false} whileHover={still ? {} : { rotate: -1 }} aria-label="Education note">
            <span className="personal-story-tape" aria-hidden="true" />
            <img src={school.logo} alt="ENSAH" className="personal-story-logo personal-story-school-logo" />
            <span className="personal-story-note-kicker">Currently learning at</span>
            <h3>ENSAH,<br />Al Hoceima</h3>
            <p>Computer Science Engineering<br /><span>{school.period}</span></p>
            <span className="personal-story-note-footer">Algorithms. Architecture. A lot of Java.</span>
          </motion.article>

          <motion.figure
            className="personal-story-polaroid"
            style={still ? undefined : { y: driftCenter }}
            {...(still ? {} : { drag: true })}
            dragConstraints={desk} dragElastic={0.12} dragMomentum={false} whileDrag={{ scale: 1.04, zIndex: 5 }} initial={false} whileHover={still ? {} : { rotate: 1 }}>
            <span className="personal-story-tape" aria-hidden="true" />
            <img className="personal-story-portrait" src="/images/hasan-portrait.webp" alt={profile.name} width={320} height={370} />
            <figcaption>{profile.name.split(" ")[0]}, from Morocco <span aria-hidden="true">↗</span></figcaption>
          </motion.figure>

          <motion.article
            className="personal-story-note personal-story-java"
            style={still ? undefined : { y: driftRight }}
            {...(still ? {} : { drag: true })}
            dragConstraints={desk} dragElastic={0.12} dragMomentum={false} whileDrag={{ scale: 1.04, zIndex: 5 }} initial={false} whileHover={still ? {} : { rotate: 2 }} aria-label="Java certification note">
            <img src={java.logo} alt="Oracle" className="personal-story-logo" />
            <span className="personal-story-note-kicker">A little proud of this one</span>
            <h3>Java certified.<br />Twice.</h3>
            <p>Oracle Certified Professional<br />Java SE 11 &amp; Java SE 17</p>
            <a href={java.verifyUrl} target="_blank" rel="noreferrer" className="personal-story-note-link">See the credential <ArrowUpRight size={16} /></a>
          </motion.article>

          <motion.article
            className="personal-story-intern-note"
            style={still ? undefined : { y: driftCenter }}
            {...(still ? {} : { drag: true })}
            dragConstraints={desk} dragElastic={0.12} dragMomentum={false} whileDrag={{ scale: 1.04, zIndex: 5 }}>
            {internship.logo ? <img src={internship.logo} alt={internship.company} width={76} height={38} /> : <b className="personal-story-intern-initials" aria-hidden="true">MEF</b>}
            <div><strong>Enterprise Java, in practice.</strong><span>{internship.company}</span><span>{internship.title} · {internship.period}</span></div>
          </motion.article>
          <span className="personal-story-drag-hint"><Move size={14} /> A few things from my desk. Give them a nudge.</span>
        </div>
      </div>
    </section>
  )
}
