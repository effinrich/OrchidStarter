# CodeSignal ICA Practice — In-Memory Database

Practice for Ramp's **CodeSignal Industry Coding Assessment (ICA)**: one project,
**4 progressive levels, 90 minutes**. Each level extends the last — you reuse and
refactor earlier code and keep it passing. This recreates the canonical **in-memory
database** problem (the one Ramp is known to use).

> Ramp's exact variant may differ slightly (e.g. record *locking + undo* instead of
> *TTL + backup/restore*). The **skill is identical**: model cleanly at Level 1 so
> Levels 3–4 extend without a rewrite. That's what's scored.

## Run it

```bash
node tests.mjs                                    # test YOUR src/solution.mjs
SOLUTION=./src/solution.solved.mjs node tests.mjs # see the reference pass 4/4
```

No `npm install` needed — pure Node, no dependencies.

Implement `src/solution.mjs` one level at a time. A level must fully pass before the
next unlocks (just like the real ICA). Peek at `src/solution.solved.mjs` only after
you've tried.

## The problem

`solution(queries)` receives an array of operations (arrays of strings) and returns
an array of string results — one per operation.

### Level 1 — basic CRUD
- `["SET", key, field, value]` → `""` — set `field = value` on record `key`.
- `["GET", key, field]` → the value, or `""` if missing.
- `["DELETE", key, field]` → `"true"` if it existed and was removed, else `"false"`.

### Level 2 — scan
- `["SCAN", key]` → `"field1(value1), field2(value2), ..."`, **sorted by field name
  ascending**; `""` if the record is empty/missing.
- `["SCAN_BY_PREFIX", key, prefix]` → same, but only fields whose name starts with `prefix`.

### Level 3 — TTL / timestamps
Every mutation now carries a `timestamp` (non-decreasing across operations).
- `["SET_AT", key, field, value, timestamp]` → `""` (permanent).
- `["SET_AT_WITH_TTL", key, field, value, timestamp, ttl]` → `""` — alive for
  `[timestamp, timestamp + ttl)`.
- `["DELETE_AT", key, field, timestamp]` → `"true"/"false"` (only if alive at `timestamp`).
- `["GET_AT", key, field, timestamp]` → value if alive at `timestamp`, else `""`.
- `["SCAN_AT", key, timestamp]` and `["SCAN_BY_PREFIX_AT", key, prefix, timestamp]`
  → like Level 2 but only fields alive at `timestamp`.

### Level 4 — backup / restore
- `["BACKUP", timestamp]` → **number of records** (as a string) with ≥1 field alive at
  `timestamp`. Save a snapshot; **remaining TTLs are preserved relative to the backup time**.
- `["RESTORE", timestamp, timestampToRestore]` → `""` — restore the DB to the most
  recent backup taken at time ≤ `timestampToRestore`. **Shift remaining TTLs** so they
  continue relative to `timestamp`.

## Files
- `src/solution.mjs` — your work (stubs to fill in).
- `src/solution.solved.mjs` — verified reference (4/4).
- `tests.mjs` — the runner. See `STRATEGY.md` before you start.
