import type { CSSProperties } from "react"
import "./project-micro-scene.css"

type SceneKey = "interview" | "messenger" | "cluster" | "football" | "shop" | "assignments"

/** Maps each real project to a diagrammatic scene built from its documented behaviour. */
const scenes: Record<string, SceneKey> = {
  InterviewAI: "interview",
  "Qt Messenger": "messenger",
  MongoShardLab: "cluster",
  "CAN-2025 Predictions": "football",
  "MODEYA — Premium E-Commerce Platform": "shop",
  "E-Commerce Website": "shop",
  "Gestion des Affectations des Enseignements": "assignments",
  "Arabela Collection": "shop",
}

type ProjectLike = { title: string; tech: string[]; category: string }

export function ProjectMicroScene({ project, accent }: { project: ProjectLike; accent: string }) {
  const scene = scenes[project.title] ?? "shop"
  const style = { "--scene-accent": accent } as CSSProperties

  return (
    <div className={`work-scene work-scene-${scene}`} style={style} data-scene={scene} aria-hidden="true">
      <div className="work-scene-frame">
        <span className="work-scene-chrome"><i /><i /><i /><em>{scene.toUpperCase()} / LIVE VIEW</em></span>
        <div className="work-scene-stage">{renderScene(scene)}</div>
        <span className="work-scene-foot">
          <span>{project.category}</span>
          <span>{project.tech.slice(0, 3).join(" · ")}</span>
          <span className="work-scene-live"><i /> interactive sketch</span>
        </span>
      </div>
    </div>
  )
}

function renderScene(scene: SceneKey) {
  if (scene === "interview") return <Interview />
  if (scene === "messenger") return <Messenger />
  if (scene === "cluster") return <Cluster />
  if (scene === "football") return <Football />
  if (scene === "assignments") return <Assignments />
  return <Shop />
}

/* A coaching loop: prompt typed, answer scored, progress climbing. */
function Interview() {
  return (
    <>
      <div className="wi-question">
        <span className="wi-chip">GEMINI · COACH</span>
        <b>Explain the difference between an interface and an abstract class.</b>
      </div>
      <div className="wi-answer">
        <span className="wi-chip wi-chip-alt">YOUR ANSWER</span>
        <span className="wi-line wi-line-1" /><span className="wi-line wi-line-2" /><span className="wi-line wi-line-3" />
        <span className="wi-typing"><i /><i /><i /></span>
      </div>
      <div className="wi-score">
        <span>ROLE FIT</span>
        <div className="wi-meter"><i /></div>
        <strong>92</strong>
      </div>
      <div className="wi-streak"><span>STREAK</span><b>07</b><em>days</em></div>
      <span className="wi-orb wi-orb-a" /><span className="wi-orb wi-orb-b" />
    </>
  )
}

/* TCP sockets: envelopes travelling between peers. */
function Messenger() {
  return (
    <>
      <svg className="wm-wires" viewBox="0 0 320 150" fill="none">
        <path className="wm-wire" d="M52 96C96 44 164 44 200 92S282 116 300 74" />
        <path className="wm-wire wm-wire-b" d="M72 34C130 88 210 52 268 100" />
      </svg>
      {[{ x: "12%", y: "58%", id: "C1" }, { x: "40%", y: "22%", id: "C2" }, { x: "72%", y: "58%", id: "C3" }].map((peer, index) => (
        <span key={peer.id} className="wm-peer" style={{ left: peer.x, top: peer.y, animationDelay: `${index * -1.2}s` }}>
          <b>{peer.id}</b><i />
        </span>
      ))}
      <span className="wm-bubble wm-bubble-a">hello, world</span>
      <span className="wm-bubble wm-bubble-b">ack · 200</span>
      <span className="wm-socket">TCP · 4 clients · SQLite</span>
    </>
  )
}

/* mongos routes to shards; replica sets hold the data. */
function Cluster() {
  return (
    <>
      <span className="wk-router">mongos<em>router</em></span>
      <svg className="wk-lines" viewBox="0 0 320 130" fill="none" preserveAspectRatio="none">
        {[46, 132, 218].map((x, i) => <path key={x} className="wk-line" style={{ animationDelay: `${i * -.45}s` }} d={`M160 40C160 60 ${x} 66 ${x} 88`} />)}
      </svg>
      {[0, 1, 2].map(index => (
        <span key={index} className="wk-shard" style={{ left: `${index * 34 + 6}%` }}>
          <span className="wk-shard-top" /><span className="wk-shard-top" /><span className="wk-shard-top" />
          <em>shard {index + 1}</em>
        </span>
      ))}
      <span className="wk-config">config servers · 3</span>
    </>
  )
}

/* Monte Carlo: distribution bars settle around a result. */
function Football() {
  const bars = [22, 34, 48, 41, 62, 78, 91, 72, 56, 44, 30, 19]
  return (
    <>
      <div className="wf-chart">
        {bars.map((height, index) => <span key={index} className="wf-bar" style={{ "--bar": `${height}%`, animationDelay: `${index * -.14}s` } as CSSProperties} />)}
      </div>
      <div className="wf-readout">
        <span className="wf-team">MOR<em>win probability</em></span>
        <strong>58.4<i>%</i></strong>
      </div>
      <span className="wf-run">Monte Carlo · run 10,000</span>
      <svg className="wf-net" viewBox="0 0 120 80" fill="none" aria-hidden="true"><path d="M4 4h112v72H4zM4 30h112M4 56h112M42 4v72M78 4v72" /></svg>
    </>
  )
}

/* Storefront journey: product grid, cart, COD confirmation. */
function Shop() {
  return (
    <>
      <div className="ws-grid">
        {[0, 1, 2, 3].map(index => <span key={index} className={`ws-product${index === 1 ? " is-picked" : ""}`} style={{ animationDelay: `${index * -.7}s` }}><i /></span>)}
      </div>
      <div className="ws-cart"><span>Cart</span><b>2</b></div>
      <ol className="ws-steps">
        <li className="is-done">Browse</li>
        <li className="is-done">Cart</li>
        <li className="is-live">COD</li>
        <li>Admin</li>
      </ol>
      <span className="ws-toast">Order placed <em>· Cash on Delivery</em></span>
    </>
  )
}

/* Assignments: workload moves from an overloaded desk to a free one. */
function Assignments() {
  const desks = [
    { name: "Dr. A", value: 86 }, { name: "Pr. B", value: 62 }, { name: "Dr. C", value: 38 }, { name: "Pr. D", value: 18 },
  ]
  return (
    <>
      <div className="wa-table">
        {desks.map((desk, index) => (
          <span key={desk.name} className="wa-row">
            <b>{desk.name}</b>
            <span className="wa-bar"><i style={{ "--fill": `${desk.value}%`, animationDelay: `${index * -.9}s` } as CSSProperties} /></span>
            <em>{desk.value}h</em>
          </span>
        ))}
      </div>
      <span className="wa-balance">balance · weekly</span>
      <div className="wa-chips"><span>Excel in</span><span>Excel out</span><span>4 roles</span></div>
    </>
  )
}
