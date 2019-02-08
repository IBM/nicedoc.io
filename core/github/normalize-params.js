import { join as pathJoin, extname } from 'path'

export default ({ MARKDOWN_EXTENSIONS, ALTERNATIVE_README_NAMES }) => ({
  owner,
  repo,
  path = ''
}) => {
  let ref = 'master'
  if (repo.includes('@')) [repo, ref] = repo.split('@')

  const paths = MARKDOWN_EXTENSIONS.includesS(extname(path))
    ? [path]
    : ALTERNATIVE_README_NAMES.map(readmeName => pathJoin(path, readmeName))

  return { owner, repo, paths, ref }
}
