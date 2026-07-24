# Ramp FE Challenge — Practice Recreation

A faithful practice version of Ramp's well-known frontend take-home: a **React +
TypeScript transaction table** with an **employee filter** and **"View more"
pagination**, shipped with **three bugs baked into the starter code** — the same
three Ramp's real challenge asks you to find and fix.

> Ramp's real stack is React + TypeScript + Vite + styled-components + their design
> system **Ryu**. This recreation uses plain CSS so it installs fast and the focus
> stays on the logic (state, async, pagination) — which is what they actually score.

## Run it

```bash
npm install
npm run dev
```

Open the local URL. You'll see a Transactions list, an employee filter, and a
"View more" button.

## Your task: reproduce, then fix, the 3 bugs

**Bug 1 — the filter says "Loading employees..." after paging.**
Load the page, let it settle, then click **View more**. Watch the employee
dropdown: it flips to "Loading employees..." and disables itself — even though the
employees were fetched once, at the start, and never change.

**Bug 2 — "View more" appears when filtered by an employee.**
Pick a single employee from the filter. "View more" still shows — but filtering by
employee is **not** a paginated request, so paging there is meaningless.

**Bug 3 — "View more" never goes away at the end of the data.**
Keep clicking **View more** until all transactions are loaded. The button stays,
even though there are no more pages.

## How Ramp scores this (prep like it's live)

- **Speed + clarity under time pressure is the dominant signal.** State your plan
  in the first ~5 minutes, then execute fast. Don't rabbit-hole on styling.
- It's **practical React** — state synchronization, async data, conditional
  rendering. Not algorithms.
- Narrate as you go; interviewers often watch silently.

Try the fixes yourself first. When you're ready, check **SOLUTION.md**.

## Where the bugs live
- Bug 1: `src/App.tsx` — the `isLoading` wiring for the `<select>`.
- Bugs 2 & 3: `src/App.tsx` — the `{transactions !== null && ...}` "View more" condition.
- Supporting code you shouldn't need to change: `src/hooks/*`, `src/api.ts`.
