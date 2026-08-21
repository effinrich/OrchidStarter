# Future — Staff Frontend Engineer — Interview Cheat Sheet
1:1 human coach + app, personalized guidance for lifelong health (AI + human expertise + health data + accountability) · $185-225K base + equity · Remote-first (continental US) · future.co

## Company background
- Founded by **Rishi Mandal** (CEO) — ex-Google Senior PM, ex-Postmates Director of Product, originally an astrophysics researcher at NASA/Stanford — and **Justin Santamaria**, Apple's lead engineer who created iMessage's green/blue bubble distinction. Real engineering pedigree at the top.
- $108M+ raised total (Series C $75M, backers include Kate Hudson, Kevin Durant). Recently **merged with Tom Brady's Autograph** to "make elite fitness coaching accessible to everyone."
- Premium positioning (~$150/mo historically) with human coaches (many with pro-athlete/Olympic training backgrounds) plus AI/data layered in — not an AI-only fitness app.
- **2026 direction: shifting from data collection to decision-making** — the platform's proprietary AI models (built on ~5 years of coaching data, millions of sessions/year) are moving toward turning insights into outcomes, not just tracking them. This matches the JD's framing exactly ("understand what to do next... turning those decisions into sustained behavior change").

## The one thing worth knowing cold: Rishi's actual philosophy
Rishi has said publicly that **AI fitness tools don't address the "historical barrier" to staying in shape** — the problem was never information, it's follow-through, and that's why Future is built around real human coaches, not a chatbot. This is a specific, contrarian-ish stance (not "AI will fix fitness"), and it's the real thesis behind the JD's "AI, human expertise, personal health data, and accountability" framing. Don't pitch AI-only enthusiasm here — it'll read as missing the point.

## What the role actually is
Own the frontend architecture and implementation of the core member-facing product on a small, senior team with direct product/design partnership — not component-building. Set the standard for code quality/design-system usage, instrument for performance/reliability, and use AI as a force multiplier (prototyping, code review, docs) while also helping weave AI into the member experience itself (personalization, adaptive coaching flows).

## Your one-liner
"Fifteen years of production React/React Native and the design-to-code craft that makes a member-facing product feel considered — I work from a Figma file daily and know when something's off. And this one's personal: I've trained four days a week and cooked from scratch since I was 34, so Rishi's actual thesis — that accountability, not AI alone, is what changes behavior — isn't a talking point for me, it's how I've lived for over a decade."

## Signature stories (map to what they actually asked for)
1. **ForgeKit — Figma-to-code, real adoption.** 5,700+ npm installs. → "strong design sensibility... work from a Figma file and know when something is off," almost verbatim.
2. **Tidy App — React Native + Expo, Figma Code Connect, 90% test coverage.** → consumer mobile + design-to-code + testing discipline, three JD asks in one project.
3. **Pineapple — 25% mobile performance gain, 100K+ users.** → "familiarity with performance optimization for mobile apps at scale" (nice-to-have), directly matched.
4. **Redesign Health — architecture SME, IC→Director, onboarding methodology.** → "set the standard for frontend code quality... code the next engineer can pick up."
5. **Santa Chat AI — per-user personalization + Amplitude/GA4 instrumentation, Next.js BFF layer.** → directly answers "AI woven into the member experience — personalization" and "instrument the frontend... know when things break before members do."
6. **The personal fitness/nutrition story** — not a resume line, a real 10+ year practice. Use it early, not as a closing platitude.

## The honest gap: Next.js App Router
Production Next.js experience is Pages Router (Next.js 12: Santa Chat AI, Textation) — predates App Router (Next.js 13+). Closest precedent: React Router's framework-mode SSR/loaders/actions on TokenCast, same underlying pattern, different framework. Say this straight: "I'd ramp fast, but I won't pretend I've shipped App Router in production." Don't improvise a bigger claim live.

## Their likely questions → your move
- "Why Future, really?" → the personal fitness/nutrition story, tied explicitly to Rishi's public accountability-over-AI-alone thesis. This is your strongest, most specific answer of anywhere in your pipeline.
- "Tell me about working closely with design." → ForgeKit + Figma Code Connect (Tidy App) + "design-engineering liaison" role at Freebird.
- "How do you use AI in your actual workflow?" → Claude Code/Cursor daily, ForgeKit's own AI-tooling (MCP servers), AI-eval contract work (Handshake/micro1/Mercor) as adversarial-testing judgment.
- "App Router experience?" → the honest gap answer above. Don't dodge it.
- "Comfortable in a small, senior team with direct product/design access, no layers?" → five 0-to-1 startups, Freebird's direct client/sales/marketing liaison role.
- "Performance/reliability instrumentation?" → Santa Chat AI's Amplitude/GA4, Lighthouse 100 accessibility / 97-99 performance scores across multiple projects, Redesign Health's 40% rendering-overhead reduction.

## Questions to ask them
- "Rishi's talked publicly about AI not addressing the real barrier to staying in shape — how does that show up in day-to-day product decisions, versus just being a founding philosophy?"
- "How has the Autograph merger changed the product roadmap, if at all, for the member-facing app specifically?"
- "What does 'data collection to decision-making' actually look like in the frontend — is that a coaching-flow redesign, new UI patterns, both?"
- "What's the current state of the design system — mature and consistent, or something this role would be shaping from a rougher starting point?"

## Landmines / notes
- **Don't pitch AI-as-the-answer.** Their whole thesis is AI-plus-human-accountability, with real skepticism of AI-only fitness. Match that nuance.
- **Own the App Router gap plainly** — it's an explicit, named requirement, not a nice-to-have.
- **No direct health/wellness app experience** — a real gap (nice-to-have, not required). The personal fitness practice is genuine passion, not a substitute for domain product experience; don't conflate the two if pressed.
- Comp ($185-225K) is below your Anthropic range but the mission-fit here is arguably the most personally genuine in the whole pipeline — weigh that when triaging offers/time.
