import { extname } from 'path'

import createFetchRepo from './fetch-repo'
import fetchMeta from './fetch-meta'

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const cases = (name, ext) => [
  `${name.toUpperCase()}.${ext}`,
  `${name}.${ext}`,
  `${capitalize(name)}.${ext}`
]

const { GITHUB_TOKEN } = process.env || {}

// based on https://github.com/github/markup#markups
const ALTERNATIVE_README_NAMES = cases('readme', 'md').concat(
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

const isMarkdownPath = path => MARKDOWN_EXTENSIONS.includes(extname(path))

const fetchRepo = createFetchRepo({
  isMarkdownPath,
  GITHUB_TOKEN,
  ALTERNATIVE_README_NAMES
})

export { fetchMeta, fetchRepo, isMarkdownPath }
