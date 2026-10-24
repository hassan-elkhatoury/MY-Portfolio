import Link from "next/link"
import { ArrowRight, Compass, FileText } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import "./not-found.css"

export default function NotFound() {
  return <main id="main-content" className="lost-page">
    <header className="lost-header"><Link href="/" className="lost-brand"><Compass size={25} /><span>Hassan El Khatoury<small>A developer’s field notes</small></span></Link><span className="lost-coordinate">PORTFOLIO / OFF THE MAP</span></header>
    <section className="lost-layout" aria-labelledby="lost-heading">
      <div className="lost-copy">
        <p className="lost-eyebrow">ERROR 404 · UNCHARTED TERRITORY</p>
        <h1 id="lost-heading">A little off<br />the <em>beaten path.</em></h1>
        <p className="lost-description">This page isn’t on the map. There’s still plenty to explore—let’s find your way back.</p>
        <Link href="/" className="lost-home">Back to home <ArrowRight size={20} /></Link>
        <nav className="lost-shortcuts" aria-label="Other places to explore"><Link href="/#projects">Explore my work <ArrowRight size={16} /></Link><a href={profile.resume}><FileText size={16} /> View my résumé</a></nav>
      </div>
      <div className="lost-map" aria-hidden="true">
        <div className="lost-map-landscape" /><span className="lost-map-label">THE CURIOSITY ATLAS</span><Compass className="lost-compass" size={52} strokeWidth={1} /><span className="lost-number">404</span>
        <svg className="lost-route" viewBox="0 0 600 540" fill="none"><path className="lost-route-base" d="M-20 466C98 462 91 344 191 354S261 463 350 365 401 239 456 218" /><path className="lost-route-thread" d="M-20 466C98 462 91 344 191 354S261 463 350 365 401 239 456 218" /><circle cx="456" cy="218" r="17" fill="#fff8e9" /><circle cx="456" cy="218" r="8" fill="#e47c5d" /></svg>
        <span className="lost-map-note">You are somewhere<br /><em>interesting.</em></span><span className="lost-map-caption">A detour, not a dead end.</span>
      </div>
    </section>
    <footer className="lost-footer"><span>Built with curiosity. Even the detours.</span><Link href="/#contact">Need a hand? Say hello <ArrowRight size={15} /></Link></footer>
  </main>
}
