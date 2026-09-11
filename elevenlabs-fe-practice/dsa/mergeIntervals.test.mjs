const path = process.env.SOLUTION || "./mergeIntervals.mjs"
const { mergeIntervals } = await import(path)
const cases = [
  { in: [], out: [] },
  { in: [[1, 3]], out: [[1, 3]] },
  { in: [[1, 3], [2, 6], [8, 10], [15, 18]], out: [[1, 6], [8, 10], [15, 18]] },
  { in: [[1, 4], [4, 5]], out: [[1, 5]] }, // touching intervals merge
  { in: [[5, 8], [1, 3]], out: [[1, 3], [5, 8]] }, // unsorted input
]
let pass = 0
for (const [i, c] of cases.entries()) {
  const got = mergeIntervals(c.in)
  const ok = JSON.stringify(got) === JSON.stringify(c.out)
  console.log((ok ? "PASS " : "FAIL ") + "case " + (i + 1))
  if (!ok) { console.log("  expected", JSON.stringify(c.out)); console.log("  got     ", JSON.stringify(got)) }
  if (ok) pass++
}
console.log(`\n${pass}/${cases.length} passed`)
