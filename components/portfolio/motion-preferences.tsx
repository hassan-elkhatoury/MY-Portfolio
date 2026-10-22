"use client"

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useSyncExternalStore, type ReactNode } from "react"
import { MotionConfig } from "framer-motion"
import { useClientReady } from "@/hooks/use-client-ready"

// Keep this key in sync with the early preference script in app/layout.tsx.
const storageKey = "portfolio-motion-paused-v1"
const localEvent = "portfolio:motion-preference"
const mediaQuery = "(prefers-reduced-motion: reduce)"
let sessionPreference: boolean | undefined

function readUserPreference() {
  if (sessionPreference !== undefined) return sessionPreference
  try { return localStorage.getItem(storageKey) === "true" } catch { return false }
}
function subscribeUserPreference(notify: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) { sessionPreference = undefined; notify() }
  }
  window.addEventListener("storage", onStorage)
  window.addEventListener(localEvent, notify)
  return () => { window.removeEventListener("storage", onStorage); window.removeEventListener(localEvent, notify) }
}
function subscribeSystemPreference(notify: () => void) {
  const media = window.matchMedia(mediaQuery)
  media.addEventListener("change", notify)
  return () => media.removeEventListener("change", notify)
}
const readSystemPreference = () => window.matchMedia(mediaQuery).matches
const serverPreference = () => false

type MotionPreferences = { paused: boolean; userPaused: boolean; systemReducedMotion: boolean; ready: boolean; setUserPaused: (paused: boolean) => void; toggleMotion: () => void }
const MotionPreferencesContext = createContext<MotionPreferences>({ paused: true, userPaused: false, systemReducedMotion: false, ready: false, setUserPaused: () => {}, toggleMotion: () => {} })

export function MotionPreferencesProvider({ children }: { children: ReactNode }) {
  const ready = useClientReady()
  const userPaused = useSyncExternalStore(subscribeUserPreference, readUserPreference, serverPreference)
  const systemReducedMotion = useSyncExternalStore(subscribeSystemPreference, readSystemPreference, serverPreference)
  const paused = !ready || userPaused || systemReducedMotion
  useLayoutEffect(() => { document.documentElement.dataset.motionPaused = String(paused) }, [paused])
  const setUserPaused = useCallback((value: boolean) => {
    sessionPreference = value
    try { localStorage.setItem(storageKey, String(value)) } catch { /* Session controls work without storage. */ }
    window.dispatchEvent(new Event(localEvent))
  }, [])
  const toggleMotion = useCallback(() => setUserPaused(!userPaused), [userPaused, setUserPaused])
  const value = useMemo(() => ({ paused, userPaused, systemReducedMotion, ready, setUserPaused, toggleMotion }), [paused, userPaused, systemReducedMotion, ready, setUserPaused, toggleMotion])
  return <MotionPreferencesContext.Provider value={value}><MotionConfig reducedMotion={paused ? "always" : "user"}>{children}</MotionConfig></MotionPreferencesContext.Provider>
}
export function useMotionPreferences() { return useContext(MotionPreferencesContext) }
