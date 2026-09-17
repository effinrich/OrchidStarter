// Dependency-free test runner. Usage:
//   node tests.mjs                         (tests your src/solution.mjs)
//   SOLUTION=./src/solution.solved.mjs node tests.mjs   (tests the reference)
const path = process.env.SOLUTION || "./src/solution.mjs"
const { solution } = await import(path)

const LEVELS = [
  { level: 1, name: "Basic file/dir CRUD", cases: [
    { q:[["MKDIR","/docs"],["ADD_FILE","/docs/a.txt","hello"],["READ_FILE","/docs/a.txt"],
        ["ADD_FILE","/missing/b.txt","x"],["MKDIR","/docs"],["READ_FILE","/nope.txt"]],
      e:["true","true","hello","false","false",""] },
    { q:[["MKDIR","/a"],["MKDIR","/a/b"],["ADD_FILE","/a/b/f.txt","v"],["READ_FILE","/a/b/f.txt"]],
      e:["true","true","true","v"] },
  ]},
  { level: 2, name: "List directory (sorted)", cases: [
    { q:[["MKDIR","/x"],["MKDIR","/x/b"],["ADD_FILE","/x/a.txt","1"],["ADD_FILE","/x/c.txt","2"],
        ["LIST","/x"],["LIST","/nope"],["ADD_FILE","/x/a.txt","dup"]],
      e:["true","true","true","true","a.txt, b, c.txt","","false"] },
    { q:[["MKDIR","/empty"],["LIST","/empty"],["LIST","/"]], e:["true","","empty"] },
  ]},
  { level: 3, name: "Recursive size", cases: [
    { q:[["MKDIR","/d"],["ADD_FILE","/d/a.txt","hello"],["MKDIR","/d/sub"],["ADD_FILE","/d/sub/b.txt","hi"],
        ["GET_SIZE","/d/a.txt"],["GET_SIZE","/d/sub/b.txt"],["GET_SIZE","/d"],["GET_SIZE","/missing"]],
      e:["true","true","true","true","5","2","7","0"] },
  ]},
  { level: 4, name: "Find by name (recursive, sorted paths)", cases: [
    { q:[["MKDIR","/r"],["MKDIR","/r/a"],["ADD_FILE","/r/a/x.txt","1"],["MKDIR","/r/b"],["ADD_FILE","/r/b/x.txt","2"],
        ["ADD_FILE","/r/x.txt","3"],["FIND_BY_NAME","/r","x.txt"],["FIND_BY_NAME","/r","nope"]],
      e:["true","true","true","true","true","true","/r/a/x.txt, /r/b/x.txt, /r/x.txt",""] },
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
