/**
 * A service worker FetchEvent mock.
 * Necessary until playwright supports service workers.
 */
class FetchEvent extends CustomEvent {
  /**
   * @param {string} type
   * @param {{ request: Request }} init
   */
  constructor(type, init) {
    super(type)
    this.request = init.request
  }
  /**
   * @param {Promise<any>} _promise
   */
  waitUntil(_promise) {}
  /**
   * @param {Promise<Response>} _promise
   */
  respondWith(_promise) {}
}

/**
 * A FetchEvent that exposes the promises set using respondWith and waitUntil
 * as class properties.
 */
export class TestFetchEvent extends FetchEvent {
  /**
   * @param {Promise<any>} promise
   */
  waitUntil(promise) {
    super.waitUntil(promise)
    this.waitUntilPromise = promise
  }
  /**
   * @param {Promise<Response>} promise
   */
  respondWith(promise) {
    super.respondWith(promise)
    this.respondWithPromise = promise
  }
}
