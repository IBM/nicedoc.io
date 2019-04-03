'use strict'

const express = require('express')
const next = require('next')

const routes = require('./routes')

const { NODE_ENV = 'development', PORT = '3000', DEPLOY_DATE } = process.env

const isProduction = NODE_ENV === 'production'

const deployDate = DEPLOY_DATE
  ? new Date(parseInt(process.env.DEPLOY_DATE, 10) * 1000).toISOString()
  : 'n/a'

const port = parseInt(PORT, 10)
const dev = !isProduction

const app = next({ dev })

const handle = routes.getRequestHandler(app)

const middleware = (() => {
  return (req, res) => handle(req, res)
})()

app.prepare().then(() => {
  const server = express()
  server.get('/api/status', (req, res) => res.json({ deployDate }))
  server.use(middleware)
  server.listen(port, () => console.log(`> Ready on http://localhost:${port}`))
})
