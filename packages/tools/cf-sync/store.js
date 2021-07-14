const level = require('level')
const merge = require('merge-options')

class Store {
  /**
   * @param {string} name
   */
  constructor(name) {
    this.store = level(name, { valueEncoding: 'json' })
  }

  /**
   * @param {string} key
   */
  async get(key) {
    try {
      return await this.store.get(key)
    } catch (err) {
      if (err.notFound) {
        return undefined
      }
      throw err
    }
  }

  /**
   * @param {string} key
   */
  async has(key) {
    return (await this.get(key)) !== undefined
  }

  /**
   * @param {string} key
   * @param {string} prop
   */
  async hasProp(key, prop) {
    const value = await this.get(key)

    if (value && value[prop] !== undefined) {
      return true
    }
    return false
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  async put(key, value) {
    const prevValue = await this.get(key)
    await this.store.put(key, prevValue ? merge(prevValue, value) : value)
  }

  /**
   *
   * @returns {AsyncIterable<{key: string, value: any}>}
   */
  iterator() {
    // @ts-ignore
    return this.store.createReadStream()
  }

  close() {
    return this.store.close()
  }
}

module.exports = Store
