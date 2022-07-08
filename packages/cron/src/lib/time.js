import { performance } from 'perf_hooks'

/**
 * @property {number} #size
 */
export class Milliseconds {
  /** @type {number} */
  size = 0
  unit = {
    symbol: 'ms',
    name: 'millisecond',
  }

  /**
   * subtract two milliseconds
   * @param {Milliseconds} m1
   * @param {Milliseconds} m2
   * @returns {Milliseconds}
   */
  static subtract(m1, m2) {
    return new Milliseconds(m1.toNumber() - m2.toNumber())
  }

  /**
   * Return number of seconds in a Milliseconds instance
   * @param {Milliseconds} ms - ms to get seconds of
   * @returns {number} number of seconds in ms
   */
  static toSeconds(ms) {
    return ms.size / 1000
  }

  /**
   * @param {number} numberMs
   */
  constructor(numberMs) {
    this.unit = {
      symbol: 'ms',
      name: 'milliseconds',
    }
    this.size = numberMs
  }

  toNumber() {
    return this.size
  }

  toJSON() {
    return {
      unit: this.unit,
      size: this.size,
    }
  }
}

export const now = () => new Milliseconds(performance.now())
