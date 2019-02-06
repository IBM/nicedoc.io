import memoize from '../memoize'
import createFetchMeta from './fetch-meta'
import createNormalizeParams from './normalize-params'
import createFetchRepo from './fetch-repo'
import createFetchReadme from './fetch-readme'

const { GITHUB_TOKEN } = process.env || {}
const ALTERNATIVE_README_NAMES = ['README.md', 'readme.md', 'Readme.md']

const fetchRepo = memoize(createFetchRepo({ GITHUB_TOKEN }))
const normalizeParams = memoize(
  createNormalizeParams({ ALTERNATIVE_README_NAMES })
)
const fetchMeta = memoize(createFetchMeta({ normalizeParams, fetchRepo }))
const fetchReadme = memoize(createFetchReadme({ GITHUB_TOKEN }))

export { fetchMeta, normalizeParams, fetchRepo, fetchReadme }
