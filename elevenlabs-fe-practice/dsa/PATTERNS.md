# Pattern recognition, not algorithm memorization

You already do this — spotting an uncontrolled input or a missing `key` on sight is
pattern recognition, not you consciously running a checklist. Same muscle applies here;
these are just visual shapes you haven't built a library for yet.

## Merge Intervals — "overlapping bars on a timeline that need to collapse"
Picture a row of horizontal bars on a number line, some touching or overlapping.
The shape: **sort left-to-right, then walk once, gluing anything that touches the
previous bar.** Whenever a problem description involves ranges, time windows, bookings,
or spans that might overlap — this is the shape. `dsa/mergeIntervals.mjs`

## LRU Cache — "a shelf that bumps forward when you touch it, and drops off the back when full"
Picture a shelf of books in a row. Touch one (read or write it) and it jumps to the
front. When the shelf's full and something new comes in, whatever's fallen to the back
gets pushed off. The shape: **an ordered collection where "touch" = move to one end,
and overflow = trim the other end.** A JS `Map` already keeps insertion order — delete+
re-set moves an entry to the "just touched" end for free. `dsa/lruCache.mjs`

## Rate Limiter — "a window sliding along a timeline, only counting what's currently inside it"
Picture a fixed-width frame sliding along a timeline. Only the marks currently under
the frame count; anything that's slid out from behind stops counting. The shape:
**keep a running list of recent timestamps, drop anything older than (now − window)
before you count.** `dsa/rateLimiter.mjs`

## Log parsing / aggregation — "the same shape as `summarizeUsage`, just messier input"
You already solved this exact shape in the logic practice: split into rows, parse each
row into a clean object, dump it into a Map, accumulate. The only new part in a
log-parsing variant is the parsing step (splitting a raw string into fields) — the
aggregation is identical muscle.

## String edge cases — "the ugly seam at the edge of the canvas"
Not a technique so much as a checklist of where the picture usually tears: empty
string, one character, leading/trailing whitespace, the first/last index, a boundary
that's `<=` when you meant `<`. Before you say "done," look at the edges on purpose —
same as you'd notice a design that's fine in the middle but breaks at the container edge.

## How to use this
Read a new problem and ask "what shape is this" before reaching for code — ranges
that touch (merge), an ordered thing that reshuffles on touch (LRU), a moving window
over time (rate limiter), or split-and-accumulate (aggregation). Naming the shape out
loud on the real screen also does double duty — it's the "narrate your reasoning" thing
they're scoring you on anyway.
