# Perch — give your site a voice

Drop-in voice AI for any website. **One script tag**, or a **React SDK**. Powered by
ElevenLabs Conversational AI. Your visitors tap a bubble and *talk* to your product —
support, FAQ, booking, onboarding.

```
perch/
├── brand/            logo.svg, mark.svg, BRAND.md (colors, tone)
├── packages/
│   ├── embed/        perch.js  ← the vanilla <script> widget (zero deps, zero build) + demo.html
│   └── react/        @perch/react — <PerchWidget /> component
├── server/           session.mjs — serverless proxy that mints ElevenLabs signed URLs
└── docs/             integration guides
```

## Try the demo now (no build, no keys)
```bash
# from packages/embed/
python3 -m http.server 8080   # or any static server
# open http://localhost:8080/demo.html  → click the bubble, bottom-right
```
Runs in **demo mode** until you point it at a real session endpoint (below).

## How it works (and why it's safe)
1. Your site loads `perch.js` (or `<PerchWidget/>`).
2. On "talk", the widget calls **your** `session` endpoint.
3. That endpoint (server-side, holding your `ELEVENLABS_API_KEY`) asks ElevenLabs for a
   short-lived **signed URL** and returns it. **The key never touches the browser.**
4. The widget hands the signed URL to ElevenLabs' Conversational AI SDK, which runs the
   live mic ↔ agent audio (ASR → LLM → TTS).

```
Browser (perch.js)  ──►  Your /session endpoint  ──►  ElevenLabs (signed URL)
      │                        (holds API key)
      └────────── live audio via ElevenLabs Conversational AI SDK ──────────┘
```

## Integrate
- **HTML / any site:** [docs/script-tag.md](docs/script-tag.md)
- **React:** [docs/react.md](docs/react.md)
- **Server endpoint:** [docs/server.md](docs/server.md)

## Status / what's stubbed
- ✅ Vanilla widget UI (Shadow-DOM isolated, call states) — runnable today.
- ✅ React SDK wrapper, server proxy, brand kit, docs.
- 🔌 The live ElevenLabs Conversational AI connection is marked with a clear TODO in
  `perch.js` (`connect()`) and `server/session.mjs` — drop in `@elevenlabs/client` +
  your API key to go live.

## Roadmap
- Config dashboard (point an agent at a knowledge base, pick a voice).
- Usage metering + Stripe billing (per-site subscription + overage).
- More SDKs (Vue, Web Component), themeable presets.

MIT.
