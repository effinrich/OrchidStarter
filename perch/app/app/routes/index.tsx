import { createFileRoute, Link } from "@tanstack/react-router"
import { Tabs } from "@ark-ui/react/tabs"
import { css } from "styled-system/css"
import { Button } from "~/components/ui/button"
import { GlassPanel } from "~/components/GlassPanel"
import { PerchEmbed } from "~/components/PerchEmbed"

export const Route = createFileRoute("/")({ component: Landing })


const SNIPPETS: Record<string, string> = {
  html: `<script src="https://cdn.perch.app/perch.js"
  data-agent-id="agent_xxx"
  data-session-url="/api/perch/session"
  defer></script>`,
  react: `import { PerchWidget } from "@perch/react"

<PerchWidget agentId="agent_xxx" sessionUrl="/api/perch/session" />`,
}

function Landing() {
  return (
    <main>
      <nav className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", py: "5", ...wrapRaw })}>
        <div className={css({ display: "flex", alignItems: "center", gap: "2.5", fontWeight: "extrabold", fontSize: "xl" })}>
          <span className={css({ w: "7", h: "7", rounded: "lg", bgGradient: "to-br", gradientFrom: "iris", gradientTo: "aqua" })} />
          perch
        </div>
        <div className={css({ display: "flex", gap: "5", alignItems: "center" })}>
          <Link to="/dashboard" className={css({ color: "fg.muted", fontSize: "sm", textDecoration: "none" })}>Dashboard</Link>
          <Button>Get started</Button>
        </div>
      </nav>

      <header className={css({ textAlign: "center", py: "16", ...wrapRaw })}>
        <span className={css({ display: "inline-block", fontSize: "xs", letterSpacing: "wide", px: "3", py: "1.5", rounded: "full", bg: "rgba(255,255,255,0.07)", borderWidth: "1px", borderColor: "rgba(255,255,255,0.16)", color: "fg.muted" })}>
          POWERED BY ELEVENLABS CONVERSATIONAL AI
        </span>
        <h1 className={css({ fontSize: { base: "5xl", md: "7xl" }, lineHeight: "1.04", fontWeight: "extrabold", mt: "6", mb: "4", bgGradient: "to-r", gradientFrom: "white", gradientTo: "aqua", bgClip: "text", color: "transparent" })}>
          Give your site a voice.
        </h1>
        <p className={css({ fontSize: "lg", color: "fg.muted", maxW: "xl", mx: "auto", lineHeight: "1.6" })}>
          A liquid-glass voice assistant for any website. One script tag, and your visitors can just talk to your product.
        </p>
        <div className={css({ display: "flex", gap: "3", justifyContent: "center", mt: "8" })}>
          <Button>Get started free</Button>
          <Button variant="glass" asChild><a href="#how">See how it works</a></Button>
        </div>

        <GlassPanel maxW="2xl" mx="auto" mt="12" overflow="hidden" textAlign="left">
          <Tabs.Root defaultValue="html">
            <Tabs.List className={css({ display: "flex", gap: "1", p: "2", borderBottomWidth: "1px", borderColor: "rgba(255,255,255,0.1)" })}>
              <Tabs.Trigger value="html" className={tabCss}>Script tag</Tabs.Trigger>
              <Tabs.Trigger value="react" className={tabCss}>React</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            {(["html", "react"] as const).map((k) => (
              <Tabs.Content key={k} value={k} className={css({ p: "4" })}>
                <pre className={css({ fontFamily: "mono", fontSize: "sm", color: "fg.default", whiteSpace: "pre-wrap", margin: 0 })}>{SNIPPETS[k]}</pre>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </GlassPanel>
      </header>

      <section id="how" className={css({ py: "16", ...wrapRaw })}>
        <h2 className={sectionH2}>Live in one line</h2>
        <p className={sectionLead}>Your visitor taps the orb and talks. Your ElevenLabs key never leaves your server.</p>
        <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", md: "repeat(3,1fr)" }, gap: "4", maxW: "3xl", mx: "auto" })}>
          {[
            ["1", "Widget", "The Perch orb calls your session endpoint when a visitor starts talking."],
            ["2", "Your server", "Mints a short-lived signed URL from ElevenLabs. The API key stays server-side."],
            ["3", "ElevenLabs", "Runs the live WebRTC voice session — speech in, agent voice out."],
          ].map(([n, t, d]) => (
            <GlassPanel key={n} p="5" textAlign="center">
              <div className={css({ w: "8", h: "8", rounded: "full", mx: "auto", mb: "2.5", display: "grid", placeItems: "center", fontWeight: "bold", bgGradient: "to-br", gradientFrom: "iris", gradientTo: "aqua" })}>{n}</div>
              <b>{t}</b>
              <p className={css({ color: "fg.muted", fontSize: "sm", mt: "1.5", lineHeight: "1.5" })}>{d}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className={css({ py: "16", ...wrapRaw })}>
        <h2 className={sectionH2}>Built for developers</h2>
        <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", md: "repeat(3,1fr)" }, gap: "4" })}>
          {[
            ["✨", "Liquid-glass UI", "Glassmorphism, animated orbs, a live waveform. Premium out of the box."],
            ["🛡️", "Zero CSS collisions", "Shadow DOM — never fights your styles, and yours never leak in."],
            ["⚡", "Zero build", "One script tag. No bundler required. A React SDK too if you want it."],
            ["🎙️", "Powered by ElevenLabs", "Low-latency WebRTC, natural voices, your own agent."],
            ["🔑", "Key-safe by design", "Signed-URL flow keeps your API key on the server."],
            ["🎨", "Themeable", "Set accent, position, and copy with data-attributes."],
          ].map(([ic, t, d]) => (
            <GlassPanel key={t} p="5">
              <div className={css({ w: "10", h: "10", rounded: "xl", display: "grid", placeItems: "center", fontSize: "xl", mb: "3", bgGradient: "to-br", gradientFrom: "iris", gradientTo: "aqua" })}>{ic}</div>
              <h3 className={css({ fontSize: "md", mb: "1.5", fontWeight: "bold" })}>{t}</h3>
              <p className={css({ color: "fg.muted", fontSize: "sm", lineHeight: "1.5" })}>{d}</p>
            </GlassPanel>
          ))}
        </div>
      </section>
      <PerchEmbed title="Ask Perch" />
    </main>
  )
}

const wrapRaw = { maxWidth: "64rem", marginInline: "auto", paddingInline: "1.5rem" } as const
const tabCss = css({ px: "3.5", py: "2", fontSize: "sm", rounded: "md", cursor: "pointer", color: "fg.muted", _selected: { color: "white", bg: "rgba(255,255,255,0.08)" } })
const sectionH2 = css({ fontSize: "3xl", textAlign: "center", fontWeight: "extrabold", mb: "2" })
const sectionLead = css({ textAlign: "center", color: "fg.muted", maxW: "lg", mx: "auto", mb: "10" })
