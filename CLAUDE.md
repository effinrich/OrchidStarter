# Job-hunt workbench — working rules

## RESUME FORMAT RULE (standing, from the user — ALWAYS and ONLY)
Every resume MUST be ATS-friendly. Never produce colored, multi-column, table, or flex layouts again.

Requirements for ALL resumes:
- Single column. No tables, text boxes, columns, or flex two-column (title/date) rows.
- Black text only — no color.
- Standard font (Arial or Calibri).
- Each role: "Job Title — Company" on one line; DATES ON THEIR OWN LINE directly below, format "Mon YYYY - Mon YYYY".
- No "key metrics / highlights" strip (it breaks ATS date parsing). Metrics live inside the bullets.
- Deliver a .docx (ATS parses Word most reliably) for uploads, plus a matching PDF for human viewing.
- Verify the .docx extracts to clean linear text with each date under the right role before sending.

Canonical ATS source: you/resume-ats.html (base). Tailored variants must follow the same ATS rules.

## STACK & STYLING RULES (standing, from the user — ALWAYS unless explicitly overridden)

**Framework**
- If Next.js is the default / lazy / suggested choice, you MUST use **TanStack Start**
  instead — and say so explicitly ("using TanStack Start, not Next.js").

**Styling & components**
- Default to **Panda CSS** + **Ark UI / Park UI**. NEVER reach for Tailwind or
  shadcn/ui unless the user explicitly asks for them.
- **Components first:** UI-kit components (Park UI) or custom components MUST take
  priority over inline styling. Style via Panda recipes / `css()` / tokens — not inline
  `style={{}}`.
- **Lint against inline styles in ALL projects** (add an eslint rule, e.g.
  `react/no-inline-styles` or `no-restricted-syntax` on JSXAttribute[name=style]).

**The one exception — the embed widget (`perch/packages/embed/perch.js`)**
- It ships as a single, dependency-free, zero-build `<script>` isolated in Shadow DOM,
  so it MUST use inline/injected styles and cannot use Panda/Park UI. This is the
  "unless otherwise stated" carve-out. Everything else (landing, dashboard, app
  surfaces) follows the rules above.
