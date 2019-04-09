'use strict'

const pkg = require('./package.json')
const url = require('url')

const { SITE_URL = pkg.homepage, DEPLOY_DATE, PORT = 3000, NODE_ENV = 'development' } =
  process.env || {}

module.exports = {
  REGEX_LOCAL_URL: /^\/(?!\/)/,
  REGEX_HTTP_PROTOCOL: /^https?:\/\//i,
  REGEX_START_WITH_LETTER_OR_NUMBER: /^[a-z0-9]/i,
  SITE_URL,
  DEPLOY_DATE: DEPLOY_DATE ? new Date(parseInt(DEPLOY_DATE), 10 * 1000) : 'n/a',
  PORT: parseInt(PORT, 10),
  NODE_ENV,
  INTERNAL_NEXT_PATHS: ['/_next', '/_webpack/', '/__webpack_hmr', '/static/'],
  APP: {
    name: pkg.name,
    description: pkg.description,
    url: SITE_URL,
    image: url.resolve(SITE_URL, '/static/banner.jpg'),
    logo: url.resolve(SITE_URL, '/static/logo.png'),
    favicon: {
      ico: url.resolve(SITE_URL, '/static/favicon.ico'),
      medium: url.resolve(SITE_URL, '/static/favicon-32x32.png'),
      small: url.resolve(SITE_URL, '/static/favicon-16x16.png')
    }
  }
}
