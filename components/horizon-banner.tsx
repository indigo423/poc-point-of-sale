"use client"

import { X } from "lucide-react"
import { useConfiguratorStore } from "@/lib/configurator-store"

export function HorizonBanner() {
  const { bannerDismissed, dismissBanner, toggleCore, setHighlightedCard } =
    useConfiguratorStore()

  if (bannerDismissed) return null

  const handleClick = () => {
    toggleCore()
    setHighlightedCard("core")
    setTimeout(() => setHighlightedCard(null), 2000)
  }

  return (
    <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 border-b border-primary/20 text-sm">
      <span className="text-muted-foreground">
        Running OpenNMS Horizon in production?
      </span>
      <button
        onClick={handleClick}
        className="text-primary hover:underline font-medium"
      >
        See exactly what Meridian adds →
      </button>
      <button
        onClick={dismissBanner}
        className="absolute right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
