"use client"

import { Hexagon } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Hexagon className="h-7 w-7 text-primary fill-primary/20" />
        <span className="text-xl font-semibold tracking-tight">Meridian</span>
      </div>
      <a
        href="#"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Already running OpenNMS Horizon?{" "}
        <span className="text-primary">→</span>
      </a>
    </header>
  )
}
