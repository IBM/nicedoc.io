'use strict'

const routes = require('next-routes')

module.exports = routes()
  .add('/', 'index')
  .add('/:org/:repo', 'readme')
