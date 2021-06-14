const FAR_FUTURE = new Date('3000-01-01T00:00:00.000Z').getTime()
const PAD_LEN = FAR_FUTURE.toString().length

/**
 * @param {import('../models/nfts-index').Key} key
 */
export function encodeIndexKey({ user, created, cid }) {
  const createdTime = new Date(created).getTime()
  const ts = (FAR_FUTURE - createdTime).toString().padStart(PAD_LEN, '0')
  return `${user.sub}:${ts}:${cid}`
}

/**
 * @param {string} key
 * @returns {import('../models/nfts-index').Key}
 */
export function decodeIndexKey(key) {
  const parts = key.split(':')
  const cid = parts.pop()
  const ts = parts.pop()
  if (!cid || !ts) throw new Error('invalid index key')
  const created = new Date(FAR_FUTURE - parseInt(ts)).toISOString()
  return { user: { sub: parts.join(':') }, created, cid }
}
