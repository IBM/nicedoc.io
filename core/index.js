import createBuildReadme from './github/build-readme'

import { fetchMeta, fetchRepo, isMarkdownPath } from './github'

const buildReadme = createBuildReadme({ isMarkdownPath })

export { fetchRepo, fetchMeta, buildReadme }
