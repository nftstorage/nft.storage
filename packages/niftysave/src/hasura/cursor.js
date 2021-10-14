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
 * { time: '2021-10-01T22:16:21.369Z', offset: 0 } // data:a
 * { time: '2021-10-01T22:16:21.369Z', offset: 1 } // data:b
 * { time: '2021-10-01T22:16:21.369Z', offset: 2 } // data:c
 * { time: '2021-10-04T22:17:26.934Z', offset: 0 } // data:d
 * { time: '2021-10-04T22:17:26.934Z', offset: 1 } // data:e
 * ```
 *
 * @template Time
 * @typedef {Object} Cursor
 * @property {Time} time - Timestamp of the record as an ISO string.
 * @property {number} offset - Number of records with matching `updated_at` to skip.
 */

/**
 * Returns cursor representing UNIX epoch at offset 0. In practice this
 * implies starting from the very beginning.
 *
 * @template Time
 * @param { Time } time
 * @returns {Cursor<Time>}
 */
export const init = (time) => ({
  time,
  offset: 0,
})

/**
 * Advanced current `cursor` given a new `record`. New cursor
 * will represent position past given `record`.
 *
 * Note: API assumes that state is fed records in a order, otherwise results
 * are unreliable.
 *
 * @template Time
 * @param {Cursor<Time>} cursor
 * @param {Time} time
 * @returns {Cursor<Time>}
 */
export const after = (cursor, time) =>
  // If `time` is the same inrease the offset by one, otherwise capture
  // new `time` and set offset to 1 so this record is skipped.

  cursor.time === time
    ? { time, offset: cursor.offset + 1 }
    : { time, offset: 1 }

/**
 * @template Time
 *  @param {Cursor<Time>} cursor
 */
export const print = (cursor) => {
  const { time, offset } = cursor
  if (typeof time === 'number') {
    const cursorAsDate = new Date(time * 1000).toUTCString()
    console.log(
      `┄\n👉 Cursor:\n⌛ Sec\t${time}\n🕰️ UTC\t${cursorAsDate}\n➡️ Offset\t${offset}\n┄`
    )
  } else {
    console.table(cursor)
  }
}
