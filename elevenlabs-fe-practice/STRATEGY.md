# ElevenLabs coding screen — strategy

**Format:** React/TypeScript in **CoderPad**, **90 minutes**, async/self-paced. Link
expires 5 days after you receive it — resendable, but email them *before* it expires
if you need a fresh one. Difficulty is moderate; they say you won't need expert-level
React/TS. It's about **judgment and clean, working code**, not tricks.

## What they actually score
- **Working behavior, end to end.** Get things running; a partial feature that works
  beats an ambitious one that doesn't.
- **Engineering judgment** — sensible state shape, no needless complexity, readable code.
- **Product sense.** ElevenLabs cares that you build the *right* thing. If a spec is
  fuzzy, state a reasonable assumption out loud (in comments or the shared pad) and move.

## Time budget (90 min, ~2–3 tasks)
- Read everything first (~5 min). Note what "done" means for each task.
- Do the **cheapest wins first** — bug fixes and the pure-logic problem are fast points.
- Leave the open-ended "build/finish a component" for the middle; timebox it.
- Save ~10 min to re-read the prompts and check edge cases (empty states, no results).

## CoderPad specifics
- It runs your code live in-browser; there's a **run/preview**. Use it constantly —
  don't code blind for 20 minutes.
- Do the **tutorial pad** they link first so the editor + run button aren't new to you.
- You pick the language/env — choose **React + TypeScript** (or JS if faster for you).
  Don't fight tooling; keep it simple.

## React gotchas they love to test (all in this pad)
- **Controlled inputs**: `value` + `onChange` both wired, or typing "does nothing."
- **`key` on lists**: stable, from data (`v.id`), never the array index if the list reorders.
- **Effect cleanup**: debounce/subscriptions must `clearTimeout`/unsubscribe in the
  returned cleanup, or you leak timers and get stale updates.
- **Derived state**: filter/compute with `useMemo` from source state; don't duplicate
  state you can derive.

## Mindset
You're stronger than this test's bar — the risk is rushing a silly bug, not capability.
Run often, keep it simple, handle empty/edge states, and narrate assumptions. Do the
practice tasks here + the `ramp-fe-practice` bugs once, timed, and you'll walk in loose.

## Integrity
Practice the patterns here; take the real screen yourself. CoderPad records the
session. You don't need shortcuts for this one.
