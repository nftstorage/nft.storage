/**
 * @typedef {string} DateISOString
 */

/**
 *
 * Value to track offset in the job queue where records are sorted by
 * `updated_at`. E.g. If you you had table like:
 * ```md
 * | updated_at               | token_uri |
 * | -------------------------| --------- |
 * | 2021-10-01T22:16:21.369Z | data:a    |
 * | 2021-10-01T22:16:21.369Z | data:b    |
 * | 2021-10-01T22:16:21.369Z | data:c    |
 * | 2021-10-04T22:17:26.934Z | data:d    |
 * | 2021-10-04T22:17:26.934Z | data:e    |
 * ```
 *
 * Cursors for them would be represented as follows:
 *
 * ```js
 * { updated_at: '2021-10-01T22:16:21.369Z', offset: 0 } // data:a
 * { updated_at: '2021-10-01T22:16:21.369Z', offset: 1 } // data:b
 * { updated_at: '2021-10-01T22:16:21.369Z', offset: 2 } // data:c
 * { updated_at: '2021-10-04T22:17:26.934Z', offset: 0 } // data:d
 * { updated_at: '2021-10-04T22:17:26.934Z', offset: 1 } // data:e
 * ```
 *
 * @typedef {Object} Cursor
 * @property {DateISOString} updated_at - Timestamp of the record as an ISO string.
 * @property {number} offset - Number of records with matching `updated_at` to skip.
 */

/**
 * Returns cursor representing UNIX epoch at offset 0. In practice this
 * implies starting from the very beginning.
 *
 * @returns {Cursor}
 */
export const init = () => ({
  updated_at: new Date(0).toISOString(),
  offset: 0,
})

/**
 * Advanced current `cursor` given a new `record`. New cursor
 * will represent position past given `record`.
 *
 * Note: API assumes that state is fed records in a order, otherwise results
 * are unreliable.
 *
 * @param {Cursor} cursor
 * @param {{updated_at: DateISOString}} record
 * @returns {Cursor}
 */
export const after = (cursor, { updated_at }) =>
  // If `updated_at` is the same inrease the offset by one, otherwise capture
  // new `updated_at` and set offset to 1 so this record is skipped.

  cursor.updated_at === updated_at
    ? { ...cursor, offset: cursor.offset + 1 }
    : { updated_at, offset: 1 }
