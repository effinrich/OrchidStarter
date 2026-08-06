# ForgeKit consolidation — planning notes

Goal: audit scattered ForgeKit repos, diff overlapping/duplicate ones, identify canonical versions, consolidate into a single Nx monorepo. Motivated by: (1) it needs to actually work solidly before pointing an Anthropic interviewer at it, (2) real npm packages with 5,700+ installs can't break, (3) doing the consolidation itself is a good story for the Anthropic application (Nx monorepo architecture is Rich's own specialty).

## Blocker
This session's GitHub access is locked to `effinrich/OrchidStarter` only. Repo search works (not gated by the session allowlist) but read/write does not. Need the repos below added to this session (Claude Code web/app session settings) before any real audit/migration work can start.

## Known repos (found via GitHub search, not yet readable)
- `forgekit-builder` (public) — likely the core CLI
- `forgekit-storybook-plugin` (public)
- `forgekit-radix-mcp` (public) — "MCP server exposing Radix Primitives' APIs + accessibility contracts to AI coding agents"
- `forgekit-landing` (public) — marketing site
- `forgekit-opensaas` (private) — **144 open issues**, likely explains a lot of "not working solidly"
- `forgekit-nx-storybook` (private)
- `forgekit-mcp-control-plane` (private)
- `stainless-forgekit-typescript-poc` (private)
- `documentationai-Docs` (public) — "AI-generated documentation for ForgeKit," possibly generated output not source

## Found via local `mdfind`/`grep` on Rich's Mac (2026-08-06) — the missing Figma plugin(s)
Located via Spotlight search for `figma.showUI` under `~/Documents`. Real hits (excluding node_modules and downloaded Figma MCP reference docs, which are not Rich's code):
- **`~/Documents/GitHub/forgekit-v2/packages/figma-plugin/`** — has a `packages/` monorepo layout already. **NOT found on GitHub** — local-only, no remote backup. Likely candidate for "the bidirectional Figma plugin," and possibly a more-evolved, partially-already-monorepo'd ForgeKit attempt that predates/parallels the scattered repos below.
- **`~/Documents/GitHub/designready-ai/plugin/` + `/dist/code.js`** — **NOT on GitHub**, local-only. Possibly an earlier name/prototype for the same idea.
- **`~/Documents/GitHub/silships-figma-cli/plugin/`** — **NOT on GitHub**, local-only. Another candidate for "too similar" overlap.
- **`~/Documents/GitHub/tidy-app/figma-plugin/`** — this one's parent repo (`tidy-app`) IS on GitHub (private), along with two variants: `tidy-app-ds` ("Design system for Tidy App") and `tidy-app-v2` — a second, separate "too similar" cluster worth diffing later, tangential to ForgeKit itself.

**Immediate priority, ahead of any consolidation work: get `forgekit-v2`, `designready-ai`, and `silships-figma-cli` pushed to GitHub.** They currently exist only on Rich's laptop with no remote backup — given this whole effort's history of losing local/uncommitted work to resets, this is real risk, not hypothetical. Waiting on Rich to push these before they can be added to this session.

## Plan
1. **First: back up `forgekit-v2`, `designready-ai`, `silships-figma-cli` to GitHub (private is fine).** Nothing else below should block on this, but it's the highest-priority single action.
2. Read every repo (the original 9 + these 3, once pushed) — map what each actually contains, current state, live/stale/experimental.
3. Identify overlapping/duplicate repos (Rich's instinct: "some too similar" — confirmed real, at least 3 separate Figma-plugin attempts exist) and pick the canonical version of each.
4. Decide what's in-scope for the monorepo vs. archived.
5. Scope publish continuity for anything already live on npm — can't break existing installs.
6. Build the Nx monorepo structure, migrate canonical code in, verify builds/tests/publishing before archiving the old repos.

## Status
Waiting on: (1) `forgekit-v2`/`designready-ai`/`silships-figma-cli` pushed to GitHub, (2) all relevant repos added to this session's GitHub access.
