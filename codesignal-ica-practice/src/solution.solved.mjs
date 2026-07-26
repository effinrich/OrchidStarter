// Reference solution — canonical CodeSignal ICA "in-memory database" (4 levels).
// Assumes timestamps in *_AT operations are non-decreasing (as the real ICA guarantees).
export function solution(queries) {
  const db = new Map()       // key -> Map(field -> { value, expireAt })  expireAt exclusive, null = permanent
  const backups = new Map()  // backupTs -> Array<[key, field, value, remaining|null]>
  const out = []

  const rec = (k) => { let r = db.get(k); if (!r) { r = new Map(); db.set(k, r) } return r }
  const isAlive = (e, ts) => e !== undefined && (e.expireAt === null || ts < e.expireAt)

  const doScan = (key, ts, prefix) => {
    const r = db.get(key); if (!r) return ""
    const parts = []
    for (const [field, e] of r) {
      if (ts !== null && !isAlive(e, ts)) continue
      if (prefix != null && !field.startsWith(prefix)) continue
      parts.push([field, e.value])
    }
    parts.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    return parts.map(([f, v]) => `${f}(${v})`).join(", ")
  }

  for (const q of queries) {
    const op = q[0]
    switch (op) {
      // ---- Level 1: basic CRUD ----
      case "SET": { const [, k, f, v] = q; rec(k).set(f, { value: v, expireAt: null }); out.push(""); break }
      case "GET": { const [, k, f] = q; const r = db.get(k); const e = r && r.get(f); out.push(e ? e.value : ""); break }
      case "DELETE": { const [, k, f] = q; const r = db.get(k); if (r && r.has(f)) { r.delete(f); out.push("true") } else out.push("false"); break }
      // ---- Level 2: scan / scan-by-prefix (sorted) ----
      case "SCAN": { const [, k] = q; out.push(doScan(k, null, null)); break }
      case "SCAN_BY_PREFIX": { const [, k, p] = q; out.push(doScan(k, null, p)); break }
      // ---- Level 3: TTL / timestamped ops ----
      case "SET_AT": { const [, k, f, v] = q; rec(k).set(f, { value: v, expireAt: null }); out.push(""); break }
      case "SET_AT_WITH_TTL": { const [, k, f, v, ts, ttl] = q; rec(k).set(f, { value: v, expireAt: Number(ts) + Number(ttl) }); out.push(""); break }
      case "DELETE_AT": { const [, k, f, ts] = q; const r = db.get(k); const e = r && r.get(f); if (isAlive(e, Number(ts))) { r.delete(f); out.push("true") } else out.push("false"); break }
      case "GET_AT": { const [, k, f, ts] = q; const r = db.get(k); const e = r && r.get(f); out.push(isAlive(e, Number(ts)) ? e.value : ""); break }
      case "SCAN_AT": { const [, k, ts] = q; out.push(doScan(k, Number(ts), null)); break }
      case "SCAN_BY_PREFIX_AT": { const [, k, p, ts] = q; out.push(doScan(k, Number(ts), p)); break }
      // ---- Level 4: backup / restore (TTLs shift with time) ----
      case "BACKUP": {
        const t = Number(q[1]); const snap = []; let count = 0
        for (const [key, r] of db) {
          let live = false
          for (const [field, e] of r) {
            if (!isAlive(e, t)) continue
            live = true
            snap.push([key, field, e.value, e.expireAt === null ? null : e.expireAt - t])
          }
          if (live) count++
        }
        backups.set(t, snap); out.push(String(count)); break
      }
      case "RESTORE": {
        const t = Number(q[1]); const tr = Number(q[2])
        let chosen = null, chosenTs = -Infinity
        for (const [bts, snap] of backups) if (bts <= tr && bts > chosenTs) { chosenTs = bts; chosen = snap }
        db.clear()
        if (chosen) for (const [key, field, value, remaining] of chosen) {
          rec(key).set(field, { value, expireAt: remaining === null ? null : t + remaining })
        }
        out.push(""); break
      }
      default: throw new Error("Unknown op: " + op)
    }
  }
  return out
}
