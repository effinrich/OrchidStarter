# Weekend — Sr. Software Engineer, Studios — Interview Cheat Sheet
Voice-AI games for smart TVs (Jeopardy!, Song Quiz, CoComelon, Wheel of Fortune, Wit's End; 5M+ monthly players) · **Formerly Volley — rebranded to Weekend in 2026, know this cold, don't call it "Volley" or act surprised by the name change** · $55M Series C (Jul 2024, co-led by Lightspeed + Microsoft's M12), Lightspeed has backed every round since Series A 2020 · Billed by Lightspeed as "the highest-grossing AI-powered games company" · SF (Union Square) · TypeScript/React/AWS GameLift Streams · **First call: 30 min Zoom w/ Steffan, schedule via Ashby link**

## What the role actually is
Embedded on the Studios team, likely attached to a specific game (Jeopardy or Song Quiz) — full game-development lifecycle, prototyping new features through shipping production-quality experiences. Stack: TypeScript, React, AWS GameLift Streams (couldn't confirm full JD, posting wasn't fetchable — verify specifics live).

## Your one-liner — corrected framing
Earlier draft of this doc overweighted "voice AI throughline" (Santa Chat/Textation were a few weeks of side-project work 3 years ago) over your actual depth (15 years production React, dashboards, Storybook design systems at real org scale). Lead with the depth; the voice-AI/interactive-experience history is genuine supporting interest, not your headline qualification.

"I bring 15 years of production frontend depth — design systems, complex dashboards, real-time data UI, architecture at org scale — plus genuine, hands-on history in real-time interactive/voice experiences (a retail motion-tracking kiosk years ago, some voice-AI side projects more recently). The core engineering strength is the actual pitch; the interactive-experience interest is real, not manufactured."

## Signature stories — lead with depth, not the side-project narrative
1. **Redesign Health — architecture SME, IC→Director.** 50+ component design system (Storybook + Chromatic) across a 10-15 eng org, 30% dev-time reduction, 40% render-overhead cut on large datasets. → this is your actual headline: production-grade frontend engineering at real scale, the core of what "Senior Software Engineer" needs regardless of industry.
2. **Pineapple / PHC — Nx monorepo architecture, 8+ apps / 30+ shared libraries.** Real-time data, cross-platform (Expo/React Native). → complex state and architecture ownership, the muscle a fast-moving Studios team actually needs day-to-day.
3. **FaceCake "Swivel" kiosk — Kinect body tracking, big screen, embedded.** Real-time OpenCV motion tracking on a Windows Embedded retail platform, iPad companion app, shipped for Macy's. → genuine (if older) proof of shipping on a non-desktop, embedded, big-screen, sensor-driven surface — supporting evidence, not the headline.
4. **Santa Chat AI / Textation / Perch — voice AI, real interest not manufactured.** A few weeks of side-project work a few years back, plus current work on Perch. → honest framing: real curiosity and some hands-on time in the space, not deep specialization. Say it that way if asked.
5. **NARS browser AR try-on — Emscripten/OpenCV, real-time client-side CV.** Performance-critical real-time media processing in-browser. → relevant if performance/rendering comes up.

## The honest gap: game development specifically
No Unity/Unreal/game-engine background, no prior AWS GameLift experience, no shipped consumer game. Don't overclaim game-dev credentials. Move: "I haven't shipped a traditional game before — my background is real-time interactive experiences outside the game industry specifically (retail AR/motion kiosks, voice AI products). The stack here is TypeScript/React, which is exactly my depth; GameLift Streams I'd ramp on quickly, same as I've done with every new platform across my career." Ask what part of the stack is genuinely new-to-everyone vs. established internally.

## Their likely questions → your move
- "Tell me about your background." → lead with Redesign Health (architecture/scale) and Pineapple/PHC (systems ownership), not Santa Chat. Depth first.
- "Why voice AI / why this space?" → genuine interest, real but limited hands-on time (Santa Chat/Textation side project, Perch now) plus the older Kinect kiosk as a shipped, non-desktop-surface precedent. Don't oversell it as your specialty.
- "What did you learn from Santa Chat/Textation?" → this is your best answer in the whole interview if it comes up: you built a persona-driven AI companion, got skeptical of that model yourselves, and that's part of why you stopped — independently landing on the same critical view Max Child holds publicly. Say it straight, don't undersell it as just "a side project that ended."
- "Comfortable with unfamiliar/embedded platforms (smart TV, GameLift)?" → Kinect/Windows Embedded kiosk story is real proof you've shipped on non-standard, embedded, big-screen platforms before — even if it's not your main body of work.
- "Full game-dev lifecycle, prototyping to production?" → be honest about the game-specific gap, pivot to 0-to-1 ownership across five startups + FaceCake kiosk (full lifecycle: architecture, dev, testing, deployment).
- "TypeScript/React depth?" → 15 years, no hedging needed — this is a straightforward strong match regardless of how the voice-AI angle lands.
- "Working embedded on a single product team (Jeopardy or Song Quiz)?" → tie to Redesign Health/PHC-style cross-functional ownership, not the side projects.

## Recent news / insider signals (use these to sound current, not generic)
- **The rebrand is very recent (2026)** — Volley → Weekend. Say "Weekend" throughout; if you reference the older funding history, frame it as "when you were Volley" naturally, don't stumble on it.
- **Wit's End — their newest game, an AI Dungeon RPG**, notably covered by OpenAI's own devs: it uses structured function calls (via the Realtime API) to keep an AI dungeon master both creative AND tightly rule-compliant in real time — described as reducing validation errors/hallucinations vs. earlier approaches. This is a genuinely interesting LLM-orchestration engineering problem (creative freedom vs. hard constraints), directly relevant to your own LLM-pipeline work on Santa Chat/Textation — a good, specific thing to ask about or reference.
- **Fire TV launch, Jeopardy! as debut title** — Weekend describes itself as the first gaming company to build a voice-controlled game natively for Fire TV. Platform expansion (Roku, Fire TV, Samsung, LG) is an active, ongoing push, not old news.
- **Co-founder Max Child has a distinctive, contrarian public position** worth knowing before the call: he argues the voice-AI industry "went wrong" by coupling voice control with "imaginary humans" (Siri/Alexa-style assistant personas) — that over-promising a general-purpose AI companion "held back" the category by setting expectations voice tech couldn't meet. His view: speech recognition for bounded, specific tasks works great; a fake anthropomorphized assistant persona doesn't. (Source: TheWrap's "Tech vs Media" podcast.)
  - **This is actually a strong story, not just something to be self-aware about:** you and Clayton independently arrived at the same conclusion — you were skeptical of the AI-companion/persona model too, and it's specifically why Santa Chat AI/Textation ended. Say that plainly if it comes up: "we built exactly that — a persona-driven AI companion — and became skeptical of the model ourselves, which is part of why we stopped." That's real, hard-won alignment with Max's actual thesis, not manufactured enthusiasm or a defensive dodge.
- **Max Child + co-founder James Wilsterman personally co-host the Cerebral Valley Voice Summit** (with Eric Newcomer) — an invite-only voice-AI event in SF (most recently May 2026, "voice-pilled" was the event's running joke/hat slogan). They're positioning themselves as category thought leaders in voice-as-interface broadly, not just games. Knowing this event/community exists is a good signal you're plugged into the same world.

## Questions to ask them
- "Wit's End's function-calling approach to keeping the AI dungeon master rule-compliant is a real orchestration problem — how much of the Studios role touches that kind of LLM-pipeline work vs. more traditional game feature work?"
- "Which game would I actually be embedded on, and what does the Studios/Platform team split look like day-to-day?"
- "How much of the role is genuinely new tech (game engines, GameLift) vs. TypeScript/React work I'd recognize?"
- "Is this role remote, hybrid, or SF in-person?" (same check you're running on every SF-based role right now)

## Landmines / notes
- **Confirm location/remote status** — SF-based company, verify before going deep, same as Mochi.
- **Don't fake game-industry fluency** — you don't need to; own the gap plainly.
- **Don't over-lean on the voice-AI narrative either** — Santa Chat/Textation was a few weeks of side-project work three years ago, not a specialization. It's honest supporting color for genuine interest in the space; your actual qualification for a "Senior Software Engineer" title is the 15 years of production React/architecture/design-systems depth. Lead with that.
- If pressed directly on how deep the voice-AI/game-dev knowledge really goes, use the master gap answer in `you/interview-cheat-sheet.md` ("I learn as I go — it's literally how I've kept running at a startup") rather than improvising a new excuse.
- Couldn't pull the full JD (fetch blocked) — confirm exact responsibilities/must-haves live and adjust.
