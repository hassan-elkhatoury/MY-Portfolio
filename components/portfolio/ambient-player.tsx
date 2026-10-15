"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Music2, Pause, Play } from "lucide-react"
import "./ambient-player.css"

// An original, quiet four-chord sequence. Audio is created only after a button click.
const chords = [
  [146.832, 174.614, 220, 329.628],
  [130.813, 164.814, 195.998, 246.942],
  [110, 130.813, 164.814, 195.998],
  [130.813, 174.614, 220, 261.626],
]

export function AmbientPlayer() {
  const [playing, setPlaying] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const audio = useRef<AudioContext | null>(null)
  const output = useRef<GainNode | null>(null)
  const interval = useRef<number | null>(null)
  const voices = useRef(new Set<OscillatorNode>())
  const generation = useRef(0)
  const mounted = useRef(false)

  const stopAudio = useCallback((updateUI = true) => {
    generation.current += 1
    if (interval.current !== null) window.clearInterval(interval.current)
    interval.current = null
    for (const voice of voices.current) {
      try { voice.stop() } catch { /* The voice may have reached its scheduled end. */ }
      voice.disconnect()
    }
    voices.current.clear()
    output.current?.disconnect()
    output.current = null
    const context = audio.current
    audio.current = null
    if (context && context.state !== "closed") void context.close().catch(() => {})
    if (updateUI && mounted.current) {
      setPlaying(false)
      setPending(false)
    }
  }, [])

  useEffect(() => {
    mounted.current = true
    const onPageHide = () => stopAudio()
    window.addEventListener("pagehide", onPageHide)
    return () => {
      mounted.current = false
      window.removeEventListener("pagehide", onPageHide)
      stopAudio(false)
    }
  }, [stopAudio])

  async function startAudio() {
    if (audio.current || pending) return
    setPending(true)
    setError("")
    const currentGeneration = ++generation.current
    try {
      const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Context) throw new Error("This browser can’t play the ambient tones.")
      const context = new Context()
      audio.current = context
      await context.resume()
      if (!mounted.current || currentGeneration !== generation.current) return
      if (context.state !== "running") throw new Error("Audio couldn’t start. Please try again.")

      const master = context.createGain()
      master.gain.value = 0.15
      master.connect(context.destination)
      output.current = master
      let chordIndex = 0

      function scheduleChord() {
        if (context.state !== "running" || audio.current !== context) return
        const now = context.currentTime + 0.04
        chords[chordIndex % chords.length].forEach((frequency, index) => {
          const voice = context.createOscillator()
          const envelope = context.createGain()
          voice.type = index === 2 ? "triangle" : "sine"
          voice.frequency.value = frequency
          envelope.gain.setValueAtTime(0, now)
          envelope.gain.linearRampToValueAtTime(0.045, now + 1.4)
          envelope.gain.linearRampToValueAtTime(0.028, now + 3.2)
          envelope.gain.linearRampToValueAtTime(0, now + 5.8)
          voice.connect(envelope)
          envelope.connect(master)
          voices.current.add(voice)
          voice.onended = () => {
            voices.current.delete(voice)
            voice.disconnect()
            envelope.disconnect()
          }
          voice.start(now)
          voice.stop(now + 6)
        })
        chordIndex += 1
      }

      scheduleChord()
      interval.current = window.setInterval(scheduleChord, 6500)
      setPlaying(true)
      setPending(false)
    } catch (issue) {
      if (!mounted.current || currentGeneration !== generation.current) return
      stopAudio()
      setError(issue instanceof Error ? issue.message : "Audio couldn’t start. Please try again.")
    }
  }

  return (
    <div className={`ambient-player${playing ? " is-playing" : ""}`}>
      <div className="ambient-player-object" aria-hidden="true">
        <div className="ambient-player-wood">
          <div className="ambient-player-record"><span /></div>
          <div className="ambient-player-arm"><span /></div>
          <div className="ambient-player-knob" />
          <span className="ambient-player-makers-mark">HEK</span>
        </div>
      </div>
      <button type="button" className="ambient-player-chip" onClick={() => playing ? stopAudio() : void startAudio()} aria-pressed={playing} disabled={pending} aria-label={playing ? "Pause the original ambient music" : "Play quiet original ambient music"} title="Original ambient tones, made here in your browser">
        <Music2 size={15} strokeWidth={1.8} aria-hidden="true" />
        <span>{pending ? "Starting…" : playing ? "Pause the music" : "Play some music"}</span>
        {playing ? <Pause size={12} fill="currentColor" aria-hidden="true" /> : <Play size={12} fill="currentColor" aria-hidden="true" />}
      </button>
      <span className="ambient-player-status" role="status">{error}</span>
    </div>
  )
}
