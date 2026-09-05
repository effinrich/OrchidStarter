# The Weather Channel (TWC) — Interview Cheat Sheet
Interviewer: Brian · Prior round covered weather.com web vs. TV product differences · Portfolio-site walkthrough didn't land last time — lead with concrete technical answers instead, not a tour

## Prep topic: Next.js rendering/caching (App Router) — one-shot answers

**Server vs Client Components / SSR vs CSR**
"Server Components render on the server, ship zero JS for that component — good for data-fetching and heavy logic. Client Components (`'use client'`) render in the browser and are needed for interactivity — state, effects, event handlers. In App Router, Server Components are the default; you opt into Client only where you actually need interactivity."

**Next.js's 4 caches**
"Request Memoization — dedupes identical fetches within one render pass. Data Cache — persists fetch results server-side across requests, revalidatable. Full Route Cache — caches the rendered HTML/RSC output per route at build or ISR time. Router Cache — client-side, in-memory, makes back/forward nav instant without refetching."

**Hydration**
"Server sends fully-rendered HTML for a fast first paint, then React re-hydrates on the client — attaches event listeners and reconciles the DOM to make it interactive, without re-rendering from scratch."

**Static vs dynamic rendering**
"Static: rendered once at build (or on-demand via ISR), served from cache/CDN, same for every user, fast and cheap. Dynamic: rendered per-request on the server when the response depends on request-time data — cookies, headers, search params."

**Build → user hits the page (full lifecycle)**
"At build, static routes pre-render into HTML + RSC payload and get cached. On request: static routes serve instantly from cache, dynamic routes render fresh on the server. Either way, the client hydrates it into an interactive app after."

**Cache invalidation/refresh**
"On-demand: `revalidatePath`/`revalidateTag` purges Data Cache and Full Route Cache for that path, next request re-renders and re-caches. Time-based: `revalidate: N` does the same on an interval — stale-while-revalidate, so users get a fast response while fresh data regenerates behind it."

**Low-latency / never blank-screen on cache clear** ← your strongest answer, see below
"Stale is strictly better than empty. Cache invalidation should be additive — fetch fresh data in the background and swap it in once it resolves, never clear-then-fetch. That's stale-while-revalidate, and it's literally how TanStack Query works by default, which I've used in production — old data stays visible with a loading indicator, never a blank screen or error, which matters most for exactly the users on the worst connections."

**How you use AI day to day (say this with confidence, not hedging)**
"Claude Code and Cursor, daily — not autocomplete, an actual collaborator I hand specs to and review output from like a teammate's PR. I built real tooling on top of this — ForgeKit, an MCP server suite with 6,200+ installs — specifically so AI agents understand a codebase's design system instead of guessing. Real force-multiplier, I still own everything that ships."

## The honest gap — own it before it surfaces as a surprise
Your real production Next.js experience (Santa Chat AI, Textation) is **Pages Router (Next.js 12)**, not App Router. The answers above are accurate *knowledge* of the App Router model, but if Brian asks "tell me about a time you actually dealt with this in production," don't invent an App Router war story you don't have.

**The honest pivot**: your real production staleness/caching war story is **TanStack Query's stale-while-revalidate pattern**, shipped at Redesign Health and TokenCast. That's a true, strong answer to the low-latency question specifically — lead with it, don't apologize for it.

## Your best "I've solved this before, excited to do it at scale" story
**Tidy App** — literally built offline-first around this exact principle (never show nothing, degrade gracefully, sync when connectivity returns). This is a better answer than a portfolio tour: concrete, technical, directly on-theme for what TWC cares about (users checking weather on bad connections, in bad weather, is the whole product). Lead with this over anything else if asked for a relevant past project.

## Notes from the prior round
- Brian explained the difference between weather.com web and TV product — shows he cares about you understanding the product surface, not just the code. Reference this if it comes up again (shows you were listening).
- The portfolio-site walkthrough felt like wasted time to him. Don't repeat it — lead with the technical answers and the Tidy App story instead.
- General theme: convince him these are problems you've already solved, not problems you'd need to learn on the job. Confidence matters more than hedging here.
