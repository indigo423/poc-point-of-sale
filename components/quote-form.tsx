"use client"

import { useState } from "react"
import { useConfiguratorStore } from "@/lib/configurator-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, ArrowLeft } from "lucide-react"

export function QuoteForm() {
  const {
    coreSelected,
    minionSelected,
    sentinelSelected,
    supportSelected,
    professionalServicesSelected,
    setViewMode,
  } = useConfiguratorStore()

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          Thanks{formData.name ? `, ${formData.name.split(" ")[0]}` : ""}!
        </h2>
        <p className="text-muted-foreground mb-6">
          Someone from our team will be in touch shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false)
            setViewMode("configurator")
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Edit configuration
        </Button>
      </div>
    )
  }

  // Subscription prices (free/open source)
  const subscriptions = [
    { label: "Meridian Core", selected: coreSelected, price: 0 },
    { label: "Meridian Minion", selected: minionSelected, price: 0 },
    { label: "Meridian Sentinel", selected: sentinelSelected, price: 0 },
  ].filter((s) => s.selected)

  // Calculate Software Support price breakdown
  const supportBreakdown = []
  let supportTotal = 0
  if (supportSelected) {
    if (coreSelected) {
      supportBreakdown.push({ label: "Core Support", price: 12000 })
      supportTotal += 12000
    }
    if (minionSelected) {
      supportBreakdown.push({ label: "Minion Support", price: 10000 })
      supportTotal += 10000
    }
    if (sentinelSelected) {
      supportBreakdown.push({ label: "Sentinel Support", price: 16000 })
      supportTotal += 16000
    }
  }

  // Professional services pricing
  const professionalServicesPrice = professionalServicesSelected ? 0 : 0

  const services = [
    { label: "Software Support", selected: supportSelected, price: supportTotal, breakdown: supportBreakdown },
    { label: "Professional Services", selected: professionalServicesSelected, price: professionalServicesPrice },
  ].filter((s) => s.selected)

  // Calculate total price
  const totalPrice = supportTotal + professionalServicesPrice

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setViewMode("configurator")}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Edit configuration
        </button>

        <h2 className="text-xl font-semibold mb-6">Your Configuration</h2>

        <div className="space-y-4 mb-8 p-4 rounded-lg bg-secondary/50 border border-border">
          {subscriptions.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Subscriptions — 1 year
              </h3>
              <ul className="space-y-1">
                {subscriptions.map((sub) => (
                  <li key={sub.label} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {sub.label}
                    <span className="text-muted-foreground ml-auto">
                      ${sub.price.toLocaleString()}/year
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {services.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Services — 1 year
              </h3>
              <ul className="space-y-2">
                {services.map((svc) => (
                  <li key={svc.label}>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {svc.label}
                      <span className="font-medium ml-auto">
                        {svc.price > 0 ? `$${svc.price.toLocaleString()}/year` : 'annual'}
                      </span>
                    </div>
                    {svc.breakdown && svc.breakdown.length > 0 && (
                      <ul className="ml-6 mt-1 space-y-0.5">
                        {svc.breakdown.map((item) => (
                          <li key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground italic">
                            <span>{item.label}</span>
                            <span className="ml-auto">${item.price.toLocaleString()}/year</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {totalPrice > 0 && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total (1 year)</span>
                <span>${totalPrice.toLocaleString()}/year</span>
              </div>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Request a Quote</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium mb-1.5 block">
              Full name
            </label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label htmlFor="company" className="text-sm font-medium mb-1.5 block">
              Company
            </label>
            <Input
              id="company"
              required
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, company: e.target.value }))
              }
              placeholder="Acme Corp"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium mb-1.5 block">
              Work email
            </label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="jane@acme.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium mb-1.5 block">
              Message{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Anything we should know about your environment?"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Request Quote
          </Button>
        </form>
      </div>
    </div>
  )
}
