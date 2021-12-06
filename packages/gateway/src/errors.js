export class InvalidIpfsPathError extends Error {
  /**
   * @param {string} cid
   */
  constructor(cid) {
    super(`invalid ipfs path: invalid path "/ipfs/${cid}/"`)
    this.name = 'InvalidIpfsPath'
    this.status = 400
    this.code = InvalidIpfsPathError.CODE
  }
}
InvalidIpfsPathError.CODE = 'ERROR_INVALID_IPFS_PATH'

export class InvalidUrlError extends Error {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(`invalid url: ${url}`)
    this.name = 'InvalidUrl'
    this.status = 400
    this.code = InvalidUrlError.CODE
  }
}
InvalidUrlError.CODE = 'ERROR_INVALID_URL'
