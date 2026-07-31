# ElevenLabs coding screen — strategy (CORRECTED)

**Format, confirmed by web research (verify live too):** async **CoderPad**, **90 minutes**,
**2 medium + 1 medium-hard problem, data-structures/algorithms — not React.** Practical
rather than puzzle-flavored: hash maps, stacks, two pointers, well-chosen sorts. Named
examples: interval merging, an LRU cache, log-line parsing/transforming, a rate limiter,
string manipulation with a hidden edge case. Link expires 5 days after you receive it.

**This corrects an earlier version of this doc that assumed the screen was React-focused.**
The React-component work (fixing/extending a real component — one reported example: an
audio-transcription tool where text highlighting falls out of sync with playback) is a
**separate, later, live round**, not this async one.

## What they actually score (per reported experiences)
- **Time management and cleanliness, not cleverness.** You can execute your code live —
  sloppy debugging burns the clock.
- **Clean, idiomatic code, not just passing tests.** Name things like a coworker will
  read them tomorrow.
- Talk through your approach; write a couple of test inputs before declaring done.

## Time budget (90 min, 2 medium + 1 medium-hard)
- Read all three first (~5 min). Note constraints and edge cases up front.
- Budget roughly 25 min / 25 min / 35–40 min (mediums first, save more time for the
  medium-hard) — but stay flexible; if a "medium" is dragging, don't be afraid to bank
  partial credit and move on, then return if time allows.
- Save ~10 min at the end to re-run tests and sanity-check edge cases (empty input,
  single element, boundary values).

## CoderPad specifics
- It runs your code live in-browser — use the run/preview constantly, don't code blind.
- Do the tutorial pad first so the editor isn't new to you.
- Pick TypeScript or JavaScript, whichever is faster for you under time pressure — this
  round isn't testing React, so there's no reason to reach for it.

## Patterns worth having cold before you sit down
- **Hash map / Map for O(1) lookup or insertion-order tricks** (see `dsa/lruCache.mjs` —
  delete+re-set to move an entry to "most recent").
- **Two-pointer / sliding window** (see `dsa/rateLimiter.mjs`).
- **Sort then merge/sweep** (see `dsa/mergeIntervals.mjs`).
- **String edge cases**: empty input, single char, unicode, leading/trailing whitespace,
  off-by-one on substring bounds.
- **Stream/log parsing**: split → parse each line into a structured shape → filter/aggregate.
  Practice writing a small parser + reducer combo quickly and cleanly.

## Mindset
You're stronger than this test's bar — the risk is a rushed bug or a boundary-condition
miss under time pressure, not raw capability. Run your code often, keep it simple, narrate
assumptions, and don't reach for cleverness when a hash map and a for-loop will do.

## Save for later — the React round
The `src/VoiceSearch.tsx` bug-fix/debounce tasks and `ramp-fe-practice` are real prep,
just for the later live "practical coding" round (real-world React component debugging),
not this upcoming async screen. Don't burn prep time there right now.

## Integrity
Practice the patterns here; take the real screen yourself. CoderPad records the
session. You don't need shortcuts for this one.
