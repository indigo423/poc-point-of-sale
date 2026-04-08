import { create } from "zustand"

export interface ConfiguratorState {
  coreSelected: boolean
  minionSelected: boolean
  sentinelSelected: boolean
  supportSelected: boolean
  professionalServicesSelected: boolean
  bannerDismissed: boolean
  viewMode: "configurator" | "review"
  highlightedCard: string | null
  toggleCore: () => void
  toggleMinion: () => void
  toggleSentinel: () => void
  toggleSupport: () => void
  toggleProfessionalServices: () => void
  dismissBanner: () => void
  setViewMode: (mode: "configurator" | "review") => void
  setHighlightedCard: (card: string | null) => void
  getSelectedCount: () => number
  getCoverageText: () => string
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  coreSelected: false,
  minionSelected: false,
  sentinelSelected: false,
  supportSelected: false,
  professionalServicesSelected: false,
  bannerDismissed: false,
  viewMode: "configurator",
  highlightedCard: null,

  toggleCore: () =>
    set((state) => {
      const newCoreSelected = !state.coreSelected
      const hasOtherSubscriptions = state.minionSelected || state.sentinelSelected
      
      return {
        coreSelected: newCoreSelected,
        // If core is being deselected, also deselect dependent components
        minionSelected: newCoreSelected ? state.minionSelected : false,
        sentinelSelected: newCoreSelected ? state.sentinelSelected : false,
        // If deselecting core and no other subscriptions, deselect support too
        supportSelected: newCoreSelected || hasOtherSubscriptions ? state.supportSelected : false,
      }
    }),

  toggleMinion: () =>
    set((state) => {
      if (!state.coreSelected) return {}
      
      const newMinionSelected = !state.minionSelected
      const hasSubscriptions = state.coreSelected || newMinionSelected || state.sentinelSelected
      
      return {
        minionSelected: newMinionSelected,
        // If deselecting minion and no other subscriptions remain, deselect support
        supportSelected: hasSubscriptions ? state.supportSelected : false,
      }
    }),

  toggleSentinel: () =>
    set((state) => {
      if (!state.coreSelected) return {}
      
      const newSentinelSelected = !state.sentinelSelected
      const hasSubscriptions = state.coreSelected || state.minionSelected || newSentinelSelected
      
      return {
        sentinelSelected: newSentinelSelected,
        // If deselecting sentinel and no other subscriptions remain, deselect support
        supportSelected: hasSubscriptions ? state.supportSelected : false,
      }
    }),

  toggleSupport: () =>
    set((state) => {
      const hasSubscriptions = state.coreSelected || state.minionSelected || state.sentinelSelected
      // Only allow toggling if subscription components are selected
      if (!hasSubscriptions) return {}
      
      return {
        supportSelected: !state.supportSelected,
      }
    }),

  toggleProfessionalServices: () =>
    set((state) => ({
      professionalServicesSelected: !state.professionalServicesSelected,
    })),

  dismissBanner: () => set({ bannerDismissed: true }),

  setViewMode: (mode) => set({ viewMode: mode }),

  setHighlightedCard: (card) => set({ highlightedCard: card }),

  getSelectedCount: () => {
    const state = get()
    let count = 0
    if (state.coreSelected) count++
    if (state.minionSelected) count++
    if (state.sentinelSelected) count++
    if (state.supportSelected) count++
    if (state.professionalServicesSelected) count++
    return count
  },

  getCoverageText: () => {
    const state = get()
    if (!state.coreSelected && !state.minionSelected && !state.sentinelSelected) {
      return ""
    }
    if (state.coreSelected && state.minionSelected && state.sentinelSelected) {
      return "Covers your full deployment"
    }
    if (state.coreSelected && state.minionSelected) {
      return "Covers your Core and Minion subscriptions"
    }
    if (state.coreSelected && state.sentinelSelected) {
      return "Covers your Core and Sentinel subscriptions"
    }
    if (state.coreSelected) {
      return "Covers your Core subscription"
    }
    return ""
  },
}))
