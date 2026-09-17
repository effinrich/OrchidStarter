// TASK: sliding-window rate limiter.
//   new RateLimiter(maxRequests, windowMs)
//   .allow(timestampMs) -> true if this request is allowed (fewer than maxRequests
//     requests occurred in (timestampMs - windowMs, timestampMs]), false otherwise.
//     If allowed, the request counts toward future window checks.
// Calls arrive with non-decreasing timestamps.
export class RateLimiter {
  constructor(maxRequests, windowMs) {
    // TODO
  }
  allow(timestampMs) {
    // TODO
    return false
  }
}
