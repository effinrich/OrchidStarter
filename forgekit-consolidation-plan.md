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

## Known gaps NOT in any repo above (per Rich, from memory — need to locate)
- **Bidirectional Figma ⇄ React plugin.** An actual Figma plugin (HTML-based UI, per Figma's plugin architecture) that syncs React → Figma AND Figma → React. Never made it into any of the repos found via search — may be local/uncommitted, may be under a differently-named repo not turned up by "forgekit" search, or may only exist as local files. Locate before consolidation, since this sounds like a genuinely strong, distinctive piece of work (and directly relevant to the Anthropic Design Engineer pitch — Claude Design does Figma-adjacent design-system generation).

## Plan (once repo access is granted)
1. Read every repo listed above — map what each actually contains, current state, whether it's live/stale/experimental.
2. Identify overlapping/duplicate repos (Rich's instinct: "some too similar") and pick the canonical version of each.
3. Locate the missing Figma plugin (ask Rich where it lives if not findable via search/local disk).
4. Decide what's in-scope for the monorepo vs. archived.
5. Scope publish continuity for anything already live on npm — can't break existing installs.
6. Build the Nx monorepo structure, migrate canonical code in, verify builds/tests/publishing before archiving the old repos.

## Status
Waiting on repo access. Rich is away from his machine as of this note.
