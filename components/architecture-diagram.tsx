"use client"

import { cn } from "@/lib/utils"
import { useConfiguratorStore } from "@/lib/configurator-store"

export function ArchitectureDiagram() {
  const {
    coreSelected,
    minionSelected,
    sentinelSelected,
    supportSelected,
    setHighlightedCard,
  } = useConfiguratorStore()

  const handleNodeClick = (cardId: string) => {
    const element = document.getElementById(cardId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      setHighlightedCard(cardId)
      setTimeout(() => setHighlightedCard(null), 2000)
    }
  }

  const handleNodeHover = (cardId: string | null) => {
    setHighlightedCard(cardId)
  }

  if (!coreSelected) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <svg
            viewBox="0 0 400 300"
            className="w-full max-w-md opacity-30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Core and Sentinel side by side */}
            <rect
              x="30"
              y="60"
              width="150"
              height="70"
              rx="8"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="text-muted-foreground"
            />
            <text
              x="105"
              y="100"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              Core Server
            </text>

            <rect
              x="220"
              y="60"
              width="150"
              height="70"
              rx="8"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="text-muted-foreground"
            />
            <text
              x="295"
              y="100"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              Meridian Sentinel
            </text>

            {/* Horizontal connection line */}
            <line
              x1="180"
              y1="95"
              x2="220"
              y2="95"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 2"
              className="text-muted-foreground"
            />

            {/* Minion below */}
            <rect
              x="125"
              y="170"
              width="150"
              height="70"
              rx="8"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="text-muted-foreground"
            />
            <text
              x="200"
              y="210"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              Meridian Minion
            </text>

            {/* Vertical connection line */}
            <line
              x1="200"
              y1="130"
              x2="200"
              y2="170"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 2"
              className="text-muted-foreground"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          Select Meridian Core to see your deployment
        </h3>
        <p className="text-sm text-muted-foreground/70 max-w-sm">
          Your architecture diagram will appear here as you build your
          configuration
        </p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full p-6 flex items-center justify-center">
      <svg
        viewBox="0 0 400 350"
        className="w-full max-w-lg h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Core Node - Left side */}
        {coreSelected && (
        <g
          onClick={() => handleNodeClick("core")}
          onMouseEnter={() => handleNodeHover("core")}
          onMouseLeave={() => handleNodeHover(null)}
          className="cursor-pointer"
        >
          <rect
            x={sentinelSelected ? 20 : 100}
            y="30"
            width="160"
            height="80"
            rx="8"
            className="fill-primary/20 stroke-primary transition-all hover:fill-primary/30"
            strokeWidth="2"
          />
          <text
            x={sentinelSelected ? 100 : 180}
            y="60"
            textAnchor="middle"
            className="text-sm fill-foreground font-semibold"
          >
            Meridian Core
          </text>
          <text
            x={sentinelSelected ? 100 : 180}
            y="75"
            textAnchor="middle"
            className="text-xs fill-muted-foreground"
          >
            Control Plane
          </text>
          <text
            x={sentinelSelected ? 100 : 180}
            y="92"
            textAnchor="middle"
            className={cn(
              "text-[10px] font-medium italic transition-colors",
              supportSelected ? "fill-primary" : "fill-muted-foreground"
            )}
          >
            {supportSelected ? "2 Instances" : "Unlimited – self-support"}
          </text>
          {supportSelected && (
            <g transform={`translate(${sentinelSelected ? 168 : 248}, 22)`}>
              <circle r="10" className="fill-primary" />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                className="text-[8px] fill-primary-foreground font-bold"
              >
                S
              </text>
            </g>
          )}
        </g>
        )}

        {/* Horizontal connection line from Core to Sentinel */}
        {sentinelSelected && (
          <line
            x1="180"
            y1="70"
            x2="220"
            y2="70"
            className="stroke-chart-2 animate-fade-in"
            strokeWidth="2"
          />
        )}

        {/* Sentinel Node - Right side, same level as Core */}
        {sentinelSelected && (
          <g
            onClick={() => handleNodeClick("sentinel")}
            onMouseEnter={() => handleNodeHover("sentinel")}
            onMouseLeave={() => handleNodeHover(null)}
            className="cursor-pointer animate-fade-in"
          >
            <rect
              x="220"
              y="30"
              width="160"
              height="80"
              rx="8"
              className="fill-chart-2/20 stroke-chart-2 transition-all hover:fill-chart-2/30"
              strokeWidth="2"
            />
            <text
              x="300"
              y="60"
              textAnchor="middle"
              className="text-sm fill-foreground font-semibold"
            >
              Meridian Sentinel
            </text>
            <text
              x="300"
              y="75"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              Offload Flow Persistence
            </text>
            <text
              x="300"
              y="92"
              textAnchor="middle"
              className={cn(
                "text-[10px] font-medium italic transition-colors",
                supportSelected ? "fill-chart-2" : "fill-muted-foreground"
              )}
            >
              {supportSelected ? "10 Sentinels" : "Unlimited – self-support"}
            </text>
            {supportSelected && (
              <g transform="translate(368, 22)">
                <circle r="10" className="fill-chart-2" />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  className="text-[8px] fill-primary-foreground font-bold"
                >
                  S
                </text>
              </g>
            )}
          </g>
        )}

        {/* Vertical connection line to Minion */}
        {minionSelected && (
          <line
            x1="200"
            y1="110"
            x2="200"
            y2="150"
            className="stroke-chart-3 animate-fade-in"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        )}

        {/* Minion Node - Below, centered */}
        {minionSelected && (
          <g
            onClick={() => handleNodeClick("minion")}
            onMouseEnter={() => handleNodeHover("minion")}
            onMouseLeave={() => handleNodeHover(null)}
            className="cursor-pointer animate-fade-in"
          >
            <rect
              x="120"
              y="150"
              width="160"
              height="80"
              rx="8"
              className="fill-chart-3/20 stroke-chart-3 transition-all hover:fill-chart-3/30"
              strokeWidth="2"
            />
            <text
              x="200"
              y="180"
              textAnchor="middle"
              className="text-sm fill-foreground font-semibold"
            >
              Meridian Minion
            </text>
            <text
              x="200"
              y="195"
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              Monitoring Proxy
            </text>
            <text
              x="200"
              y="212"
              textAnchor="middle"
              className={cn(
                "text-[10px] font-medium italic transition-colors",
                supportSelected ? "fill-chart-3" : "fill-muted-foreground"
              )}
            >
              {supportSelected ? "50 Minions" : "Unlimited – self-support"}
            </text>
            {supportSelected && (
              <g transform="translate(268, 142)">
                <circle r="10" className="fill-chart-3" />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  className="text-[8px] fill-primary-foreground font-bold"
                >
                  S
                </text>
              </g>
            )}
            
            {/* Remote Zone indicator */}
            <text
              x="200"
              y="250"
              textAnchor="middle"
              className="text-[10px] fill-chart-3/70"
            >
              Remote Network Zone
            </text>
          </g>
        )}

        {/* Legend */}
        <g transform="translate(200, 330)">
          <text textAnchor="middle" className="text-[10px] fill-muted-foreground">
            Click nodes to view details
          </text>
        </g>
      </svg>
    </div>
  )
}
