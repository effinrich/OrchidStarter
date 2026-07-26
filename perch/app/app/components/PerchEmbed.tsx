import { useEffect } from "react"

type Props = { agentId?: string; sessionUrl?: string; accent?: string; position?: string; title?: string; mock?: boolean }

// Client-only: injects the vanilla perch.js core (served from /public) and lets it
// self-mount from its data-* attributes. The buildless widget is the one place
// inline/Shadow-DOM styles live (see CLAUDE.md) — the app around it stays Panda/Park UI.
export function PerchEmbed({
  agentId = "",
  sessionUrl = "/api/perch/session",
  accent = "#6D5EF6",
  position = "bottom-right",
  title = "Ask Perch",
  mock = false,
}: Props) {
  useEffect(() => {
    if (typeof document === "undefined") return
    if (document.querySelector("script[data-perch]")) return
    const s = document.createElement("script")
    s.src = "/perch.js"
    s.defer = true
    s.setAttribute("data-perch", "")
    s.dataset.sessionUrl = sessionUrl
    s.dataset.accent = accent
    s.dataset.position = position
    s.dataset.title = title
    if (agentId) s.dataset.agentId = agentId
    if (mock) s.dataset.mock = "true"
    document.body.appendChild(s)
    return () => {
      ;(window as unknown as { Perch?: { close?: () => void } }).Perch?.close?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
