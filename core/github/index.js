import memoize from '../memoize'
import createFetchMeta from './fetch-meta'
import createNormalizeParams from './normalize-params'
import createFetchRepo from './fetch-repo'
import createFetchReadme from './fetch-readme'

import { concat } from 'lodash'

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const cases = (name, ext) => [
  `${name.toUpperCase()}.${ext}`,
  `${name}.${ext}`,
  `${capitalize(name)}.${ext}`
]

const { GITHUB_TOKEN } = process.env || {}

// based on https://github.com/github/markup#markups
const ALTERNATIVE_README_NAMES = concat(
  cases('readme', 'md'),
  cases('readme', 'rst'),
  cases('readme', 'txt')
)

const fetchRepo = memoize(createFetchRepo({ GITHUB_TOKEN }))
const normalizeParams = memoize(
  createNormalizeParams({ ALTERNATIVE_README_NAMES })
)
const fetchMeta = memoize(createFetchMeta({ normalizeParams, fetchRepo }))
const fetchReadme = memoize(createFetchReadme({ GITHUB_TOKEN }))

export { fetchMeta, normalizeParams, fetchRepo, fetchReadme }
