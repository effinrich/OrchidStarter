# Mochi Health — Sr/Staff Frontend Engineer — Interview Cheat Sheet
Telehealth (GLP-1 weight care, derm, hair, mental health, intimacy) · React/React Native/TypeScript · In-person SF, 5x/wk · Sr Frontend base reported $250-300K + equity · **Interview: Tuesday 7:00pm**

## ⚠️ Address this first — location
Mochi is **in-person SF, 5 days/week.** Your resume address is Elizabethton, TN. This is the single biggest landmine in the call — don't let it surface awkwardly later. Raise it yourself, early and plainly: are they flexible (hybrid, relocation timeline/support, remote exception for this req), or is 5x/wk in-office a hard requirement? Get a straight answer before investing more time in the process. Don't oversell willingness to relocate if you haven't actually decided that.

## What the role is
Consumer telehealth product (membership weight-loss/GLP-1 care + derm/hair/wellness) spanning web + a mobile app. Senior/Staff Frontend: React, React Native, TypeScript, production complexity at real scale, own architectural decisions, mentor engineers. Interview process reported: PM call + a technical round with a frontend engineer — **often includes a build-a-component-from-Figma task.**

## Your one-liner
"I've spent my career building production design systems and cross-platform UI — web and React Native from one codebase — plus the tooling that turns Figma designs into working React components. That's close to exactly what this role needs: ship fast, consistent UI across web and mobile for a consumer product people depend on."

## Signature stories (each maps to what they'll probe)
1. **Freebird — 200-component design system spanning web + React Native.** Eliminated the need for separate iOS/Android teams; one component library driving B2B, B2C, and mobile. → directly answers "React + React Native, one system, consumer product."
2. **ForgeKit — Figma → React, literally.** Open-source CLI + MCP suite (5,700+ npm installs) that scaffolds production React from Figma variables/design tokens. If they hand you a Figma-to-component build task, say this out loud — you've built the *tool category* for this exact task, not just done it once.
3. **Pineapple Corporation — Expo/Nx/React Native, 25% mobile performance gain, 100K+ users.** → real production RN at consumer scale, not a toy app.
4. **Redesign Health — 50+ component design system, 30% dev-time reduction, 10-15 eng org.** → design-system ownership + cross-team adoption at Sr/Staff scope.
5. **Tidy App — offline-first React Native + Expo, 90% test coverage.** → mobile quality bar, offline/sync concerns relevant to a healthcare app people use daily.

## Their likely questions → your move
- "Web + mobile from one team/codebase?" → Freebird (200 components, web+RN, no separate mobile team) + Pineapple (RN/Expo at 100K+ users).
- "Walk me through building a component from a design." → narrate like you're describing ForgeKit's actual pipeline: tokens/variables → typed theme → component, and the judgment calls (spacing/tokens vs. hardcoded values, variant/prop API design, accessibility from the start).
- "Own architectural decisions?" → Redesign Health SME role + Pineapple's Nx monorepo architecture.
- "Healthcare / regulated data experience?" → be honest: no direct healthcare-data experience; pivot to what transfers — PHC Global was B2B fintech (also trust/compliance-sensitive), and general rigor around forms, validation, error states, and sensitive user data handling in consumer apps.
- "Why Mochi?" → consumer product with real health impact, membership/subscription model, web+mobile UI is your sweet spot — say this plainly, don't overreach into clinical/medical claims you can't back.

## Questions to ask them
- "Is the 5x/week in-office policy firm for this req, or is there flexibility — and what does the timeline look like if someone needs to relocate?" (ask this near the top, not as an afterthought)
- "Is the web and mobile app one shared component library today, or two separate systems?"
- "What's the biggest frontend pain point right now — velocity, consistency, or something specific to healthcare compliance/trust?"
- "What would success look like in the first 90 days?"

## Landmines / notes
- **Location is the #1 risk — see top of doc.** Don't let this be a surprise at offer stage.
- **No healthcare-specific experience** — don't fabricate domain depth; lean on trust/compliance adjacency (fintech at PHC) and genuine interest in the space.
- **In-person culture** — if you're used to remote/hybrid, have a real answer ready for "how do you feel about 5 days in office," not just an agreeable non-answer.
- **Comp** — $250-300K base reported for Sr; confirm level (Sr vs Staff) and total comp (equity) before anchoring.
