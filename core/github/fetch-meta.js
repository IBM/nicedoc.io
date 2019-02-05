import { lib as emojiLib } from 'emojilib'
import { get } from 'lodash'

const RE_EMOJI_KEYWORD = /:\S*:/g

const emojiKeyword = str => {
  const keywords = str.match(RE_EMOJI_KEYWORD) || []
  return keywords.reduce((acc, keyword) => {
    const key = keyword.split(':')[1]
    const { char } = emojiLib[key]
    return char ? acc.replace(keyword, char) : acc
  }, str)
}

const mapMeta = async (payload, { ref }) => {
  const owner = get(payload, 'owner.login')
  const repo = get(payload, 'name')
  const repoUrl = get(payload, 'html_url')

  return {
    url: `https://nicedoc.io/${owner}/${repo}`,
    githubUrl: `${repoUrl}/tree/${ref}`,
    description: emojiKeyword(get(payload, 'description')),
    owner: get(payload, 'owner.login'),
    repo: get(payload, 'name'),
    logo: get(payload, 'owner.avatar_url'),
    license: get(payload, 'license.name'),
    licenseUrl: get(payload, 'license.url', '').replace(
      'https://api.github.com',
      'https://choosealicense.com'
    ),
    homepage: get(payload, 'homepage'),
    stars: get(payload, 'stargazers_count'),
    watchers: get(payload, 'watchers_count'),
    forks: get(payload, 'forks_count'),
    createdAt: get(payload, 'created_at'),
    updatedAt: get(payload, 'updated_at'),
    activityUrl: `${repoUrl}/commits/${ref}`
  }
}

export default ({ normalizeParams, fetchRepo }) => async query => {
  const { owner, ref, repo } = normalizeParams(query)
  const res = await fetchRepo({ owner, repo })
  const payload = await res.json()
  const meta = await mapMeta(payload, { ref })
  return meta
}
