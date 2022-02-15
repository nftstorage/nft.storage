/**
 * @typedef {
 *  | 'PinError'
 *  | 'Pinned'
 *  | 'Pinning'
 *  | 'PinQueued'} PinStatus
 */

/** @type {Record<string, PinStatus>} */
export const PinStatusMap = {
  pin_error: 'PinError',
  pinned: 'Pinned',
  pinning: 'Pinning',
  pin_queued: 'PinQueued',
}
