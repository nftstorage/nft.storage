import { performance } from 'perf_hooks'

/**
 * @property {number} #size
 */
export class Milliseconds {
  /** @type {number} */
  #size = 0
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
   * @param {number} numberMs
   */
  constructor(numberMs) {
    this.unit = {
      symbol: 'ms',
      name: 'milliseconds',
    }
    this.#size = numberMs
  }

  get size() {
    return this.#size
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
