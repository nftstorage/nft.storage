/**
 * @param {any} it
 * @param {(arg0: any) => any} fn
 */
async function itFind(it, fn) {
  for await (const i of it) {
    if (fn(i)) {
      return i
    }
  }
}

module.exports = {
  itFind,
}
