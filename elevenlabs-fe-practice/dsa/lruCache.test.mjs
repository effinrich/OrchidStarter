const path = process.env.SOLUTION || "./lruCache.mjs"
const { LRUCache } = await import(path)

function run(name, fn) {
  try { fn(); console.log("PASS " + name) }
  catch (e) { console.log("FAIL " + name); console.log("  " + e.message) }
}

let pass = 0, total = 0
function check(cond, msg) {
  total++
  if (cond) pass++
  else console.log("  assertion failed: " + msg)
  return cond
}

run("basic get/put", () => {
  const c = new LRUCache(2)
  c.put(1, "a"); c.put(2, "b")
  check(c.get(1) === "a", "get(1) should be a")
  check(c.get(3) === -1, "get(3) should be -1 (missing)")
})

run("eviction of least recently used", () => {
  const c = new LRUCache(2)
  c.put(1, "a"); c.put(2, "b")
  c.get(1)          // 1 is now most-recently-used; 2 is LRU
  c.put(3, "c")     // should evict 2
  check(c.get(2) === -1, "2 should have been evicted")
  check(c.get(1) === "a", "1 should still be present")
  check(c.get(3) === "c", "3 should be present")
})

run("put on existing key updates value + recency", () => {
  const c = new LRUCache(2)
  c.put(1, "a"); c.put(2, "b")
  c.put(1, "z")     // updates value, 1 becomes most-recent
  c.put(3, "c")     // should evict 2, not 1
  check(c.get(1) === "z", "1 should be updated to z")
  check(c.get(2) === -1, "2 should have been evicted")
})

console.log(`\n${pass}/${total} assertions passed`)
