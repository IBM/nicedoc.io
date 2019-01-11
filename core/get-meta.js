import memoize from './memoize'
import fetch from 'isomorphic-unfetch'

import { lib as emojiLib } from 'emojilib'

const RE_EMOJI_KEYWORD = /:\S*:/g

const emojiKeyword = str => {
  const keywords = str.match(RE_EMOJI_KEYWORD)
  return keywords.reduce((acc, keyword) => {
    const key = keyword.split(':')[1]
    const { char } = emojiLib[key]
    return char ? acc.replace(keyword, char) : acc
  }, str)
}

const { GITHUB_TOKEN } = process.env || {}

export default memoize(async ({ owner, repo }) => {
  if (repo.includes('@')) [repo] = repo.split('@')

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const meta = await res.json()

  return {
    url: meta.html_url,
    description: emojiKeyword(meta.description),
    owner: meta.owner.login,
    logo: meta.owner.avatar_url,
    repo: meta.name,
    license: meta.license.name,
    homepage: meta.homepage,
    stars: meta.stargazers_count,
    watchers: meta.watchers_count,
    forks: meta.forks_count
  }
})
