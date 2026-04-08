"use client"

import { useConfiguratorStore } from "@/lib/configurator-store"
import { Header } from "@/components/header"
import { HorizonBanner } from "@/components/horizon-banner"
import { ProductConfigurator } from "@/components/product-configurator"
import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { QuoteForm } from "@/components/quote-form"
import { cn } from "@/lib/utils"

export default function MeridianConfigurator() {
  const { viewMode } = useConfiguratorStore()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <HorizonBanner />

      <main className="flex-1 flex">
        {/* Left Panel - Product Configurator */}
        <div
          className={cn(
            "w-full lg:w-[480px] xl:w-[520px] border-r border-border overflow-y-auto transition-opacity duration-300",
            viewMode === "review" && "opacity-60"
          )}
          style={{ height: "calc(100vh - 140px)" }}
        >
          <div className="p-6 pb-24">
            <ProductConfigurator />
          </div>
        </div>

        {/* Right Panel - Architecture Diagram or Quote Form */}
        <div
          className="hidden lg:flex flex-1 overflow-hidden"
          style={{ height: "calc(100vh - 140px)" }}
        >
          {viewMode === "configurator" ? (
            <ArchitectureDiagram />
          ) : (
            <QuoteForm />
          )}
        </div>
      </main>

      <StickyBottomBar />
    </div>
  )
}
