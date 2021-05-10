const http = require('http')

exports.createServer = function createServer(port) {
  /** @type {Array<[number, string]>} */
  const responses = []

  const server = http.createServer((req, res) => {
    const resp = responses.shift()
    if (!resp) {
      res.writeHead(500)
      return res.end(JSON.stringify({ message: 'no responses' }))
    }
    res.writeHead(resp[0])
    res.end(resp[1])
  })
  server.listen(8080)

  return { server }
}
