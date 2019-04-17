import { join as pathJoin, extname } from 'path'
import regexParam from 'regexparam'
import { isEmpty } from 'lodash'

const githubBlobUrl = regexParam('blob/:ref/*')

const getDefaultRef = () => {
  // TODO: Add external API call for resolve this
  // https://stackoverflow.com/a/16501903
  return 'master'
}

const exec = (path, result) => {
  let i = 0
  let out = {}
  let matches = result.pattern.exec(path)
  while (i < result.keys.length) out[result.keys[i]] = matches[++i] || null
  return out
}

export default ({ MARKDOWN_EXTENSIONS, ALTERNATIVE_README_NAMES }) => {
  const isMarkdownPath = path => MARKDOWN_EXTENSIONS.includes(extname(path))

  const normalizeParams = ({ owner, repo, path = '' }) => {
    let ref

    if (!isEmpty(path)) {
      const execResult = exec(`/${path}`, githubBlobUrl)
      if (execResult.ref) {
        ref = execResult.ref
        path = path.replace(`blob/${ref}`, '')
      }
    } else if (repo.includes('@')) {
      ;[repo, ref] = repo.split('@')
    } else {
      ref = getDefaultRef()
    }

    const paths = isMarkdownPath(path)
      ? [path]
      : ALTERNATIVE_README_NAMES.map(readmeName => pathJoin(path, readmeName))

    return { owner, repo, paths, ref }
  }

  normalizeParams.isMarkdownPath = isMarkdownPath

  return normalizeParams
}
