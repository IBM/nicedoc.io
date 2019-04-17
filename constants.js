'use strict'

const url = require('url')

const pkg = require('./package.json')

const { GITHUB_TOKEN, SITE_URL = pkg.homepage, PORT = 3000, NODE_ENV = 'development' } =
  process.env || {}

const isDevelopment = NODE_ENV === 'development'

module.exports = {
  GITHUB_TOKEN,
  REGEX_LOCAL_URL: /^\/(?!\/)/,
  REGEX_HTTP_PROTOCOL: /^https?:\/\//i,
  REGEX_START_WITH_LETTER_OR_NUMBER: /^[a-z0-9]/i,
  SITE_URL: isDevelopment ? 'http://localhost:3000' : SITE_URL,
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
