import createBuildReadme from './build-readme'
import createFetchReadme from './fetch-readme'

import { normalizeParams, fetchReadme as fetchReadmeFromGitHub } from './github'

const fetchReadme = createFetchReadme({ fetchReadme: fetchReadmeFromGitHub })
const buildReadme = createBuildReadme({ normalizeParams, fetchReadme })

export { buildReadme, fetchReadme }
