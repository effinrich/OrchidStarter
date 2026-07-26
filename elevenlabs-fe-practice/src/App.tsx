import { VoiceSearch } from "./VoiceSearch"

export function App() {
  return (
    <div className="wrap">
      <h1>ElevenLabs FE Practice</h1>
      <p className="hint">
        Fix the two bugs and finish the debounce in <code>src/VoiceSearch.tsx</code>.
        Reference: <code>src/VoiceSearch.solved.tsx</code>. Logic task in <code>logic/</code>.
      </p>
      <VoiceSearch />
    </div>
  )
}
