// Dependency-free test runner. Usage:
//   node tests.mjs                         (tests your src/solution.mjs)
//   SOLUTION=./src/solution.solved.mjs node tests.mjs   (tests the reference)
const path = process.env.SOLUTION || "./src/solution.mjs"
const { solution } = await import(path)

const LEVELS = [
  { level: 1, name: "Basic CRUD", cases: [
    { q:[["SET","A","name","joe"],["GET","A","name"],["GET","A","age"],["DELETE","A","name"],["GET","A","name"],["DELETE","A","name"]],
      e:["","joe","","true","","false"] },
    { q:[["SET","u1","a","1"],["SET","u1","a","2"],["GET","u1","a"]], e:["","","2"] },
  ]},
  { level: 2, name: "Scan / prefix (sorted)", cases: [
    { q:[["SET","A","banana","1"],["SET","A","apple","2"],["SET","A","band","3"],["SCAN","A"],["SCAN_BY_PREFIX","A","ba"]],
      e:["","","","apple(2), banana(1), band(3)","banana(1), band(3)"] },
    { q:[["SCAN","missing"],["SET","A","x","9"],["SCAN_BY_PREFIX","A","z"]], e:["","",""] },
  ]},
  { level: 3, name: "TTL / timestamps", cases: [
    { q:[["SET_AT_WITH_TTL","A","f","v","10","5"],["GET_AT","A","f","12"],["GET_AT","A","f","15"],
        ["SET_AT","A","g","w","13"],["SCAN_AT","A","14"],["SCAN_AT","A","16"]],
      e:["","v","","","f(v), g(w)","g(w)"] },
    { q:[["SET_AT_WITH_TTL","A","f","v","1","10"],["DELETE_AT","A","f","5"],["GET_AT","A","f","6"],["DELETE_AT","A","f","7"]],
      e:["","true","","false"] },
  ]},
  { level: 4, name: "Backup / restore", cases: [
    { q:[["SET_AT","A","f","v","1"],["SET_AT_WITH_TTL","B","g","w","2","10"],["BACKUP","5"],
        ["SET_AT","A","f2","v2","6"],["RESTORE","100","5"],
        ["GET_AT","A","f","100"],["GET_AT","A","f2","100"],["GET_AT","B","g","106"],["GET_AT","B","g","107"]],
      e:["","","2","","","v","","w",""] },
  ]},
]

let reached = 0
for (const L of LEVELS) {
  let ok = true
  for (const c of L.cases) {
    let got
    try { got = solution(c.q) } catch (err) { got = "THREW: " + err.message }
    const pass = JSON.stringify(got) === JSON.stringify(c.e)
    if (!pass) {
      ok = false
      console.log(`  Level ${L.level} FAIL (${L.name})`)
      console.log(`    expected ${JSON.stringify(c.e)}`)
      console.log(`    got      ${JSON.stringify(got)}`)
      break
    }
  }
  if (ok) { console.log(`  Level ${L.level} PASS — ${L.name}`); reached = L.level }
  else break // ICA-style: a level must fully pass before the next unlocks
}
console.log(`\nReached Level ${reached} / 4.` + (reached === 4 ? "  🎉 all levels green" : "  Keep going!"))
