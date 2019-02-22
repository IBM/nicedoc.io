import { differenceInCalendarDays } from 'date-fns'
import { shortnameToUnicode } from 'emojione'
import { get } from 'lodash'

const { SITE_URL } = process.env

const SCORE_RATIO = 0.2

const score = ({ updatedAt, stars, issues }) => {
  const days = Math.abs(differenceInCalendarDays(updatedAt, Date.now()))
  return (stars + 1) / (stars + 1 + SCORE_RATIO * days * issues)
}

const mapMeta = async (payload, { ref }) => {
  const owner = get(payload, 'owner.login')
  const repo = get(payload, 'name')
  const repoUrl = get(payload, 'html_url')
  const issues = get(payload, 'open_issues')
  const stars = get(payload, 'stargazers_count')
  const updatedAt = new Date(get(payload, 'pushed_at', 'updated_at'))
  const homepage = get(payload, 'homepage', undefined)
  const license = get(payload, 'license.spdx_id')
  const licenseUrl = get(payload, 'license.url')

  return {
    url: `${SITE_URL}/${owner}/${repo}`,
    githubUrl: `${repoUrl}/tree/${ref}`,
    description: shortnameToUnicode(get(payload, 'description')),
    owner: get(payload, 'owner.login'),
    repo: get(payload, 'name'),
    logo: get(payload, 'owner.avatar_url'),
    commitsUrl: `${SITE_URL}/${owner}/${repo}/commits/${ref}`,
    license: license && licenseUrl ? license : undefined,
    licenseUrl:
      license && licenseUrl
        ? licenseUrl.replace('https://api.github.com', 'https://choosealicense.com')
        : undefined,
    stars,
    issues,
    starsUrl: `${repoUrl}/stargazers`,
    issuesUrl: `${repoUrl}/issues`,
    watchers: get(payload, 'watchers_count'),
    forks: get(payload, 'forks_count'),
    updatedAt,
    homepage,
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
