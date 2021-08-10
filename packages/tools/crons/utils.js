/**
 * @param {Array<{status: String}>} s
 */
export function toSingleStatus(s) {
  if (s.some((i) => i.status === 'pinned')) return 'pinned'
  if (s.some((i) => i.status === 'pinning')) return 'pinning'
  if (s.some((i) => i.status === 'queued')) return 'queued'
  return 'failed'
}
