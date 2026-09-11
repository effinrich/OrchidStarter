# Airbnb CodeSignal ICA Practice — In-Memory File System

Practice for Airbnb's **Industry Coding Assessment (ICA), powered by CodeSignal**:
one project, **4 progressive levels, 90 minutes** — confirmed structural format from
CodeSignal's own knowledge base (1 domain-agnostic, project-based question; each level
builds on the last; you must reuse/refactor earlier code, not rewrite).

**Confidence note:** the specific *domain* here — in-memory file system, OOP-modeled —
is based on multiple independent secondary reports (Blind/prep-site summaries) that
Airbnb's ICA is "object-oriented programming and file system design." I could not read
the primary Blind/Reddit threads directly (blocked from this sandbox) to verify exact
operation names, so treat this as a well-informed practice target, not a leaked question.
The *transferable skill* — clean Level 1 modeling so Levels 3-4 extend without a rewrite
— is confirmed and is what's actually scored regardless of domain specifics.

## Run it

```bash
node tests.mjs                                    # test YOUR src/solution.mjs
SOLUTION=./src/solution.solved.mjs node tests.mjs # see the reference pass 4/4
```

No `npm install` needed — pure Node, no dependencies.

## The problem

`solution(queries)` receives an array of operations (arrays of strings) and returns
an array of string results — one per operation. Model it as a tree of Directory/File
nodes internally (that's the "object-oriented" half of the ask) — the reference
solution (`src/solution.solved.mjs`) does exactly that with a small `Node`/`FileSystem`
class pair.

### Level 1 — basic file/directory CRUD
- `["MKDIR", path]` → `"true"` if created, `"false"` if the parent doesn't exist or the
  name is already taken (by a file or directory).
- `["ADD_FILE", path, content]` → `"true"`/`"false"`, same existence rules as MKDIR.
- `["READ_FILE", path]` → file content, or `""` if missing/is a directory.

### Level 2 — list a directory
- `["LIST", path]` → immediate children (files and dirs) **sorted alphabetically**,
  joined as `"name1, name2, ..."`. `""` if the path is missing, empty, or a file.
  `"/"` is always a valid, pre-existing root directory.

### Level 3 — recursive size
- `["GET_SIZE", path]` → for a file, its content length; for a directory, the **total
  size of all files nested anywhere underneath it**, recursively. `"0"` if missing.

### Level 4 — find by name
- `["FIND_BY_NAME", rootPath, name]` → full paths of every file or directory anywhere
  under `rootPath` (inclusive of `rootPath` itself) whose own name matches exactly,
  **sorted alphabetically**, joined as `"path1, path2, ..."`. `""` if none found.

## Files
- `src/solution.mjs` — your work (stub to fill in).
- `src/solution.solved.mjs` — verified reference (4/4), OOP-modeled.
- `tests.mjs` — the runner. See `STRATEGY.md` before you start.

## Role context
This is for the **Senior Software Engineer, Community Support Engineering (Frontend)**
role — confirmed from your Airbnb application emails (Aug 23, still under review). A
separate Airbnb role you applied to (Agent Core Products) was already rejected Aug 19 —
this assessment is almost certainly for the Frontend/Community Support Engineering role.

## Integrity
Practice the patterns here; take the real assessment yourself. Airbnb's invite email
explicitly bans external tools/AI assistants during the live assessment and says doing
so can trigger plagiarism-detection flags that invalidate your results — don't risk it.
