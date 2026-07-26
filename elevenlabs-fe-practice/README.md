# ElevenLabs FE Practice — React/TypeScript (CoderPad-style)

Practice for ElevenLabs' **async coding screen: React/TypeScript in CoderPad, 90 min,
self-paced.** It's practical (not "expert-level"): typically **fix React bugs**,
**finish a component**, and **one small pure-TS logic problem**. This pad gives you
all three.

## Run it

**React tasks** (Tasks 1 & 2):
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

## Tasks

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
Your **`ramp-fe-practice`** app (transaction table, 3 bugs) is excellent extra reps
for the "fix React bugs" half of this screen — run through it too.

See `STRATEGY.md` for how ElevenLabs scores and how to spend the 90 minutes.
