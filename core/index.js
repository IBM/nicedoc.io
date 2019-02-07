import createBuildReadme from './build-readme'
import createFetchReadme from './fetch-readme'
import memoize from './memoize'
import { normalizeParams, fetchReadme as fetchReadmeFromGitHub } from './github'

const fetchReadme = createFetchReadme({ fetchReadme: fetchReadmeFromGitHub })
const buildReadme = memoize(createBuildReadme({ normalizeParams, fetchReadme }))

export { buildReadme, fetchReadme }
