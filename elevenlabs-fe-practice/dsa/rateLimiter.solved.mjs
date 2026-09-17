export class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.max = maxRequests
    this.windowMs = windowMs
    this.timestamps = [] // ascending, within-window requests
  }
  allow(timestampMs) {
    const cutoff = timestampMs - this.windowMs
    while (this.timestamps.length && this.timestamps[0] <= cutoff) this.timestamps.shift()
    if (this.timestamps.length < this.max) {
      this.timestamps.push(timestampMs)
      return true
    }
    return false
  }
}
