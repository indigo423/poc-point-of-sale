"use client"

import { useState } from "react"
import { Check, ChevronDown, Hexagon, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProductCardProps {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  price?: number
  selected: boolean
  locked?: boolean
  highlighted?: boolean
  onSelect: () => void
  onLockedClick?: () => void
}

export function ProductCard({
  id,
  title,
  subtitle,
  description,
  features,
  price,
  selected,
  locked = false,
  highlighted = false,
  onSelect,
  onLockedClick,
}: ProductCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleLockedClick = () => {
    setShaking(true)
    setTimeout(() => setShaking(false), 500)
    onLockedClick?.()
  }

  const cardContent = (
          <div
            id={id}
            className={cn(
              "relative p-5 rounded-lg border transition-all duration-300",
              selected
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                : locked
                  ? "border-border/50 bg-card/50 opacity-60"
                  : "border-border bg-card hover:border-primary/50",
              highlighted && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              shaking && "animate-shake"
            )}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className={cn(
                  "p-2 rounded-md",
                  selected
                    ? "bg-primary/20 text-primary"
                    : locked
                      ? "bg-muted text-muted-foreground"
                      : "bg-secondary text-foreground"
                )}
              >
                {locked ? (
                  <Lock className="h-5 w-5" />
                ) : (
                  <Hexagon className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{description}</p>

            <div className="flex items-baseline justify-between mb-4">
              {price && (
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">
                    ${price.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">/year</span>
                </div>
              )}
              {!price && (
                <p className="text-xs text-muted-foreground">
                  Annual subscription
                </p>
              )}
            </div>

            <Collapsible open={expanded} onOpenChange={setExpanded}>
              <CollapsibleTrigger
                className="flex items-center gap-1 text-sm text-primary hover:underline mb-4"
                disabled={locked}
              >
                {"What's included"}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expanded && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mb-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {locked ? (
              <Button
                variant="secondary"
                className="w-full"
                disabled
                onClick={handleLockedClick}
              >
                Select Core first
              </Button>
            ) : selected ? (
              <Button
                variant="default"
                className="w-full bg-primary text-primary-foreground"
                onClick={onSelect}
              >
                <Check className="h-4 w-4 mr-2" />
                {title} Selected
              </Button>
            ) : (
              <Button variant="outline" className="w-full" onClick={onSelect}>
                Select {title}
              </Button>
            )}
          </div>
  )

  if (!locked) {
    return cardContent
  }

  return (
    <TooltipProvider>
      <Tooltip open={shaking}>
        <TooltipTrigger asChild>
          {cardContent}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p>Add Meridian Core first to unlock this component</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
