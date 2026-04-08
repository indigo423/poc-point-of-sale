"use client"

import { useState, useEffect } from "react"
import { Check, CircleDot, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ServiceCardProps {
  id: string
  title: string
  subtitle: string
  description: string
  details?: string[]
  selected: boolean
  highlighted?: boolean
  coverageText?: string
  locked?: boolean
  lockMessage?: string
  price?: number
  onSelect: () => void
}

export function ServiceCard({
  id,
  title,
  subtitle,
  description,
  details,
  selected,
  highlighted = false,
  coverageText,
  locked = false,
  lockMessage = "Locked",
  price,
  onSelect,
}: ServiceCardProps) {
  const [shaking, setShaking] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  useEffect(() => {
    if (shaking) {
      setTooltipOpen(true)
      const timer = setTimeout(() => {
        setShaking(false)
        setTooltipOpen(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [shaking])

  const handleClick = () => {
    if (locked) {
      setShaking(true)
    } else {
      onSelect()
    }
  }

  const cardContent = (
          <div
            id={id}
            className={cn(
              "relative p-5 rounded-lg border transition-all duration-300",
              selected
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                : "border-border bg-card hover:border-primary/50",
              highlighted && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              locked && "opacity-60 cursor-not-allowed",
              shaking && "animate-shake"
            )}
          >
          {locked && (
            <div className="absolute top-3 right-3">
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div className="flex items-start gap-3 mb-3">
            <div
              className={cn(
                "p-2 rounded-md",
                selected
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-foreground",
                locked && "bg-muted text-muted-foreground"
              )}
            >
              <CircleDot className="h-5 w-5" />
            </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span className="text-xs text-muted-foreground">1 year</span>
          </div>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {price && (
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">
              ${price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">/year</span>
          </div>
        </div>
      )}

      {coverageText && (
        <div className="mb-4 px-3 py-2 rounded-md bg-primary/10 border border-primary/20">
          <p className="text-xs text-primary flex items-center gap-2">
            <Check className="h-3 w-3" />
            {coverageText}
          </p>
        </div>
      )}

      {details && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Covers up to:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {details.map((detail, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-primary">·</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

          {selected ? (
            <Button
              variant="default"
              className="w-full bg-primary text-primary-foreground"
              onClick={handleClick}
              disabled={locked}
            >
              <Check className="h-4 w-4 mr-2" />
              {title} Added
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleClick}
              disabled={locked}
            >
              {locked ? <Lock className="h-4 w-4 mr-2" /> : null}
              Add {title}
            </Button>
          )}
        </div>
  )

  if (!locked) {
    return cardContent
  }

  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen}>
        <TooltipTrigger asChild>
          {cardContent}
        </TooltipTrigger>
        <TooltipContent>
          <p>{lockMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
