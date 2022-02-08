export const responseTimeHistogram = [
  50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 10000, 20000,
]

export function createResponseTimeHistogramObject() {
  const h = responseTimeHistogram.map((h) => [h, 0])
  return Object.fromEntries(h)
}
