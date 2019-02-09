'use strict'

const Keyv = require('keyv')

const { resolve: urlResolve } = require('url')
const normalizeUrl = require('normalize-url')
const { reduce } = require('lodash')
const prettyMs = require('pretty-ms')
const express = require('express')
const { URL } = require('url')
const next = require('next')

const routes = require('./routes')
const pkg = require('./package.json')

const {
  SITE_URL = pkg.homepage,
  NODE_ENV = 'development',
  PORT = '3000',
  DEPLOY_DATE
} = process.env

const INTERNAL_NEXT_PATHS = ['/_next', '/_webpack/', '/__webpack_hmr', '/static/']
const TTL = 1000 * 60 * 60 * 2 // 2 hours
const CACHE_NAMESPACE = 'ssr'

const isNextPath = ({ url }) => INTERNAL_NEXT_PATHS.some(path => url.startsWith(path))

const isProduction = NODE_ENV === 'production'
const isStaging = NODE_ENV === 'staging'

const deployDate = DEPLOY_DATE
  ? new Date(parseInt(process.env.DEPLOY_DATE, 10) * 1000).toISOString()
  : 'n/a'

const port = parseInt(PORT, 10)
const dev = !isProduction

const getCacheKey = url => {
  const { origin } = new URL(url)
  const baseKey = normalizeUrl(url, {
    removeQueryParameters: ['force', 'filter', 'ttl', 'utm', 'ref']
  })
  return baseKey.replace(origin, '').replace('/?', '')
}

const getQueryParams = query =>
  reduce(query, (acc, value, key) => ({ ...acc, [key]: value === '' ? true : value }), {})

const setCacheControl = ({ res, createdAt, isHit, ttl, hasForce }) => {
  // Specifies the maximum amount of time a resource
  // will be considered fresh in seconds
  const diff = hasForce ? 0 : createdAt + ttl - Date.now()
  const maxAge = Math.floor(diff / 1000)
  res.setHeader(
    'Cache-Control',
    `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=30`
  )
  res.setHeader('X-Cache-Status', isHit ? 'HIT' : 'MISS')
  res.setHeader('X-Cache-Expired-At', prettyMs(diff))
}

const renderAndCache = ssrCache => async (req, res) => {
  if (isNextPath(req)) return handle(req, res)

  const url = urlResolve(SITE_URL, req.url)
  const key = getCacheKey(url)

  const { route, params, parsedUrl } = routes.match(key)
  if (!route) return handle(req, res, parsedUrl)

  const { force: hasForce } = getQueryParams(req.query)
  const { html: cachedHtml, createdAt } = (await ssrCache.get(key)) || {}
  const isHit = !hasForce && !!cachedHtml

  // If we have a page in the cache, let's serve it
  if (isHit) {
    setCacheControl({ res, createdAt, isHit, hasForce, ttl: TTL })
    return res.send(cachedHtml)
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, route.page, params)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    const createdAt = Date.now()
    await ssrCache.set(key, { html, createdAt }, TTL)
    setCacheControl({ res, createdAt, isHit, hasForce, ttl: TTL })
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, route.page, params)
  }
}

const app = next({ dev })

const handle = routes.getRequestHandler(app)

const middleware = (() => {
  if (!isProduction && !isStaging) return (req, res) => handle(req, res)
  return renderAndCache(
    new Keyv({
      namespace: CACHE_NAMESPACE,
      ttl: TTL
    })
  )
})()

app.prepare().then(() => {
  const server = express()
  server.get('/api/status', (req, res) => res.json({ deployDate }))
  server.use(middleware)
  server.listen(port, () => console.log(`> Ready on http://localhost:${port}`))
})
