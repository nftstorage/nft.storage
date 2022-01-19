/**
 * https://github.com/sinedied/smoke#javascript-mocks
 */
module.exports = () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Hello gateway.nft.storage resource!',
  }
}
