// Reference: aggregate character usage per voice.
// events: [{ voiceId, characters }]  ->  [{ voiceId, total }]
// sorted by total DESC, then voiceId ASC.
export function summarizeUsage(events) {
  const totals = new Map()
  for (const { voiceId, characters } of events) {
    totals.set(voiceId, (totals.get(voiceId) ?? 0) + characters)
  }
  return [...totals.entries()]
    .map(([voiceId, total]) => ({ voiceId, total }))
    .sort((a, b) => (b.total - a.total) || (a.voiceId < b.voiceId ? -1 : a.voiceId > b.voiceId ? 1 : 0))
}
