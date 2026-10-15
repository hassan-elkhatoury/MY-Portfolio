"use client"

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from "react"
import { MotionConfig } from "framer-motion"

// Keep this key in sync with the early preference script in app/layout.tsx.
const storageKey = "portfolio-motion-paused-v1"

type MotionPreferences = {
  paused: boolean
  userPaused: boolean
  systemReducedMotion: boolean
  ready: boolean
  setUserPaused: (paused: boolean) => void
  toggleMotion: () => void
}

const MotionPreferencesContext = createContext<MotionPreferences>({
  paused: true,
  userPaused: false,
  systemReducedMotion: false,
  ready: false,
  setUserPaused: () => {},
  toggleMotion: () => {},
})

export function MotionPreferencesProvider({ children }: { children: ReactNode }) {
  const [userPaused, updateUserPaused] = useState(false)
  const [systemReducedMotion, setSystemReducedMotion] = useState(false)
  const [ready, setReady] = useState(false)
  const paused = !ready || userPaused || systemReducedMotion

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let saved = false
    try { saved = localStorage.getItem(storageKey) === "true" } catch { /* Session controls still work when storage is unavailable. */ }
    updateUserPaused(saved)
    setSystemReducedMotion(media.matches)
    setReady(true)
    const onSystemChange = (event: MediaQueryListEvent) => setSystemReducedMotion(event.matches)
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) updateUserPaused(event.newValue === "true")
    }
    media.addEventListener("change", onSystemChange)
    window.addEventListener("storage", onStorage)
    return () => {
      media.removeEventListener("change", onSystemChange)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  useLayoutEffect(() => {
    document.documentElement.dataset.motionPaused = String(paused)
  }, [paused])

  const setUserPaused = useCallback((value: boolean) => {
    updateUserPaused(value)
    try { localStorage.setItem(storageKey, String(value)) } catch { /* Persisting is optional; the current session still updates. */ }
  }, [])
  const toggleMotion = useCallback(() => setUserPaused(!userPaused), [userPaused, setUserPaused])
  const value = useMemo(() => ({ paused, userPaused, systemReducedMotion, ready, setUserPaused, toggleMotion }), [paused, userPaused, systemReducedMotion, ready, setUserPaused, toggleMotion])

  return <MotionPreferencesContext.Provider value={value}><MotionConfig reducedMotion={paused ? "always" : "user"}>{children}</MotionConfig></MotionPreferencesContext.Provider>
}

export function useMotionPreferences() {
  return useContext(MotionPreferencesContext)
}
