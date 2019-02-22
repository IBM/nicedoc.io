'use strict'

const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')

const routes = require('./routes')

const { NODE_ENV = 'development', PORT = '3000', DEPLOY_DATE } = process.env

const INTERNAL_NEXT_PATHS = [
  '/_next',
  '/_webpack/',
  '/__webpack_hmr',
  '/static/'
]

const isNextPath = ({ url }) =>
  INTERNAL_NEXT_PATHS.some(path => url.startsWith(path))

const isProduction = NODE_ENV === 'production'
const isStaging = NODE_ENV === 'staging'

const deployDate = DEPLOY_DATE
  ? new Date(parseInt(process.env.DEPLOY_DATE, 10) * 1000).toISOString()
  : 'n/a'

const port = parseInt(PORT, 10)
const dev = !isProduction

const app = next({ dev })

const handle = routes.getRequestHandler(app)

const middleware = (() => {
  if (!isProduction && !isStaging) return (req, res) => handle(req, res)

  const ssrCache = cacheableResponse({
    get: async ({ req, res, route, params }) => ({
      data: await app.renderToHTML(req, res, route.page, params)
    }),
    send: ({ res, data }) => res.send(data)
  })

  return (req, res) => {
    if (isNextPath(req)) return handle(req, res)
    const { route, params, parsedUrl } = routes.match(req.url)
    if (!route) return handle(req, res, parsedUrl)
    return ssrCache({ req, res, route, params })
  }
})()

app.prepare().then(() => {
  const server = express()
  server.get('/api/status', (req, res) => res.json({ deployDate }))
  server.use(middleware)
  server.listen(port, () => console.log(`> Ready on http://localhost:${port}`))
})
