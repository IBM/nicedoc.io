import remarkPreset from 'remark-preset-lint-recommended'
import ReactDOMServer from 'react-dom/server'
import isRelativeUrl from 'is-relative-url'
import { isEmpty, forEach } from 'lodash'
import fetch from 'isomorphic-unfetch'
import remarkHtml from 'remark-html'
import { TAGS } from 'html-urls'
import AnchorJS from 'anchor-js'
import cheerio from 'cheerio'
import remark from 'remark'
import utilPath from 'path'
import url from 'url'

import ExternalIcon from 'components/link/external-icon'
import memoize from './memoize'

const anchor = new AnchorJS()

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

const normalizeQueryParams = ({ owner, repo, path = '' }) => {
  let ref = 'master'
  if (repo.includes('@')) [repo, ref] = repo.split('@')
  if (!path.endsWith('.md')) path = utilPath.join(path, 'README.md')
  return { owner, repo, path, ref }
}

export default memoize(async query => {
  const { owner, repo, path, ref } = normalizeQueryParams(query)

  const apiEndpoint = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`

  const res = await fetch(apiEndpoint, {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const markdown = await res.text()
  const html = await md2html(markdown, { owner, repo })
  const $ = loadHTML(html)

  // rewrite relative path into absolute
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

  // add anchor link
  $('h1, h2, h3, h4, h5, h6').each(function () {
    const el = $(this)
    el.attr('id', anchor.urlify(el.text()))
  })

  const externalLink = (el, { appendIcon = true } = {}) => {
    el.attr('rel', 'noopener noreferrer')
    el.attr('target', '_blank')
    if (appendIcon) el.append(ReactDOMServer.renderToString(<ExternalIcon />))
  }

  // zoom on images
  $('img').each(function () {
    const el = $(this)
    const parentLink = el.closest('a')[0]
    if (!parentLink) el.attr('data-action', 'zoom')
    else externalLink($(parentLink), { appendIcon: false })
  })

  // add external icon for non internal urls
  $('a:not(a:has(img))').each(function () {
    externalLink($(this))
  })

  const meta = {
    image: $('img').attr('src')
  }

  return { meta, html: $.html() }
})
