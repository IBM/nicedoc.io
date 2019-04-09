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
  cases('readme', 'markdown'),
  cases('readme', 'rst')
)

const MARKDOWN_EXTENSIONS = [
  '.markdown',
  '.mdown',
  '.mkdn',
  '.md',
  '.textile',
  '.rdoc',
  '.org',
  '.creole',
  '.mediawiki',
  '.wiki',
  '.rst',
  '.asciidoc',
  '.adoc',
  '.asc',
  '.pod',
  '.pod6'
]

const fetchRepo = createFetchRepo({ GITHUB_TOKEN })
const normalizeParams = createNormalizeParams({
  MARKDOWN_EXTENSIONS,
  ALTERNATIVE_README_NAMES
})
const fetchMeta = createFetchMeta({ fetchRepo })
const fetchReadme = createFetchReadme({ GITHUB_TOKEN })

export { fetchMeta, normalizeParams, fetchRepo, fetchReadme }
