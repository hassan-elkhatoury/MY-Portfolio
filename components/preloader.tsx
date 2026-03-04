"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Wait for the window to fully load, or timeout after 2.5s
    const handleLoad = () => setTimeout(() => setLoading(false), 600)

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      // Fallback timeout
      const fallback = setTimeout(() => setLoading(false), 2500)
      return () => {
        window.removeEventListener("load", handleLoad)
        clearTimeout(fallback)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Animated initials */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Name / Logo Mark */}
            <div className="relative">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-serif text-3xl font-bold tracking-tight text-foreground"
              >
                H<span className="text-primary">.</span>K
              </motion.span>
            </div>

            {/* Loading bar */}
            <div className="h-[2px] w-24 overflow-hidden rounded-full bg-border/30">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut",
                }}
                className="h-full w-full bg-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
