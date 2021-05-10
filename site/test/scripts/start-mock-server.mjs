const http = require('http')

function createServer (port) {
  /** @type {Array<[number, string]>} */
  const responses = []
  
  const server = http.createServer((req, res) => {
    const { pathname } = new URL(req.url)

    if (req.method === 'POST' && pathname === '/_response') {
      req.
    } else if (req.method === 'POST' && pathname === '/_close') {
      setTimeout(() => server.close())
      return res.end()
    }

    const resp = responses.shift()
    if (!resp) {
      res.writeHead(500)
      return res.end(JSON.stringify({ message: 'no responses' }))
    }
    res.writeHead(resp[0])
    res.end(resp[1])
  })

  server.listen(port)
  return { server }
}

createServer(parseInt(process.argv[2]))
