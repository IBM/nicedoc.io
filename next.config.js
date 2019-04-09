'use strict'

const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')
const path = require('path')
const glob = require('glob')

const { APP, SITE_URL, REGEX_LOCAL_URL, REGEX_START_WITH_LETTER_OR_NUMBER } = require('./constants')

module.exports = withPlugins(
  [
    withSass({
      sassLoaderOptions: {
        includePaths: ['styles', 'node_modules']
          .map(d => path.join(__dirname, d))
          .map(g => glob.sync(g))
          .reduce((a, c) => a.concat(c), [])
      }
    })
  ],
  {
    useFileSystemPublicRoutes: false,
    env: { SITE_URL, APP, REGEX_LOCAL_URL, REGEX_START_WITH_LETTER_OR_NUMBER }
  }
)
