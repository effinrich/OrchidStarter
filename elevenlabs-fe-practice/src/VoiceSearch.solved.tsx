import { useEffect, useMemo, useState } from "react"
import { VOICES } from "./voices"

export function VoiceSearchSolved() {
  const [query, setQuery] = useState("")
  const [debounced, setDebounced] = useState("")

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 300)
    return () => clearTimeout(id)
  }, [query])

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    if (!q) return VOICES
    return VOICES.filter(
      (v) => v.name.toLowerCase().includes(q) || v.accent.toLowerCase().includes(q)
    )
  }, [debounced])

  return (
    <section>
      <h2>Voice search (solved)</h2>
      <input
        placeholder="Search voices or accents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && <button onClick={() => setQuery("")}>Clear</button>}
      <ul>
        {results.map((v) => (
          <li key={v.id}>
            {v.name} &mdash; {v.accent}
          </li>
        ))}
      </ul>
    </section>
  )
}
