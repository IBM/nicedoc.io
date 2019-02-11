'use strict'

const path = require('path')
const glob = require('glob')
const url = require('url')

const pkg = require('./package.json')

const { SITE_URL = pkg.homepage } = process.env

module.exports = {
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
  },
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader',
          'raw-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  },

  useFileSystemPublicRoutes: false
}
