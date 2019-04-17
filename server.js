'use strict'

const cacheableResponse = require('cacheable-response')
const procStats = require('process-stats')
const express = require('express')
const next = require('next')

const routes = require('./routes')

const { INTERNAL_NEXT_PATHS, NODE_ENV, PORT, DEPLOY_DATE } = require('./constants')

const isNextPath = ({ url }) => INTERNAL_NEXT_PATHS.some(path => url.startsWith(path))

const isProduction = NODE_ENV === 'production'
const isStaging = NODE_ENV === 'staging'

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
  server.get('/api/status', (req, res) => res.json({ ...procStats(), deployDate: DEPLOY_DATE }))
  server.use(middleware)
  server.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`))
})
