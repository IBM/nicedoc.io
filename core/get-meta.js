import { lib as emojiLib } from 'emojilib'
import fetch from 'isomorphic-unfetch'
import { get } from 'lodash'

import memoize from './memoize'

const RE_EMOJI_KEYWORD = /:\S*:/g

const emojiKeyword = str => {
  const keywords = str.match(RE_EMOJI_KEYWORD) || []
  return keywords.reduce((acc, keyword) => {
    const key = keyword.split(':')[1]
    const { char } = emojiLib[key]
    return char ? acc.replace(keyword, char) : acc
  }, str)
}

const { GITHUB_TOKEN } = process.env || {}

const mapMeta = async payload => {
  const owner = get(payload, 'owner.login')
  const repo = get(payload, 'name')

  return {
    url: `https://nicedoc.io/${owner}/${repo}`,
    originalUrl: get(payload, 'html_url'),
    description: emojiKeyword(get(payload, 'description')),
    owner: get(payload, 'owner.login'),
    repo: get(payload, 'name'),
    logo: get(payload, 'owner.avatar_url'),
    license: get(payload, 'license.name'),
    homepage: get(payload, 'homepage'),
    stars: get(payload, 'stargazers_count'),
    watchers: get(payload, 'watchers_count'),
    forks: get(payload, 'forks_count'),
    createdAt: get(payload, 'created_at'),
    updatedAt: get(payload, 'updated_at')
  }
}

export default memoize(async ({ owner, repo }) => {
  if (repo.includes('@')) [repo] = repo.split('@')

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const payload = await res.json()
  const meta = await mapMeta(payload)
  return meta
})
