"use client"

import { useConfiguratorStore } from "@/lib/configurator-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Check, Plus } from "lucide-react"

export function StickyBottomBar() {
  const {
    coreSelected,
    minionSelected,
    sentinelSelected,
    supportSelected,
    professionalServicesSelected,
    viewMode,
    setViewMode,
    setHighlightedCard,
    getSelectedCount,
  } = useConfiguratorStore()

  const selectedCount = getSelectedCount()

  const handleChipClick = (cardId: string) => {
    const element = document.getElementById(cardId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      setHighlightedCard(cardId)
      setTimeout(() => setHighlightedCard(null), 2000)
    }
  }

  const chips = [
    { id: "core", label: "Core", selected: coreSelected },
    { id: "minion", label: "Minion", selected: minionSelected },
    { id: "sentinel", label: "Sentinel", selected: sentinelSelected },
    { id: "support", label: "Support", selected: supportSelected },
    {
      id: "professional-services",
      label: "Pro Services",
      selected: professionalServicesSelected,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleChipClick(chip.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all",
                chip.selected
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border border-transparent hover:border-border"
              )}
            >
              {chip.selected ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              {chip.label}
            </button>
          ))}
        </div>

        <TooltipProvider>
          <Tooltip open={selectedCount === 0 ? undefined : false}>
            <TooltipTrigger asChild>
              <div>
                <Button
                  size="lg"
                  className={cn(
                    "px-6",
                    selectedCount === 0 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={selectedCount === 0}
                  onClick={() =>
                    setViewMode(viewMode === "configurator" ? "review" : "configurator")
                  }
                >
                  {viewMode === "review"
                    ? "← Edit Configuration"
                    : "Review & Get Quote"}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Select at least one product to continue</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
