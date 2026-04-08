"use client"

import { useConfiguratorStore } from "@/lib/configurator-store"
import { ProductCard } from "./product-card"
import { ServiceCard } from "./service-card"

export function ProductConfigurator() {
  const {
    coreSelected,
    minionSelected,
    sentinelSelected,
    supportSelected,
    highlightedCard,
    toggleCore,
    toggleMinion,
    toggleSentinel,
    toggleSupport,
    getCoverageText,
  } = useConfiguratorStore()

  const coverageText = getCoverageText()
  const hasSubscriptionComponents = coreSelected || minionSelected || sentinelSelected

  // Calculate Software Support price based on selected components
  let supportPrice: number | undefined
  if (coreSelected) {
    supportPrice = 12000
  } else if (minionSelected) {
    supportPrice = 10000
  } else if (sentinelSelected) {
    supportPrice = 16000
  }

  return (
    <div className="space-y-8">
      {/* Foundation Section */}
      <section>
        <h2 className="text-lg font-semibold mb-1">Your Foundation</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Start with the core monitoring platform
        </p>
        <ProductCard
          id="core"
          title="Meridian Core"
          subtitle="LTS network monitoring server"
          description="Required for all other components"
          features={[
            "Long-term support (LTS) lifecycle",
            "Enterprise repository access",
            "Priority CVE patches and security updates",
            "Full monitoring core feature set",
          ]}
          price={6000}
          selected={coreSelected}
          highlighted={highlightedCard === "core"}
          onSelect={toggleCore}
        />
      </section>

      {/* Scale Section */}
      <section>
        <h2 className="text-lg font-semibold mb-1">Scale Your Deployment</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Extend your monitoring capabilities
        </p>
        <div className="grid gap-4">
          <ProductCard
            id="minion"
            title="Meridian Minion"
            subtitle="Distributed zone proxy"
            description="Extends Core into distributed sites"
            features={[
              "Monitor isolated network zones",
              "Secure communication with Core",
              "Local data collection and buffering",
              "Reduced WAN bandwidth requirements",
            ]}
            price={2000}
            selected={minionSelected}
            locked={!coreSelected}
            highlighted={highlightedCard === "minion"}
            onSelect={toggleMinion}
          />
          <ProductCard
            id="sentinel"
            title="Meridian Sentinel"
            subtitle="Flow persistence at scale"
            description="Offloads Core at high data volumes"
            features={[
              "Horizontal scaling for flow data",
              "High-volume NetFlow/sFlow/IPFIX processing",
              "Distributed data persistence",
              "Reduced Core resource utilization",
            ]}
            price={4000}
            selected={sentinelSelected}
            locked={!coreSelected}
            highlighted={highlightedCard === "sentinel"}
            onSelect={toggleSentinel}
          />
        </div>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-lg font-semibold mb-1">Protect Your Investment</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Expert support and consulting services
        </p>
        <div className="grid gap-4">
          <ServiceCard
            id="support"
            title="Software Support"
            subtitle="SLA-backed support for your Meridian deployment"
            description="Get expert assistance when you need it most"
            details={[
              "2 Meridian Core instances",
              "50 Meridian Minions",
              "10 Meridian Sentinels",
            ]}
            selected={supportSelected}
            highlighted={highlightedCard === "support"}
            coverageText={coverageText}
            locked={!hasSubscriptionComponents}
            lockMessage="Select at least one subscription component (Core, Minion, or Sentinel)"
            price={supportPrice}
            onSelect={toggleSupport}
          />
        </div>
      </section>
    </div>
  )
}
