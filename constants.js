'use strict'

const terminalLink = require('terminal-link')
const chalk = require('chalk')
const url = require('url')

const pkg = require('./package.json')

const {
  SITE_URL = pkg.homepage,
  DEPLOY_DATE,
  PORT = 3000,
  NODE_ENV = 'development',
  GITHUB_TOKEN
} = process.env || {}

const isDevelopment = NODE_ENV === 'development'

if (!GITHUB_TOKEN) {
  const helpUrl = 'https://github.com/IBM/nicedoc.io#github_token'

  const helpLink = terminalLink('See how to', helpUrl, {
    fallback: () => `See how to at ${helpUrl}`
  })

  const message = `${chalk.red('Error:')} You need to setup \`GITHUB_TOKEN\`. ${helpLink}.\n`

  console.error(message)
  process.exit(1)
}

module.exports = {
  REGEX_LOCAL_URL: /^\/(?!\/)/,
  REGEX_HTTP_PROTOCOL: /^https?:\/\//i,
  REGEX_START_WITH_LETTER_OR_NUMBER: /^[a-z0-9]/i,
  SITE_URL: isDevelopment ? 'http://localhost:3000' : SITE_URL,
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
