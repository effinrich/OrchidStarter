# Solutions — the 3 bugs

Try them yourself first. All three fixes are in `src/App.tsx`.

---

## Bug 1 — dropdown shows "Loading employees..." after paging

**Root cause.** The `<select>`'s loading is wired to a *combined* flag:

```ts
const isLoading = employeesLoading || paginatedLoading || byEmployeeLoading
```

`paginatedLoading` and `byEmployeeLoading` are true during *transaction* fetches, so
clicking "View more" makes the employee dropdown think *it* is loading.

**Fix.** The dropdown only depends on the employees request. Tie it to that alone —
or, cleaner, to whether employees have arrived yet:

```ts
// only true before employees first load; never again
const employeesAreLoading = employees === null
```

```tsx
<select id="employee" disabled={employeesAreLoading} ...>
  <option value={ALL_EMPLOYEES}>
    {employeesAreLoading ? "Loading employees..." : "All employees"}
  </option>
```

**Lesson:** don't share one loading flag across independent requests. Each async
resource owns its own loading state.

---

## Bug 2 — "View more" shows when filtered by an employee

**Root cause.** The button renders on `transactions !== null`, which is true for the
by-employee view too. But by-employee is a single non-paginated fetch.

**Fix.** Only show "View more" when we're in the paginated (unfiltered) view — i.e.
when there is no by-employee result:

```tsx
{byEmployee === null && /* ...pagination check... */ (
  <button className="viewmore" ...>View more</button>
)}
```

---

## Bug 3 — "View more" never disappears at the end

**Root cause.** The condition ignores `paginated.nextPage`. When the server returns
`nextPage: null`, there is no more data, but the button stays.

**Fix.** Hide it when there is no next page:

```tsx
{byEmployee === null && paginated?.nextPage != null && (
  <button className="viewmore" disabled={paginatedLoading} onClick={fetchPaginated}>
    {paginatedLoading ? "Loading..." : "View more"}
  </button>
)}
```

`!= null` (loose) covers both `null` and `undefined` (before the first load).

---

## Fully corrected block (drop-in for `src/App.tsx`)

```tsx
// Bug 1 fix
const employeesAreLoading = employees === null

// ...in JSX:
<select id="employee" disabled={employeesAreLoading} defaultValue={ALL_EMPLOYEES} onChange={...}>
  <option value={ALL_EMPLOYEES}>
    {employeesAreLoading ? "Loading employees..." : "All employees"}
  </option>
  {(employees ?? []).map((emp) => (
    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
  ))}
</select>

<Transactions transactions={transactions} />

{/* Bugs 2 + 3 fix */}
{byEmployee === null && paginated?.nextPage != null && (
  <button className="viewmore" disabled={paginatedLoading} onClick={fetchPaginated}>
    {paginatedLoading ? "Loading..." : "View more"}
  </button>
)}
```

## Talking points (say these out loud in the interview)
- "Each async resource owns its loading state — I won't couple the dropdown to the
  table's fetch."
- "Pagination is only meaningful for the unfiltered list, so I gate the control on
  `byEmployee === null` **and** `nextPage != null`."
- "`nextPage` from the server is my single source of truth for 'is there more?' —
  I don't track a separate hasMore boolean that can drift."
