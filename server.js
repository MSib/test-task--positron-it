import http from 'http'

const hostname = 'localhost'
const port = 3030

const server = http.createServer((req, res) => {
  let body = []
  req
    .on('error', (err) => {
      console.error(err)
    })
    .on('data', (chunk) => {
      body.push(chunk)
    })
    .on('end', () => {
      body = Buffer.concat(body).toString()
      res.on('error', (err) => {
        console.error(err)
      })

      let statusCode = 200
      let parsedBody = {}
      let serverResponse = {}
      const errorsSet = new Set([403, 404, 500, 502, 503, 504])

      if (body.length) {
        parsedBody = JSON.parse(body)
        serverResponse = { message: '✅ Заказ оформлен' }
        if (errorsSet.has(parsedBody.fakeError)) {
          statusCode = parsedBody.fakeError
          serverResponse = {
            message: `⛔️ Произошла ошибка: ${parsedBody.fakeError}`,
            error: true,
          }
        }
      }

      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      })

      if (body.length) {
        res.write(JSON.stringify(serverResponse))
      }

      res.end()
    })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
