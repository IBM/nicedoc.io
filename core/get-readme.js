import isRelativeUrl from 'is-relative-url'
import { isEmpty, forEach } from 'lodash'
import fetch from 'isomorphic-unfetch'
import { TAGS } from 'html-urls'
import cheerio from 'cheerio'
import url from 'url'

import memoize from './memoize'

const { GITHUB_TOKEN } = process.env || {}

const loadHTML = html =>
  cheerio.load(html, {
    xmlMode: false,
    lowerCaseTags: true,
    decodeEntities: true,
    lowerCaseAttributeNames: true
  })

const resolveUrl = (from, to) => {
  if (to[0] === '/') to = to.substr(1)
  return url.resolve(from, to)
}

export default memoize(async ({ owner, repo }) => {
  let ref = 'master'
  if (repo.includes('@')) [repo, ref] = repo.split('@')

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme?ref=${ref}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
        Authorization: `token ${GITHUB_TOKEN}`
      }
    }
  )

  const body = await res.text()
  const $ = loadHTML(body)

  forEach(TAGS, (htmlTags, propName) => {
    $(htmlTags.join(',')).each(function () {
      const el = $(this)
      const attr = el.attr(propName)
      if (!isEmpty(attr) && isRelativeUrl(attr)) {
        el.attr(
          propName,
          resolveUrl(
            `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/`,
            attr
          )
        )
      }
    })
  })

  return $.html()
})
