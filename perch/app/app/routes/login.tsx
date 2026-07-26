import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { css } from "styled-system/css"
import { Button } from "~/components/ui/button"
import { GlassPanel } from "~/components/GlassPanel"
import { supabase } from "~/lib/supabase"

export const Route = createFileRoute("/login")({ component: Login })

const field = css({
  w: "full", px: "3", py: "2.5", rounded: "lg", fontSize: "sm", mb: "3",
  bg: "rgba(255,255,255,0.06)", borderWidth: "1px", borderColor: "rgba(255,255,255,0.16)",
  color: "white", _focus: { outline: "none", borderColor: "iris" },
})

function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [mode, setMode] = useState<"in" | "up">("in")
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setBusy(true)
    const { error } =
      mode === "in"
        ? await supabase().auth.signInWithPassword({ email, password: pw })
        : await supabase().auth.signUp({ email, password: pw })
    setBusy(false)
    if (error) setErr(error.message)
    else nav({ to: "/dashboard" })
  }

  return (
    <main className={css({ maxW: "sm", mx: "auto", px: "6", py: "24" })}>
      <GlassPanel p="7">
        <h1 className={css({ fontSize: "2xl", fontWeight: "extrabold", mb: "1" })}>
          {mode === "in" ? "Welcome back" : "Create your account"}
        </h1>
        <p className={css({ color: "fg.muted", fontSize: "sm", mb: "6" })}>Perch dashboard</p>
        <form onSubmit={submit}>
          <input className={field} type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className={field} type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} required minLength={6} />
          {err ? <p className={css({ color: "red.400", fontSize: "sm", mb: "3" })}>{err}</p> : null}
          <Button type="submit" disabled={busy} className={css({ w: "full" })}>
            {busy ? "…" : mode === "in" ? "Sign in" : "Sign up"}
          </Button>
        </form>
        <button
          className={css({ mt: "4", fontSize: "sm", color: "fg.muted", cursor: "pointer", bg: "transparent", borderWidth: 0 })}
          onClick={() => setMode(mode === "in" ? "up" : "in")}
        >
          {mode === "in" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </GlassPanel>
    </main>
  )
}
