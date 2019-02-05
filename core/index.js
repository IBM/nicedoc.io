import createBuildReadme from './build-readme'
import memoize from './memoize'
import { normalizeParams, fetchReadme } from './github'

const buildReadme = memoize(createBuildReadme({ normalizeParams, fetchReadme }))
export { buildReadme }
