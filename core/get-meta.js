import memoize from './memoize'
import fetch from 'isomorphic-unfetch'

const { GITHUB_TOKEN } = process.env || {}

export default memoize(async ({ owner, repo }) => {
  if (repo.includes('@')) [repo] = repo.split('@')

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const meta = await res.json()
  return meta
})
