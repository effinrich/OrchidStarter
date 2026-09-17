const path = process.env.SOLUTION || "./rateLimiter.mjs"
const { RateLimiter } = await import(path)

let pass = 0, total = 0
function check(cond, msg) {
  total++
  if (cond) pass++
  else console.log("  assertion failed: " + msg)
  return cond
}
function run(name, fn) {
  try { fn(); console.log("PASS " + name) }
  catch (e) { console.log("FAIL " + name); console.log("  " + e.message) }
}

run("allows up to max within window", () => {
  const rl = new RateLimiter(3, 1000)
  check(rl.allow(0) === true, "1st allowed")
  check(rl.allow(100) === true, "2nd allowed")
  check(rl.allow(200) === true, "3rd allowed")
  check(rl.allow(300) === false, "4th within window should be blocked")
})

run("old requests slide out of the window", () => {
  const rl = new RateLimiter(2, 1000)
  check(rl.allow(0) === true, "1st allowed")
  check(rl.allow(500) === true, "2nd allowed")
  check(rl.allow(900) === false, "3rd blocked, still within window of first two")
  check(rl.allow(1001) === true, "4th allowed, the request at t=0 has slid out")
})

run("boundary: exactly windowMs later counts as expired", () => {
  const rl = new RateLimiter(1, 1000)
  check(rl.allow(0) === true, "1st allowed")
  check(rl.allow(1000) === true, "request exactly windowMs later should be allowed (t=0 is out of (0,1000])")
})

console.log(`\n${pass}/${total} assertions passed`)
