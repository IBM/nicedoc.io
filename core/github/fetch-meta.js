import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import { lib as emojiLib } from 'emojilib'
import { get } from 'lodash'

const RE_EMOJI_KEYWORD = /:\S*:/g

const RATIO = 0.2

const score = ({ updatedAt, stars, issues }) => {
  const maxIssues = Math.max(issues, 1)
  const maxStars = Math.max(stars, 1)
  const days = Math.abs(differenceInCalendarDays(updatedAt, Date.now()))
  if (issues === 0 && stars === 0) return 1
  const result = (maxStars - maxIssues * RATIO * days) / maxStars
  return result.toFixed(2)
}

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
  const issues = get(payload, 'open_issues')
  const stars = get(payload, 'stargazers_count')
  const updatedAt = new Date(get(payload, 'pushed_at', 'updated_at'))

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
    stars,
    issues,
    starsUrl: `${repoUrl}/stargazers`,
    watchers: get(payload, 'watchers_count'),
    forks: get(payload, 'forks_count'),
    createdAt: get(payload, 'created_at'),
    updatedAt,
    activityUrl: `${repoUrl}/commits/${ref}`,
    score: score({ stars, issues, updatedAt })
  }
}

export default ({ normalizeParams, fetchRepo }) => async query => {
  const { owner, ref, repo } = normalizeParams(query)
  const res = await fetchRepo({ owner, repo })
  const payload = await res.json()
  const meta = await mapMeta(payload, { ref })
  return meta
}
