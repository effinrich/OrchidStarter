# How to attack Airbnb's CodeSignal ICA (90 min, 4 levels)

You have until **August 30, 12:09am PDT** (7 days from invite) — take the real
assessment in one sitting, quiet space, reliable connection, webcam/mic working.
Do this practice problem 1-2 times cold and timed first, plus try the practice
question CodeSignal offers before the real one starts.

## Scoring — what actually matters
- Progression > completion. Most candidates don't finish Level 4 — clean, correct
  Levels 1-3 beats a broken attempt at all four.
- Hidden tests + visible tests. Passing what you can see isn't full marks — handle
  edge cases (missing paths, duplicate names, empty directories) deliberately.
- Community reports suggest Airbnb evaluates **engineering quality**, not just
  correctness — readable code, sensible naming, real edge-case handling. This
  matters more here than at a pure-algorithm shop.

## Time budget (rough, adjust as you go)
- **L1: ~15 min.** Get the tree/node model right — this is the foundation everything
  else extends. Don't rush past this to "look productive."
- **L2: ~10 min.** Listing + sorting; watch the exact output format (separator, order).
- **L3: ~25 min.** Recursive size — the recursion itself is simple, the trap is
  re-deriving structure instead of reusing your L1 tree.
- **L4: ~30 min + buffer.** Recursive search + path formatting. If short on time,
  bank a correct L1-L3 rather than half-break L4.

## The one idea that wins this: design for extension
Level 1 tempts you into flat path-string lookups (`Map<fullPath, content>`). That
works for L1-L2, but L3 (recursive size) and L4 (recursive search) need real tree
structure — parent/child relationships you can walk. If you build a genuine
**Node { isDir, children: Map, content }** tree from L1 onward, L3 and L4 are just
new traversal methods over the same structure. No rewrite.
**Decide your data model at L1 with L3/L4 in mind** — that's the actual thing being
scored ("reuse, encapsulate, refactor, maintain backward compatibility").

## Concrete tactics
- **Read all levels first** (skim) so your L1 model doesn't box you in.
- **Class-based, not just functions** — this ICA is explicitly reported as testing
  OOP design. A `FileSystem` class wrapping a `Node` tree reads as more senior than
  a pile of top-level functions over a flat map, even if both pass tests.
- **Validate existence carefully**: MKDIR/ADD_FILE need the *parent* to exist and be
  a directory, and the target name must not already be taken. Get this exactly right
  at L1 — L3/L4 depend on a correctly-shaped tree.
- **Output format is literal**: sorted, comma-space-joined (`"a, b, c"`), empty
  string for not-found/empty. A wrong separator fails tests even with correct logic.
- **Factor shared recursion**: one `_walk(node, path, visit)` helper can serve both
  the L3 size-sum and the L4 name-search — write it once, reuse it.

## Mindset / logistics
- Use JavaScript or TypeScript — go with whichever you're faster in, don't fight tooling.
- CodeSignal's browser-based IDE, Chrome/Firefox/Edge recommended. **Do the practice
  question first** (they offer one) so the editor/run button aren't new to you live.
- Webcam + mic must work — this one's proctored. Test them before you start the timer.
- Run tests after every level before moving on — don't build L4 on a shaky L3.
- If a level fights you, lock in what passes and move on. Partial credit is real.

## Integrity note
This is legit prep — learn the pattern here, then take the real assessment yourself,
solo, no outside tools. Airbnb's invite is explicit: no external tools, browser
extensions, or AI assistants during the live assessment — it can trigger plagiarism
detection and invalidate your results. You've got the skills for this; practice is
about speed and format, not capability.
