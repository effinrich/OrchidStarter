import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { css } from "styled-system/css"
import { Button } from "~/components/ui/button"
import { GlassPanel } from "~/components/GlassPanel"

export const Route = createFileRoute("/dashboard")({ component: Dashboard })

const field = css({
  w: "full", px: "3", py: "2", rounded: "lg", fontSize: "sm",
  bg: "rgba(255,255,255,0.06)", borderWidth: "1px", borderColor: "rgba(255,255,255,0.16)",
  color: "white", _focus: { outline: "none", borderColor: "iris" },
})
const label = css({ display: "block", fontSize: "xs", fontWeight: "bold", color: "fg.muted", mb: "1.5", mt: "4" })

function Dashboard() {
  const [agentId, setAgentId] = useState("agent_xxx")
  const [accent, setAccent] = useState("#6D5EF6")
  const [position, setPosition] = useState("bottom-right")
  const [title, setTitle] = useState("Ask us anything")
  const [copied, setCopied] = useState(false)

  const snippet = `<script src="https://cdn.perch.app/perch.js"
  data-agent-id="${agentId}"
  data-session-url="/api/perch/session"
  data-accent="${accent}"
  data-position="${position}"
  data-title="${title}"
  defer></script>`

  const copy = async () => {
    try { await navigator.clipboard.writeText(snippet); setCopied(true); setTimeout(() => setCopied(false), 1200) } catch {}
  }

  return (
    <main className={css({ maxW: "3xl", mx: "auto", px: "6", py: "12" })}>
      <h1 className={css({ fontSize: "3xl", fontWeight: "extrabold", mb: "1" })}>Configure your widget</h1>
      <p className={css({ color: "fg.muted", mb: "8" })}>Set it up, copy the snippet, paste it on your site.</p>

      <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", md: "1fr 1fr" }, gap: "6" })}>
        <GlassPanel p="6">
          <label className={label} htmlFor="agent">ElevenLabs agent ID</label>
          <input id="agent" className={field} value={agentId} onChange={(e) => setAgentId(e.target.value)} />
          <label className={label} htmlFor="title">Panel title</label>
          <input id="title" className={field} value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className={label} htmlFor="accent">Accent color</label>
          <input id="accent" className={field} value={accent} onChange={(e) => setAccent(e.target.value)} />
          <label className={label} htmlFor="pos">Position</label>
          <select id="pos" className={field} value={position} onChange={(e) => setPosition(e.target.value)}>
            <option value="bottom-right">bottom-right</option>
            <option value="bottom-left">bottom-left</option>
          </select>
        </GlassPanel>

        <GlassPanel p="6">
          <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "3" })}>
            <span className={css({ fontSize: "xs", fontWeight: "bold", color: "fg.muted" })}>YOUR EMBED SNIPPET</span>
            <Button variant="glass" onClick={copy}>{copied ? "Copied!" : "Copy"}</Button>
          </div>
          <pre className={css({ fontFamily: "mono", fontSize: "xs", color: "fg.default", whiteSpace: "pre-wrap", margin: 0 })}>{snippet}</pre>
        </GlassPanel>
      </div>
    </main>
  )
}
