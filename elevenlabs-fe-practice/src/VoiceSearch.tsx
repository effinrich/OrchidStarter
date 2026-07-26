import { useMemo, useState } from "react"
import { VOICES } from "./voices"

// TASK — do two things:
//   (a) FIX the two bugs marked BUG below (typing does nothing; React key warning).
//   (b) FINISH the debounce: type into the box and filtering should run 300ms after
//       you stop typing (not on every keystroke). Right now `debounced` never updates,
//       so the list ignores what you type.
export function VoiceSearch() {
  const [query, setQuery] = useState("")
  const [debounced, setDebounced] = useState("")

  // TODO (b): debounce `query` -> `debounced` with a 300ms delay.
  // Hint: useEffect(() => { const id = setTimeout(...); return () => clearTimeout(id) }, [query])

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    if (!q) return VOICES
    return VOICES.filter(
      (v) => v.name.toLowerCase().includes(q) || v.accent.toLowerCase().includes(q)
    )
  }, [debounced])

  return (
    <section>
      <h2>Voice search</h2>
      {/* BUG (a1): this input is not controlled — typing does nothing.
          Wire value + onChange so it drives `query`. */}
      <input placeholder="Search voices or accents..." />

      <ul>
        {/* BUG (a2): missing `key` — React warns and list diffing is unstable. */}
        {results.map((v) => (
          <li>
            {v.name} &mdash; {v.accent}
          </li>
        ))}
      </ul>
    </section>
  )
}
