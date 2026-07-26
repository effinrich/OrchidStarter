import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { css } from "styled-system/css"
import { Button } from "~/components/ui/button"
import { GlassPanel } from "~/components/GlassPanel"
import { supabase, type Widget } from "~/lib/supabase"

export const Route = createFileRoute("/dashboard")({ component: Dashboard })

const field = css({
  w: "full", px: "3", py: "2", rounded: "lg", fontSize: "sm",
  bg: "rgba(255,255,255,0.06)", borderWidth: "1px", borderColor: "rgba(255,255,255,0.16)",
  color: "white", _focus: { outline: "none", borderColor: "iris" },
})
const label = css({ display: "block", fontSize: "xs", fontWeight: "bold", color: "fg.muted", mb: "1.5", mt: "4" })
const blank: Omit<Widget, "id" | "user_id"> = { name: "Untitled", agent_id: "", accent: "#6D5EF6", position: "bottom-right", title: "Ask us anything" }

function Dashboard() {
  const nav = useNavigate()
  const [ready, setReady] = useState(false)
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [form, setForm] = useState<Partial<Widget>>(blank)
  const [copied, setCopied] = useState(false)

  // gate on auth, then load this user's widgets (RLS returns only their rows)
  useEffect(() => {
    let active = true
    supabase().auth.getSession().then(async ({ data }) => {
      if (!active) return
      if (!data.session) { nav({ to: "/login" }); return }
      const { data: rows } = await supabase().from("widgets").select("*").order("created_at", { ascending: false })
      if (!active) return
      setWidgets((rows as Widget[]) ?? [])
      setReady(true)
    })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const set = (k: keyof Widget, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const save = async () => {
    const { data: sess } = await supabase().auth.getSession()
    const userId = sess.session?.user.id
    if (!userId) return nav({ to: "/login" })
    const row = { ...blank, ...form, user_id: userId }
    const { data, error } = await supabase().from("widgets").upsert(row).select().single()
    if (error) return
    const w = data as Widget
    setWidgets((list) => {
      const rest = list.filter((x) => x.id !== w.id)
      return [w, ...rest]
    })
    setForm(w)
  }

  const remove = async (id: string) => {
    await supabase().from("widgets").delete().eq("id", id)
    setWidgets((l) => l.filter((x) => x.id !== id))
    if (form.id === id) setForm(blank)
  }

  const signOut = async () => { await supabase().auth.signOut(); nav({ to: "/login" }) }

  const snippet = `<script src="https://cdn.perch.app/perch.js"
  data-agent-id="${form.agent_id || "agent_xxx"}"
  data-session-url="/api/perch/session"
  data-accent="${form.accent}"
  data-position="${form.position}"
  data-title="${form.title}"
  defer></script>`

  const copy = async () => { try { await navigator.clipboard.writeText(snippet); setCopied(true); setTimeout(() => setCopied(false), 1200) } catch {} }

  if (!ready) return <main className={css({ p: "16", textAlign: "center", color: "fg.muted" })}>Loading…</main>

  return (
    <main className={css({ maxW: "5xl", mx: "auto", px: "6", py: "12" })}>
      <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "8" })}>
        <div>
          <h1 className={css({ fontSize: "3xl", fontWeight: "extrabold" })}>Your widgets</h1>
          <p className={css({ color: "fg.muted" })}>Configure, save, and grab the embed snippet.</p>
        </div>
        <Button variant="glass" onClick={signOut}>Sign out</Button>
      </div>

      <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", md: "220px 1fr" }, gap: "6" })}>
        {/* saved list */}
        <GlassPanel p="4">
          <Button className={css({ w: "full", mb: "3" })} onClick={() => setForm(blank)}>+ New widget</Button>
          {widgets.map((w) => (
            <div key={w.id} className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", py: "2", px: "2", rounded: "md", cursor: "pointer", _hover: { bg: "rgba(255,255,255,0.06)" }, bg: form.id === w.id ? "rgba(255,255,255,0.08)" : "transparent" })} onClick={() => setForm(w)}>
              <span className={css({ fontSize: "sm", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" })}>{w.name}</span>
              <button className={css({ fontSize: "xs", color: "fg.muted", bg: "transparent", borderWidth: 0, cursor: "pointer" })} onClick={(e) => { e.stopPropagation(); remove(w.id) }}>✕</button>
            </div>
          ))}
          {widgets.length === 0 ? <p className={css({ fontSize: "sm", color: "fg.muted", mt: "2" })}>No widgets yet.</p> : null}
        </GlassPanel>

        {/* editor + snippet */}
        <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", lg: "1fr 1fr" }, gap: "6" })}>
          <GlassPanel p="6">
            <label className={label} htmlFor="name">Name</label>
            <input id="name" className={field} value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} />
            <label className={label} htmlFor="agent">ElevenLabs agent ID</label>
            <input id="agent" className={field} value={form.agent_id ?? ""} onChange={(e) => set("agent_id", e.target.value)} placeholder="agent_…" />
            <label className={label} htmlFor="title">Panel title</label>
            <input id="title" className={field} value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} />
            <label className={label} htmlFor="accent">Accent color</label>
            <input id="accent" className={field} value={form.accent ?? ""} onChange={(e) => set("accent", e.target.value)} />
            <label className={label} htmlFor="pos">Position</label>
            <select id="pos" className={field} value={form.position ?? "bottom-right"} onChange={(e) => set("position", e.target.value)}>
              <option value="bottom-right">bottom-right</option>
              <option value="bottom-left">bottom-left</option>
            </select>
            <Button className={css({ mt: "5", w: "full" })} onClick={save}>Save</Button>
          </GlassPanel>

          <GlassPanel p="6">
            <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "3" })}>
              <span className={css({ fontSize: "xs", fontWeight: "bold", color: "fg.muted" })}>EMBED SNIPPET</span>
              <Button variant="glass" onClick={copy}>{copied ? "Copied!" : "Copy"}</Button>
            </div>
            <pre className={css({ fontFamily: "mono", fontSize: "xs", color: "fg.default", whiteSpace: "pre-wrap", margin: 0 })}>{snippet}</pre>
          </GlassPanel>
        </div>
      </div>
    </main>
  )
}
