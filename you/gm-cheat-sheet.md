# GM AV Mapping — Interview Cheat Sheet
Fullstack Engineer (frontend-deep), Mapping Engineering · $144.7K–$261.3K · Hybrid 3×/wk · Warm referral (PHC contact)

## What the role is
Web tools/UIs for GM's AV mapping systems — visualizing map data & pipeline health, enabling map QA, editing, validation, release. Data-rich geospatial UIs, real-time, large-scale. You collaborate with backend, localization, perception, simulation.

## Your one-liner
"My career is data-rich, high-performance UIs — geospatial maps, real-time tracking, and the design systems and tooling that make teams fast. This role is the intersection of everything I've done: maps, real-time data, performance, and cross-functional leadership."

## Signature stories (each maps to a req — have them ready)
1. **Browser CV via Emscripten (NARS).** Compiled OpenCV to JS with Emscripten for real-time in-browser lipstick try-on over getUserMedia — client-side CV ~2014, before WASM was normal. Prep: why transpile vs. reimplement, asm.js perf tradeoffs. → rendering performance + computer vision.
2. **Rideshare real-time maps (Freebird).** Interactive maps tracking riders live + validating destinations — a real-time geospatial view of moving entities. Closest thing to AV mapping. → map rendering + real-time + geospatial.
3. **Mapbox COVID hotspot maps.** Thermal-style heat maps of COVID zones on Mapbox GL — geospatial data into a clear visualization. → Mapbox GL, geospatial data viz.
4. **Redesign design system + leadership.** 50+ components, 30% dev-time cut, 40% render-overhead cut on large datasets, IC→Director, architecture SME. → leadership/mentoring/SME + performance.

## Fullstack framing (confident, respectful)
"I ship end-to-end — stand up the backend, go deep on the frontend where the tools live and iterate. Self-sufficient across the stack." NEVER "backend's the easy part."

## Their questions → your move
- "Walk me through the Emscripten/browser-CV build." → story #1 + tradeoffs.
- "How would you render large-scale / real-time map data performantly?" → your 40% render-overhead work + Emscripten perf mindset; talk tile-based rendering, level-of-detail, virtualization, web workers, WASM, Mapbox/Deck.gl vs custom WebGL.
- "Geospatial / coordinate systems experience?" → Mapbox COVID maps + rideshare tracking. Be honest: "I've worked at the rendering/UX layer; projections and geodesy internals I'd ramp on fast."
- "Working with backend / ML / perception teams?" → design-eng liaison, defining data contracts, cross-functional at Redesign; you talk to users directly.
- "Leading / mentoring?" → IC→Director, tech lead, SME, onboarding methodology (backend engineers → production React in a month).
- "Why GM / AV?" → mission (zero crashes), and the problem is maps + real-time + performance — your exact sweet spot.

## Questions to ask them
- "What does the map QA / debugging workflow look like today, and where's the biggest UX pain?"
- "How much rendering is Mapbox/Deck.gl vs. custom WebGL/canvas for the large map data?"
- "How do frontend, perception, and localization share data contracts today?"
- "What does 'web and embedded platforms' mean in practice here — in-vehicle, operator stations?"

## Landmines / notes
- **Location:** hybrid 3×/wk + relo — know which hub (CA/MI), be ready on relocation.
- **Don't overclaim AV / HD-map pipelines** — you haven't built them. Lean on adjacent (rideshare real-time maps, Mapbox, CV) + genuine enthusiasm to learn the domain.
- **Geodesy** — you've used map libs, not authored projections/transforms. Don't bluff; name the boundary.
- **Referral etiquette** — keep your story consistent with the resume, don't overstate (your referrer vouched). Thank them after.
- **Comp $144.7–261.3K** — Principal positioning → aim upper half; anchor on scope/level.
