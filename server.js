'use strict'

const express = require('express')
const next = require('next')

const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.get('/api/status', (req, res) => {
    let deployDate = 'n/a';
    if (process.env.DEPLOY_DATE) {
      const date = new Date(parseInt(process.env.DEPLOY_DATE, 10) * 1000)
      deployDate = date.toISOString()
    }
    res.json({ deployDate })
  })

  server.get('*', (req, res) => {
    handler(req, res)
  })

  server.listen(port, () => console.log(`> Ready on http://localhost:${port}`))
})
