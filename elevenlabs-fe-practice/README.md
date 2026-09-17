# ElevenLabs Interview Practice

**CORRECTED (confirmed by web research, verify live yourself too):** the actual async
**CoderPad screen (90 min, the one you have a real link for) is data-structures/algorithms,
NOT React.** Multiple independent sources describe it as: 2 medium + 1 medium-hard problem,
practical rather than puzzle-flavored — hash maps, stacks, two pointers, well-chosen sorts.
Named examples: **interval merging, an LRU cache, parsing/transforming a stream of log lines,
a small rate limiter, string manipulation with a hidden edge case.**

The React-component work (fixing/extending a real component, e.g. a reported scenario about
an audio-transcription tool where text highlighting falls out of sync with playback) is a
**separate, later stage** — the live "practical coding" round — not this async screen.

**Practice priority right now: `dsa/` first.** Keep the React tasks below too — they're real
prep, just for a later round, not this one.

## Run it

**DS&A tasks** (`dsa/`) — no install needed, this is your priority:
```bash
cd dsa
node mergeIntervals.test.mjs                                    # tests mergeIntervals.mjs
SOLUTION=./mergeIntervals.solved.mjs node mergeIntervals.test.mjs   # reference
node lruCache.test.mjs
node rateLimiter.test.mjs
```

**React tasks** (Tasks 1 & 2 below) — for the LATER live coding round, not this screen:
```bash
npm install
npm run dev
```
Edit `src/VoiceSearch.tsx`. Compare against `src/VoiceSearch.solved.tsx`.

**Logic task** (Task 3) — no install needed:
```bash
node logic/tests.mjs                                    # tests your logic/usage.mjs
SOLUTION=./usage.solved.mjs node logic/tests.mjs        # (run from logic/) the reference
```

## DS&A tasks (`dsa/`) — practice these for the real upcoming screen

**Merge Intervals** (`dsa/mergeIntervals.mjs`) — medium. Sort + merge, touching intervals count as overlapping.

**LRU Cache** (`dsa/lruCache.mjs`) — medium-hard. O(1) get/put with eviction; `Map` insertion order is the trick.

**Rate Limiter** (`dsa/rateLimiter.mjs`) — medium. Sliding-window `allow(timestamp)`; watch the boundary condition.

Not built yet but worth a mental run-through: **log-line parsing/transform** (parse a stream
of structured log lines, aggregate/filter) and **string manipulation with a hidden edge case**
(off-by-one, unicode, whitespace, empty input) — both were named as real problem shapes.

## React tasks (for the later live round, not the CoderPad screen)

**Task 1 — fix the bugs** (`src/VoiceSearch.tsx`)
- The search `<input>` is uncontrolled — typing does nothing. Make it controlled.
- The list `<li>` is missing a `key`. Add a stable one.

**Task 2 — finish the feature** (`src/VoiceSearch.tsx`)
- Debounce `query → debounced` by 300ms (a `useEffect` with `setTimeout` +
  `clearTimeout` cleanup) so filtering runs after you stop typing, not per keystroke.
- Bonus: a "Clear" button.

**Task 3 — pure-TS logic** (`logic/usage.mjs`)
- `summarizeUsage(events)`: given `[{ voiceId, characters }]`, return
  `[{ voiceId, total }]` sorted by `total` desc, then `voiceId` asc. Classic group-by.

## Also reuse
Your **`ramp-fe-practice`** app (transaction table, 3 bugs) is good extra reps for the
React-debugging round later — not urgent for the upcoming DS&A screen.

See `STRATEGY.md` for how ElevenLabs scores and how to spend the 90 minutes.
