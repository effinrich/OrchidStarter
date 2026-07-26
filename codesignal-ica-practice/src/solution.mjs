// YOUR SOLUTION — implement the in-memory database, one level at a time.
// Run `node tests.mjs` to see how far you get. Each level's tests unlock as you pass.
//
// Operations arrive as an array of string arrays, e.g. ["SET", "A", "field", "value"].
// Return an array of string results, one per operation.
//
// TIP: design your data model so Levels 3 & 4 can extend it WITHOUT rewriting Levels 1 & 2.
// (That backward-compatibility is exactly what CodeSignal scores.)

export function solution(queries) {
  const out = []

  for (const q of queries) {
    const op = q[0]
    switch (op) {
      // ---------- LEVEL 1: basic CRUD ----------
      case "SET": {
        // ["SET", key, field, value] -> ""   (set field=value on record `key`)
        out.push("") // TODO
        break
      }
      case "GET": {
        // ["GET", key, field] -> value, or "" if missing
        out.push("") // TODO
        break
      }
      case "DELETE": {
        // ["DELETE", key, field] -> "true" if it existed and was removed, else "false"
        out.push("false") // TODO
        break
      }

      // ---------- LEVEL 2: scan ----------
      case "SCAN": {
        // ["SCAN", key] -> "field1(value1), field2(value2), ..." sorted by field name asc; "" if empty
        out.push("") // TODO
        break
      }
      case "SCAN_BY_PREFIX": {
        // ["SCAN_BY_PREFIX", key, prefix] -> like SCAN but only fields starting with prefix
        out.push("") // TODO
        break
      }

      // ---------- LEVEL 3: TTL / timestamps ----------
      case "SET_AT": {
        // ["SET_AT", key, field, value, timestamp] -> "" (permanent set)
        out.push("") // TODO
        break
      }
      case "SET_AT_WITH_TTL": {
        // ["SET_AT_WITH_TTL", key, field, value, timestamp, ttl] -> ""  (alive for [timestamp, timestamp+ttl))
        out.push("") // TODO
        break
      }
      case "DELETE_AT": {
        // ["DELETE_AT", key, field, timestamp] -> "true"/"false" (only if alive at timestamp)
        out.push("false") // TODO
        break
      }
      case "GET_AT": {
        // ["GET_AT", key, field, timestamp] -> value if alive at timestamp else ""
        out.push("") // TODO
        break
      }
      case "SCAN_AT": {
        // ["SCAN_AT", key, timestamp] -> SCAN but only fields alive at timestamp
        out.push("") // TODO
        break
      }
      case "SCAN_BY_PREFIX_AT": {
        // ["SCAN_BY_PREFIX_AT", key, prefix, timestamp]
        out.push("") // TODO
        break
      }

      // ---------- LEVEL 4: backup / restore ----------
      case "BACKUP": {
        // ["BACKUP", timestamp] -> number (as string) of records with >=1 field alive at timestamp.
        // Save a snapshot; remaining TTLs must be preserved relative to the backup time.
        out.push("0") // TODO
        break
      }
      case "RESTORE": {
        // ["RESTORE", timestamp, timestampToRestore] -> ""
        // Restore DB to the most recent backup taken at time <= timestampToRestore.
        // Shift any remaining TTLs so they continue relative to `timestamp`.
        out.push("") // TODO
        break
      }

      default:
        throw new Error("Unknown op: " + op)
    }
  }

  return out
}
