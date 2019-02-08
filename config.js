const pkg = require('./package.json')

const url = require('url')

const { SITE_URL } = process.env

const config = {
  'process.env.APP.name': pkg.name,
  'process.env.APP.description': pkg.description,
  'process.env.APP.url': SITE_URL,
  'process.env.APP.image': url.resolve(SITE_URL, '/static/banner.jpg'),
  'process.env.APP.logo': url.resolve(SITE_URL, '/static/logo.png'),
  'process.env.APP.favicon.ico': url.resolve(SITE_URL, '/static/favicon.ico'),
  'process.env.APP.favicon.medium': url.resolve(SITE_URL, '/static/favicon-32x32.png'),
  'process.env.APP.favicon.small': url.resolve(SITE_URL, '/static/favicon-16x16.png')
}

module.exports = config
