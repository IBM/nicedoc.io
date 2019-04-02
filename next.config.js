'use strict'

const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')
const path = require('path')
const glob = require('glob')
const url = require('url')

const pkg = require('./package.json')

const { SITE_URL = pkg.homepage } = process.env

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
    env: {
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
  }
)
