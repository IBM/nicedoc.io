'use strict'

const cacheableResponse = require('cacheable-response')
const terminalLink = require('terminal-link')
const procStats = require('process-stats')
const { isNil } = require('lodash')
const express = require('express')
const chalk = require('chalk')
const next = require('next')

const routes = require('./routes')

const { INTERNAL_NEXT_PATHS, NODE_ENV, PORT, GITHUB_TOKEN } = require('./constants')

if (isNil(GITHUB_TOKEN)) {
  const helpUrl = 'https://github.com/IBM/nicedoc.io#github_token'

  const helpLink = terminalLink('See how to', helpUrl, {
    fallback: () => `See how to at ${helpUrl}`
  })

  const message = `${chalk.red('Error:')} You need to setup \`GITHUB_TOKEN\`. ${helpLink}.\n`

  console.error(message)
  process.exit(1)
}

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
  server.get('/api/status', (req, res) => res.json(procStats()))
  server.use(middleware)
  server.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`))
})
