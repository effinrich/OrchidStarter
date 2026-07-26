const path = process.env.SOLUTION || "./usage.mjs"
const { summarizeUsage } = await import(path)
const cases = [
  { in: [], out: [] },
  { in: [{voiceId:"rachel",characters:10}], out: [{voiceId:"rachel",total:10}] },
  { in: [{voiceId:"rachel",characters:10},{voiceId:"adam",characters:5},{voiceId:"rachel",characters:7}],
    out: [{voiceId:"rachel",total:17},{voiceId:"adam",total:5}] },
  // tie on total -> alphabetical voiceId
  { in: [{voiceId:"zed",characters:3},{voiceId:"abe",characters:3}],
    out: [{voiceId:"abe",total:3},{voiceId:"zed",total:3}] },
]
let pass = 0
for (const [i, c] of cases.entries()) {
  const got = summarizeUsage(c.in)
  const ok = JSON.stringify(got) === JSON.stringify(c.out)
  console.log((ok ? "PASS " : "FAIL ") + "case " + (i + 1))
  if (!ok) { console.log("  expected", JSON.stringify(c.out)); console.log("  got     ", JSON.stringify(got)) }
  if (ok) pass++
}
console.log(`\n${pass}/${cases.length} passed`)
