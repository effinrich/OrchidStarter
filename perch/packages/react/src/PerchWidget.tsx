import { useEffect } from "react"

declare global {
  interface Window { Perch?: { init: (c: unknown) => void; open: () => void; close: () => void; __loaded?: boolean } }
}

export type PerchProps = {
  /** ElevenLabs Conversational AI agent id */
  agentId: string
  /** your server endpoint that mints a signed URL (keeps the API key server-side) */
  sessionUrl: string
  accent?: string
  position?: "bottom-right" | "bottom-left"
  title?: string
  label?: string
  /** URL to the perch.js core bundle (defaults to CDN) */
  scriptSrc?: string
}

let loading: Promise<void> | null = null
function loadCore(src: string): Promise<void> {
  if (typeof window !== "undefined" && window.Perch?.__loaded) return Promise.resolve()
  if (loading) return loading
  loading = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script")
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("Failed to load Perch core"))
    document.head.appendChild(s)
  })
  return loading
}

/**
 * Mounts the Perch voice widget. Renders nothing itself — the widget attaches to
 * document.body (isolated in a Shadow DOM). Wraps the shared vanilla core so the
 * script-tag and React integrations stay in lockstep.
 */
export function PerchWidget(props: PerchProps) {
  const { scriptSrc = "https://cdn.perch.app/perch.js", ...cfg } = props
  useEffect(() => {
    let active = true
    loadCore(scriptSrc)
      .then(() => { if (active) window.Perch?.init(cfg) })
      .catch(() => {})
    return () => { active = false; window.Perch?.close() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
