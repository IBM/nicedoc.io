import { join as pathJoin, extname } from 'path'

export default ({ MARKDOWN_EXTENSIONS, ALTERNATIVE_README_NAMES }) => {
  const isMarkdownPath = path => MARKDOWN_EXTENSIONS.includes(extname(path))

  const normalizeParams = ({ owner, repo, path = '' }) => {
    let ref = 'master'
    if (repo.includes('@')) [repo, ref] = repo.split('@')

    const paths = isMarkdownPath(path)
      ? [path]
      : ALTERNATIVE_README_NAMES.map(readmeName => pathJoin(path, readmeName))

    return { owner, repo, paths, ref }
  }

  normalizeParams.isMarkdownPath = isMarkdownPath

  return normalizeParams
}
