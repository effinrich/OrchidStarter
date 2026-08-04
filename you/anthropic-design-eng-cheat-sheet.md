# Anthropic — Design Engineer, Web (Creative Studio / Brand Web) — Interview Cheat Sheet
anthropic.com + claude.com · $305K-$385K · Remote-friendly (travel-required), SF/NYC · **Strongest overall match in the current pipeline**

## Interview process (general Anthropic eng loop — couldn't confirm Design Engineer-specific steps, verify with recruiter)
1. **Recruiter screen** — 30 min, background/interest/mission fit.
2. **Technical assessment** — 90-min CodeSignal, typically two multi-part problems. Reportedly favors **building a small system from scratch over isolated algorithm puzzles** — production-quality code under changing requirements, not LeetCode tricks. Different shape than the ElevenLabs DS&A screen — don't over-index on `elevenlabs-fe-practice/dsa/` prep for this one specifically.
3. **Hiring manager screen** — 45-60 min, engineering-judgment conversation, not live coding.
4. **Final loop** — 4-6 interviews: coding, system design, and a dedicated **values/culture-fit round** (see below — most common failure point, per multiple independent sources).
5. **Reference checks + team matching.**
Total timeline commonly 3-6 weeks. For a design+engineering hybrid role, there may also be a portfolio/practical-build component not confirmed by research — ask the recruiter directly.

## What the role actually is
Own significant surfaces of anthropic.com/claude.com — architecture, design system code, page templates, interactive experiences, data viz, headless CMS, internal creative/AI tooling (MCP integrations, page generators). Set technical direction, partner across Web Platforms/Security/Growth, mentor, help scale the eng function on a growing Web team.

## Your one-liner
"Fifteen years of production design systems and frontend architecture, plus the AI-powered tooling that gives design-and-engineering teams leverage — I author MCP servers, the protocol Anthropic created, as part of my daily practice. This is close to the clearest expression I've seen of the intersection I've spent my career in."

## Signature stories (map to what they actually asked for)
1. **ForgeKit — near-verbatim match.** Open-source CLI + MCP server suite bridging Figma → React → Storybook, 5,700+ npm installs, real production adoption. → directly answers "built AI-powered creative/developer tooling with real adoption, such as MCP servers... design system generators."
2. **Redesign Health — architecture SME, IC→Director.** 50+ component design system (Storybook + Chromatic), 30% dev-time reduction, 10-15 eng org. → design-system ownership + mentorship + technical leadership at scale.
3. **Freebird — 200-component design system, web + React Native.** Eliminated need for separate mobile teams; design-engineering liaison across client/sales/marketing. → cross-functional partnership + craft at scale.
4. **PHC Global — founding frontend architect.** Nx monorepo, 30+ shared libraries, gRPC middleware, GCP/Kubernetes. → "own architecture decisions and the consequences of them in production," partnering with platform/infra.
5. **MCP Atlas + TokenCast — Lighthouse 100 accessibility, 97-99 performance.** Zod-validated content collections (Astro). → Core Web Vitals discipline + the closest honest precedent to content modeling (not a headless CMS, but real structured-content work).

## The two honest gaps (already named plainly in your resume — don't dodge them live either)
- **Headless CMS** — no Contentful/Sanity/Strapi/etc. Closest precedents: FaceCake's "real-time CMS on Firebase," Zod-validated content collections on MCP Atlas. Say this straight: you haven't owned a headless CMS's content model/editorial governance, but you've built the adjacent muscle (structured content, non-engineer-usable systems) repeatedly.
- **Localization/i18n** — nothing in your history touches this. Own it plainly; don't improvise false experience.
- For both: use the master gap answer in `you/interview-cheat-sheet.md` ("I learn as I go — it's literally how I've kept running at a startup") rather than a bespoke excuse each time.

## The values round — take this as seriously as the technical rounds
Multiple independent sources agree this is the **most common reason candidates fail**, weighted equally with technical rounds. It's a live conversation, not a quiz — they're pressure-testing genuine alignment with Anthropic's published values (Here for the mission · Hold light and shade · Be good to our users · Ignite a race to the top on safety · Do the simple thing that works · Be helpful, honest, and harmless) and whether "high-trust, low-ego" actually describes you.

**Expect three question shapes:**
- **Values under pressure** — would you hold a line when it's inconvenient, e.g. a safety concern vs. a shipping timeline.
- **Safety/deployment judgment** — how would you decide something's too risky to ship, even if profitable. For a Web/Creative Studio role this likely shows up as content-safety-adjacent: what happens when AI-generated tooling/content on a public-facing surface produces something wrong, biased, or unsafe.
- **Personal alignment** — when did you first think about AI safety/risk, what changed your mind, where are you still uncertain.

**Your actual, honest grounding here (don't manufacture philosophy — you have real material):** your AI eval/red-teaming contract work (Handshake, micro1, Mercor) is literally hands-on adversarial testing — probing models with cases designed to break them and surface failure modes. That's concrete experience with "how do AI systems fail and what does responsible evaluation look like," not abstract opinion. Use it as your grounding for this round, not a generic mission statement.

## Recent news / insider signals (use these to sound current, not generic)
- **Claude Design launched April 2026** (Anthropic Labs, powered by Opus 4.7, with Canva's Design Engine doing rendering) — during onboarding it reads a team's codebase/design files and builds a design system automatically, then every project after uses those colors/typography/components. Over 1M users in its first week. A major update (June 2026) added design-system imports, tighter Claude Code integration, direct canvas editing.
- **This is extremely close to what ForgeKit does**, just shipped as an Anthropic product rather than your solo venture — a genuinely strong, specific talking point: you were independently building toward the same problem Anthropic is now shipping at scale. Worth trying Claude Design yourself before the interview if you haven't.
- **Creative Studio's own stated philosophy**: "we care about craft, making things by hand and using AI when it makes sense" — this is their language, echo it back with specifics (your craft: typography/motion/interaction care; your AI-when-it-makes-sense: ForgeKit).

## Questions to ask them
- "Claude Design reads a codebase/design files and builds a design system automatically — how much does that product's approach inform how the Brand Web team thinks about its own design-system architecture?"
- "What does the headless CMS look like today — is this role defining it from scratch, or evolving something that already exists?"
- "How is the localization infrastructure scoped right now — greenfield, or an existing system that needs to scale to more markets?"
- "What does success in the first 6-12 months look like for this role specifically?"

## Landmines / notes
- **The values round is not a formality** — prepare for it as seriously as the technical rounds, using your real AI-eval work as grounding, not generic mission language.
- **CodeSignal ≠ the ElevenLabs DS&A screen** — expect building a small system under evolving requirements, not LRU-cache-style algorithm problems. Don't over-invest prep time in `dsa/` for this one specifically.
- **Own the CMS/localization gaps plainly** — they're explicit "good fit" requirements, not bonus items; don't let them surface as a surprise.
- Couldn't confirm Design Engineer-specific interview steps (portfolio review, practical build) — ask the recruiter directly once in process.
