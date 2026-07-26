# How to attack the CodeSignal ICA (90 min, 4 levels)

You have until **July 26, 1:12 am PDT**. Do the practice problem here 1–2 times
cold and timed first. Then take the real one.

## Scoring — what actually matters
- Score is out of ~600. Community bands: **~480 competitive, ~525+ strong.**
- **Progression > completion.** Most people don't finish Level 4. Getting Levels
  1–3 fully correct with clean code beats a broken attempt at all four.
- Hidden tests + visible tests. Passing visible tests ≠ full marks; handle corner cases.

## Time budget (rough)
- **L1: ~10 min.** Get the data model right — this is the foundation.
- **L2: ~15 min.** Sorting + formatting; watch the exact output format.
- **L3: ~30 min.** TTL is where most time goes. Don't rewrite L1/L2 — extend them.
- **L4: ~25 min + buffer.** Backup/restore. If short on time, bank a correct L1–L3.

## The one idea that wins this: design for extension
Level 1 tempts you into `Map<key, Map<field, value>>`. But Level 3 needs a TTL and
Level 4 needs snapshots. If you store the value as a small **object** from the start:

```js
field -> { value, expireAt }   // expireAt = null means permanent
```

…then L3 is "set `expireAt`", and your L1 `SET` just uses `expireAt: null`. No rewrite.
**Decide your value shape at L1 with L3/L4 in mind.** That's exactly what CodeSignal
means by "reuse, encapsulate, refactor, maintain backward compatibility."

## Concrete tactics
- **Read all four levels first** (skim) so your L1 model won't box you in.
- **Factor shared logic**: one `scan(key, timestamp, prefix)` helper serves SCAN,
  SCAN_BY_PREFIX, SCAN_AT, and SCAN_BY_PREFIX_AT. Write it once.
- **`isAlive(entry, ts)`** = `entry && (entry.expireAt === null || ts < entry.expireAt)`.
  Reuse everywhere. Note the **exclusive** upper bound: alive on `[start, expireAt)`.
- **Output format is literal**: `"field(value)"`, joined by `", "`, sorted ascending.
  A wrong separator fails tests. Empty scan → `""`.
- **Timestamps are non-decreasing** — you don't need full history; a single current
  value per field with an `expireAt` is enough.
- **Backup/restore**: store *remaining* ttl (`expireAt - backupTs`), not the absolute
  `expireAt`. On restore, new `expireAt = restoreTs + remaining`. This is the #1 place
  people get subtly wrong.

## Mindset / logistics
- Use **JavaScript or TypeScript** — you're fast in both; don't fight a new language.
- The env is CodeSignal's editor in Chrome/Firefox/Edge, laptop/desktop. Do a **5-min
  practice run** first (they give you a practice link) so the UI isn't new.
- **Run the provided tests after every level** before moving on. Don't build L4 on a
  shaky L3.
- If a level fights you, **lock in what passes and move on** — partial credit is real.

## Integrity note
This is legit prep — learn the *pattern* here, then do the real assessment yourself.
Don't bring outside code into the live test; CodeSignal proctors and runs similarity
checks. You've got the skills for this one — practice is about speed and format, not
capability.
