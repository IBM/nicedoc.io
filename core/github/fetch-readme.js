import fetch from 'isomorphic-unfetch'

export default ({ GITHUB_TOKEN }) => ({ owner, repo, path, ref }) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`

  return fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })
}
