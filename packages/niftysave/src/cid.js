import { CID as CIDLib } from 'multiformats'
import { base32 } from 'multiformats/bases/base32'

/**
 * @typedef {import('multiformats').CID} CID
 * @param {string} cid
 * @returns {CID}
 */
export const parse = (cid) => CIDLib.parse(cid)

/**
 * @typedef {string} CIDString
 * @param {CID} cid
 * @returns {CIDString}
 */
export const format = (cid) => cid.toV1().toString(base32)
