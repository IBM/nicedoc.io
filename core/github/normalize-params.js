import utilPath from 'path'

export default ({ ALTERNATIVE_README_NAMES }) => ({
  owner,
  repo,
  path = ''
}) => {
  let ref = 'master'
  if (repo.includes('@')) [repo, ref] = repo.split('@')

  const paths = !path.endsWith('.md')
    ? ALTERNATIVE_README_NAMES.map(readmeName =>
      utilPath.join(path, readmeName)
    )
    : [path]

  return { owner, repo, paths, ref }
}
