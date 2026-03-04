"use client"

import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 0.5px, transparent 0.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Big 404 */}
        <h1 className="font-serif text-[8rem] font-bold leading-none tracking-tighter text-foreground/10 sm:text-[12rem]">
          404
        </h1>

        {/* Message */}
        <div className="-mt-6 sm:-mt-10">
          <h2 className="mb-3 font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Page not found
          </h2>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <Home className="h-4 w-4" />
            Back Home
          </Link>
          <button
            onClick={() => {
              if (typeof window !== "undefined") window.history.back()
            }}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/60 bg-card/80 px-5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-card"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
