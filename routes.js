'use strict'

const routes = require('next-routes')

module.exports = routes()
  .add('/', 'index')
  .add('/styleguide', 'styleguide')
  .add('/:owner/:repo', 'readme')
  .add('/:owner/:repo/:path*', 'readme')
