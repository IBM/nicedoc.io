import { differenceInCalendarDays } from 'date-fns'
import { shortnameToUnicode } from 'emojione'
import { get } from 'lodash'
import { URL } from 'url'

const { SITE_URL } = process.env

const SCORE_RATIO = 0.2

const score = ({ updatedAt, stars, issues }) => {
  const days = Math.abs(differenceInCalendarDays(updatedAt, Date.now()))
  return (stars + 1) / (stars + 1 + SCORE_RATIO * days * issues)
}

const mapMeta = async (info, { path, ref }) => {
  const owner = get(info, 'owner.login')
  const repo = get(info, 'name')
  const repoUrl = get(info, 'html_url')
  const issues = get(info, 'open_issues')
  const stars = get(info, 'stargazers_count')
  const updatedAt = new Date(get(info, 'pushed_at', 'updated_at'))
  const homepage = get(info, 'homepage', undefined)
  const license = get(info, 'license.spdx_id')
  const licenseUrl = get(info, 'license.url')

  return {
    url: `${SITE_URL}/${owner}/${repo}`,
    githubUrl: `${repoUrl}/tree/${ref}/${path}`,
    description: shortnameToUnicode(get(info, 'description') || ''),
    owner: get(info, 'owner.login'),
    repo: get(info, 'name'),
    logo: get(info, 'owner.avatar_url'),
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
    watchers: get(info, 'watchers_count'),
    forks: get(info, 'forks_count'),
    updatedAt,
    homepage:
      homepage && new URL(SITE_URL).origin !== new URL(homepage).origin ? homepage : undefined,
    activityUrl: `${repoUrl}/commits/${ref}`,
    score: score({ stars, issues, updatedAt })
  }
}

export default async ({ source, info }) => mapMeta(info, source)
