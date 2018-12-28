'use strict'

module.exports = () => ({
  plugins: [
    require('postcss-easy-import'),
    require('postcss-focus'),
    require('autoprefixer'),
    require('cssnano')({
      autoprefixer: true,
      mergeIdents: true,
      zindex: true,
      discardUnused: true
    })
  ]
})
