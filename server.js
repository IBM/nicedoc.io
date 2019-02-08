'use strict'

const express = require('express')
const next = require('next')

const routes = require('./routes')

const { NODE_ENV = 'development', PORT = '3000', DEPLOY_DATE } = process.env

const deployDate = DEPLOY_DATE
  ? new Date(parseInt(process.env.DEPLOY_DATE, 10) * 1000).toISOString()
  : 'n/a'

const port = parseInt(PORT, 10)
const dev = NODE_ENV !== 'production'

const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const app = express()
  app.get('/api/status', (req, res) => res.json({ deployDate }))
  app.get('*', (req, res) => handler(req, res))
  app.listen(port, () => console.log(`> Ready on http://localhost:${port}`))
})
