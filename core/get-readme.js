import isRelativeUrl from 'is-relative-url'
import { isEmpty, forEach } from 'lodash'
import fetch from 'isomorphic-unfetch'
import { TAGS } from 'html-urls'
import cheerio from 'cheerio'
import url from 'url'
import remark from 'remark'
import remarkHtml from 'remark-html'
import remarkPreset from 'remark-preset-lint-recommended'

import memoize from './memoize'

const { GITHUB_TOKEN } = process.env || {}

const remarkProcessor = remark()
  .use(remarkPreset)
  .use(remarkHtml)

const md2html = async md => {
  const { contents } = await remarkProcessor.process(md)
  return contents
}

// const md2html = async (text, { owner, repo }) => {
//   const res = await fetch(`https://api.github.com/markdown`, {
//     method: 'post',
//     body: JSON.stringify({
//       text,
//       mode: 'gfm',
//       context: `${owner}/${repo}`
//     }),
//     headers: {
//       'Content-Type': 'text/plain'
//     }
//   })

//   return res.text()
// }

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

  const markdown = await res.text()
  const html = await md2html(markdown, { owner, repo })
  const $ = loadHTML(html)

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
